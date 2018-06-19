import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import indexStyles from '../../index.scss';

const CommunitySortFilter = props => (
  <div className={[styles.filterContainer, indexStyles.white].join(' ')}>
    <Link to={`/browse/${props.match.params.community}/hot`}>
      <span className={[props.match.params.filter === 'hot' ? styles.activeFilter : '', styles.filter].join(' ')}>
        HOT
      </span>
    </Link>
    <Link to={`/browse/${props.match.params.community}/trending`}>
      <span className={[props.match.params.filter === 'trending' ? styles.activeFilter : '', 'uk-margin-left', styles.filter].join(' ')}>
        TRENDING
      </span>
    </Link>
    <Link to={`/browse/${props.match.params.community}/created`}>
      <span className={[this.props.match.params.filter === 'created' ? styles.activeFilter : '', 'uk-margin-left', styles.filter].join(' ')}>
        CREATED
      </span>
    </Link>
  </div>
);

CommunitySortFilter.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      community: PropTypes.string,
      filter: PropTypes.string,
    }),
  }),
};

CommunitySortFilter.defaultProps = {
  match: {
    params: {
      community: '',
      filter: '',
    },
  },
};

export default withRouter(CommunitySortFilter);
