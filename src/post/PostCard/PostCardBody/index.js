import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getImagesFromBody } from '../../utils';
import ShortText from './ShortText';
import styles from './styles.scss';

const PostCardBody = ({ post }) => {
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
        {image && <img src={image} style={{ width: '100%' }} alt="Post Cover" />}
        {post.title && <div className={styles.title}>{post.title}</div>}
        <ShortText body={post.body} />
      </Link>
    </div>
  );
};

PostCardBody.propTypes = {
  post: PropTypes.shape(),
};

PostCardBody.defaultProps = {
  post: {},
};

export default PostCardBody;
