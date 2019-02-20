/**
 * Renders entries for a competition with
 * a way to assign ranks to them.
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { getPostsForCompetition } from '../../actions';
import {
  getCompetitionPostPermlinks, isPostsLoading,
} from '../../reducer';
import RankAssigner from './RankAssigner';
import PostLoading from '../../../post/PostLoading';
import PostCard from '../../../post/PostCard';

const EntryList = ({
  competitionId, fetchCompetitionPosts, posts, loading,
}) => {
  useEffect(
    () => {
      fetchCompetitionPosts(competitionId);
    },
    [competitionId],
  );

  return (
    <div className="uk-grid">
      {
        loading && (
          <div className="uk-width-1-2@s">
            <PostLoading />
          </div>
        )
      }
      {
        posts.map(permlink => (
          <div className="uk-width-1-2@s uk-margin-small-bottom" key={permlink}>
            <PostCard
              postPermlink={permlink}
              border
              maintainAspectRatio
              style={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}
              className="uk-margin-remove-bottom"
            />
            <RankAssigner competitionId={competitionId} permlink={permlink} />
          </div>
        ))
      }
    </div>
  );
};

EntryList.propTypes = {
  competitionId: PropTypes.string.isRequired,
  fetchCompetitionPosts: PropTypes.func.isRequired,
  // posts is an array of full permlinks
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  posts: getCompetitionPostPermlinks(state, ownProps.competitionId),
  loading: isPostsLoading(state, ownProps.competitionId),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCompetitionPosts: getPostsForCompetition,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EntryList);
