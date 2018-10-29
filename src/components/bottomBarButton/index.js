import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import { getIcon } from '../../icons';

export default class bottomBarButtom extends React.Component {
  static propTypes = {
    isActive: PropTypes.bool,
    buttonName: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    isActive: false,
  };

  render() {
    const {
      isActive, buttonName, ...remainingProps
    } = this.props;
    const bottomIcon = getIcon(buttonName, 'outline');
    return (
      <div {...remainingProps}>
        <div>
          <img src={bottomIcon} alt="" className={styles.communityIcon} />
        </div>
      </div>
    );
  }
}
