import React from 'react';
import {connect} from 'react-redux';

import CommunityCard from '../communityCard';
import styles from './styles.scss';

class Browse extends React.Component {
	render() {
		return <div className={['uk-container', 'uk-margin-large-top', 'uk-margin-large-bottom'].join(' ')}>
			<div className={['uk-margin-bottom', styles.browseHeader].join(' ')}>
				SELECT COMMUNITY
			</div>
			<div uk-grid="true" className={'uk-grid-large uk-child-width-expand@s'}>
				{this.props.communities.map(community => <CommunityCard key={community.id} community={community}/>)}
			</div>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		communities: state.communities.communities
	}
};

export default connect(mapStateToProps)(Browse);
