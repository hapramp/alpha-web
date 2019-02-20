/**
 * Component to assign rank to an entry
 * for a contest.
 */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import {
  setRank as setEntryRank,
  unsetRank as unsetEntryRank,
} from './actions';
import { getAllRanks } from './reducer';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import DefaultButton from '../../../components/buttons/DefaultButton';

const RankAssigner = ({
  allRanks, permlink, setRank, competitionId,
  unsetRank,
}) => {
  const [open, setOpen] = useState(false);

  // Find out the rank data for current permlink
  const myRank = allRanks.find(r => r.permlink === permlink);
  if (myRank) {
    return (
      <PrimaryButton
        style={{
          background: 'black',
          color: 'white',
          borderRadius: 0,
        }}
        onClick={() => unsetRank(competitionId, myRank.rank)}
      >
        Rank: {myRank.rank} ({myRank.prize})
        <span style={{ fontFamily: 'monospace', marginLeft: 8 }}>x</span>
      </PrimaryButton>
    );
  }

  // Find out the ranks which are not alloted to any posts
  const unassignedRanks = allRanks.filter(r => !r.permlink);

  return (
    <div>
      <PrimaryButton onClick={() => setOpen(!open)} style={{ borderRadius: 0 }}>
        Assign Rank
      </PrimaryButton>
      {
        open && (
          // Render buttons for assigning the available ranks the permlink
          <div>
            {
              unassignedRanks.map(r => (
                <DefaultButton
                  key={r.rank}
                  onClick={() => {
                    setOpen(false);
                    setRank(competitionId, permlink, r.rank);
                  }}
                  style={{ borderRadius: 0 }}
                >
                  {r.rank} ({r.prize})
                </DefaultButton>
              ))
            }
          </div>
        )
      }
    </div>
  );
};

RankAssigner.propTypes = {
  allRanks: PropTypes.arrayOf(PropTypes.shape),
  permlink: PropTypes.string.isRequired,
  setRank: PropTypes.func.isRequired,
  competitionId: PropTypes.string.isRequired,
  unsetRank: PropTypes.func.isRequired,
};

RankAssigner.defaultProps = {
  allRanks: [],
};

const mapStateToProps = (state, ownProps) => ({
  allRanks: getAllRanks(state, ownProps.competitionId),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setRank: setEntryRank,
  unsetRank: unsetEntryRank,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RankAssigner);
