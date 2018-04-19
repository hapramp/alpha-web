import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import indexStyles from '../../index.scss';
import styles from './styles.scss';
import {ratePost} from '../../actions/allPostsActions';

class ActionBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {ratingActive: false};
		this.enableRatingView = this.enableRatingView.bind(this);
		this.disableRatingView = this.disableRatingView.bind(this);
		this.onRateClick = this.onRateClick.bind(this);
	}

	enableRatingView() {
		this.setState({...this.state, ratingActive: true});
	}

	disableRatingView() {
		setTimeout(() => this.setState({...this.state, ratingActive: false}), 300);
	}

	onRateClick(event) {
		let rating = parseInt(event.target.getAttribute('data-rating'), 10);  // Base 10
		this.props.ratePost(this.props.post.author, this.props.post.permlink, rating);
		this.disableRatingView();
	}

	getCommentSection() {
		if (this.props.withLink) {
			return <Link to={`/@${this.props.post.author}/${this.props.post.permlink}`} className={['uk-flex', styles.action].join(' ')}>
				<i className={['uk-margin-small-right', 'fas', 'fa-comment-alt'].join(' ')}></i>
				<span className={[styles.actionText].join(' ')}>{this.props.post.replies.length} Comment{this.props.post.replies.length === 1 ? '' : 's'}</span>
			</Link>
		} else {
			return <div to={`/@${this.props.post.author}/${this.props.post.permlink}`} className={['uk-flex', styles.action].join(' ')}>
				<i className={['uk-margin-small-right', 'fas', 'fa-comment-alt'].join(' ')}></i>
				<span className={[styles.actionText].join(' ')}>{this.props.post.replies.length} Comment{this.props.post.replies.length === 1 ? '' : 's'}</span>
			</div>
		}
	}

	getCollapsedActionSection(final_rating, userRating) {
		return <div className={['uk-margin-top', 'uk-margin-bottom', 'uk-padding-small', 'uk-flex', 'uk-flex-around'].join(' ')}>
			<span className={['uk-flex', indexStyles.pointer, styles.action].join(' ')} onClick={this.enableRatingView}>
				<i className={['uk-margin-small-right', userRating ? 'fas' : 'far', 'fa-star'].join(' ')}></i>
				<span className={[styles.actionText].join(' ')}>{final_rating} from {this.props.post.active_votes.filter(i => i.percent > 0).length}</span>
			</span>
			{this.getCommentSection()}
			<span className={['uk-flex', styles.action].join(' ')}>
				<i className={['uk-margin-small-right', 'fas', 'fa-dollar-sign'].join(' ')}></i>
				<span className={[styles.actionText].join(' ')}>{this.props.post.total_payout_value}</span>
			</span>
		</div>
	}

	getRatingView(userRating) {
		let ratingSection = <span></span>;
		userRating && (ratingSection = <span className={['uk-margin-medium-left', 'uk-margin-right', indexStyles.pointer, styles.action].join(' ')} onClick={this.onRateClick}>
			<i className={['uk-margin-small-right', 'far', 'fa-star', styles.cancelRatingButton].join(' ')} data-rating='0'></i>
		</span>)
		return <div className={['uk-margin-top', 'uk-margin-bottom', 'uk-padding-small', 'uk-flex', 'uk-flex-between'].join(' ')} onMouseLeave={this.disableRatingView}>
			<span className={['uk-margin-left'].join(' ')}>
				{[1, 2, 3, 4, 5].map((i, idx) => <span key={i} className={['uk-margin-small-right', indexStyles.pointer, styles.action].join(' ')} onClick={this.onRateClick}>
					<i className={['uk-margin-small-right', i <= userRating ? 'fas' : 'far', 'fa-star'].join(' ')} data-rating={i}></i>
				</span>)}
			</span>
			{ratingSection}
		</div>
	}

	render() {
		if (!this.props.post) {
			return <div>...</div>
		}
		let finalRating;
		if (this.props.post.active_votes.length) {
			finalRating = this.props.post.active_votes.map(vote => vote.percent).reduce((total, num) => total + num) / 100 / 20 / this.props.post.active_votes.filter(vote => vote.percent > 0).length;
		} else {
			finalRating = 0.0
		}
		!finalRating && (finalRating = 0.0);
		finalRating = finalRating.toFixed(2);

		let userRating = null;
		this.props.post.active_votes.forEach(element => element.voter === localStorage.getItem('username') && (userRating = element.percent / 2000));

		if (this.state.ratingActive) {
			return this.getRatingView(userRating);
		} else {
			return this.getCollapsedActionSection(finalRating, userRating);
		}
	}
}

const mapStateToProps = state => {
	return {}
};

export default connect(mapStateToProps, {ratePost})(ActionBar);
