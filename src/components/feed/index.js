import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {loadFeedsForUser} from "../../actions/userFeedActions";
import Post from '../post';
import AddContentButton from '../addContentButton';

class Feed extends React.Component {
	constructor(props) {
		super(props);
		props.loadFeedsForUser(this.props.username);
	}

	render() {
		return <div className={['uk-container'].join(' ')}>
			<div uk-grid="true">
				<div className={'uk-width-1-6'}>
					Categories
				</div>
				<div className={'uk-width-2-3'}>
					<div>
						{this.props.userFeed.posts && this.props.userFeed.posts.map(post => <Post key={post.id} post={post}/>)}
					</div>
					<AddContentButton />
				</div>
				<div className={'uk-width-1-6'}>
					Tags
				</div>
			</div>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		userFeed: state.userFeed.user,
		username: state.authUser.username,
	}
};

export default withRouter(connect(mapStateToProps, {
	loadFeedsForUser
})(Feed));
