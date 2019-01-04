import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import embedjs from 'embedjs';

import { getImagesFromBody, removeFooter } from '../../utils';
import ShortText from './ShortText';
import Image from '../../../components/Image';
import styles from './styles.scss';

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

  if ( // Image is null for some rare cases - prevent crash
    !image || !image.length
  ) {
    image = _.get(getImagesFromBody(post.body), '[0]', '');
  }

  // If video, show it
  const embeds = embedjs.getAll(post.body);
  if (_.has(embeds, '[0].thumbnail')) {
    image = embeds[0].thumbnail;
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
            <Image
              src={image}
              steemitImagesConfig={{ enabled: true }}
              lazyLoadProps={{ offset: 800, height: 300 }}
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
