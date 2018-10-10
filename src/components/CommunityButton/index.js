import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

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
    return (
      <div {...remainingProps}>
        <div
          className={`${styles.container} ${hovering ? styles.lighten : ''}`}
          style={{
            backgroundColor: (isSelected || hovering) ? community.color : 'transparent',
            borderColor: community.color,
            padding: 30,
          }}
          onMouseEnter={this.activateHover}
          onMouseLeave={this.deactivateHover}
        >
          {community.name[0]}
        </div>
      </div>
    );
  }
}
