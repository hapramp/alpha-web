import React from 'react';
import PropTypes from 'prop-types';

import { getIcon } from '../../../icons';
import styles from './styles.scss';
import indexStyles from '../../../styles/globals.scss';

export default class CommentActionBar extends React.Component {
  static propTypes = {
    post: PropTypes.shape({
      author: PropTypes.string.isRequired,
      permlink: PropTypes.string.isRequired,
      children: PropTypes.number,
      active_votes: PropTypes.arrayOf(PropTypes.shape()),
      pending_payout_value: PropTypes.string.isRequired,
    }),
    authUsername: PropTypes.string,
  };

  static defaultProps = {
    post: {
      active_votes: [],
    },
    authUsername: '',
  }

  a = () => { }

  render() {
    const positiveVotes = this.props.post.active_votes.filter(a => a.percent > 0);
    const hasVoted = positiveVotes.includes(a => a.voter === this.props.authUsername);
    return (
      <div className={`uk-flex ${styles.actionBarContainer}`}>
        <div className={styles.actionContainer}>
          <img
            src={getIcon(
              (hasVoted ? 'like_primary' : 'like'),
              (hasVoted ? 'solid' : 'outline'),
            )}
            alt=""
            className={indexStyles.pointer}
          />
          <span className={styles.actionCount}>{positiveVotes.length}</span>
        </div>
        <div className={styles.actionContainer}>
          <img src={getIcon('dollor', 'outline')} alt="" />
          <span className={styles.actionContainer}>{this.props.post.pending_payout_value}</span>
        </div>
        <div className={styles.actionContainer}>
          <img
            src={getIcon('reply', 'outline')}
            alt=""
            className={indexStyles.pointer}
          />
        </div>
      </div>
    );
  }
}
