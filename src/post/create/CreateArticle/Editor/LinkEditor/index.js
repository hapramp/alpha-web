import React from 'react';
import PropTypes from 'prop-types';

import { getIcon } from '../../../../../icons';
import styles from './styles.scss';

export default class LinkEditor extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    currentState: PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      textInput: props.currentState.selectionText || '',
      linkInput: '',
      showInput: false,
    };
  }

  setLink = e => this.setState({ ...this.state, linkInput: e.target.value })
  setText = e => this.setState({ ...this.state, textInput: e.target.value })

  handleKeyUp = (event) => {
    if (event.keyCode === 13) { // Enter
      this.props.onChange({
        url: this.state.linkInput, title: this.state.textInput,
      });
      this.setState({ linkInput: '', textInput: '', showInput: false });
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="uk-flex">
        {
          this.state.showInput && (
            <div>
              <input
                onKeyUp={this.handleKeyUp}
                value={this.state.textInput}
                onChange={this.setText}
              />
              <input
                onKeyUp={this.handleKeyUp}
                value={this.state.linkInput}
                onChange={this.setLink}
              />
            </div>
          )
        }
        <div
          className={`${styles.iconContainer}`}
          onClick={() => this.setState({ ...this.state, showInput: !this.state.showInput })}
          onKeyUp={() => {}}
          role="button"
          tabIndex={-1}
        >
          <img src={getIcon('hyperlink', 'outline')} alt="*" />
        </div>
      </div>
    );
  }
}
