import React from 'react';
import {Link} from 'react-router-dom';

import styles from './styles.scss';
import logo from './logo.png';

class Header extends React.Component {
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
					<div className={'uk-navbar-item'}>
						<Link to={'/login'}>Login</Link>
					</div>
				</div>
      </nav>
    </div>
  }
}

export default Header;
