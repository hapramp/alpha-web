import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import styles from './styles.scss';
import logo from './logo.png';

class Header extends React.Component {

	getNavbarRight() {
		if (this.props.isLoggedIn) {
			return <div>You have logged in</div>
		} else {
			return <div className={'uk-navbar-item'}>
				<button className={["uk-button uk-button-primary uk-button-small", styles.signIn].join(' ')}>SIGN IN</button>
			</div>
		}
	}

	render() {
		return <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar">
			<nav className={["uk-navbar-container", "uk-navbar-transparent", "uk-margin", styles.header].join(' ')}
					 uk-navbar="true" style={{position: 'relative', zIndex: 980}}>
				<div className={"uk-navbar-left"}>
					<Link className={['uk-navbar-item', 'uk-logo'].join(' ')} to="/">
						<img src={logo} alt={'Hapramp'} className={styles.logo} />
						Hapramp
					</Link>
				</div>
				<div className={'uk-navbar-right'}>
					{this.getNavbarRight()}
				</div>
			</nav>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: false
	}
};

export default connect()(Header);
