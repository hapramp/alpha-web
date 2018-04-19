import React from 'react';
import {connect} from 'react-redux';

import {fixUser} from '../../utils/defaultFixUtils';
import PostData from '../postData';

import indexStyles from '../../index.scss';

class ArticleSingle extends React.Component {
	render() {
		return <div uk-grid={'true'}>
			<div  className={['uk-width-1-6@m', 'uk-text-center', 'uk-width-1-4@l'].join(' ')}/>
			<div className={['uk-width-1-1@s', 'uk-width-2-3@m', 'uk-width-1-2@l', 'uk-padding', indexStyles.white].join(' ')}>
				{this.props.post.json_metadata.content.data.map((content, idx) => <PostData className={['uk-margin-bottom'].join(' ')} data={content}/>)}
			</div>
		</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	let post = state.allPosts.posts[ownProps.postPermlink];
	let postingUsername = post.author;
	let postingUser = fixUser(state.allUsers.users[postingUsername], postingUsername);
	return {
		post: state.allPosts.posts[ownProps.postPermlink],
		postingUser,
	}
};

export default connect(mapStateToProps)(ArticleSingle);
