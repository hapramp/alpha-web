/**
 * - Fetch the competition.
 * - See if the current user is the competition owner
 * - If all the conditions are met, show the post editor
 */
import React from 'react';

import ViewContainer from '../../../components/ViewContainer';

const AnnouncementPost = ({
  mode, competitionId, loading, doesCompetitionExist,
  isAnnounceAllowed,
}) => {
  if (loading) {
    return (
      <ViewContainer>
        Loading...
      </ViewContainer>
    );
  }
  if (!doesCompetitionExist || !isAnnounceAllowed) {
    return (
      <ViewContainer>
        Competition not found or insufficient permission.
      </ViewContainer>
    );
  }
  return (
    <ViewContainer>
      <div>
        Writing {mode} post for competition with ID {competitionId}
      </div>
    </ViewContainer>
  );
};

export default AnnouncementPost;
