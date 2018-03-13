import React from 'react';
import {connect} from 'react-redux';

class CreateArticle extends React.Component {
	render() {
		return <div>
			You can create article here.
		</div>
	}
}

export default connect()(CreateArticle);
