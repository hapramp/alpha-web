import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import indexStyles from '../../styles/globals.scss';
import UserAvatar from '../../components/UserAvatar';
import appIcon from './app_icon.png';

console.group('INDEX STYLES');
console.log(indexStyles);
console.groupEnd();

const Sidebar = props => (
  <div className={`uk-margin-top uk-padding uk-padding-remove-right ${indexStyles.white} ${styles.sideBarContainer}`}>
    <div>
      {props.username && (
        <div
          className={`uk-margin-top ${styles.communityContainer} ${indexStyles.transition} ${
            props.location.pathname === '/feed/' ? styles.active : ''
          }`}
        >
          <UserAvatar username={props.username} className={`uk-border-circle ${styles.communityImage}`} size="small" />
          <Link to="/feed">
            <span className="uk-margin-left">Feed</span>
          </Link>
        </div>
      )}
      <Link to="/feed/new/">
        <div
          className={`uk-margin-top ${styles.communityContainer} ${indexStyles.transition} ${
            props.location.pathname === '/feed/new/' ? styles.active : ''
          }`}
        >
          <img src={appIcon} className={`uk-border-circle ${styles.communityImage}`} alt="" />
          <span className="uk-margin-left">NEW</span>
        </div>
      </Link>
    </div>
    <div className={`uk-margin-top ${styles.communitiesHeader}`}>COMMUNITIES</div>
    <div>
      {props.communities.map(community => (
        <Link key={community.id} to={`/feed/${community.tag}`}>
          <div
            className={`uk-margin-top ${styles.communityContainer} ${indexStyles.transition} ${
              props.location.pathname.split('/')[2] === community.tag ? styles.active : ''
            }`}
          >
            <img src={community.image_uri} className={`uk-border-circle ${styles.communityImage}`} alt="" />
            <span className="uk-margin-left">{community.name}</span>
          </div>
        </Link>
      ))}
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
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
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
