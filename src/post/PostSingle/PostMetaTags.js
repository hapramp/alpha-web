import React from 'react';
import Helmet from 'react-helmet-async';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import { getBodyTextOnly, getImagesFromBody } from '../utils';

const PostMetaTags = ({ post, postingUser }) => {
  const {
    title, body, author, permlink,
    created,
  } = post;

  const lastUpdate = post.last_update;
  const bodyText = getBodyTextOnly(body);
  const titleTagContent = title.length ? title : bodyText;

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

  let image = get(jsonMetadata, 'image[0]', '');

  if ( // Image is null for some rare cases - prevent crash
    !image || !image.length
  ) {
    image = get(getImagesFromBody(body), '[0]', '');
  }

  const twitterHandle = get(postingUser, 'json_metadata.profile.twitter', false);
  const tags = get(jsonMetadata, 'tags', []);

  return (
    <Helmet>
      <title>{titleTagContent} - @{author} | 1Ramp</title>
      <meta name="title" content={titleTagContent} />
      <meta name="description" content={bodyText} />
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={titleTagContent} />
      <meta name="twitter:description" content={bodyText} />
      {twitterHandle && <meta name="twitter:creator" content={`@${twitterHandle}`} />}
      {image && <meta name="twitter:img:src" content={image} />}
      <meta name="og:title" content={titleTagContent} />
      <meta name="og:type" content="article" />
      <meta name="og:url" content={`https://alpha.1ramp.io/@${author}/${permlink}`} />
      {image && <meta name="og:image" content={image} />}
      <meta name="og:description" content={bodyText} />
      <meta name="article:published_time" content={created} />
      <meta name="article:modified_time" content={lastUpdate} />
      <meta name="article:tag" content={tags.join(',')} />
    </Helmet>
  );
};

PostMetaTags.propTypes = {
  post: PropTypes.shape().isRequired,
  postingUser: PropTypes.shape().isRequired,
};

export default PostMetaTags;
