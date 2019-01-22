import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import UserAvatar from '../../components/UserAvatar';
import styles from './styles.scss';

const RatingCard = ({ ratingObject, ratio }) => {
  /**
   * Calculating the vote value here reduces it being calculated
   * for every vote in advance. In this way, it only gets
   * calculated when the actual rating card is rendered.
   */
  const ratingValue = ratingObject.rshares * ratio;
  return (
    <div className={styles.ratingCard}>
      <div className={styles.userInfoContainer}>
        <UserAvatar username={ratingObject.voter} tooltip={false} />
        <Link to={`/@${ratingObject.voter}`}>{ratingObject.voter}</Link>
      </div>
      <div className={styles.ratingValues}>
        {ratingValue > 0.001 && <span><b>Value: </b>${ratingValue.toFixed(3)}</span>}
        <span><b>Percent: </b>{(ratingObject.percent / 100).toFixed(2)}%</span>
      </div>
    </div>
  );
};

RatingCard.propTypes = {
  ratingObject: PropTypes.shape().isRequired,
  ratio: PropTypes.number.isRequired,
};

export default RatingCard;
