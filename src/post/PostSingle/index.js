import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fixUser } from '../../utils/defaultFixUtils';
import indexStyles from '../../styles/globals.scss';
import CustomTags from '../CustomTags';
import ActionBar from '../ActionBar';
import Replies from '../Replies/RootReplies';
import PostUserMeta from '../PostUserMeta';
import { getCommunitiesForPost } from '../../utils/communityUtils';
import PostBody from '../PostBody';
import styles from './styles.scss';

class PostSingle extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { body, author, permlink } = this.props.post;
    return (
      <div className={['uk-margin-bottom', styles.postSingleContainer].join(' ')}>
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
