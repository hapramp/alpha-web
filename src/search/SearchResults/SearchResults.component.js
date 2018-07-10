import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './SearchResults.styles.scss';

const SearchResults = ({ users }) => users.map(username => (
  <div className={`uk-margin-small-top ${styles.resultCard}`}>
    <Link to={`/@${username}`} key={username}>
      <img
        src={`https://steemitimages.com/u/${username}/avatar/small`}
        alt={username}
        className={`uk-margin-small-right uk-border-circle ${styles.userImage}`}
      />
      <span>{username}</span>
    </Link>
  </div>
));

SearchResults.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string.isRequired),
};

SearchResults.defaultProps = {
  users: [],
};

export default SearchResults;
