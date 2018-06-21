import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import PostData from '../postData';
import styles from './styles.scss';
import indexStyles from '../../index.scss';
import { ratePost } from '../../actions/allPostsActions';
import PostUserMeta from '../postUserMeta';
import { getCommunitiesForPost } from '../../utils/communityUtils';
import { fixUser } from '../../utils/defaultFixUtils';
import ActionBar from '../actionBar';

const Post = (props) => {
  if (!props.post) {
    return <div>Loading...</div>;
  }

  const { content } = props.post.json_metadata;

  /* Author details */
  const user = props.postingUser;

  /* Render */
  return (
    <div className={['uk-margin-bottom', props.border ? styles.postContainerBorder : '', indexStyles.white].join(' ')}>
      {/* Top section */}
      <PostUserMeta
        profile={{
          name: user.json_metadata.profile.name,
          image: user.json_metadata.profile.profile_image,
          username: user.name,
        }}
        created={props.post.created}
        communities={getCommunitiesForPost(props.post)}
      />
      {/* Actual post */}
      <div className={[styles.postSection, content.type === 'article' ? styles.articleView : ''].join(' ')}>
        {content && content.data.map((data, idx) =>
          <PostData applyTopMargin={idx !== 0} key={`${data.type}/${data.content}`} data={data} />)}
      </div>
      {content.type === 'article' &&
        <div className={['uk-text-center', styles.articleReadMore, indexStyles.pointer].join(' ')}>
          <Link
            to={`/@${props.post.author}/${props.post.permlink}`}
            className={[styles.readMoreText, indexStyles.transition].join(' ')}
          >READ MORE
          </Link>
        </div>}
      {/* Action bar */}
      <ActionBar post={props.post} withLink />
    </div>);
};

Post.propTypes = {
  post: PropTypes.shape().isRequired,
  postingUser: PropTypes.shape().isRequired,
  border: PropTypes.bool,
};

Post.defaultProps = {
  border: false,
};

const mapStateToProps = (state, ownProps) => {
  const post = state.allPosts.posts[ownProps.postPermlink];
  const postingUsername = post.author;
  return {
    post,
    postingUser: fixUser(state.allUsers.users[postingUsername], postingUsername),
  };
};

export default withRouter(connect(mapStateToProps, { ratePost })(Post));
