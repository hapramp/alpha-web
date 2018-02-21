import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import getStore from '../../utils/storeUtils';
import Header from '../header';
import SignIn from '../signin';
import Feed from '../feed';
import CreatePost from '../createPost';


class Root extends React.Component {

	render() {
		return <div style={{backgroundColor: '#FAFAFA'}}>
			<Header/>
			<Switch>
				<Route exact path={'/'} render={() => {
					if (getStore().getState().login.loggedIn) {
						return <Redirect to={'/feed'}/>
					} else {
						return <Redirect to={'/browse'}/>
					}
				}}/>
				<Route exact path={'/feed'} component={Feed}/>
				<Route exact path={'/signin'} component={SignIn}/>
				<Route exact path={'/browse/:filter'} render={() => <div>This is browse view</div>}/>
				<Redirect path={'/browse'} to={'/browse/hot'}/>
				<Route exact path={'/create/post'} component={CreatePost}/>
				<Route exact path={'/create/article'} render={() => <div>You can create article here</div>}/>
				<Redirect path={'/create'} to={'/create/post'}/>
				<Route exact path={'*'} render={() => <div>Not found</div>}/>
			</Switch>
		</div>
	}
}

export default Root;
