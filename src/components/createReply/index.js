import React from 'react';

import styles from './styles.scss';
import indexStyles from '../../index.scss';

class CreateReply extends React.Component {
	render() {
		return <div className={['uk-flex', 'uk-margin-right', 'uk-margin-top'].join(' ')}>
			<img className={['uk-border-circle', styles.postingUserImage].join(' ')} alt={localStorage.getItem('username')} src={localStorage.getItem('avatar')}/>
			<span className={[styles.commentInputContainer].join(' ')}>
				<input className={[styles.commentInput].join(' ')}/>
				<i className={['far', 'fa-paper-plane', indexStyles.pointer, styles.sendIcon].join(' ')}></i>
			</span>
		</div>
	}
}

export default CreateReply;
