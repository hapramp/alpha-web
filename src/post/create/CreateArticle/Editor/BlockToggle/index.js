import React from 'react';
import PropTypes from 'prop-types';
// import { RichUtils } from 'draft-js';

import { getIcon } from '../../../../../icons';
import styles from './styles.scss';

const blockTypes = [
  'Normal',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  // 'Blockquote',
  // 'Code',
];

export default class BlockToggle extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    currentState: PropTypes.shape().isRequired,
  };

  onToggle = () => {
    const currentBlockType = this.props.currentState.blockType;
    const index = blockTypes.indexOf(currentBlockType);
    const nextIndex = index + 1 < blockTypes.length ? index + 1 : 0;
    this.props.onChange(blockTypes[nextIndex]);
  };

  onToggleQuote = () => {
    if (this.props.currentState.blockType === 'Blockquote') {
      this.props.onChange('Normal');
    } else {
      this.props.onChange('Blockquote');
    }
  }

  render() {
    return (
      <div className="uk-flex">
        <div
          className={styles.iconContainer}
          onClick={this.onToggle}
          onKeyUp={() => {}}
          role="button"
          tabIndex={-1}
        >
          <img src={getIcon('text-style', 'outline')} alt="T" />
        </div>
        <div
          className={`${styles.iconContainer} ${this.props.currentState.blockType === 'Blockquote' ? styles.active : ''}`}
          onClick={this.onToggleQuote}
          onKeyUp={() => {}}
          role="button"
          tabIndex={-1}
        >
          <img src={getIcon('open-quote', 'outline')} alt="T" />
        </div>
      </div>
    );
  }
}
