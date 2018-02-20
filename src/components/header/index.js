import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import styles from './styles.scss';
import baseStyles from '../../index.scss';
import logo from './logo.png';

class Header extends React.Component {

	navigateToSignIn(e) {
		this.props.history.push('/signin');
	}

	getNavbarRight() {
		if (this.props.isLoggedIn) {
			return <div className={'uk-navbar-item'}>
					<Link to={'/notifications'} uk-icon={'icon: bell'} />
				</div>
		} else {
			return <div className={'uk-navbar-item'}>
				<button className={["uk-button uk-button-small", styles.signIn, baseStyles.hoverEffect,
					baseStyles.transition].join(' ')} onClick={this.navigateToSignIn.bind(this)}>SIGN IN</button>
			</div>
		}
	}

	render() {
		return <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar">
			<nav className={["uk-navbar-container", "uk-navbar-transparent", "uk-margin", "uk-padding",
				"uk-padding-remove-vertical", styles.header].join(' ')}
					 uk-navbar="true" style={{position: 'relative', zIndex: 980}}>
				<div className={"uk-navbar-left"}>
					<Link className={['uk-navbar-item', 'uk-logo'].join(' ')} to="/">
						<img src={logo} alt={'Hapramp'} className={styles.logo} />
						Hapramp
					</Link>
				</div>
				<div className={'uk-navbar-right'}>
					<div className={'uk-navbar-item'}>
						<Link to={'/search'} uk-icon={'icon: search'} />
					</div>
					{this.getNavbarRight()}
				</div>
			</nav>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.login.loggedIn
	}
};

export default withRouter(connect(mapStateToProps)(Header));
