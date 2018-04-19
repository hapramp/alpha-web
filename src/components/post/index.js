import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import PostData from '../postData';
import styles from './styles.scss';
import indexStyles from '../../index.scss';
import {ratePost} from '../../actions/allPostsActions';
import PostUserMeta from '../postUserMeta';
import {getCommunitiesForPost} from '../../utils/communityUtils';
import {fixUser} from '../../utils/defaultFixUtils';
import ActionBar from '../actionBar';

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
		if (!this.props.post) {
			return <div>Loading...</div>
		}

		let content = this.props.post.json_metadata.content;

		/* Author details */
		let user = this.props.postingUser;

		/* Render */
		return <div className={['uk-margin-bottom', styles.postContainer, indexStyles.white].join(' ')}>
			{/* Top section */}
			<PostUserMeta profile={{name: user.json_metadata.profile.name, image: user.json_metadata.profile.profile_image, username: user.name}} created={this.props.post.created}
				communities={getCommunitiesForPost(this.props.post)}/>
			{/* Actual post */}
			<div className={[styles.postSection].join(' ')}>
				{content && content.data.map((data, idx) => <PostData applyTopMargin={idx !== 0} key={idx} data={data}/>)}
			</div>
			{/* Action bar */}
			<ActionBar post={this.props.post} withLink/>
		</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	let post = state.allPosts.posts[ownProps.postPermlink];
	let postingUsername = post.author;
	return {
		post,
		postingUser: fixUser(state.allUsers.users[postingUsername], postingUsername),
	}
};

export default withRouter(connect(mapStateToProps, {ratePost})(Post));
