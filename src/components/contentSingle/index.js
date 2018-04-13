import React from 'react';
import {connect} from 'react-redux';

import {loadPost} from '../../actions/allPostsActions';

class ContentSingle extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.loadPost(this.props.match.params.username, this.props.match.params.permlink);
	}

	render() {
		return <div className={['uk-container', 'uk-margin-top'].join(' ')}>
			This is full content for the post.
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
