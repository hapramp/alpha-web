import every from 'lodash/every';

export const getSumPrize = (prizes) => {
  if (!prizes.length) {
    return 'No prizes';
  }
  const firstNumber = parseFloat(prizes[0]);

  const guessedUnit = prizes[0].replace(firstNumber, '');

  const allHasSameUnit = every(
    prizes,
    prize => prize.toLowerCase().includes(guessedUnit.toLowerCase()),
  );

  if (!allHasSameUnit) {
    return 'Multiple prizes';
  }

  const sum = prizes
    .map(prize => parseFloat(prize))
    .reduce((acc, curr) => curr + acc);

  if (prizes[0].startsWith(firstNumber)) {
    return `${sum}${guessedUnit}`;
  }
  return `${guessedUnit}${sum}`;
};


export const getFormattedDate = (date, extraOptions = {}) => {
  let dateObject = date;
  if (typeof date === 'string') {
    dateObject = new Date(`${date.substr(0, 19)}Z`);
  }
  const dateFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  };
  const dateFormatter = new Intl.DateTimeFormat(
    'en-US',
    { ...dateFormatOptions, ...extraOptions },
  );
  return dateFormatter.format(dateObject);
};

export const isParticipatePossible = (startsAt, endsAt) => {
  const startDate = new Date(`${startsAt.substr(0, 19)}Z`);
  const endDate = new Date(`${endsAt.substr(0, 19)}Z`);
  const now = new Date();
  return (now >= startDate) && (now < endDate);
};
