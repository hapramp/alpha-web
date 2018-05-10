import React from 'react';
import {connect} from 'react-redux';

import styles from './styles.scss';
import logo from './logo.png';
import {login} from "../../actions/loginActions";

class SignIn extends React.Component {

	componentWillReceiveProps(newProps) {
		if (newProps.login.loggedIn) {
			this.props.history.push('/');
		}
	}

	initSignIn() {
		console.log('Signing in...');
		let username = document.getElementById('sign-in-username').value.trim();
		let postingKey = document.getElementById('sign-in-posting-key').value.trim();
		if (!username || !postingKey) {
			return;
		}
		this.props.initLogin(username, postingKey);
		/**
		 * Flow -
		 * 1. [Not needed] [Not implemented] Verify Posting Key
		 * 2. Check if user already exists. If valid, sign in complete. Otherwise follow next steps
		 * 3. Get the random key from the backend
		 * 4. Post a comment on predefined location with the random key
		 * 5. Notify backend about the comment with hash of private posting key
		 * 6. Sign in done. Set the required variables
		 */
	}

	render() {
		return <div className={['uk-flex', 'uk-flex-center'].join(' ')}>
			<div className={[styles.loginCard, 'uk-card-default', 'uk-card-hover', 'uk-text-center'].join(' ')}>
				<img src={logo} className={styles.logo} alt={'Hapramp'}/>
				<fieldset className={'uk-fieldset'}>
					<div className={'uk-margin'}>
						<input id={'sign-in-username'} className={['uk-input', styles.formInput].join(' ')} type={'text'}
									 placeholder={'Steem username'}/>
						<input id={'sign-in-posting-key'} className={['uk-input', styles.formInput].join(' ')} type={'password'}
									 placeholder={'Posting Key'}/>
						<button disabled={this.props.login.loggingIn} onClick={this.initSignIn.bind(this)}
										className={['uk-button', styles.loginButton].join(' ')}>
							{this.props.loggingIn ? 'SIGNING IN' : 'SIGN IN'}</button>
					</div>
				</fieldset>
				<div style={{marginBottom: '10px'}}>OR</div>
				<button className={['uk-button', styles.createAccount].join(' ')}>CREATE STEEM ACCOUNT</button>
				{this.props.login.messages.map(i => <div key={i}>{i}</div>)}
			</div>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		login: state.login
	}
};

export default connect(mapStateToProps, {
	initLogin: login
})(SignIn);
