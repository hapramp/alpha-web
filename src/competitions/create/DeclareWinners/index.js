import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EntryList from './EntryList';
import ViewContainer from '../../../components/ViewContainer';
import { getCompetitionById } from '../../actions';
import { isAnnounceAllowed as isCompetitionAnnounceAllowed } from '../../reducer';

const DeclareWinners = ({
  competitionId, fetchCompetition, isAnnounceAllowed,
}) => {
  /**
   * Load competition details and check if we
   * are allowed to announce results
   */
  const [loading, setLoading] = useState(true);
  useEffect(
    () => {
      setLoading(true);
      fetchCompetition(competitionId)
        .finally(() => setLoading(false));
      return () => setLoading(false);
    },
    [competitionId],
  );

  if (loading) {
    return (
      <ViewContainer>
        Loading...
      </ViewContainer>
    );
  }

  if (!isAnnounceAllowed) {
    return (
      <ViewContainer>
        Competition not found, insufficient permissions or winner declaration not allowed.
      </ViewContainer>
    );
  }

  /**
   * All conditions met, we can now declare results.
   * Show a list of entries for the competition
   */
  return (
    <ViewContainer>
      <div>
        Declaring winners for {competitionId}.
      </div>
      <EntryList competitionId={competitionId} />
    </ViewContainer>
  );
};

DeclareWinners.propTypes = {
  competitionId: PropTypes.string.isRequired,
  fetchCompetition: PropTypes.func.isRequired,
  isAnnounceAllowed: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  isAnnounceAllowed: isCompetitionAnnounceAllowed(state, ownProps.competitionId),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCompetition: getCompetitionById,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeclareWinners);
