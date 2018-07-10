import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchBar from './SearchBar/SearchBar.component';
import SearchResults from './SearchResults/SearchResults.component';
import * as selectors from './search.reducer';
import { searchUser as searchUserAPI, resetSearchState } from './search.actions';

class Search extends React.Component {
  componentWillUnmount() {
    this.props.resetSearchState();
  }

  render() {
    const {
      isLoading, hasErrorred, result, searchUser,
    } = this.props;
    return (
      <div className="uk-margin-top uk-container uk-margin-large-bottom">
        <div className="uk-margin uk-flex uk-flex-center" uk-grid="true">
          <div className="uk-width-1-1@s uk-width-2-3@m uk-width-1-2@l">
            <SearchBar onSearch={isLoading ? () => {} : searchUser} />
            {isLoading && <div className="uk-margin-top uk-text-center">LOADING...</div>}
            {hasErrorred && <div className="uk-margin-top uk-text-center">SOME ERROR OCCURRED, PLEASE TRY AGAIN...</div>}
            {result && <SearchResults users={result} />}
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  searchUser: PropTypes.func.isRequired,
  result: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool,
  hasErrorred: PropTypes.bool,
  resetSearchState: PropTypes.func,
};

Search.defaultProps = {
  result: [],
  isLoading: false,
  hasErrorred: false,
  resetSearchState: () => {},
};

const mapStateToProps = ({ search }) => ({
  isLoading: selectors.isSearching(search),
  hasErrorred: selectors.hasErrorred(search),
  result: selectors.getResult(search),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    searchUser: searchUserAPI,
    resetSearchState,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
