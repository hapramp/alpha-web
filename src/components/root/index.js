import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Header from '../header';
import SignIn from '../signin';

class Root extends React.Component {

	render() {
		return <div>
			<Header/>
			<Switch>
				<Route exact path={'/'} render={() => <div>This is index route </div>}/>
				<Route exact path={'/signin'} component={SignIn}/>
				<Route exact path={'/browse/:filter'} render={() => <div>This is browse view</div>}/>
				<Redirect path={'/browse'} to={'/browse/hot'}/>
				<Route exact path={'*'} render={() => <div>Not found</div>}/>
			</Switch>
		</div>
	}
}

export default Root;
