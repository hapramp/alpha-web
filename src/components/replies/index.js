import React from 'react';
import {connect} from 'react-redux';

import {loadReplies} from '../../actions/repliesActions';
import Reply from '../reply';
import styles from './styles.scss';

class Replies extends React.Component {
	constructor(props) {
		super(props);
		this.props.loadReplies(this.props.parentAuthor, this.props.parentPermlink);
	}

	render() {
		if (!this.props.replies) {
			return <div>
				Loading...
			</div>
		}
		return <div className={['uk-margin-large-top'].join(' ')}>
			{this.props.replies.loading && <div className={['uk-text-center', styles.status].join(' ')}>Loading...</div>}
			{Object.values(this.props.replies.replies).map(reply => <Reply reply={reply} key={reply.id}/>)}
			{!this.props.replies.loading && !Object.keys(this.props.replies.replies).length && <div className={['uk-text-center', styles.status].join(' ')}>No replies</div>}
		</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	let key = `${ownProps.parentAuthor}/${ownProps.parentPermlink}`;
	let replies = state.replies[key];
	return {replies};
};

export default connect(mapStateToProps, {
	loadReplies
})(Replies);
