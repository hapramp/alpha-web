import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';

import {loadFeedsForUser} from "../../actions/userFeedActions";
import {loadUserAccounts} from "../../actions/allUserActions";
import Post from '../post';
import AddContentButton from '../addContentButton';
import Sidebar from '../sidebar';
import indexStyles from '../../index.scss';
import styles from './styles.scss';

class Feed extends React.Component {
	constructor(props) {
		super(props);
		props.loadFeedsForUser(this.props.username);
	}

	componentWillReceiveProps(newProps) {
		let usersRequired = newProps.userFeed.posts.map(i => i.author)
			.filter(username => !_.some(Object.keys(newProps.allUsers), j => username === j));
		usersRequired.length && newProps.loadUserAccounts(usersRequired);
	}

	render() {
		return <div className={['uk-container'].join(' ')}>
			<div uk-grid="true">
				<div className={[styles.sidebarContainer].join(' ')}>
					<Sidebar/>
				</div>
				<div className={['uk-margin-top', styles.feedPosts].join(' ')}>
					<div className={['uk-padding'].join(' ')}>
						{this.props.userFeed.posts && this.props.userFeed.posts.map(post => <Post key={post.id} post={post}/>)}
					</div>
					<AddContentButton/>
				</div>
			</div>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		userFeed: state.userFeed.user,
		username: state.authUser.username,
		allUsers: state.allUsers.users,
	}
};

export default withRouter(connect(mapStateToProps, {
	loadFeedsForUser, loadUserAccounts
})(Feed));
