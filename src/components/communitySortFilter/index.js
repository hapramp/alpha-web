import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import styles from './styles.scss';
import indexStyles from '../../index.scss';

class CommunitySortFilter extends React.Component {
  render() {
    return (<div className={[styles.filterContainer, indexStyles.white].join(' ')}>
      <Link to={`/browse/${this.props.match.params.community}/hot`}>
        <span className={[this.props.match.params.filter === 'hot' ? styles.activeFilter : '',
					styles.filter].join(' ')}
        >HOT
        </span>
      </Link>
      <Link to={`/browse/${this.props.match.params.community}/trending`}>
        <span className={[this.props.match.params.filter === 'trending' ? styles.activeFilter : '',
					'uk-margin-left', styles.filter].join(' ')}
        >TRENDING
        </span>
      </Link>
      <Link to={`/browse/${this.props.match.params.community}/created`}>
        <span className={[this.props.match.params.filter === 'created' ? styles.activeFilter : '',
					'uk-margin-left', styles.filter].join(' ')}
        >CREATED
        </span>
      </Link>
            </div>);
  }
}

export default withRouter(CommunitySortFilter);
