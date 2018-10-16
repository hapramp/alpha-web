import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import { getIconForCommunity } from '../../icons';

export default class CommunityButton extends React.Component {
  static propTypes = {
    isSelected: PropTypes.bool,
    community: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    isSelected: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
    };
  }

  activateHover = () => this.setState(state => ({ ...state, hovering: true }));

  deactivateHover = () => this.setState(state => ({ ...state, hovering: false }));

  render() {
    const {
      isSelected, community, ...remainingProps
    } = this.props;
    const { hovering } = this.state;
    const communityIcon = getIconForCommunity(community.name.toLowerCase());
    return (
      <div {...remainingProps}>
        <div
          className={`${styles.container} ${hovering ? styles.lighten : ''}`}
          style={{
            backgroundColor: (isSelected || hovering) ? community.color : 'transparent',
            borderColor: (isSelected || hovering) ? community.color : 'black',
            padding: 24,
          }}
          onMouseEnter={this.activateHover}
          onMouseLeave={this.deactivateHover}
        >
          <img src={communityIcon.solid} alt="" className={styles.communityIcon} />
        </div>
      </div>
    );
  }
}
