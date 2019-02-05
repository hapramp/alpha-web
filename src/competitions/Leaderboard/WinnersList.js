import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ScrollBar from 'react-custom-scrollbars';

import BodyModal from '../../components/BodyModal';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../icons/Icon';
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
      <div className={styles.modalHeader} uk-tooltip="From last 10 competitions">
        <span className={styles.icon}><Icon name="trophy" type="solid" /></span>
        <h4 className="uk-margin-small-left uk-display-inline">Leaderboard</h4>
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
                  winner.entries.sort((a, b) => a.rank - b.rank)
                    .map(entry => (
                      <div key={entry.permlink} className={styles.entry}>
                        <Link to={`/competitions/${entry.competition}`} uk-tooltip={`${entry.prize}`}>
                          {
                            entry.rank <= 3 ? (
                              <Icon className={styles.medal} name={`medal_${entry.rank}`} type="solid" />
                            ) : (
                              <span>Rank {entry.rank}</span>
                            )
                          }
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
