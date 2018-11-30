import React from 'react';
import ReactTimeAgo from 'react-time-ago/no-tooltip';
import PropTypes from 'prop-types';

import PrimaryButton from '../../components/buttons/PrimaryButton';
import GrayButton from '../../components/buttons/GrayButton';

const CTAButton = ({ startsAt, endsAt }) => {
  const startDate = new Date(`${startsAt.substr(0, 19)}Z`);
  const endDate = new Date(`${endsAt.substr(0, 19)}Z`);
  const now = new Date();

  if (endDate < now) {
    return (
      <GrayButton>
        Ended <ReactTimeAgo>{endDate}</ReactTimeAgo>
      </GrayButton>
    );
  } else if (startDate < now) {
    return (
      <PrimaryButton>
        Started <ReactTimeAgo>{startDate}</ReactTimeAgo>
      </PrimaryButton>
    );
  }
  return (
    <PrimaryButton>
      Starts in <ReactTimeAgo timeStyle="time">{startDate}</ReactTimeAgo>
    </PrimaryButton>
  );
};

CTAButton.propTypes = {
  startsAt: PropTypes.string.isRequired,
  endsAt: PropTypes.string.isRequired,
};

export default CTAButton;
