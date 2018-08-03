import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import { removeMedia } from '../actions';

const PostMediaViewer = (props) => {
  if (!props.media) {
    return (
      <div className={[props.className, styles.noMediaText].join(' ')}>
        No media selected.
      </div>);
  }

  switch (props.media.type) {
    case 'image':
      return (
        <div className={[props.className, 'uk-flex', 'uk-flex-center', 'uk-margin-bottom'].join(' ')}>
          <div className="uk-inline">
            <img
              className={[styles.mediaViewer].join(' ')}
              src={window.URL.createObjectURL(props.media.content)}
              alt="Media"
              id="media-image"
            />
            <div
              className={['uk-overlay', 'uk-overlay-default', 'uk-position-top-right', styles.topOverlay].join(' ')}
              onClick={props.removeMedia}
              role="button"
              tabIndex={-1}
              onKeyDown={props.removeMedia}
            >
              <p><span uk-icon="icon: close" /></p>
            </div>
          </div>
        </div>);

    case 'youtube':
      return (
        <div className={[props.className, 'uk-cover-container', 'uk-medium-height'].join(' ')}>
          <iframe
            title={props.media.content}
            src={`https://www.youtube.com/embed/${props.media.content}?rel=0&amp`}
            width="100%"
            height="315"
            frameBorder="0"
            allowFullScreen
          />
        </div>);

    default:
      return (
        <div>
          Unknown media type.
        </div>);
  }
};

PostMediaViewer.propTypes = {
  removeMedia: PropTypes.func,
  media: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.string,
  }),
  className: PropTypes.string,
};

PostMediaViewer.defaultProps = {
  removeMedia: () => {},
  media: null,
  className: '',
};

const mapStateToProps = state => ({
  media: state.createPost.media,
});

export default connect(mapStateToProps, { removeMedia })(PostMediaViewer);
