import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import indexStyles from '../../styles/_variables.scss';

class CommunityCard extends React.Component {
  constructor(props) {
    super(props);

    this.navigateToCommunity = this.navigateToCommunity.bind(this);
  }

  /*
    id(pin): 1
    name(pin): "Art"
    color(pin): "#023456"
    tag(pin): "hapramp-art"
    image_uri(pin): "https://..."
    description(pin): null
    */
  navigateToCommunity() {
    this.props.history.push(`/feed/${this.props.community.tag}`);
  }

  render() {
    return (
      <div
        className={['uk-width-1-2@s', 'uk-width-1-3@m', 'uk-width-1-3@l', 'uk-text-center',
          indexStyles.pointer].join(' ')}
        onClick={this.navigateToCommunity}
        role="button"
        onKeyDown={this.navigateToCommunity}
        tabIndex={0}
      >
        <div className={['uk-card', 'uk-card-default', 'uk-padding', 'uk-padding-remove-bottom',
          'uk-padding-remove-horizontal'].join(' ')}
        >
          <div className={['uk-card-media-top uk-text-center'].join(' ')}>
            <img src={this.props.community.image_uri} alt="" />
          </div>
          <div className={['uk-card-body'].join(' ')}>
            <div className={['uk-text-uppercase', styles.communityName].join(' ')}>
              {this.props.community.name}
            </div>
            <div className={[styles.communityTag].join(' ')}>
              #{this.props.community.tag}
            </div>
          </div>
        </div>
      </div>);
  }
}

CommunityCard.propTypes = {
  community: PropTypes.shape({
    image_uri: PropTypes.string,
    name: PropTypes.string,
    tag: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

CommunityCard.defaultProps = {
  community: {
    image_uri: '',
    name: '',
    tag: '',
  },
  history: {
    push: () => {},
  },
};

export default withRouter(connect()(CommunityCard));
