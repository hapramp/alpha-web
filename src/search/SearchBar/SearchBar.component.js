import React from 'react';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    };

    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
  }

  componentDidMount() {
    document.querySelector('input.uk-input').focus();
  }

  handleSearchTextChange(event) {
    const searchText = event.target.value;
    if (searchText.length > 50) {
      return;
    }
    this.setState({ ...this.state, searchText });
  }

  handleInputKeyUp(event) {
    if (event.keyCode === 13) {
      this.handleSearchClick();
    }
  }

  handleSearchClick() {
    this.props.onSearch(`/search/${this.state.searchText}`);
  }

  render() {
    return (
      <div className="uk-inline" style={{ width: '100%' }}>
        <span
          className="uk-form-icon uk-form-icon-flip"
          uk-icon="icon: search"
          onClick={this.handleSearchClick}
          onKeyUp={this.handleInputKeyUp}
          role="button"
          tabIndex="0"
          style={{ cursor: 'pointer', pointerEvents: 'all' }}
        />
        <input
          className="uk-input"
          type="text"
          onChange={this.handleSearchTextChange}
          value={this.state.searchText}
          onKeyUp={this.handleInputKeyUp}
          placeholder="Search users"
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};

SearchBar.defaultProps = {
  onSearch: () => {},
};

export default SearchBar;
