import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import AddContentButton from '../addContentButton';

class Feed extends React.Component {
	render() {
		return <div uk-grid="true" className={['uk-margin-left', 'uk-margin-right'].join(' ')}>
			<div className={'uk-width-1-6'}>
				Categories
			</div>
			<div className={'uk-width-2-3'}>
				<div>This is the feed.</div>
				<AddContentButton />
			</div>
			<div className={'uk-width-1-6'}>
				Tags
			</div>
		</div>
	}
}

export default withRouter(connect()(Feed));
