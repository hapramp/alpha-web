import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ViewContainer from '../../../components/ViewContainer';
import { getCompetitionById } from '../../actions';
import { isAnnounceAllowed as isCompetitionAnnounceAllowed } from '../../reducer';

const DeclareWinners = ({
  competitionId, fetchCompetition, isAnnounceAllowed,
}) => {
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

  return (
    <ViewContainer>
      Declaring winners for {competitionId}.
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
