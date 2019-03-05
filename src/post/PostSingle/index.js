import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

import { fixUser } from '../../utils/defaultFixUtils';
import indexStyles from '../../styles/globals.scss';
import CustomTags from '../CustomTags';
import ActionBar from '../ActionBar';
import PostUserMeta from '../PostUserMeta';
import { getCommunitiesForPost } from '../../utils/communityUtils';
import PostBody from '../PostBody';
import styles from './styles.scss';
import Loader from '../../helpers';
import PostMetaTags from './PostMetaTags';

const Replies = Loadable({
  loader: () => import('../Replies/RootReplies'),
  loading: Loader,
});

class PostSingle extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { body, author, permlink } = this.props.post;
    return (
      <div className={['uk-margin-bottom', styles.postSingleContainer].join(' ')}>
        <PostMetaTags post={this.props.post} postingUser={this.props.postingUser} />
        <div
          className={[indexStyles.white].join(' ')}
        >
          <PostUserMeta
            profile={{
              name: this.props.postingUser.json_metadata.profile.name,
              image: this.props.postingUser.json_metadata.profile.profile_image,
              username: this.props.post.author,
            }}
            created={this.props.post.created}
            communities={getCommunitiesForPost(this.props.post)}
            className={['uk-padding'].join(' ')}
          />
          <div className={styles.postTitle}>
            {this.props.post.title}
          </div>
          <PostBody
            body={body}
            author={author}
            permlink={permlink}
          />
          <CustomTags
            tags={this.props.post.json_metadata.tags}
            className={[styles.cutomTag].join(' ')}
          />
          <ActionBar post={this.props.post} withLink={false} />
          <div>
            <Replies
              permlinks={this.props.post.replies}
              rootPost={this.props.post}
            />
          </div>
        </div>
      </div>);
  }
}

PostSingle.propTypes = {
  postingUser: PropTypes.shape({
    json_metadata: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
        profile_image: PropTypes.string,
      }),
    }),
  }),
  post: PropTypes.shape({
    author: PropTypes.string,
    created: PropTypes.string,
    title: PropTypes.string,
    json_metadata: PropTypes.shape({
      content: PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.shape()),
      }),
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
    permlink: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    replies: PropTypes.arrayOf(PropTypes.string),
  }),
};

PostSingle.defaultProps = {
  postingUser: {},
  post: {},
};

const mapStateToProps = (state, ownProps) => {
  const post = state.allPosts.posts[ownProps.postPermlink];
  const postingUsername = post.author;
  const postingUser = fixUser(state.allUsers.users[postingUsername], postingUsername);
  return {
    post: state.allPosts.posts[ownProps.postPermlink],
    postingUser,
  };
};

export default connect(mapStateToProps)(PostSingle);
