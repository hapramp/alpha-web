import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import styles from './styles.scss';

class AddContentButton extends React.Component {
	render() {
		return <div className={['uk-position-bottom', styles.addButton].join(' ')}>
			This will be at bottom
		</div>
	}
}

export default withRouter(connect()(AddContentButton))
