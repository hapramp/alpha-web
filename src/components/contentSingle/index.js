import React from 'react';
import {connect} from 'react-redux';

class ContentSingle extends React.Component {
	render() {
		return <div>
			This is full content for the post.
		</div>
	}
}

export default connect()(ContentSingle);
