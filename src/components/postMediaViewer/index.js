import React from 'react';
import {connect} from 'react-redux';

import styles from './styles.scss';
import {removeMedia} from '../../actions/createPostActions';

class PostMediaViewer extends React.Component {
	render() {
		if (!this.props.media) {
			return <div className={[this.props.className, styles.noMediaText].join(' ')}>
				No media selected.
			</div>
		}

		switch (this.props.media.type) {
			case 'image':
				return <div className={[this.props.className, 'uk-flex', 'uk-flex-center', 'uk-margin-bottom'].join(' ')}>
					<div className={'uk-inline'}>
						<img className={[styles.mediaViewer].join(' ')} src={window.URL.createObjectURL(this.props.media.content)}
								alt={'Media'} id='media-image'/>
						<div className={['uk-overlay', 'uk-overlay-default', 'uk-position-top-right', styles.topOverlay].join(' ')}
								onClick={this.props.removeMedia}>
							<p><span uk-icon="icon: close"/></p>
						</div>
					</div>
				</div>

			case 'youtube':
				return <div className={[this.props.className, 'uk-cover-container', 'uk-medium-height'].join(' ')}>
					<iframe title={this.props.media.content} src={`https://www.youtube.com/embed/${this.props.media.content}?rel=0&amp`}
						width="100%" height="315" frameBorder="0" allowFullScreen></iframe>
				</div>

			default:
			return <div>
				Unknown media type.
			</div>
		}
	}
}

const mapStateToProps = state => {
	return {
		media: state.createPost.media,
	}
}

export default connect(mapStateToProps, {removeMedia})(PostMediaViewer);
