import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import PostCard from '../../../post/PostCard';

import styles from './styles.scss';
// import indexStyles from '../../../styles/globals.scss';
import { getUserBlogPosts } from '../../reducer';
import { getUserFeeds } from '../../actions';

class UserBlog extends React.Component {
  static propTypes = {
    getUserFeeds: PropTypes.func,
    username: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  static defaultProps = {
    getUserFeeds: () => { },
  }
  componentDidMount() {
    this.props.getUserFeeds(this.props.username);
  }

  render() {
    return (
      <div className={`uk-flex uk-flex-center ${styles.userPostsContainer}`}>
        <div className={styles.blogContainer}>
          <div className={`uk-margin-medium-top uk-margin-medium-bottom ${styles.blogHeader}`}>LATEST</div>
          {this.props.posts.map(item => (
            <PostCard
              key={item}
              postPermlink={item}
              border
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  posts: getUserBlogPosts(state, ownProps.username),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserFeeds,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserBlog);
