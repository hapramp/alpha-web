import React from 'react';
import {connect} from 'react-redux';

import {fixUser} from '../../utils/defaultFixUtils';
import PostData from '../postData';
import indexStyles from '../../index.scss';
import CustomTags from '../customTags';
import ActionBar from '../actionBar';
import Replies from '../replies';

class ArticleSingle extends React.Component {
	render() {
		return <div uk-grid={'true'}>
			<div  className={['uk-width-1-6@m', 'uk-text-center', 'uk-width-1-4@l'].join(' ')}/>
			<div className={['uk-width-1-1@s', 'uk-width-2-3@m', 'uk-width-1-2@l', 'uk-padding-remove', indexStyles.white].join(' ')}>
				<div>
					{this.props.post.json_metadata.content.data.map((content, idx) => <PostData className={['uk-margin-bottom'].join(' ')} data={content}/>)}
				</div>
				<CustomTags tags={this.props.post.json_metadata.tags} className={['uk-margin-medium-left', 'uk-margin-medium-right'].join(' ')}/>
				<ActionBar post={this.props.post}/>
				<Replies parentAuthor={this.props.post.author} parentPermlink={this.props.post.permlink}/>
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
