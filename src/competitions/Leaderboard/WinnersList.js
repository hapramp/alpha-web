import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ScrollBar from 'react-custom-scrollbars';

import BodyModal from '../../components/BodyModal';
import UserAvatar from '../../components/UserAvatar';
import styles from './styles.scss';

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
      <div className={styles.modalHeader}>
        Leaderboard
      </div>
      <ScrollBar autoHeight autoHeightMax="65vh">
        {
          winners.map((winner, idx) => (
            <div key={winner.author} className={styles.winnerCard}>
              <div className={styles.cardMeta}>
                <span className={styles.rank}>#{idx + 1}</span>
                <span className={styles.score}>${winner.score}</span>
              </div>
              <div className={styles.userInfo}>
                <UserAvatar username={winner.author} />
                @{winner.author}
              </div>
              <div className={`${styles.entries} uk-grid`}>
                {
                  winner.entries.sort((a, b) => a.rank - b.rank)
                    .map(entry => (
                      <div key={entry.permlink} className={styles.entry}>
                        <Link to={`/competitions/${entry.competition}`}>
                          Rank {entry.rank} ({entry.prize})
                        </Link>
                      </div>
                    ))
                }
              </div>
            </div>
          ))
        }
      </ScrollBar>
    </div>
  </BodyModal>
);

WinnerList.propTypes = {
  winners: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default WinnerList;
