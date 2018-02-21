import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import styles from './styles.scss';

class CreatePost extends React.Component {

	getUserSection() {
		return <div className={['uk-flex', 'uk-flex-between'].join(' ')}>
			<div>
				<img src={localStorage.getItem('avatar')} className={['uk-border-circle', styles.userAvatar].join(' ')} alt={'You'}/>
				<span>{this.props.userFullName}</span>
			</div>
			<div>
				Publish button
			</div>
		</div>
	}

	render() {
		return <div className={['uk-flex', 'uk-flex-center'].join(' ')}>
			<div className={styles.createPostModal}>
				{this.getUserSection()}
			</div>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		userFullName: state.authUser.name
	}
};

export default withRouter(connect(mapStateToProps)(CreatePost));
