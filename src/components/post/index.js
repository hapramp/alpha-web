import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import TimeAgo from 'react-time-ago'
import {withRouter} from 'react-router-dom';

import userPlaceholder from '../userProfile/user-placeholder.jpg';
import PostData from '../postData';
import styles from './styles.scss';
import indexStyles from '../../index.scss';
import {ratePost} from '../../actions/allPostsActions';

class Post extends React.Component {
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
		let rating = parseInt(event.target.getAttribute('data-rating'), 10);
		this.props.ratePost(this.props.post.author, this.props.post.permlink, this.props.post.hapramp_cu_vote, rating);
		this.disableRatingView();
	}

	redirectToPost() {
		this.props.history.push(`/@${this.props.post.author}/${this.props.post.permlink}`);
	}

	getCollapsedActionSection(final_rating, userRating) {
		return <div className={['uk-margin-top', 'uk-margin-bottom', 'uk-padding-small', 'uk-flex', 'uk-flex-around'].join(' ')}>
			<span className={['uk-flex', indexStyles.pointer, styles.action].join(' ')} onClick={this.enableRatingView}>
				<i className={['uk-margin-small-right', userRating ? 'fas' : 'far', 'fa-star'].join(' ')}></i>
				{final_rating} from {this.props.post.net_votes}
			</span>
			<span className={['uk-flex', styles.action, indexStyles.pointer].join(' ')} onClick={this.redirectToPost.bind(this)}>
				<i className={['uk-margin-small-right', 'fas', 'fa-comment-alt'].join(' ')}></i>
				{this.props.post.replies.length} Comment{this.props.post.replies.length === 1 ? '' : 's'}
			</span>
			<span className={['uk-flex', styles.action].join(' ')}>
				<i className={['uk-margin-small-right', 'fas', 'fa-dollar-sign'].join(' ')}></i>
				{this.props.post.total_payout_value}
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

	getActionSection() {
		/* Rating related calculations */
		let finalRating;
		if (this.props.post.active_votes.length) {
			finalRating = this.props.post.active_votes.map(vote => vote.percent).reduce((total, num) => total + num) / 100 / 20 / this.props.post.active_votes.filter(vote => vote.percent > 0).length;
		} else {
			finalRating = 0.0
		}
		finalRating = finalRating.toFixed(2);

		let userRating = null;
		this.props.post.active_votes.forEach(element => element.voter === localStorage.getItem('username') && (userRating = element.percent / 2000));

		if (this.state.ratingActive) {
			return this.getRatingView(userRating);
		} else {
			return this.getCollapsedActionSection(finalRating, userRating);
		}
	}

	/*
	id(pin): 36183922
	author(pin): "unittestaccount"
	permlink(pin): "20180302t085301096z-post"
	category(pin): "hapramp-test"
	parent_author(pin): ""
	parent_permlink(pin): "hapramp-test"
	title(pin): ""
	body(pin): "#"
	last_update(pin): "2018-03-02T08:53:03"
	created(pin): "2018-03-02T08:53:03"
	active(pin): "2018-03-02T08:53:03"
	last_payout(pin): "1970-01-01T00:00:00"
	depth(pin): 0
	children(pin): 0
	net_rshares(pin): 602159721
	abs_rshares(pin): 602159721
	vote_rshares(pin): 602159721
	children_abs_rshares(pin): 602159721
	cashout_time(pin): "2018-03-09T08:53:03"
	max_cashout_time(pin): "1969-12-31T23:59:59"
	total_vote_weight(pin): 25572
	reward_weight(pin): 10000
	total_payout_value(pin): "0.000 SBD"
	curator_payout_value(pin): "0.000 SBD"
	author_rewards(pin): 0
	net_votes(pin): 1
	root_comment(pin): 36183922
	max_accepted_payout(pin): "1000000.000 SBD"
	percent_steem_dollars(pin): 10000
	allow_replies(pin): true
	allow_votes(pin): true
	allow_curation_rewards(pin): true
	url(pin): "/hapramp-test/@unittestaccount/20180302t085301096z-post"
	root_title(pin): ""
	pending_payout_value(pin): "0.003 SBD"
	total_pending_payout_value(pin): "0.000 STEEM"
	replies(pin): []
	author_reputation(pin): 9408745
	promoted(pin): "0.000 SBD"
	body_length(pin): 156
	reblogged_by(pin): []
	 */
	render() {
		if (!this.props.post) {
			return <div>Loading...</div>
		}

		let communities = this.props.communities.filter(community =>
			_.some(this.props.post.json_metadata.tags, i => i === community.tag));

		let content = this.props.post.json_metadata.content;

		/* Author details */
		let user = this.props.allUsers[this.props.post.author];
		if (!user || !user.json_metadata) {
			!user && (user = {});
			!user.json_metadata && (user.json_metadata = {});
			user.json_metadata.profile = {name: this.props.post.author , profile_image: userPlaceholder};
		} else {
			user = _.clone(user);
			try {
				user.json_metadata = JSON.parse(this.props.allUsers[this.props.post.author].json_metadata);
			} catch (error) {
				user.json_metadata = {};
				user.json_metadata.profile = {};
			}
			!user.json_metadata.profile.name && (user.json_metadata.profile.name = this.props.post.author);
			!user.json_metadata.profile.profile_image && (user.json_metadata.profile.profile_image = userPlaceholder);
		}

		/* Render */
		return <div className={['uk-margin-bottom', styles.postContainer, indexStyles.white].join(' ')}>
			{/* Top section */}
			<div className={['uk-flex', styles.paddingModerate, styles.topSection].join(' ')}>
				<img src={user.json_metadata.profile.profile_image} className={['uk-border-circle', styles.userImage].join(' ')} alt={""}/>
				<div className={['uk-margin-left'].join(' ')}>
					<div className={[styles.userNameContainer].join(' ')}><span className={styles.userName}>{user.json_metadata.profile.name}</span> | <TimeAgo>{new Date(this.props.post.created + 'Z')}</TimeAgo></div>
					<div>{communities.map((community, idx) => <span key={idx} style={{backgroundColor: community.color}}
							className={[styles.communityLabel].join(' ')}>
							{community.name}
						</span>)}
					</div>
				</div>
			</div>
			{/* Actual post */}
			<div className={[styles.postSection].join(' ')}>
				{content && content.data.map((data, idx) => <PostData applyTopMargin={idx !== 0} key={idx} data={data}/>)}
			</div>
			{/* Action bar */}
			{this.getActionSection()}
		</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		communities: state.communities.communities,
		allUsers: state.allUsers.users,
		post: state.allPosts.posts[ownProps.postPermlink],
	}
};

export default withRouter(connect(mapStateToProps, {ratePost})(Post));
