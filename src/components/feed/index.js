import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { loadFeedsForUser } from '../../actions/userFeedActions';
import { loadUserAccounts } from '../../actions/allUserActions';
import Post from '../post';
import AddContentButton from '../addContentButton';
import Sidebar from '../sidebar';
import styles from './styles.scss';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    props.loadFeedsForUser(this.props.username);
  }

  componentWillReceiveProps(newProps) {
    const usersRequired = newProps.userFeed.posts.map(i => this.props.allPosts[i].author)
      .filter(username => !_.some(Object.keys(newProps.allUsers), j => username === j));
    usersRequired.length && newProps.loadUserAccounts(usersRequired);
  }

  render() {
    return (<div className={['uk-container'].join(' ')}>
      <div uk-grid="true">
        <div className={[styles.sidebarContainer].join(' ')}>
          <Sidebar />
        </div>
        <div className={['uk-margin-top', styles.feedPosts].join(' ')}>
          {this.props.userFeed.posts && this.props.userFeed.posts.map(post => <Post key={post} postPermlink={post} />)}
        </div>
        <AddContentButton />
      </div>
    </div>);
  }
}

const mapStateToProps = state => ({
  userFeed: state.userFeed.user,
  username: state.authUser.username || localStorage.getItem('username'),
  allUsers: state.allUsers.users,
  allPosts: state.allPosts.posts,
});

export default withRouter(connect(mapStateToProps, {
  loadFeedsForUser, loadUserAccounts,
})(Feed));
