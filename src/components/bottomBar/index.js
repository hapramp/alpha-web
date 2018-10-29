import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import AddContentButton from '../addContentButton';
import BottomBarButtom from '../bottomBarButton';
import { getAuthUsername } from '../../reducers/authUserReducer';
import steemAPI from '../../utils/steem';

const UserButton = <BottomBarButtom buttonName="user" isActive={false} />;

const getUserIcon = (isLoggedIn, authUsername) => {
  if (isLoggedIn) {
    return <Link to={`/@${authUsername}`}>{UserButton}</Link>;
  }
  return <a href={steemAPI.sc2Operations.getLoginURL()}>{UserButton}</a>;
};

const BottomBar = props => (
  <div className={`${styles.bottomBarContainer}`}>
    <div className={`${styles.bottomBar}`}>
      <Link to="/feed">
        <BottomBarButtom buttonName="home" isActive={false} />
      </Link>

      <Link to="/competition">
        <BottomBarButtom buttonName="competition" isActive={false} />
      </Link>

      <AddContentButton />
      {getUserIcon(props.isLoggedIn, props.authUsername)}

      <Link to="/settings">
        <BottomBarButtom buttonName="settings" isActive={false} />
      </Link>

    </div>

  </div>
);

BottomBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  authUsername: PropTypes.string,
};

BottomBar.defaultProps = {
  authUsername: null,
};

const mapStateToProps = state => ({
  isLoggedIn: state.login.loggedIn,
  authUsername: getAuthUsername(state),
});

export default withRouter(connect(mapStateToProps)(BottomBar));
