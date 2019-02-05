import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ScrollBar from 'react-custom-scrollbars';

import BodyModal from '../../components/BodyModal';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../icons/Icon';
import styles from './styles.scss';

const getTrophiesForEntries = (entries) => {
  const ranks = { 1: 0, 2: 0, 3: 0 };
  entries.forEach((entry) => {
    ranks[entry.rank] += 1;
  });
  return Object.keys(ranks).map(rank => [rank, ranks[rank]]);
};

/**
 * Component which shows all the winners from leaderboard
 * in a modal
 */
const WinnerList = ({ winners, onClose }) => (
  <BodyModal
    isOpen
    onRequestClose={onClose}
    className="uk-position-center"
  >
    <div className={styles.winnerListWrapper}>
      <div className={styles.modalHeader} uk-tooltip="From last 10 competitions">
        <span className={styles.icon}><Icon name="trophy" type="solid" /></span>
        <h4 className="uk-margin-small-left uk-display-inline">Leaderboard</h4>
        <div className={styles.closeBtn}><Icon name="cancel" /></div>
      </div>
      <ScrollBar className={styles.scrollbar} autoHeight autoHeightMax="65vh">
        {
          winners.map((winner, idx) => (
            <div key={winner.author} className={styles.winnerCard}>
              <div className={styles.cardMeta}>
                <span className={styles.rank}>#{idx + 1}</span>
                <div className={styles.userInfo}>
                  <UserAvatar username={winner.author} />
                  <Link to={`/@${winner.author}`} className={styles.usernameLink}>@{winner.author}</Link>
                </div>
                <span className={styles.score}>${winner.score}</span>
              </div>

              <div className={`${styles.entries} uk-flex`}>
                {
                  getTrophiesForEntries(winner.entries)
                    .map((rank) => {
                      if (rank[1] > 0) {
                        return (
                          <div className={`uk-flex uk-flex-column ${styles.entry}`}>
                            <Icon
                              className={styles.medal}
                              name={`medal_${rank[0]}`}
                              type="solid"
                            />
                            <span>{rank[1]}</span>
                          </div>);
                      }
                      return '';
                    })
                }
              </div>
            </div>
          ))
        }
        <div
          className={styles.closeButton}
          onClick={onClose}
          role="button"
          tabIndex={-1}
          onKeyDown={() => { }}
        >
          <Icon name="cancel" />
        </div>
      </ScrollBar>
    </div>
  </BodyModal>
);

WinnerList.propTypes = {
  winners: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default WinnerList;
