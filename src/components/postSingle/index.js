import React from 'react';
import {connect} from 'react-redux';

import indexStyles from '../../index.scss';
import PostUserMeta from '../postUserMeta';
import {getCommunitiesForPost} from '../../utils/communityUtils';

class PostSingle extends React.Component {
	getLeftSection() {

		if (this.props.post.json_metadata.content.data[0].type === 'image') {
			return	<div className={['uk-width-1-1@s', 'uk-width-1-2@m', 'uk-width-1-2@l', 'uk-padding-remove'].join(' ')}>
				<img src={this.props.post.json_metadata.content.data[0].content} style={{margin: 'auto'}} alt=''/>
			</div>
		}
	}

	getRightSection() {
		let containsImage = this.props.post.json_metadata.content.data[0].type === 'image';
		let classes = ['uk-width-1-1@s', 'uk-width-2-3@m', 'uk-width-1-3@l'];
		containsImage && (classes = ['uk-width-1-1@s', 'uk-width-1-2@m', 'uk-width-1-2@l'])
		let data = containsImage ? this.props.post.json_metadata.content.data[1] : this.props.post.json_metadata.content.data[1]
		return <div className={classes.join(' ')}>
			<PostUserMeta profile={{name: 'Pratyush', image: ''}} created={this.props.post.created} communities={getCommunitiesForPost(this.props.post)}/>
			{data.content}
		</div>
	}

	render() {
		return <div uk-grid={'true'} className={[indexStyles.white].join(' ')}>
			{this.getLeftSection()}
			{this.getRightSection()}
		</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		post: state.allPosts.posts[ownProps.postPermlink]
	}
};

export default connect(mapStateToProps)(PostSingle);
