import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from '../header';

class Root extends React.Component {

	componentDidMount() {

	}

  render() {
    return <div>
      <Header />
			<Switch>
				<Route exact path={'/'} />
				<Route exact path={'*'} render={() => <div>Not found</div>} />
			</Switch>
    </div>
  }
}

const mapStateToProps = state => {
	return {
		isLoggedIn: false
	}
};

export default connect(mapStateToProps)(Root);
