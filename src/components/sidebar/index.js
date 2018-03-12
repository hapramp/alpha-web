import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import styles from './styles.scss';
import indexStyles from '../../index.scss';

class Sidebar extends React.Component {
	render() {
		return <div className={['uk-margin-top', 'uk-padding', 'uk-padding-remove-right', indexStyles.white].join(' ')}>
			<div>COMMUNITIES</div>
			<div>
				{this.props.communities.map(community => <Link key={community.id} to={'/browse/' + community.tag}>
					<div
						className={['uk-margin-top', styles.communityContainer, indexStyles.transition,
							this.props.match.params.community === community.tag ? styles.active : ''].join(' ')}>
						<img src={community.image_uri} className={['uk-border-circle', styles.communityImage].join(' ')}
								 alt={""}/>
						<span className={['uk-margin-left'].join(' ')}>{community.name}</span>
					</div>
				</Link>)}
			</div>
		</div>
	}
}

const mapStateToProps = state => {
	return {
		communities: state.communities.communities
	}
};

export default withRouter(connect(mapStateToProps)(Sidebar));
