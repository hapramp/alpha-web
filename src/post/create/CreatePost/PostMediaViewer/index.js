import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import { removeMedia } from '../actions';

const PostMediaViewer = (props) => {
  if (!props.media) {
    return <span />;
  }

  switch (props.media.type) {
    case 'image':
      return (
        <div className={`${props.className} uk-margin-bottom`} style={props.style}>
          <div className="uk-inline">
            <img
              className={styles.mediaViewer}
              src={window.URL.createObjectURL(props.media.content)}
              alt="Media"
              id="media-image"
              width="240px"
            />
            <div
              className={`uk-overlay-default uk-position-top-right ${styles.topOverlay}`}
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
        <div className={`${props.className} uk-cover-container uk-medium-height`} style={props.style}>
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
        </div>
      );
  }
};

PostMediaViewer.propTypes = {
  removeMedia: PropTypes.func,
  media: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.object,
  }),
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

PostMediaViewer.defaultProps = {
  removeMedia: () => {},
  media: null,
  className: '',
  style: {},
};

const mapStateToProps = state => ({
  media: state.createPost.media,
});

export default connect(mapStateToProps, { removeMedia })(PostMediaViewer);
