import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import styles from './styles.scss';
import indexStyles from '../../index.scss';
import {toggleClicked} from "../../actions/addContentActions";

class AddContentButton extends React.Component {
	render() {
		return <div className={['uk-align-right', 'uk-margin-right', 'uk-margin-bottom', 'uk-text-center',
			styles.addContent].join(' ')}>

			{this.props.isClicked &&
			<div className={[indexStyles.transition].join(' ')}>
				<div className={['uk-margin-bottom', styles.contentType].join(' ')}>Article</div>
				<div className={['uk-margin-bottom', styles.contentType].join(' ')}>Post</div>
			</div>}

			<span uk-icon="icon: plus" className={[styles.addButton, indexStyles.hoverEffect,
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
	toggleClicked
})(AddContentButton))
