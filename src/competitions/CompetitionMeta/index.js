import React from 'react';
import PropTypes from 'prop-types';
import ReactTimeAgo from 'react-time-ago/no-tooltip';

import Icon from '../../icons/Icon';

import styles from './styles.scss';

import { getSumPrize } from '../utils';

const getTime = (startsAt, endsAt) => {
  const startDate = new Date(`${startsAt.substr(0, 19)}Z`);
  const endDate = new Date(`${endsAt.substr(0, 19)}Z`);
  const now = new Date();

  const timeAgoProps = { timeStyle: 'time' };

  let timeDisplay;
  if (endDate < now) {
    timeDisplay = (
      <span>
        Ended <ReactTimeAgo {...timeAgoProps}>{endDate}</ReactTimeAgo> ago
      </span>
    );
  } else if (startDate < now) {
    timeDisplay = (
      <span>
        Started <ReactTimeAgo {...timeAgoProps}>{startDate}</ReactTimeAgo> ago
      </span>
    );
  } else {
    timeDisplay = (
      <span>
        Starts in <ReactTimeAgo {...timeAgoProps}>{startDate}</ReactTimeAgo>
      </span>
    );
  }

  return (
    <div className={`uk-margin-right ${styles.metaContainer}`}>
      <Icon name="clock" />
      {timeDisplay}
    </div>
  );
};

const CompetitionMeta = ({
  prizes, startsAt, endsAt, participantCount,
}) => (
  <div className="uk-flex">
    <div className={styles.metaContainer}>
      <Icon name="money_bag" />
      <span>{getSumPrize(prizes)}</span>
    </div>
    {getTime(startsAt, endsAt)}
    <div className={styles.metaContainer}>
      <Icon name="user_multiple" />
      <span>{participantCount} Participant{participantCount === 1 ? '' : 's'}</span>
    </div>
  </div>
);

CompetitionMeta.propTypes = {
  prizes: PropTypes.arrayOf(PropTypes.string),
  startsAt: PropTypes.string.isRequired,
  endsAt: PropTypes.string.isRequired,
  participantCount: PropTypes.number,
};

CompetitionMeta.defaultProps = {
  prizes: [],
  participantCount: 0,
};

export default CompetitionMeta;
