import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadPost } from '../../post/actions';
import PostSingle from '../../post/PostSingle';
import styles from './styles.scss';

class ContentSingle extends React.Component {
  constructor(props) {
    super(props);
    this.props.loadPost(this.props.match.params.username, this.props.match.params.permlink);
  }

  render() {
    if (!this.props.post) {
      return <div className={[styles.contentSingleContainer, 'uk-margin-small-top'].join(' ')}>Loading...</div>;
    }

    return (
      <div className={`uk-margin-small-top ${styles.contentSingleContainer}`}>
        <PostSingle postPermlink={`${this.props.post.author}/${this.props.post.permlink}`} />
      </div>
    );
  }
}

ContentSingle.propTypes = {
  post: PropTypes.shape({
    json_metadata: PropTypes.shape({
      content: PropTypes.shape({
        type: PropTypes.string,
      }),
    }),
    author: PropTypes.string,
    permlink: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string,
      permlink: PropTypes.string,
    }),
  }),
  loadPost: PropTypes.func,
};

ContentSingle.defaultProps = {
  post: null,
  match: {
    params: {
      username: '',
      permlink: '',
    },
  },
  loadPost: () => {},
};

const mapStateToProps = (state, ownProps) => ({
  post: state.allPosts.posts[`${ownProps.match.params.username}/${ownProps.match.params.permlink}`],
});

export default connect(mapStateToProps, {
  loadPost,
})(ContentSingle);
