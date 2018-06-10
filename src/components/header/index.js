import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import styles from './styles.scss';
import baseStyles from '../../index.scss';
import logo from './logo.png';
import {loadCommunities} from "../../actions/communityActions";
import steemAPI from '../../utils/steem';

class Header extends React.Component {

	componentWillMount() {
		this.props.loadCommunities();
	}

	navigateToSignIn(e) {
		this.props.history.push('/signin');
	}

	getNavbarRight() {
		if (this.props.isLoggedIn) {
			return <div className={'uk-navbar-item'}>
				<div className={'uk-navbar-item'}>
					<Link to={'/notifications'} uk-icon={'icon: bell'}/>
				</div>
				<div className={'uk-navbar-item'}>
					{localStorage.getItem('avatar') ?
						<Link to={'/profile'}><img src={this.props.avatar} className={['uk-border-circle',
							styles.userImage].join(' ')} alt={'You'}/></Link> :
						<Link to={'/profile'} uk-icon={'user'}/>}
				</div>
			</div>
		} else {
			return <div className={'uk-navbar-item'}>
				<a href={steemAPI.sc2Api.getLoginURL()}>
					<button className={["uk-button uk-button-small", styles.signIn, baseStyles.hoverEffect,
						baseStyles.transition].join(' ')}>SIGN IN
					</button>
				</a>
			</div>
		}
	}

	render() {
		return <div
			uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar">
			<nav className={["uk-navbar-container", "uk-navbar-transparent", "uk-margin", "uk-padding",
				"uk-padding-remove-vertical", styles.header].join(' ')}
					 uk-navbar="true" style={{position: 'relative', zIndex: 980}}>
				<div className={"uk-navbar-left"}>
					<Link className={['uk-navbar-item', 'uk-logo'].join(' ')} to="/">
						<img src={logo} alt={'Hapramp'} className={styles.logo}/>
						Hapramp
					</Link>
				</div>
				<div className={'uk-navbar-right'}>
					<div className={'uk-navbar-item'}>
						<Link to={'/search'} uk-icon={'icon: search'}/>
					</div>
					{this.getNavbarRight()}
				</div>
			</nav>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.login.loggedIn,
		avatar: state.authUser.avatar
	}
};

export default withRouter(connect(mapStateToProps, {
	loadCommunities,
})(Header));
