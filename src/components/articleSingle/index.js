import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fixUser } from '../../utils/defaultFixUtils';
import PostData from '../postData';
import indexStyles from '../../index.scss';
import CustomTags from '../customTags';
import ActionBar from '../actionBar';
import Replies from '../replies';
import PostUserMeta from '../postUserMeta';
import { getCommunitiesForPost } from '../../utils/communityUtils';

class ArticleSingle extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div uk-grid="true" className={['uk-margin-bottom'].join(' ')}>
        <div className={['uk-width-1-6@m', 'uk-text-center', 'uk-width-1-4@l'].join(' ')} />
        <div
          className={['uk-width-1-1@s', 'uk-width-2-3@m', 'uk-width-1-2@l',
            'uk-padding-remove', indexStyles.white].join(' ')}
        >
          <PostUserMeta
            profile={{
              name: this.props.postingUser.json_metadata.profile.name,
              image: this.props.postingUser.json_metadata.profile.profile_image,
              username: this.props.post.author,
            }}
            created={this.props.post.created}
            communities={getCommunitiesForPost(this.props.post)}
            className={['uk-padding', 'uk-margin-large-bottom'].join(' ')}
          />
          <div>
            {this.props.post.json_metadata.content.data.map(content => <PostData className={['uk-margin-top'].join(' ')} data={content} />)}
          </div>
          <CustomTags
            tags={this.props.post.json_metadata.tags}
            className={['uk-margin-medium-left', 'uk-margin-medium-right'].join(' ')}
          />
          <ActionBar post={this.props.post} />
          <Replies
            className={['uk-margin-medium-left', 'uk-margin-medium-right'].join(' ')}
            parentAuthor={this.props.post.author}
            parentPermlink={this.props.post.permlink}
          />
        </div>
      </div>);
  }
}

ArticleSingle.propTypes = {
  postingUser: PropTypes.shape,
  post: PropTypes.shape,
};

ArticleSingle.defaultProps = {
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

export default connect(mapStateToProps)(ArticleSingle);
