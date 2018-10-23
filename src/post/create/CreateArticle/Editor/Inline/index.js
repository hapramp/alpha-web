import React from 'react';
import PropTypes from 'prop-types';

import { getIcon } from '../../../../../icons';
import styles from './styles.scss';

export default class Inline extends React.Component {
  static propTypes = {
    currentState: PropTypes.shape({
      bold: PropTypes.bool,
      italic: PropTypes.bool,
      underline: PropTypes.bool,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  onChange = (property, active) => () => {
    this.props.onChange(property, active);
  }

  getButton = (icon, active, property) => (
    <div
      className={`${styles.iconContainer} ${active ? styles.active : ''}`}
      onClick={this.onChange(property, !active)}
      onKeyUp={() => {}}
      role="button"
      tabIndex={0}
    >
      <img src={getIcon(icon, 'outline')} alt="B" />
    </div>
  )

  render() {
    const { currentState } = this.props;
    const { bold, italic, underline } = currentState;
    return (
      <div className="uk-flex">
        {this.getButton('text-bold', bold, 'bold')}
        {this.getButton('text-italic', italic, 'italic')}
        {this.getButton('text-underline', underline, 'underline')}
      </div>
    );
  }
}
