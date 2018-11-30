import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getImagesFromBody } from '../../utils';
import ShortText from './ShortText';
import styles from './styles.scss';
import { removeFooter } from '../../PostBody';

const PostCardBody = ({ post, maintainAspectRatio }) => {
  let jsonMetadata;
  try {
    if (typeof post.json_metadata === 'string') {
      jsonMetadata = JSON.parse(post.json_metadata);
    } else {
      jsonMetadata = post.json_metadata;
    }
  } catch (e) {
    jsonMetadata = {};
  }

  let image = _.get(jsonMetadata, 'image[0]', '');

  if (!image.length) {
    image = _.get(getImagesFromBody(post.body), '[0]', '');
  }

  return (
    <div>
      <Link to={`/@${post.author}/${post.permlink}`}>
        {image && (
          maintainAspectRatio ? (
            <div
              style={{ backgroundImage: `url("${image}")`, width: '100%' }}
              className={styles.cardImage}
            />
          ) : (
            <img
              src={image}
              style={{ width: '100%' }}
              alt=""
            />
          )
        )}
        {post.title && <div className={styles.title}>{post.title}</div>}
        <ShortText className={styles.bodyText} body={removeFooter(post.body)} />
      </Link>
    </div>
  );
};

PostCardBody.propTypes = {
  post: PropTypes.shape(),
  maintainAspectRatio: PropTypes.bool,
};

PostCardBody.defaultProps = {
  post: {},
  maintainAspectRatio: false,
};

export default PostCardBody;
