import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {loadFeedsForUser} from "../../actions/userFeedActions";
import Post from '../post';
import AddContentButton from '../addContentButton';
import Sidebar from '../sidebar';
import indexStyles from '../../index.scss';

class Feed extends React.Component {
	constructor(props) {
		super(props);
		props.loadFeedsForUser(this.props.username);
	}

	render() {
		return <div className={['uk-container'].join(' ')}>
			<div uk-grid="true">
				<div className={'uk-width-1-4'}>
					<Sidebar/>
				</div>
				<div className={['uk-width-3-4', 'uk-margin-top', indexStyles.white].join(' ')}>
					<div className={'uk-padding'}>
						{this.props.userFeed.posts && this.props.userFeed.posts.map(post => <Post key={post.id} post={post}/>)}
					</div>
					<AddContentButton />
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
