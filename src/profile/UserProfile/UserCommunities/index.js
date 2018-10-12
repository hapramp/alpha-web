import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import { getUserCommunities } from '../../../reducers/allUsersReducer';

const UserCommunities = ({ communities }) => (
  <div className="uk-flex uk-flex-center uk-margin-large-bottom">
    <div>
      <div className={`uk-margin-top uk-margin-bottom ${styles.interestsHeader}`}>INTERESTS</div>
      <div className="uk-flex">
        {communities
          .map(community => (
            <div
              key={community.id}
              className="uk-flex uk-flex-column uk-text-center uk-margin-right"
            >
              <div>
                <img
                  className={styles.communityImage}
                  src={community.image_uri}
                  alt={community.name[0]}
                />
              </div>
              <div className="uk-margin-small-top">
                {community.name}
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
);

UserCommunities.propTypes = {
  communities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  // username is required to get communities from redux, but not used in component
  username: PropTypes.string.isRequired, // eslint-disable-line
};

const mapStateToProps = (state, ownProps) => ({
  communities: getUserCommunities(state, ownProps.username),
});

export default connect(mapStateToProps)(UserCommunities);
