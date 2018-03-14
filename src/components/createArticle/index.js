import React from 'react';
import {connect} from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';  // To convert to HTML

import styles from './styles.scss';
import createPostStyles from '../createPost/styles.scss';
import userProfilePlaceholder from '../userProfile/user-placeholder.jpg';
import indexStyles from '../../index.scss';
import {setTitle, setContent} from "../../actions/createArticleActions";

/*
TODO:
 - Implement draft saving
 */

class CreateArticle extends React.Component {
	handleContentChange(content) {
		this.props.setContent(content);
	}

	handleTitleChange(e) {
		this.props.setTitle(e.target.value);
	}

	getUserSection() {
		/* User details */
		let name, image;
		name = this.props.authUser.name ? this.props.authUser.name : this.props.authUser.username;
		image = this.props.authUser.avatar;
		image = userProfilePlaceholder;

		return <div className={['uk-flex', 'uk-flex-center', 'uk-margin', styles.userSection].join(' ')}>
			<div className={['uk-margin-right'].join(' ')}>{ image ?
				<img src={image} alt={""} className={['uk-border-circle', createPostStyles.userAvatar].join(' ')}/> :
				<span uk-icon="icon: user"/>
			}</div>
			<div className={['uk-align-center'].join(' ')}>{name}</div>
		</div>
	}

	getContinueSection() {
		return <div className={['uk-flex'].join(' ')}>
			<div className={['uk-flex', 'uk-flex-column', 'uk-flex-center', 'uk-link'].join(' ')}>
				<span className={[createPostStyles.publishButton, indexStyles.hoverEffect, indexStyles.transition].join(' ')}>
					CONTINUE
				</span>
			</div>
		</div>
	}

	getTopSection() {
		return <div className={['uk-flex', 'uk-flex-between', 'uk-margin-bottom', styles.topSection].join(' ')}>
			{this.getUserSection()}
			{this.getContinueSection()}
		</div>
	}

	getEditorSection() {
		return <div>
			<input placeholder={'Title'} className={['uk-input', 'uk-form-large', styles.titleInput].join(' ')}
						 type={'text'} onChange={this.handleTitleChange.bind(this)} value={this.props.createArticle.title}/>
			<div className={['uk-margin-large-top'].join(' ')}>
				<Editor placeholder={'Write your story here...'}
								onChange={this.handleContentChange.bind(this)}/>
			</div>
		</div>

	}

	render() {
		return <div className={['uk-container', 'uk-margin-large-top'].join(' ')}>
			<div className={['uk-padding', indexStyles.white].join(' ')}>
				{this.getTopSection()}
				{this.getEditorSection()}
			</div>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		authUser: state.authUser,
		createArticle: state.createArticle,
	}
};

export default connect(mapStateToProps, {
	setTitle, setContent
})(CreateArticle);
