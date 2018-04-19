import React from 'react';
import LazyLoad from 'react-lazyload';

import styles from './styles.scss';
import indexStyles from '../../index.scss';

let horizontalMarginClasses = ['uk-margin-medium-left', 'uk-margin-medium-right'].join(' ');

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

	getActualData() {
		switch (this.props.data.type) {
			case 'text':
				return <div className={[horizontalMarginClasses, styles.text].join(' ')}>{this.props.data.content}</div>;

				case 'image':
				!this.props.data.height && (this.props.data.height = 9);
				!this.props.data.width && (this.props.data.width = 16);
				let aspectRatio = (this.props.data.height / this.props.data.width) * 100 + '%';
				let paddingTop = this.state.paddingTop ? this.state.paddingTop : aspectRatio;
				return <LazyLoad height={100}>
					<div className={[styles.imageDiv].join(' ')} style={{paddingTop}}>
						<img src={this.props.data.content} alt={""} onLoad={this.resizeDiv} style={{margin: 'auto'}}/>
					</div>
				</LazyLoad>;

			case 'h1':
			case 'H1':
			case 'heading':
				return <h1 className={[horizontalMarginClasses, indexStyles.primaryText, indexStyles.h1].join(' ')}>
					{this.props.data.content}
					</h1>

			case 'h2':
			case 'H2':
			case 'sub-heading':
				return <h2 className={[horizontalMarginClasses, indexStyles.primaryText, indexStyles.h2].join(' ')}>
					{this.props.data.content}
				</h2>

			case 'youtube':
			case 'YOUTUBE':
			case 'YouTube':
				return <div className={['uk-cover-container', 'uk-medium-height'].join(' ')}>
						<iframe title={this.props.data.content} src={`https://www.youtube.com/embed/${this.props.data.content}?rel=0&amp`}
						  width="100%" height="315" frameBorder="0" allowFullScreen>
						</iframe>
					</div>

			case 'ol':
			case 'OL':
				if (typeof(this.props.data.content) === 'string') {
					this.props.data.content = this.props.data.content.split(' ');
				}
				return <ol className={[horizontalMarginClasses].join(' ')}>
					{this.props.data.content.map((i, idx) => <li key={idx}>{i}</li>)}
				</ol>

			case 'ul':
			case 'UL':
			if (typeof(this.props.data.content) === 'string') {
				this.props.data.content = this.props.data.content.split(' ');
			}
			return <ul className={[horizontalMarginClasses].join(' ')}>
				{this.props.data.content.map((i, idx) => <li key={idx}>{i}</li>)}
			</ul>

			default:
				return <h2 className={['uk-margin-medium-left', 'uk-margin-medium-right'].join(' ')}>??</h2>;
		}
	}

	render() {
		return <div className={[this.props.className, this.props.applyTopMargin ? 'uk-margin-top' : ''].join(' ')}>
			{this.getActualData()}
		</div>
	}
}

export default PostData;
