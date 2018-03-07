import React from 'react';

class PostData extends React.Component {
	render() {
		switch (this.props.data.type) {
			case 'text':
				return <div>{this.props.data.content}</div>;
			case 'image':
				return <div><img src={this.props.data.content}/></div>;
			default:
				return <div>??</div>;
		}
	}
}

export default PostData;
