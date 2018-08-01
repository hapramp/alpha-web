import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';

import indexStyles from '../../index.scss';
import styles from './styles.scss';
import { ratePost } from './actions';

class ActionBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ratingActive: false };
    this.enableRatingView = this.enableRatingView.bind(this);
    this.disableRatingView = this.disableRatingView.bind(this);
    this.onRateClick = this.onRateClick.bind(this);
    this.handleRatePress = this.handleRatePress.bind(this);
    this.handleRateRelease = this.handleRateRelease.bind(this);
    this.buttonPressTimer = null;
    this.toggleFullRate = this.toggleFullRate.bind(this);
  }

  onRateClick(event) {
    const rating = parseInt(event.target.getAttribute('data-rating'), 10); // Base 10
    this.props.ratePost(this.props.post.author, this.props.post.permlink, rating);
    this.disableRatingView();
  }

  getCommentSection() {
    if (this.props.withLink) {
      return (
        <Link
          to={`/@${this.props.post.author}/${this.props.post.permlink}`}
          className={['uk-flex', styles.action].join(' ')}
        >
          <i className={['uk-margin-small-right', 'fas', 'fa-comment-alt'].join(' ')} />
          <span className={[styles.actionText].join(' ')}>
            {this.props.post.replies.length} Comment{this.props.post.replies.length === 1 ? '' : 's'}
          </span>
        </Link>);
    }
    return (
      <div className={['uk-flex', styles.action].join(' ')}>
        <i className={['uk-margin-small-right', 'fas', 'fa-comment-alt'].join(' ')} />
        <span className={[styles.actionText].join(' ')}>
          {this.props.post.replies.length} Comment{this.props.post.replies.length === 1 ? '' : 's'}
        </span>
      </div>);
  }

  getCollapsedActionSection(finalRating, userRating) {
    return (
      <div className={['uk-margin-top', 'uk-margin-bottom', 'uk-padding-small', 'uk-flex', 'uk-flex-around'].join(' ')}>
        <span
          className={['uk-flex', indexStyles.pointer, styles.action].join(' ')}
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
          <i className={['uk-margin-small-right', userRating ? ['fas', indexStyles.primaryText].join(' ') : 'far', 'fa-star'].join(' ')} />
          <span className={[styles.actionText].join(' ')}>
            {finalRating} from {this.props.post.active_votes.filter(i => i.percent > 0).length}
          </span>
        </span>
        {this.getCommentSection()}
        <span className={['uk-flex', styles.action].join(' ')}>
          <i className={['uk-margin-small-right', 'fas', 'fa-dollar-sign'].join(' ')} />
          <span className={[styles.actionText].join(' ')}>{this.props.post.total_payout_value}</span>
        </span>
      </div>);
  }

  getRatingView(userRating) {
    let ratingSection = <span />;
    if (userRating) {
      ratingSection = (
        <span
          className={['uk-margin-medium-left', 'uk-margin-right', indexStyles.pointer, styles.action].join(' ')}
          onClick={this.onRateClick}
          role="switch"
          onKeyDown={this.onRateClick}
          tabIndex={0}
          aria-checked={false}
        >
          <i className={['uk-margin-small-right', 'far', 'fa-star', styles.cancelRatingButton].join(' ')} data-rating="0" />
        </span>);
    }
    return (
      <div
        className={['uk-margin-top', 'uk-margin-bottom', 'uk-padding-small', 'uk-flex', 'uk-flex-between'].join(' ')}
        onMouseLeave={this.disableRatingView}
      >
        <span className={['uk-margin-left'].join(' ')}>
          {[1, 2, 3, 4, 5].map(i => (
            <span
              key={i}
              className={['uk-margin-small-right', indexStyles.pointer, styles.action].join(' ')}
              onClick={this.onRateClick}
              role="radio"
              onKeyDown={this.onRateClick}
              tabIndex={0}
              aria-checked={i === userRating}
            >
              <i className={['uk-margin-small-right', i <= userRating ? ['fas', indexStyles.primaryText].join(' ') : 'far', 'fa-star'].join(' ')} data-rating={i} />
            </span>))}
        </span>
        {ratingSection}
      </div>);
  }

  toggleFullRate() {
    let rating = 5;
    if (_.some(this.props.post.active_votes, i => i.voter === localStorage.getItem('username') && i.percent > 0)) {
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
    this.buttonPressTimer = setTimeout(this.enableRatingView, 500);
  }

  render() {
    if (!this.props.post) {
      return <div>...</div>;
    }
    let finalRating;
    if (this.props.post.active_votes.length) {
      finalRating = this.props.post.active_votes
        .map(vote => vote.percent)
        .reduce((total, num) => total + num) / 100 / 20 / this.props.post.active_votes
          .filter(vote => vote.percent > 0).length;
    } else {
      finalRating = 0.0;
    }
    if (!finalRating) {
      finalRating = 0.0;
    }
    finalRating = finalRating.toFixed(2);

    let userRating = null;
    this.props.post.active_votes.forEach((element) => {
      if (element.voter === localStorage.getItem('username')) {
        userRating = element.percent / 2000;
      }
    });

    if (this.state.ratingActive) {
      return this.getRatingView(userRating);
    }
    return this.getCollapsedActionSection(finalRating, userRating);
  }
}

ActionBar.propTypes = {
  ratePost: PropTypes.func,
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    permlink: PropTypes.string.isRequired,
    replies: PropTypes.arrayOf(PropTypes.string),
    active_votes: PropTypes.arrayOf(PropTypes.shape()),
    total_payout_value: PropTypes.string.isRequired,
  }),
  withLink: PropTypes.bool,
};

ActionBar.defaultProps = {
  ratePost: () => {},
  post: {},
  withLink: true,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { ratePost })(ActionBar);
