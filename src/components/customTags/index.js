import React from 'react';
import {connect} from 'react-redux';

import indexStyles from '../../index.scss';
import styles from './styles.scss';
import {getOtherTags} from '../../utils/communityUtils';

class CustomTags extends React.Component {
	render() {
		let otherTags = getOtherTags(this.props.post);
		return <div className={[this.props.className].join(' ')}>
			{otherTags.map(tag => <span className={['uk-margin-small-right', styles.tagText].join(' ')} key={tag}>
				<span className={indexStyles.secondaryText}>#</span>
				{tag}
			</span>)}
		</div>
	}
}

const mapStateToProps = state => {
	return {
		communities: state.communities
	}
}

export default connect(mapStateToProps)(CustomTags);
