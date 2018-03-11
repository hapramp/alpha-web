import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import styles from './styles.scss';
import indexStyles from '../../index.scss';
import {resetClicked, toggleClicked} from "../../actions/addContentActions";

class AddContentButton extends React.Component {
	componentWillUnmount() {
		this.props.resetClicked();
	}

	render() {
		let rotation = this.props.isClicked ? 'rotate(135deg)' : '';
		return <div className={['uk-align-right', 'uk-margin-right', 'uk-margin-bottom', 'uk-text-center',
			styles.addContent].join(' ')}>
			{this.props.isClicked &&
			<div className={[indexStyles.transition].join(' ')}>
				<div className={['uk-margin-bottom', styles.contentType].join(' ')}>
					<Link to={'/create/article'}>Article</Link></div>
				<div className={['uk-margin-bottom', styles.contentType].join(' ')}>
					<Link to={'/create/post'}>Post</Link></div>
			</div>}

			<span uk-icon="icon: plus" style={{transform: rotation}} className={[styles.addButton,
				indexStyles.transition].join(' ')} onClick={this.props.toggleClicked}/>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		isClicked: state.addContent.isClicked
	}
};

export default withRouter(connect(mapStateToProps, {
	toggleClicked, resetClicked
})(AddContentButton))
