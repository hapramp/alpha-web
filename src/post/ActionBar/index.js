import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';

import indexStyles from '../../styles/globals.scss';
import styles from './styles.scss';
import { ratePost } from './actions';
import { getAuthUsername } from '../../reducers/authUserReducer';
import Icon from '../../icons/Icon';
import UserAvatar from '../../components/UserAvatar';

const getPayout = post => (
  parseFloat(post.pending_payout_value)
  + parseFloat(post.curator_payout_value)
  + parseFloat(post.total_payout_value)
).toFixed(3);

class ActionBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ratingActive: false };
    this.enableRatingView = this.enableRatingView.bind(this);
    this.disableRatingView = this.disableRatingView.bind(this);
    this.onRateClick = this.onRateClick.bind(this);
    this.handleRatePress = this.handleRatePress.bind(this);
    this.handleRateRelease = this.handleRateRelease.bind(this);
    this.handleRateHover = this.handleRateHover.bind(this);
    this.handleRateLeave = this.handleRateLeave.bind(this);
    this.buttonPressTimer = null;
    this.toggleFullRate = this.toggleFullRate.bind(this);
  }

  onRateClick(event) {
    const rating = parseInt(event.target.getAttribute('data-rating'), 10); // Base 10
    this.props.ratePost(this.props.post.author, this.props.post.permlink, rating);
    this.disableRatingView();
  }

  getCommentSection() {
    const child = [
      <Icon name="comment" key={0} />,
      <span className={styles.actionText} key={1}>
        {this.props.post.children}
      </span>,
    ];
    if (this.props.withLink) {
      return (
        <Link
          to={`/@${this.props.post.author}/${this.props.post.permlink}`}
          className={`uk-flex ${styles.action}`}
        >
          {child}
        </Link>
      );
    }
    return (
      <div className={`uk-flex ${styles.action}`}>
        {child}
      </div>);
  }

  getCollapsedActionSection(finalRating, userRating) {
    return (
      <div className={`uk-margin-top uk-margin-bottom uk-flex uk-flex-between ${styles.ratingBarContainer}`}>
        <span
          className={`uk-flex ${indexStyles.pointer}`}
          onClick={this.toggleFullRate}
          onTouchStart={this.handleRatePress}
          onTouchEnd={this.handleRateRelease}
          onMouseDown={this.handleRatePress}
          onMouseUp={this.handleRateRelease}
          onKeyUp={this.handleRateRelease}
          role="switch"
          tabIndex={0}
          aria-checked
        >
          <Icon name={userRating ? 'star_primary' : 'star'} type={userRating ? 'solid' : 'outline'} />
          <span className={styles.actionText} style={{ fontWeight: 500 }}>
            Rate{userRating ? 'd' : ''}
          </span>
        </span>
        <span>
          {this.getRatingSection(finalRating)}
        </span>
      </div>);
  }

  getRatingSection(finalRating) {
    const positiveRatings = this.props.post.active_votes
      .filter(vote => vote.percent > 0);
    const displayUsers = positiveRatings
      .sort((vote) => {
        // TODO: following>follower>* sort
        const { voter } = vote;
        return voter;
      })
      .slice(0, 3)
      .map(vote => vote.voter);
    return (
      <div className="uk-flex" style={{ alignItems: 'center' }}>
        <div style={{ marginRight: 8, fontSize: 12, color: 'rgba(0, 0, 0, 0.87)' }}>{finalRating} star{finalRating === 1 ? '' : 's'} from {positiveRatings.length}</div>
        <div className={`uk-flex ${styles.ratingUserContainer}`}>
          {
            displayUsers.map(username => (
              <div key={username}>
                <UserAvatar username={username} tooltip />
              </div>
            ))
          }
        </div>
      </div>
    );
  }

  getPayoutSection() {
    const totalPayout = getPayout(this.props.post);
    return (
      <span className={`uk-flex ${styles.action}`} style={{ marginLeft: 16 }}>
        <Icon name="dollor" style={{ marginRight: -8 }} />
        <span className={styles.actionText}>{totalPayout}</span>
      </span>
    );
  }

  getRatingView(userRating) {
    return (
      <div
        className={`uk-flex uk-margin-top uk-margin-bottom uk-flex ${styles.ratingBarContainer}`}
        onMouseLeave={this.disableRatingView}
      >
        <span>
          {[1, 2, 3, 4, 5].map(i => (
            <span
              key={i}
              className={`uk-margin-small-right ${indexStyles.pointer}`}
              onClick={this.onRateClick}
              role="radio"
              onKeyDown={this.onRateClick}
              tabIndex={0}
              aria-checked={i === userRating}
            >
              <Icon name={i <= userRating ? 'star_primary' : 'star'} type={i <= userRating ? 'solid' : 'outline'} data-rating={i} />
            </span>))}
        </span>
      </div>);
  }

  toggleFullRate() {
    let rating = 5;
    if (
      _.some(
        this.props.post.active_votes,
        i => i.voter === this.props.authUsername && i.percent > 0,
      )
    ) {
      // Already rated, remove rating
      rating = 0;
    }
    this.props.ratePost(this.props.post.author, this.props.post.permlink, rating);
  }

  disableRatingView() {
    setTimeout(() => this.setState({ ...this.state, ratingActive: false }), 300);
  }

  enableRatingView() {
    this.setState({ ...this.state, ratingActive: true });
  }

  handleRateRelease() {
    clearTimeout(this.buttonPressTimer);
  }

  handleRatePress() {
    if (this.mouseHoverTimer) clearTimeout(this.mouseHoverTimer);
    this.buttonPressTimer = setTimeout(this.enableRatingView, 500);
  }

  handleRateLeave() {
    clearTimeout(this.mouseHoverTimer);
  }

  handleRateHover() {
    this.mouseHoverTimer = setTimeout(this.enableRatingView, 500);
  }

  render() {
    if (!this.props.post) {
      return <div>...</div>;
    }
    let finalRating;
    if (this.props.post.active_votes.length) {
      const goodVotes = this.props.post.active_votes
        .map(vote => vote.percent)
        .filter(percent => percent >= 20 * 100);
      const scaledUpVotes = goodVotes
        .map(percent => percent / 100.0 / 20.0)
        .map(number => Math.ceil(number));
      if (!goodVotes.length) {
        finalRating = 0.0;
      } else {
        finalRating = scaledUpVotes
          .reduce((total, num) => total + num) / goodVotes.length;
      }
    } else {
      finalRating = 0.0;
    }
    if (!finalRating) {
      finalRating = 0.0;
    }
    finalRating = finalRating.toFixed(2);

    let userRating = null;
    this.props.post.active_votes.forEach((element) => {
      if (element.voter === this.props.authUsername) {
        userRating = element.percent / 2000;
      }
    });

    let ratingSection;
    if (this.state.ratingActive) {
      ratingSection = this.getRatingView(userRating);
    } else {
      ratingSection = this.getCollapsedActionSection(finalRating, userRating);
    }
    return (
      <div style={{ padding: '0px 32px 32px 32px' }}>
        {ratingSection}
        <div className={`uk-flex ${styles.commentPayoutContainer}`}>
          {this.getCommentSection()}
          {this.getPayoutSection()}
        </div>
      </div>
    );
  }
}

ActionBar.propTypes = {
  ratePost: PropTypes.func,
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    permlink: PropTypes.string.isRequired,
    children: PropTypes.number,
    active_votes: PropTypes.arrayOf(PropTypes.shape()),
    pending_payout_value: PropTypes.string.isRequired,
  }),
  withLink: PropTypes.bool,
  authUsername: PropTypes.string,
};

ActionBar.defaultProps = {
  ratePost: () => { },
  post: {},
  withLink: true,
  authUsername: null,
};

const mapStateToProps = state => ({
  authUsername: getAuthUsername(state),
});

export default connect(mapStateToProps, { ratePost })(ActionBar);
