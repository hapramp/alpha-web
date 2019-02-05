import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import take from 'lodash/take';
import { Link } from 'react-router-dom';

import { getWinners } from './reducer';
import { fetchLeaderboard } from './actions';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../icons/Icon';
import styles from './styles.scss';
import WinnerList from './WinnersList';

/**
 * A hook which toggles a boolean value.
 * @param {boolean} initialState The default state of toggle
 * @returns Array containing a boolean value and function to toggle it
 */
const useToggle = (initialState = false) => {
  const [state, changeState] = useState(initialState);
  return [state, () => changeState(!state)];
};

const Leaderboard = ({ getLeaderboard, winners }) => {
  /**
   * Load the leaderboard when the component mounts
   */
  useEffect(
    () => {
      getLeaderboard();
    },
    [true],
  );

  const [isOpen, toggle] = useToggle();

  return (
    <div className={`${styles.flexCenter} ${styles.leaderboardWrapper}`}>
      <div className={`${styles.flexCenter} ${styles.header}`}>
        <span className={styles.icon}><Icon name="trophy" type="solid" /></span>
        <span className={styles.text}>Leaderboard</span>
      </div>
      <div className={`${styles.winners} ${styles.flexCenter}`}>
        {
          take(winners, 3).map(winner => ( // Take top 3 winners and display
            <div key={winner.author} className={`${styles.flexCenter} ${styles.userContainer}`}>
              <div className={styles.icon}>
                <UserAvatar username={winner.author} />
              </div>
              <div className={styles.text}>
                <Link to={`/@${winner.author}`}>{winner.author}</Link>
              </div>
            </div>
          ))
        }
      </div>
      <div
        className={styles.viewAll}
        onClick={toggle}
        onKeyUp={() => { }}
        role="button"
        tabIndex={-1}
      >
        View All
      </div>
      {/* The modal for showing all winners from leaderboard */}
      {isOpen && <WinnerList winners={winners} onClose={toggle} />}
    </div>
  );
};

Leaderboard.propTypes = {
  getLeaderboard: PropTypes.func.isRequired,
  winners: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = state => ({
  winners: getWinners(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { getLeaderboard: fetchLeaderboard },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
