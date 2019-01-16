import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MicroCommunityMetaTags from './MicroCommunityMetaTags';
import Info from './MicroCommunityInfo';
import Posts from './MicroCommunityPosts';
import { getAllMicroCommunities } from '../actions';
import { getMicroCommunityByTag } from '../reducer';
import styles from './styles.scss';

const MicroCommunitySingle = ({ fetchAll, microCommunity }) => {
  useEffect(
    () => {
      fetchAll();
    },
    [true],
  );
  if (!microCommunity) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  return (
    <div className="uk-container">
      <MicroCommunityMetaTags community={microCommunity} />
      <div uk-grid="true" className="uk-margin-small-top">
        <div className="uk-width-1-4@m">
          <Info microCommunity={microCommunity} />
        </div>
        <div className={`uk-width-3-4@m uk-width-1-2@l ${styles.postsWrapper}`}>
          <div className={styles.postsContainer}>
            <Posts tag={microCommunity.tag} communityUsername={microCommunity.username} />
          </div>
        </div>
      </div>
    </div>
  );
};

MicroCommunitySingle.propTypes = {
  fetchAll: PropTypes.func.isRequired,
  microCommunity: PropTypes.shape().isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  microCommunity: getMicroCommunityByTag(state, ownProps.match.params.tag),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { fetchAll: getAllMicroCommunities },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(MicroCommunitySingle);
