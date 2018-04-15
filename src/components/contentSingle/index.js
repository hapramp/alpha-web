import React from 'react';
import {connect} from 'react-redux';

import {loadPost} from '../../actions/allPostsActions';
import PostSingle from '../postSingle';

class ContentSingle extends React.Component {
	constructor(props) {
		super(props);
		this.props.loadPost(this.props.match.params.username, this.props.match.params.permlink);
	}

	render() {
		if (!this.props.post) {
			return <div className={['uk-container', 'uk-margin-top'].join(' ')}>Loading...</div>
		}

		return <div className={['uk-container', 'uk-margin-top'].join(' ')}>
			{this.props.post.json_metadata.content.type === 'post' ?
				<PostSingle postPermlink={`${this.props.post.author}/${this.props.post.permlink}`}/> :
				'This is an article'}
		</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		post: state.allPosts.posts[ownProps.match.params.username + '/' + ownProps.match.params.permlink]
	}
}

export default connect(mapStateToProps, {
	loadPost
})(ContentSingle);
