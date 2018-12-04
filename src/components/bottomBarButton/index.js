import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../../icons/Icon';
import styles from './styles.scss';

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
    return (
      <div {...remainingProps}>
        <div>
          <Icon name={buttonName} type="outline" className={styles.communityIcon} />
        </div>
      </div>
    );
  }
}
