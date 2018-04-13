import React from 'react';
import LazyLoad from 'react-lazyload';

import styles from './styles.scss';

class PostData extends React.Component {
	constructor(props) {
		super(props);
		this.resizeDiv = this.resizeDiv.bind(this);
		this.state = {paddingTop: null};
	}

	resizeDiv(event) {
		let aspectRatio = (event.target.height / event.target.width) * 100 + '%';
		this.setState({...this.state, paddingTop: aspectRatio});
	}

	render() {
		switch (this.props.data.type) {
			case 'text':
				return <div className={[this.props.applyTopMargin ? 'uk-margin-top' : '', 'uk-margin-medium-left', 'uk-margin-medium-right'].join(' ')}>{this.props.data.content}</div>;
			case 'image':
				!this.props.data.height && (this.props.data.height = 9);
				!this.props.data.width && (this.props.data.width = 16);
				let aspectRatio = (this.props.data.height / this.props.data.width) * 100 + '%';
				let paddingTop = this.state.paddingTop ? this.state.paddingTop : aspectRatio;
				return <LazyLoad height={100}>
					<div className={[this.props.applyTopMargin ? 'uk-margin-top' : '', styles.imageDiv].join(' ')} style={{paddingTop}}>
						<img src={this.props.data.content} alt={""} onLoad={this.resizeDiv} style={{margin: 'auto'}}/>
					</div>
				</LazyLoad>;
			default:
				return <div className={[this.props.applyTopMargin ? 'uk-margin-top' : '', 'uk-margin-medium-left', 'uk-margin-medium-right'].join(' ')}>??</div>;
		}
	}
}

export default PostData;
