import React from 'react';
import {connect} from 'react-redux';

import userPlaceholder from './user-placeholder.jpg';
import styles from './styles.scss';
import indexStyles from '../../index.scss';
import Post from '../post';
import {
	getFollowCount, getUserFeeds, loadUserProfileInfo,
	resetUserProfileInfo
} from '../../actions/userProfileActions';
import {loadHaprampUserDetails} from '../../actions/allUserActions';

class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		props.loadUserProfileInfo(props.match.params.username);
		props.getFollowCount(props.match.params.username);
		props.getUserFeeds(props.match.params.username);
		this.props.loadHaprampUserDetails(this.props.match.params.username);
	}

	componentWillUnmount() {
		this.props.resetUserProfileInfo();
	}

	componentWillReceiveProps(newProps) {
		if (newProps.match.params.username !== this.props.match.params.username && !newProps.userProfile.loading) {
			this.props.loadUserProfileInfo(newProps.match.params.username);
			this.props.loadHaprampUserDetails(newProps.match.params.username);
			this.props.getFollowCount(newProps.match.params.username);
			this.props.getUserFeeds(newProps.match.params.username);
		}
	}

	render() {
		if (!this.props.userProfile.user) {
			return <div className={['uk-position-center'].join(' ')}>
				LOADING
			</div>
		}
		let jsonMetadata = this.props.userProfile.user.json_metadata;

		/*
		"{"profile":
			{
				"profile_image":"https://pbs.twimg.com/profile_images/950061525737259008/diSwoT_A_400x400.jpg",
				"cover_image":"https://pbs.twimg.com/profile_banners/1605083964/1517917044/1500x500",
				"name":"Pratyush Singh",
				"location":"India",
				"website":"http://singhpratyush.in"
			}
		}"

		id(pin): 769728
		name(pin): "unittestaccount"
		memo_key(pin): "STM78inuJjjXFkyDAMr2uczwMQuHJncxugf3Sb2XL2K1XFsWGBupW"
		json_metadata(pin): "{}"
		proxy(pin): ""
		last_owner_update(pin): "1970-01-01T00:00:00"
		last_account_update(pin): "1970-01-01T00:00:00"
		created(pin): "2018-02-19T14:28:48"
		mined(pin): false
		owner_challenged(pin): false
		active_challenged(pin): false
		last_owner_proved(pin): "1970-01-01T00:00:00"
		last_active_proved(pin): "1970-01-01T00:00:00"
		recovery_account(pin): "steem"
		last_account_recovery(pin): "1970-01-01T00:00:00"
		reset_account(pin): "null"
		comment_count(pin): 0
		lifetime_vote_count(pin): 0
		post_count(pin): 22
		can_vote(pin): true
		voting_power(pin): 9800
		last_vote_time(pin): "2018-03-05T03:35:03"
		balance(pin): "0.000 STEEM"
		savings_balance(pin): "0.000 STEEM"
		sbd_balance(pin): "0.000 SBD"
		sbd_seconds(pin): "0"
		sbd_seconds_last_update(pin): "1970-01-01T00:00:00"
		sbd_last_interest_payment(pin): "1970-01-01T00:00:00"
		savings_sbd_balance(pin): "0.000 SBD"
		savings_sbd_seconds(pin): "0"
		savings_sbd_seconds_last_update(pin): "1970-01-01T00:00:00"
		savings_sbd_last_interest_payment(pin): "1970-01-01T00:00:00"
		savings_withdraw_requests(pin): 0
		reward_sbd_balance(pin): "0.000 SBD"
		reward_steem_balance(pin): "0.000 STEEM"
		reward_vesting_balance(pin): "0.000000 VESTS"
		reward_vesting_steem(pin): "0.000 STEEM"
		vesting_shares(pin): "1022.027783 VESTS"
		delegated_vesting_shares(pin): "0.000000 VESTS"
		received_vesting_shares(pin): "29638.704920 VESTS"
		vesting_withdraw_rate(pin): "0.000000 VESTS"
		next_vesting_withdrawal(pin): "1969-12-31T23:59:59"
		withdrawn(pin): 0
		other_history(pin): []
		witness_votes(pin): []
		tags_usage(pin): []
		guest_bloggers(pin): []
		*/
		jsonMetadata.profile = jsonMetadata.profile ? jsonMetadata.profile : {};
		jsonMetadata.profile.profile_image = jsonMetadata.profile.profile_image ? jsonMetadata.profile.profile_image : userPlaceholder;

		return <div className={['uk-container', 'uk-margin-top', 'uk-padding', 'uk-padding-remove-top', indexStyles.white].join(' ')}>
			{/* User details */}
			{jsonMetadata.profile.cover_image &&
			<div className={['uk-cover-container', styles.profileCoverContainer].join(' ')}
				style={{backgroundImage: `url(${jsonMetadata.profile.cover_image})`}}/>}
			<div className={['uk-text-center'].join(' ')}>
				<img src={jsonMetadata.profile.profile_image} alt={""}
						 className={['uk-border-circle', jsonMetadata.profile.cover_image ? styles.profileImage : styles.profileImageNoCover].join(' ')}/>
			</div>
			<div className={['uk-text-center', 'uk-margin-top'].join(' ')}>
				<div>
					<span className={styles.userName}>{jsonMetadata.profile.name}</span>
					<span className={'uk-margin-small-left'}>@{this.props.userProfile.user.name}</span>
				</div>
			</div>

			<div className={['uk-margin-top', 'uk-text-center'].join(' ')}>
				<span>{this.props.userProfile.user.post_count} Post{this.props.userProfile.user.post_count === 1 ? '' : 's'}</span>
				<span
					className={['uk-margin-small-left'].join(' ')}>{this.props.userProfile.follower.count} Follower{this.props.userProfile.follower.count === 1 ? '' : 's'}</span>
				<span className={['uk-margin-small-left'].join(' ')}>{this.props.userProfile.following.count} Following</span>
			</div>

			<div className={['uk-margin-top', 'uk-margin-bottom', 'uk-flex', 'uk-flex-center'].join(' ')}>
				<div className={['uk-text-center', styles.bio].join(' ')}>
					{jsonMetadata.profile.about || 'No bio provided.'}
				</div>
			</div>

			<div className={['uk-flex', 'uk-flex-center', 'uk-margin-large-bottom'].join(' ')}>
			<div className={[].join(' ')}>
				<div className={['uk-margin-top', 'uk-margin-bottom', styles.interestsHeader].join(' ')}>INTERESTS</div>
				<div className={['uk-flex'].join(' ')}>
					{this.props.allUsers.haprampUsers[this.props.match.params.username] &&
						this.props.allUsers.haprampUsers[this.props.match.params.username].communities.map(community =>
						<div key={community.id} className={['uk-flex', 'uk-flex-column', 'uk-text-center', 'uk-margin-right'].join(' ')}>
							<div><img className={[styles.communityImage].join(' ')} src={community.image_uri} alt={""}/></div>
							<div className={['uk-margin-small-top'].join(' ')}>{community.name}</div>
						</div>)}
				</div>
			</div>
			</div>

			{/* User posts */}
			<div className={['uk-flex', 'uk-flex-center', indexStyles.white, styles.userPostsContainer].join(' ')}>
				<div className={[styles.blogContainer].join(' ')}>
				<div className={['uk-margin-medium-top', 'uk-margin-medium-bottom', styles.blogHeader].join(' ')}>LATEST</div>
					{this.props.userProfile.blog.posts.map(item => <Post key={item} postPermlink={item} border={true}/>)}
				</div>
			</div>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		userProfile: state.userProfile,
		allUsers: state.allUsers
	}
};

export default connect(mapStateToProps, {
	loadUserProfileInfo, resetUserProfileInfo,
	getFollowCount, getUserFeeds, loadHaprampUserDetails
})(UserProfile);
