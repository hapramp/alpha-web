import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import logo from './logo.png';
import { loadCommunities } from '../../actions/communityActions';
import { getAllMicroCommunities } from '../../microCommunities/actions';
import UserAvatar from '../UserAvatar';
import SignInButton from '../buttons/SignInButton';

class Header extends React.Component {
  componentDidMount() {
    this.props.loadCommunities();
    this.props.getAllMicroCommunities();
  }

  getNavbarRight() {
    const { username } = this.props;
    if (this.props.isLoggedIn) {
      return (
        <div className="uk-navbar-item">
          <div
            style={{ cursor: 'pointer' }}
            alt="You"
            role="checkbox" // eslint-disable-line
            aria-checked="false"
          >
            <UserAvatar size="small" username={username} to="#" className={styles.userImage} noLink />
          </div>
          <div uk-dropdown="mode: click">
            <ul className="uk-nav uk-dropdown-nav">
              <li className={styles.dropDownHoverable}>
                <Link to="/profile" className={[styles.flexImportant].join(' ')}>
                  <div uk-icon="user" style={{ marginRight: '8px' }} />
                  <div>Profile</div>
                </Link>
              </li>
              <li className={styles.dropDownHoverable}>
                <Link to="/signout" className={[styles.flexImportant].join(' ')}>
                  <div uk-icon="sign-out" style={{ marginRight: '8px' }} />
                  <div>Sign Out</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    }
    return (
      <div className="uk-navbar-item">
        <SignInButton className={`uk-button uk-button-small ${styles.signIn}`} />
      </div>);
  }

  render() {
    return (
      <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar">
        <nav
          className={['uk-navbar-container', 'uk-navbar-transparent', 'uk-margin', 'uk-padding',
            'uk-padding-remove-vertical', styles.header].join(' ')}
          uk-navbar="true"
          style={{ position: 'relative', zIndex: 980 }}
        >
          <div className="uk-navbar-left">
            <Link className={['uk-navbar-item', 'uk-logo', styles.brandName].join(' ')} to="/">
              <img src={logo} alt="Hapramp" className={styles.logo} />
              1Ramp
            </Link>
          </div>
          <div className={`uk-navbar-right ${styles.flexNoWrap}`}>
            <div className={`uk-navbar-item ${styles.competitionText}`}>
              <Link to="/competitions">Competitions</Link>
            </div>
            <div className="uk-navbar-item">
              <Link to="/search" uk-icon="icon: search" />
            </div>
            {this.getNavbarRight()}
          </div>
        </nav>
      </div>);
  }
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  loadCommunities: PropTypes.func,
  username: PropTypes.string,
  getAllMicroCommunities: PropTypes.func.isRequired,
};

Header.defaultProps = {
  isLoggedIn: false,
  loadCommunities: () => { },
  username: null,
};

const mapStateToProps = state => ({
  isLoggedIn: state.login.loggedIn,
  avatar: state.authUser.avatar,
  username: state.authUser.username,
});

export default withRouter(connect(mapStateToProps, {
  loadCommunities, getAllMicroCommunities,
})(Header));
