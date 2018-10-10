import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import { oldAndroidFooter, bodyFooterSeparator } from '../constants';

const remarkable = new Remarkable({
  html: true,
  breaks: true,
  linkify: true,
  typographer: false,
  quotes: '“”‘’',
});

export const removeFooter = (body) => {
  const newBody = body.replace(oldAndroidFooter, ''); // Remove old footer if there
  return newBody.split(bodyFooterSeparator)[0];
};

const PostBody = ({
  className, body, author, permlink, minify, ...props
}) => (
  <div className={`${className} ${styles.container}`} {...props}>
    <div
      className={`${minify ? styles.minify : ''} ${styles.bodyContainer}`}
      dangerouslySetInnerHTML={{ __html: remarkable.render(removeFooter(body)) }}
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

PostBody.propTypes = {
  className: PropTypes.string,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  permlink: PropTypes.string.isRequired,
  minify: PropTypes.bool,
};

PostBody.defaultProps = {
  className: '',
  minify: false,
};

export default PostBody;
