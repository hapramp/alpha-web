import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import indexStyles from '../../styles/globals.scss';
import CommunityButton from '../../components/CommunityButton';
import UserAvatar from '../../components/UserAvatar';
import { getIcon } from '../../icons';

const Sidebar = props => (
  <div className={`uk-margin-small-top uk-padding uk-padding-remove-right ${indexStyles.white} ${styles.sideBarContainer}`}>
    <div className={`${styles.flexTill985} ${styles.sideBarMidContainer}`} style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 188px)' }}>
      <div className={`${styles.flexTill985}`}>
        {props.username && (
          <Link to="/feed">
            <div
              className={`uk-margin-top ${styles.communityContainer} ${indexStyles.transition} ${
                props.location.pathname === '/feed/' ? styles.active : ''
                }`}
            >
              <UserAvatar username={props.username} className={`uk-border-circle ${styles.communityImage}`} size="small" noLink />
              <span className={`uk-margin-left ${styles.communityLabel}`}>Feed</span>
            </div>
          </Link>
        )}
        <Link to="/feed/explore/">
          <div
            className={`uk-margin-top ${styles.communityContainer} ${indexStyles.transition} ${
              props.location.pathname === '/feed/explore/' ? styles.active : ''
              }`}
          >
            <img
              src={getIcon('compass-directions', 'outline')}
              className={`uk-border-circle ${styles.communityImage} ${props.location.pathname === '/feed/explore/' ? styles.activeExploreImage : ''}`}
              alt=""
            />
            <span className={`uk-margin-left ${styles.communityLabel}`}>Explore</span>
          </div>
        </Link>
      </div>
      <div className={`uk-margin-top ${styles.communitiesHeader} ${styles.hideTill985}`}>INTERESTS</div>
      <div className={`${styles.flexTill985} ${styles.communitiesContainer}`}>
        {props.communities.map((community) => {
          const isActive = props.location.pathname.split('/')[2] === community.tag;
          return (
            <Link key={community.id} to={`/feed/${community.tag}`}>
              <div
                className={`uk-margin-top uk-flex ${styles.communityContainer} ${indexStyles.transition} ${
                  isActive ? styles.active : ''
                  }`}
              >
                <CommunityButton
                  community={community}
                  isSelected={isActive}
                  className={styles.communityButton}
                />
                <span className={`uk-margin-left ${styles.communityLabel}`}>{community.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
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
