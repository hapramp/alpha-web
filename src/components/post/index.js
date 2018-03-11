import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import userPlaceholder from '../userProfile/user-placeholder.jpg';
import PostData from '../postData';
import styles from './styles.scss';

class Post extends React.Component {
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

		let communities = this.props.communities.filter(community =>
			_.some(this.props.post.json_metadata.tags, i => i === community.tag));

		let content = this.props.post.json_metadata.content;

		let organic_vote_count = this.props.post.hapramp_votes;
		let organic_vote_sum = organic_vote_count * this.props.post.hapramp_rating;

		let inorganic_vote_sum = 4 * (this.props.post.net_votes - organic_vote_count);

		let final_vote_sum = inorganic_vote_sum + organic_vote_sum;
		let final_rating = (final_vote_sum / this.props.post.net_votes).toFixed(2);

		final_rating = this.props.post.net_votes ? final_rating : 0.0.toFixed(2);

		return <div className={['uk-margin-top', 'uk-padding', styles.postContainer].join(' ')}>
			{/* Top section */}
			<div className={['uk-flex', styles.topSection].join(' ')}>
				<img src={userPlaceholder} className={['uk-border-circle', styles.userImage].join(' ')}/>
				<div className={['uk-margin-left', 'uk-flex', 'uk-flex-column', 'uk-flex-between'].join(' ')}>
					<div><span className={styles.userName}>Dummy User </span> | {this.props.post.created}</div>
					<div>{communities.map((community, idx) => <span
						key={idx} className={[idx !== 0 ? 'uk-margin-left' : '', styles.communityLabel].join(' ')}
						style={{backgroundColor: community.color}}>{community.name}</span>)}</div>
				</div>
			</div>
			{/* Actual post */}
			<div className={['uk-margin-top'].join(' ')}>
				{content && content.data.map((data, idx) => <PostData key={idx} data={data}/>)}
			</div>
			{/* Action bar */}
			<div className={['uk-margin-top', 'uk-flex', 'uk-flex-around'].join(' ')}>
				<span>
					<span className={[styles.action].join(' ')}>
						<svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
							<path d="M9 11.3l3.71 2.7-1.42-4.36L15 7h-4.55L9 2.5 7.55 7H3l3.71 2.64L5.29 14z"/>
							<path d="M0 0h18v18H0z" fill="none"/>
						</svg>
					</span>
					{final_rating} of {this.props.post.net_votes}
					</span>
				<span className={[styles.action].join(' ')}>
					<span className={['uk-margin-small-right'].join(' ')}>
						<svg fill="#000000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
    					<path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/>
    					<path d="M0 0h24v24H0z" fill="none"/>
						</svg>
					</span>
					{this.props.post.replies.length} Comment{this.props.post.replies.length === 1 ? '' : 's'}
					</span>
				<span className={[styles.action].join(' ')}>
					<span className={['uk-margin-small-right'].join(' ')}>
						<svg fill="#000000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
    					<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
    					<path d="M0 0h24v24H0z" fill="none"/>
						</svg>
					</span>
					{this.props.post.total_payout_value}
					</span>
			</div>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		communities: state.communities.communities,
	}
};

export default connect(mapStateToProps)(Post);
