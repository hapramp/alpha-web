import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EntryList from './EntryList';
import ViewContainer from '../../../components/ViewContainer';
import { getCompetitionById } from '../../actions';
import { isDeclarePossible as isWinnersDeclarePossible } from './reducer';
import { isAnnounceAllowed as isCompetitionAnnounceAllowed } from '../../reducer';
import PrimaryButton from '../../../components/buttons/PrimaryButton';

const DeclareWinners = ({
  competitionId, fetchCompetition, isAnnounceAllowed, isDeclarePossible,
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
      <div>
        <PrimaryButton
          disabled={!isDeclarePossible}
          style={{
            width: 'fit-content',
            padding: '8px 24px',
            marginLeft: 'auto',
          }}
        >
          Declare Results and Continue
        </PrimaryButton>
      </div>
    </ViewContainer>
  );
};

DeclareWinners.propTypes = {
  competitionId: PropTypes.string.isRequired,
  fetchCompetition: PropTypes.func.isRequired,
  isAnnounceAllowed: PropTypes.bool.isRequired,
  isDeclarePossible: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  isAnnounceAllowed: isCompetitionAnnounceAllowed(state, ownProps.competitionId),
  isDeclarePossible: isWinnersDeclarePossible(state, ownProps.competitionId),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCompetition: getCompetitionById,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeclareWinners);
