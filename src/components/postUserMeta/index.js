import React from 'react';
import TimeAgo from 'react-time-ago';

import styles from './styles.scss';

class PostUserMeta extends React.Component {
	render() {
		return <div className={['uk-flex', styles.paddingModerate, styles.topSection].join(' ')}>
			<img src={this.props.profile.image} className={['uk-border-circle', styles.userImage].join(' ')} alt={""}/>
			<div className={['uk-margin-left'].join(' ')}>
				<div className={[styles.userNameContainer].join(' ')}>
					<span className={styles.userName}>{this.props.profile.name}</span> | <TimeAgo>{new Date(this.props.created + 'Z')}</TimeAgo>
				</div>
				<div>
					{this.props.communities.map((community, idx) => <span key={idx} style={{backgroundColor: community.color}} className={[styles.communityLabel].join(' ')}>{community.name}</span>)}
				</div>
			</div>
		</div>
	}
}

export default PostUserMeta;
