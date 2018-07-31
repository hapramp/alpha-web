import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Remarkable from 'remarkable';

import { fixUser } from '../../utils/defaultFixUtils';
// import PostData from '../postData';
import indexStyles from '../../index.scss';
import CustomTags from '../customTags';
import ActionBar from '../actionBar';
import Replies from '../replies';
import PostUserMeta from '../postUserMeta';
import { getCommunitiesForPost } from '../../utils/communityUtils';
import styles from './styles.scss';

const remarkable = new Remarkable({
  html: true,
  breaks: true,
  linkify: true,
  typographer: false,
  quotes: '“”‘’',
});

class ArticleSingle extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { body } = this.props.post;
    const renderBody = remarkable.render(body);
    console.log(renderBody);
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
            className={['uk-padding'].join(' ')}
          />
          <div
            className={`uk-padding uk-padding-remove-top ${styles.bodyContainer}`}
            dangerouslySetInnerHTML={{ __html: renderBody }}
          />
          {/*
            this.props.post.json_metadata.content.data
              .map(content => (
                <PostData
                  key={JSON.stringify(content)}
                  className={['uk-margin-top'].join(' ')}
                  data={content}
                />
              ))
          */}
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
  }),
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
