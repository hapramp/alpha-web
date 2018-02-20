import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import AddContentButton from '../addContentButton';

class Feed extends React.Component {
	render() {
		return <div>
			<div>This is the feed.</div>
			<AddContentButton />
		</div>
	}
}

export default withRouter(connect()(AddContentButton));
