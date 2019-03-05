import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import { getIcon } from '../../../../../icons';

export default class TagsSelector extends React.Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
    addTag: PropTypes.func,
    removeTag: PropTypes.func,
    className: PropTypes.string,
    PrefixComponent: PropTypes.func,
    prefixPropsSelector: PropTypes.func,
    headerText: PropTypes.string,
    disabled: PropTypes.bool,
    style: PropTypes.shape(),
  }

  static defaultProps = {
    tags: [],
    addTag: () => { },
    removeTag: () => { },
    className: '',
    PrefixComponent: () => '#',
    prefixPropsSelector: () => ({}),
    headerText: 'Tags',
    disabled: false,
    style: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      tagInputText: '',
    };
  }

  handleTagInputChange = event => this.setState({
    ...this.state,
    tagInputText: event.target.value.trim(),
  })

  handleTagInputKeyUp = (event) => {
    if (event.keyCode === 13 || event.keyCode === 32) { // Enter or space
      const { tagInputText } = this.state;
      const { addTag } = this.props;

      if (tagInputText.length > 0 && !this.props.disabled) {
        addTag(tagInputText);
      }

      this.setState({ ...this.state, tagInputText: '' });
    }
  }

  removeTag = tag => () => this.props.removeTag(tag);

  render() {
    const {
      tags, PrefixComponent, prefixPropsSelector, headerText,
      disabled, style,
    } = this.props;
    const { tagInputText } = this.state;
    return (
      <div style={style} className={`${this.props.className} uk-container`}>
        <div className="uk-margin-small-bottom">
          <span>{headerText}</span>
        </div>

        <div className="uk-grid">
          {
            tags.map(tag => (
              <div
                className="uk-margin-small-bottom"
                key={tag}
                onClick={this.removeTag(tag)}
                onKeyUp={() => { }}
                role="button"
                tabIndex={-1}
              >
                <span className={styles.tagContainer}>
                  <PrefixComponent {...prefixPropsSelector(tag)} />{tag}
                  <img
                    className={styles.cancelButton}
                    src={getIcon('cancel', 'outline')}
                    alt="x"
                  />
                </span>
              </div>
            ))
          }
          <div>
            {
              !disabled && (
                <input
                  className={styles.inputContainer}
                  value={tagInputText}
                  onChange={this.handleTagInputChange}
                  onKeyUp={this.handleTagInputKeyUp}
                />
              )
            }
          </div>
        </div>
      </div>
    );
  }
}
