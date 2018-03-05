import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import twitter from 'twitter-text';

import styles from './styles.scss';
import indexStyles from '../../index.scss';
import {changeCommunity, changeMedia, removeMedia, postCreateError,
	clearError, setHashtags, createPost, resetPostCreate} from "../../actions/createPostActions";

class CreatePost extends React.Component {

	handleUploadImageClick() {
		let input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.addEventListener('change', e => {
			// Send the details to action
			let file;
			if (input.files.length > 0) {
				file = input.files[0];
			}
			this.props.changeMedia(file);
		});
		input.click();
	}

	handlePostCreate() {
		// Clear error messages
		this.props.clearError();

		// Content
		let content = document.getElementById('post-create-text').value;
		// TODO: Validation?

		// Community
		let community = this.props.activeCommunity;
		if (!community) {
			this.props.postCreateError({element: 'community', 'message': 'Please select a community'});
			return;
		}

		// Structure to build response
		let post = {
			type: 'post',
			data: [
				{
					type: 'text',
					content
				}
			]
		};

		// Create
		this.props.createPost({post, tags: this.props.hashtags, community});
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
							 alt={'You'}/> : <span uk-icon="icon: user" />}
				<span className={['uk-margin-left'].join(' ')} style={{opacity: 0.87}}>{this.props.userFullName}</span>
			</div>
			<div className={['uk-flex', 'uk-flex-column', 'uk-flex-center', 'uk-link'].join(' ')}>
				<span className={[styles.publishButton, indexStyles.hoverEffect, indexStyles.transition].join(' ')}
							onClick={this.handlePostCreate.bind(this)}>
					Publish
				</span>
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
			<div className={['uk-margin-bottom', styles.communityHeading].join(' ')}>Community</div>
			<div uk-grid="true" className={'uk-margin-remove'}>
				{this.props.communities.map(community =>
					<div key={community} onClick={() => this.props.changeCommunity(community)} className={[styles.communitySingle,
						this.props.activeCommunity === community ? styles.active : ''].join(' ')}>{community}</div>)}
			</div>
		</div>
	}

	getMediaUploader() {
		return <div className={['uk-margin-top', styles.mediaUpload].join(' ')}>
			<div uk-grid="true" className={'uk-margin-remove'}>
				<div className={[styles.upload].join(' ')} onClick={this.handleUploadImageClick.bind(this)}>
					<span className={[indexStyles.marginRightSmall].join(' ')}>
						<svg fill="#444" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
							<path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
							<path d="M0 0h24v24H0z" fill="none"/>
						</svg>
					</span>
					<span>Image</span>
				</div>
				<div className={[styles.upload].join(' ')}>
				<span className={[indexStyles.marginRightSmall].join(' ')}>
					<svg fill="#444" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 0h24v24H0z" fill="none"/>
						<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
					</svg>
				</span>
					<span>Music</span>
				</div>
				<div className={[styles.upload].join(' ')}>
				<span className={[indexStyles.marginRightSmall].join(' ')}>
					<svg fill="#444" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 0h24v24H0z" fill="none"/>
						<path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
					</svg>
				</span>
					<span>Video</span>
				</div>
			</div>
		</div>
	}

	getMediaViewer() {
		return <div className={['uk-flex', 'uk-flex-center'].join(' ')}>
			<div className={'uk-inline'}>
				<img className={[styles.mediaViewer].join(' ')} src={window.URL.createObjectURL(this.props.media)} alt={'Media'}/>
				<div className={['uk-overlay', 'uk-overlay-default', 'uk-position-top-right', styles.topOverlay].join(' ')}
						 onClick={this.props.removeMedia}>
					<p><span uk-icon="icon: close"/></p>
				</div>
			</div>
		</div>
	}

	showHashtags() {
		return <div uk-grid="true" className={['uk-margin-remove'].join(' ')}>
			{this.props.hashtags.length ?
				this.props.hashtags.map(i => <span key={i} className={['uk-margin-remove', styles.communitySingle].join(' ')}>#{i}</span>) :
				<span className={styles.hashtagInfo}>Your tags will appear here.</span>}
		</div>
	}

	getErrors() {
		return <div className={['uk-margin-top', styles.errorContainer].join(' ')}>
			{this.props.errors.map(err => <div className={['uk-alert', 'uk-alert-danger'].join(' ')}>
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
				{this.props.media && this.getMediaViewer()}
				{this.showHashtags()}
				<div className={['uk-margin-top', indexStyles.separator].join(' ')}/>
				{this.getCommunitySelector()}
				{this.getMediaUploader()}
				{this.getErrors()}
			</div>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		userFullName: state.authUser.name,
		userAvatar: state.authUser.avatar,
		communities: ['Art & Craft', 'Photography', 'Dance', 'Writing', 'Poetry', 'Music'],
		activeCommunity: state.createPost.community.active,
		media: state.createPost.media,
		hashtags: state.createPost.hashtags,
		postCreated: state.createPost.created,
		fullPermlink: state.createPost.fullPermlink,
		postCreating: state.createPost.creating,
		errors: state.createPost.errors,
	}
};

export default withRouter(connect(mapStateToProps, {
	changeCommunity, changeMedia, removeMedia,
	postCreateError, clearError, setHashtags,
	createPost, resetPostCreate
})(CreatePost));
