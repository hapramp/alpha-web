import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import indexStyles from '../../index.scss';
import UserAvatar from '../../components/UserAvatar';

const Sidebar = props => (
  <div className={`uk-margin-top uk-padding uk-padding-remove-right ${indexStyles.white} ${styles.sideBarContainer}`}>
    <div className={styles.communitiesHeader}>COMMUNITIES</div>
    <div>
      {
        props.username
        && (
          <Link to="/feed">
            <div
              className={`uk-margin-top ${styles.communityContainer} ${indexStyles.transition} ${props.location.pathname === '/feed/' ? styles.active : ''}`}
            >
              <UserAvatar username={props.username} className={`uk-border-circle ${styles.communityImage}`} size="small" />
              <span className="uk-margin-left">Feed</span>
            </div>
          </Link>
        )
      }
      {
        props.communities.map(community => (
          <Link key={community.id} to={`/feed/${community.tag}`}>
            <div
              className={`uk-margin-top ${styles.communityContainer} ${indexStyles.transition} ${props.location.pathname.split('/')[2] === community.tag ? styles.active : ''}`}
            >
              <img
                src={community.image_uri}
                className={`uk-border-circle ${styles.communityImage}`}
                alt=""
              />
              <span className="uk-margin-left">{community.name}</span>
            </div>
          </Link>
        ))
      }
    </div>
  </div>
);

Sidebar.propTypes = {
  communities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    tag: PropTypes.string.isRequired,
    image_uri: PropTypes.string,
  })),
  username: PropTypes.string,
  location: PropTypes.objectOf(PropTypes.shape()),
};

Sidebar.defaultProps = {
  communities: [],
  username: null,
  location: {
    pathname: '/feed/',
  },
};

const mapStateToProps = state => ({
  communities: state.communities.communities,
  username: state.authUser.username,
});

export default withRouter(connect(mapStateToProps)(Sidebar));
