import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import { getAllMicroCommunities } from '../reducer';

const Widget = ({ microCommunities }) => (
  <div className={styles.container}>
    <div className={styles.title}>Communities</div>
    <div className={`uk-flex uk-flex-wrap ${styles.microCommunityContainer}`}>
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

Widget.propTypes = {
  microCommunities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = state => ({
  microCommunities: getAllMicroCommunities(state),
});

export default connect(mapStateToProps)(Widget);
