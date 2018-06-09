import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Cookie from 'js-cookie';

import getStore from '../../utils/storeUtils';
import Header from '../header';
import Feed from '../feed';
import CreatePost from '../createPost';
import UserProfile from '../userProfile';
import Browse from '../browse';
import BrowseCommunity from '../browseCommunity';
import CreateArticle from '../createArticle';
import ContentSingle from '../contentSingle';

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

				{/* Browse views */}
				<Route exact path={'/browse'} component={Browse}/>
				<Route exact path={'/browse/:community'} render={({match}) =>
					<Redirect to={`/browse/${match.params.community}/hot`}/>}/>
				<Route exact path={'/browse/:community/:filter'} component={BrowseCommunity}/>

				{/* Content Creation Views */}
				<Route exact path={'/create/post'} component={CreatePost}/>
				<Route exact path={'/create/article'} component={CreateArticle}/>
				<Redirect path={'/create'} to={'/create/post'}/>

				{/* Profile redirect logic */}
				<Route exact path={'/profile'} render={() => getStore().getState().login.loggedIn ?
					<Redirect to={'/@' + getStore().getState().authUser.username}/> :
					<Redirect to={'/signin'}/>
				}/>

				{/* Profile section */}
				<Route exact path={'/@:username'} component={UserProfile}/>

				{/* Single content */}
				<Route exact path={'/@:username/:permlink'} component={ContentSingle}/>

				{/* OAuth Callback */}
				<Route exact path={'/_oauth/'} render={props => {
					let params = new URLSearchParams(props.location.search);
					let accessToken = params.get('access_token');
					let username = params.get('username');
					let expiresIn = parseInt(params.get('expires_in'), 10);
					Cookie.set('access_token', accessToken, {expires: expiresIn});
					localStorage.setItem('username', username);
					return <Redirect to={'/'}/>
				}}/>

				{/* Unknown route - 404 */}
				<Route exact path={'*'} render={() => <div>Not found</div>}/>
			</Switch>
		</div>
	}
}

export default Root;
