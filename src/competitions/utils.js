import _ from 'lodash';

export const getSumPrize = (prizes) => {
  if (!prizes.length) {
    return 'No prizes';
  }
  const firstNumber = parseFloat(prizes[0]);

  const guessedUnit = prizes[0].replace(firstNumber, '');

  const allHasSameUnit = _.every(
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

export const a = 10;
