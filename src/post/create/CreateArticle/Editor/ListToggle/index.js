import React from 'react';
import PropTypes from 'prop-types';
// import { RichUtils } from 'draft-js';

import { getIcon } from '../../../../../icons';
import styles from './styles.scss';

const listTypes = [
  undefined,
  'unordered',
  'ordered',
];

export default class BlockToggle extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    currentState: PropTypes.shape().isRequired,
  };

  onToggle = () => {
    const currentBlockType = this.props.currentState.listType;
    const index = listTypes.indexOf(currentBlockType);
    const nextIndex = index + 1 < listTypes.length ? index + 1 : 0;
    this.props.onChange(listTypes[nextIndex] || listTypes[index]);
  };

  render() {
    return (
      <div className="uk-flex">
        <div
          className={`${styles.iconContainer} ${this.props.currentState.listType ? styles.active : ''}`}
          onClick={this.onToggle}
          onKeyUp={() => {}}
          role="button"
          tabIndex={-1}
        >
          <img
            src={getIcon(
              this.props.currentState.listType === 'ordered' ? 'list-numbers' : 'list-bullets',
              'outline',
            )}
            alt="*"
          />
        </div>
      </div>
    );
  }
}
