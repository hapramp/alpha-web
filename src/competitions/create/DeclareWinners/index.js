import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EntryList from './EntryList';
import ViewContainer from '../../../components/ViewContainer';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { getCompetitionById } from '../../actions';
import { declareWinners as declareCompetitionWinners } from './actions';
import {
  isDeclareInProgress,
  isDeclarePossible as isAllRanksSelected,
} from './reducer';
import { isWinnerDeclareAllowed, getCompetitionById as getCompetition } from '../../reducer';
import PrimaryButton from '../../../components/buttons/PrimaryButton';

const DeclareWinners = ({
  competitionId, fetchCompetition, isAnnounceAllowed, isDeclarePossible,
  isDeclaring, declareWinners, competition,
}) => {
  /**
   * Load competition details and check if we
   * are allowed to announce results
   */
  const [loading, setLoading] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
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
        Declaring winners for {`"${competition.title}"`}.
      </div>
      <EntryList competitionId={competitionId} />
      {
        confirmation && (
          <ConfirmationModal
            confirmActive={!isDeclaring}
            cancelActive={!isDeclaring}
            confirmContent="Declare and Continue"
            cancelContent="Cancel"
            onConfirm={() => declareWinners(competitionId)}
            onCancel={() => setConfirmation(false)}
          >
            <h2>Declare winners and continue?</h2>
            <p>
              Continue to declare the winners. On the next step,
              you can edit and publish a blog to announce the winners.
            </p>
          </ConfirmationModal>
        )
      }
      <div>
        <PrimaryButton
          disabled={!isDeclarePossible && !isDeclaring}
          onClick={() => setConfirmation(true)}
          style={{
            width: 'fit-content',
            padding: '8px 24px',
            marginLeft: 'auto',
          }}
        >
          Next
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
  isDeclaring: PropTypes.bool.isRequired,
  declareWinners: PropTypes.func.isRequired,
  competition: PropTypes.shape(),
};

DeclareWinners.defaultProps = {
  competition: {},
};

const mapStateToProps = (state, ownProps) => ({
  isAnnounceAllowed: isWinnerDeclareAllowed(state, ownProps.competitionId),
  isDeclarePossible: isAllRanksSelected(state, ownProps.competitionId),
  isDeclaring: isDeclareInProgress(state, ownProps.competitionId),
  competition: getCompetition(state, ownProps.competitionId),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCompetition: getCompetitionById,
  declareWinners: declareCompetitionWinners,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeclareWinners);
