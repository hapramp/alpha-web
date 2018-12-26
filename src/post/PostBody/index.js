import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { ownUrl } from '../../utils/constants';
import styles from './styles.scss';
import { getCompleteHTML } from '../utils';

const PostBody = ({
  className, body, author, permlink, minify, history, ...props
}) => {
  const renderedBody = getCompleteHTML(body);
  /**
   * Use react router instead of browser's router for
   * links which lead inside the app
   */
  useEffect(() => {
    const element = document.getElementById('post-body');
    let validAnchors = [];
    if (element) {
      validAnchors = [...element.querySelectorAll('a')].filter((anchor) => {
        const url = new URL(anchor.href);
        url.hostname = url.hostname || 'localhost';
        return url.hostname.match(ownUrl);
      });
    }
    validAnchors.forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        const anchorURL = new URL(anchor.href);
        event.preventDefault();
        history.push(anchorURL.pathname);
      });
    });
    return () => {
      validAnchors.forEach(anchor => anchor.removeEventListener('click', (event) => {
        const anchorURL = new URL(anchor.href);
        event.preventDefault();
        history.push(anchorURL.pathname);
      }));
    };
  });
  return (
    <div className={`${className} ${styles.container}`} {...props}>
      <div
        id="post-body"
        className={`${minify ? styles.minify : ''} ${styles.bodyContainer}`}
        dangerouslySetInnerHTML={{ __html: renderedBody }}
      />
      {
        minify
        && (
          <div className={['uk-text-center', styles.articleReadMore].join(' ')}>
            <Link
              to={`/@${author}/${permlink}`}
              className={[styles.readMoreText].join(' ')}
            >
              READ MORE
            </Link>
          </div>
        )
      }
    </div>
  );
};

PostBody.propTypes = {
  className: PropTypes.string,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  permlink: PropTypes.string.isRequired,
  minify: PropTypes.bool,
  history: PropTypes.shape().isRequired,
};

PostBody.defaultProps = {
  className: '',
  minify: false,
};

export default withRouter(PostBody);
