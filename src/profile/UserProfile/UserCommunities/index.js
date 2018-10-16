import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './styles.scss';
import { getUserCommunities } from '../../../reducers/allUsersReducer';
import { getAuthUsername } from '../../../reducers/authUserReducer';

import CommunityButton from '../../../components/CommunityButton';
import PlusButton from '../../../components/buttons/PlusButton';

const UserCommunities = ({ communities, username, authUsername }) => (
  <div className="uk-flex uk-flex-center uk-margin-large-bottom">
    <div>
      <div className={`uk-margin-top uk-margin-bottom ${styles.interestsHeader}`}>INTERESTS</div>
      <div className="uk-grid">
        {communities
          .map(community => (
            <CommunityButton
              key={community.id}
              community={community}
              isSelected
              style={{ marginBottom: 24 }}
            />
          ))
        }
        {
          username === authUsername && (
            <Link to="/select-communities">
              <PlusButton />
            </Link>
          )
        }
      </div>
    </div>
  </div>
);

UserCommunities.propTypes = {
  communities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  // username is required to get communities from redux, but not used in component
  username: PropTypes.string.isRequired,
  authUsername: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  authUsername: getAuthUsername(state),
  communities: getUserCommunities(state, ownProps.username),
});

export default connect(mapStateToProps)(UserCommunities);
