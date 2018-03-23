import React from 'react';

class PostData extends React.Component {
	render() {
		switch (this.props.data.type) {
			case 'text':
				return <div className={['uk-margin-top', 'uk-margin-medium-left', 'uk-margin-medium-right'].join(' ')}>{this.props.data.content}</div>;
			case 'image':
				return <div className={['uk-margin-top'].join(' ')}>
					<img src={this.props.data.content} alt={""}/>
				</div>;
			default:
				return <div className={['uk-margin-top', 'uk-margin-medium-left', 'uk-margin-medium-right'].join(' ')}>??</div>;
		}
	}
}

export default PostData;
