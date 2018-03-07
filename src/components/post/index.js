import React from 'react';
import {connect} from 'react-redux';

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
		let communities = this.props.post.json_metadata.tags.map(tag => {
			if (tag.startsWith('hapramp-')) {
				return tag.replace('hapramp-', '')
			}
		});

		let content = this.props.post.json_metadata.content;

		return <div className={['uk-margin-top', 'uk-padding', styles.postContainer].join(' ')}>
			{/* Top section */}
			<div className={['uk-flex'].join(' ')}>
				<img src={userPlaceholder} className={['uk-border-circle', styles.userImage].join(' ')}/>
				<div className={['uk-margin-left', 'uk-flex', 'uk-flex-column', 'uk-flex-center'].join(' ')}>
					<div><span className={styles.userName}>Dummy User </span> | {this.props.post.created}</div>
					<div>{communities.map(community => <span key={community}>{community}</span>)}</div>
				</div>
			</div>
			{/* Actual post */}
			<div className={['uk-margin-top'].join(' ')}>
				{content && content.data.map((data, idx) => <PostData key={idx} data={data} />)}
			</div>
			{/* Action bar */}
			<div className={['uk-margin-top'].join(' ')}>
				<span><span uk-icon="icon: star"/> {this.props.post.net_votes} </span>
				<span className={['uk-margin-left'].join(' ')}>
					<span uk-icon="icon: comment"/> {this.props.post.replies.length} Comment{this.props.post.replies.length === 1 ? '' : 's'}</span>
				<span className={['uk-margin-left'].join(' ')}><span uk-icon="icon: credit-card"/> {this.props.post.total_payout_value}</span>
			</div>
		</div>
	}
}

export default connect()(Post);
