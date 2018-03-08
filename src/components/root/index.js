import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import getStore from '../../utils/storeUtils';
import Header from '../header';
import SignIn from '../signin';
import Feed from '../feed';
import CreatePost from '../createPost';
import UserProfile from '../userProfile';
import Browse from '../browse';
import BrowseCommunity from '../browseCommunity';

class Root extends React.Component {

	render() {
		return <div style={{backgroundColor: '#FAFAFA'}}>
			<Header/>
			<Switch>
				{/* Entry check */}
				<Route exact path={'/'} render={() => {
					if (getStore().getState().login.loggedIn) {
						return <Redirect to={'/feed'}/>
					} else {
						return <Redirect to={'/browse'}/>
					}
				}}/>

				{/* User based feed */}
				<Route exact path={'/feed'} component={Feed}/>

				{/* Sign in */}
				<Route exact path={'/signin'} component={SignIn}/>

				{/* Browse views */}
				<Route exact path={'/browse'} component={Browse}/>
				<Route exact path={'/browse/:community'} render={({ match }) =>
					<Redirect to={`/browse/${match.params.community}/hot`} />}/>
				<Route exact path={'/browse/:community/:filter'} component={BrowseCommunity}/>


				<Route exact path={'/create/post'} component={CreatePost}/>
				<Route exact path={'/create/article'} render={() => <div>You can create article here</div>}/>
				<Redirect path={'/create'} to={'/create/post'}/>
				<Route exact path={'/profile'} render={() => getStore().getState().login.loggedIn ?
					<Redirect to={'/@' + getStore().getState().authUser.username}/> :
					<Redirect to={'/signin'}/>
				}/>
				<Route exact path={'/@:username'} component={UserProfile}/>
				<Route exact path={'*'} render={() => <div>Not found</div>}/>
			</Switch>
		</div>
	}
}

export default Root;
