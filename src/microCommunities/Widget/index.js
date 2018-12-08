import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import { getAllMicroCommunities as fetchAllMicroCommunities } from '../actions';
import { getAllMicroCommunities } from '../reducer';

const Widget = ({ microCommunities, fetchAll }) => {
  // Fetch all communities once
  useEffect(
    () => {
      fetchAll();
    },
    [true],
  );
  return (
    <div className={styles.container}>
      <div className={styles.title}>Communities</div>
      <div className="uk-flex uk-flex-wrap">
        {
          microCommunities.map(community => (
            <Link to={`/community/${community.tag}`} key={community.id}>
              <div className={styles.communityChip}>
                <img src={community.image_url} alt="" className="uk-border-circle" />
                <span>{community.name}</span>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
};

Widget.propTypes = {
  microCommunities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  fetchAll: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  microCommunities: getAllMicroCommunities(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { fetchAll: fetchAllMicroCommunities },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Widget);
