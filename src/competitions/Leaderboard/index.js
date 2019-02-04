import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import take from 'lodash/take';

import { isFetching, getWinners } from './reducer';
import { fetchLeaderboard } from './actions';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../icons/Icon';
import styles from './styles.scss';

const useToggle = (initialState = false) => {
  const [state, changeState] = useState(initialState);
  return [state, () => changeState(!state)];
};

const Leaderboard = ({ getLeaderboard, isLoading, winners }) => {
  useEffect(
    () => {
      getLeaderboard();
    },
    [true],
  );

  const [isOpen, toggle] = useToggle();

  console.log(isOpen);

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className={`${styles.flexCenter} ${styles.leaderboardWrapper}`}>
      <div className={`${styles.flexCenter} ${styles.header}`}>
        <span className={styles.icon}><Icon name="medal" /></span>
        <span className={styles.text}>Leaderboard</span>
      </div>
      <div className={`${styles.winners} ${styles.flexCenter}`}>
        {
          take(winners, 3).map(winner => (
            <div key={winner.author} className={`${styles.flexCenter} ${styles.userContainer}`}>
              <div className={styles.icon}>
                <UserAvatar username={winner.author} />
              </div>
              <div className={styles.text}>
                {winner.author}
              </div>
            </div>
          ))
        }
      </div>
      <div
        className={styles.viewAll}
        onClick={toggle}
        onKeyUp={() => {}}
        role="button"
        tabIndex={-1}
      >
        View All
      </div>
    </div>
  );
};

Leaderboard.propTypes = {
  getLeaderboard: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  winners: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = state => ({
  isLoading: isFetching(state),
  winners: getWinners(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { getLeaderboard: fetchLeaderboard },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
