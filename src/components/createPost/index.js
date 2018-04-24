import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import twitter from 'twitter-text';
import * as firebase from 'firebase';
import _ from 'lodash';

import styles from './styles.scss';
import indexStyles from '../../index.scss';
import {
	changeCommunity, changeMedia, clearError, createPost, setHashtags,
	postCreateError, removeMedia, resetPostCreate,
} from "../../actions/createPostActions";
import PostMediaUpload from '../postMediaUpload';

class CreatePost extends React.Component {

	componentWillUnmount() {
		this.props.clearError();
	}

	handlePostCreate() {
		// Clear error messages
		this.props.clearError();

		// Content
		let content = document.getElementById('post-create-text').value;
		// TODO: Validation?

		// Community
		let community = this.props.activeCommunity;
		if (!community.length) {
			this.props.postCreateError({element: 'community', 'message': 'Please select at least one community'});
			return;
		}

		community = this.props.communities.filter(i => _.some(community, j => j === i.id)).map(i => i.tag);

		let post;

		if (this.props.media) {
			if (this.props.media.type === 'image') {
				let imageElement = document.getElementById('media-image');
				let uploadTask = window.firebaseStorage.ref().child('images/' + new Date().toISOString() + this.props.media.content.name)
					.put(this.props.media.content);

				let onUploadProgress = snapshot => {
					console.log('Progress - ', snapshot)
					// TODO: Show an indicator
				};
				let onUploadError = error => {
					console.log(error)
					// TODO: Show some error
				};
				let onUploadComplete = () => {
					let downloadURL = uploadTask.snapshot.downloadURL;
					console.log('Image uploaded', downloadURL);
					post = {
						type: 'post', data: [
							{type: 'image', content: downloadURL, height: imageElement.height, width: imageElement.width},
							{type: 'text', content},
						]
					};
					this.props.createPost({post, tags: this.props.hashtags, community});
				};
				uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, onUploadProgress, onUploadError, onUploadComplete);
			} else if (this.props.media.type === 'youtube') {
				post = {
					type: 'post', data: [
						{type: 'youtube', content: this.props.media.content},
						{type: 'text', content}
					]
				}
				this.props.createPost({post, tags: this.props.hashtags, community});
			}
		} else {
			post = {
				type: 'post',
				data: [
					{type: 'text', content}
				]
			};
			this.props.createPost({post, tags: this.props.hashtags, community});
		}
	}

	parseHashTags() {
		let content = document.getElementById('post-create-text').value;
		let hashtags = twitter.extractHashtags(content);
		if (hashtags.length > 0) {
			this.props.setHashtags(hashtags);
		}
	}

	getUserSection() {
		return <div className={['uk-flex', 'uk-flex-between', 'uk-margin-bottom'].join(' ')}>
			<div>
				{this.props.userAvatar ?
					<img src={this.props.userAvatar} className={['uk-border-circle', styles.userAvatar].join(' ')}
							 alt={'You'}/> : <span uk-icon="icon: user"/>}
				<span className={['uk-margin-left'].join(' ')} style={{opacity: 0.87}}>{this.props.userFullName}</span>
			</div>
			<div className={['uk-flex', 'uk-flex-column', 'uk-flex-center', 'uk-link'].join(' ')}>
				{!this.props.creating && <span className={[styles.publishButton, indexStyles.hoverEffect, indexStyles.transition].join(' ')}
							onClick={this.handlePostCreate.bind(this)}>
					Publish
				</span>}
			</div>
		</div>
	}

	getTextView() {
		return <div className={['uk-margin-top'].join(' ')}>
			<textarea autoComplete={'false'} rows={5} placeholder={'Share photos, videos, music or anything you like...'}
								className={['uk-textarea', styles.textArea].join(' ')} id={'post-create-text'}
								onChange={this.parseHashTags.bind(this)}>
			</textarea>
		</div>
	}

	getCommunitySelector() {
		return <div className={['uk-margin-top'].join(' ')}>
			<div className={['uk-margin-bottom', styles.communityHeading].join(' ')}>Select Communities (max 3)</div>
			<div uk-grid="true" className={'uk-margin-remove'}>
				{this.props.communities.map(community =>
					<div key={community.id} onClick={() => this.props.changeCommunity(community.id)}
							 className={[styles.communitySingle,
								 _.some(this.props.activeCommunity, i => i === community.id) ? styles.active : ''].join(' ')}>{community.name}</div>)}
			</div>
		</div>
	}

	showHashtags() {
		return <div uk-grid="true" className={['uk-margin-remove'].join(' ')}>
			{this.props.hashtags.length ?
				this.props.hashtags.map(i => <span key={i}
																					 className={['uk-margin-remove', styles.communitySingle].join(' ')}>#{i}</span>) :
				<span className={[styles.hashtagInfo].join(' ')}>Your tags will appear here.</span>}
		</div>
	}

	getErrors() {
		return <div className={['uk-margin-top', styles.errorContainer].join(' ')}>
			{this.props.errors.map((err, idx) => <div key={idx} className={['uk-alert', 'uk-alert-danger'].join(' ')}>
				{(typeof err.message === 'string') ? err.message : 'An error occurred, check console!'}
			</div>)}
		</div>
	}

	render() {

		// The post is created, go to the post
		if (this.props.postCreated) {
			this.props.resetPostCreate();
			return <Redirect to={'/@' + this.props.fullPermlink}/>;
		}

		return <div className={['uk-flex', 'uk-flex-center'].join(' ')}>
			<div className={styles.createPostModal}>
				{this.getUserSection()}
				<div className={indexStyles.separator}/>
				{this.getTextView()}
				{this.showHashtags()}
				<div className={['uk-margin-top', indexStyles.separator].join(' ')}/>
				{this.getCommunitySelector()}
				<div className={['uk-margin-top', indexStyles.separator].join(' ')}/>
				<PostMediaUpload/>
				{this.getErrors()}
			</div>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		userFullName: state.authUser.name,
		userAvatar: state.authUser.avatar,
		communities: state.communities.communities,
		activeCommunity: state.createPost.community,
		media: state.createPost.media,
		hashtags: state.createPost.hashtags,
		postCreated: state.createPost.created,
		fullPermlink: state.createPost.fullPermlink,
		postCreating: state.createPost.creating,
		errors: state.createPost.errors,
		creating: state.createPost.creating,
	}
};

export default withRouter(connect(mapStateToProps, {
	changeCommunity, changeMedia, removeMedia,
	postCreateError, clearError, setHashtags,
	createPost, resetPostCreate
})(CreatePost));
