import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './styles.scss';
import indexStyles from '../../index.scss';

class CommunityCard extends React.Component {
  /*
	id(pin): 1
	name(pin): "Art"
	color(pin): "#023456"
	tag(pin): "hapramp-art"
	image_uri(pin): "https://user-images.githubusercontent.com/10809719/34512616-a3528602-f089-11e7-8b7e-4953c469ad42.png"
	description(pin): null
	 */
  navigateToCommunity() {
    this.props.history.push(`/browse/${this.props.community.tag}`);
  }

  render() {
    return (<div
      className={['uk-width-1-2@s', 'uk-width-1-3@m', 'uk-width-1-3@l', 'uk-text-center',
			indexStyles.pointer].join(' ')}
      onClick={this.navigateToCommunity.bind(this)}
    >
      <div className={['uk-card', 'uk-card-default', 'uk-padding', 'uk-padding-remove-bottom',
				'uk-padding-remove-horizontal'].join(' ')}
      >
        <div className={['uk-card-media-top uk-text-center'].join(' ')}>
          <img src={this.props.community.image_uri} alt="" />
        </div>
        <div className={['uk-card-body'].join(' ')}>
          <div className={['uk-text-uppercase', styles.communityName].join(' ')}>{this.props.community.name}</div>
          <div className={[styles.communityTag].join(' ')}>#{this.props.community.tag}</div>
        </div>
      </div>
            </div>);
  }
}

export default withRouter(connect()(CommunityCard));
