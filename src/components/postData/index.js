import React from 'react';

import styles from './styles.scss';

class PostData extends React.Component {
	render() {
		switch (this.props.data.type) {
			case 'text':
				return <div className={['uk-margin-top'].join(' ')}>{this.props.data.content}</div>;
			case 'image':
				return <div className={['uk-margin-top', styles.postImage].join(' ')}>
					<img src={this.props.data.content} alt={""}/>
				</div>;
			default:
				return <div className={['uk-margin-top'].join(' ')}>??</div>;
		}
	}
}

export default PostData;
