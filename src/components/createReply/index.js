import React from 'react';
import {connect} from 'react-redux';

import styles from './styles.scss';
import indexStyles from '../../index.scss';
import {addReply} from '../../actions/repliesActions';

class CreateReply extends React.Component {
	constructor(props) {
		super(props);
		this.replyInput = null;
		this.postReply = this.postReply.bind(this);
		this.setInputRef = element => {this.replyInput = element};
		this.replyInput = null;
	}

	postReply() {
		if (!this.replyInput) {
			return;
		}
		let body = this.replyInput.value;
		body = body.trim();
		if (!body.length) {
			return;
		}
		this.props.addReply(this.props.post.author, this.props.post.permlink, body)
			.then(() => this.replyInput.value = '')
			.catch(() => {/* Some error, already shown */})
	}

	render() {
		return <div className={['uk-flex', 'uk-margin-right', 'uk-margin-top'].join(' ')}>
			<img className={['uk-border-circle', styles.postingUserImage].join(' ')} alt={localStorage.getItem('username')} src={localStorage.getItem('avatar')}/>
			<span className={[styles.commentInputContainer].join(' ')}>
				<input ref={this.setInputRef} className={[styles.commentInput].join(' ')}/>
				<i className={['far', 'fa-paper-plane', indexStyles.pointer, styles.sendIcon].join(' ')} onClick={this.postReply}></i>
			</span>
		</div>
	}
}

export default connect(null, {addReply})(CreateReply);
