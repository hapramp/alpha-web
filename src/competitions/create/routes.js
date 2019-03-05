import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Description from './newCompetition/Description';
import Details from './newCompetition/Details';
import AnnouncementPost from './AnnouncementPost';
import DeclareWinners from './DeclareWinners';

export default () => (
  <Switch>
    <Route exact path="/competitions/~create" component={Description} />
    <Route exact path="/competitions/~create/details" component={Details} />
    <Route
      exact
      path="/competitions/~create/declare-winners/:competitionId"
      render={({ match }) => {
        const { params } = match;
        const { competitionId } = params;
        return <DeclareWinners competitionId={competitionId} />;
      }}
    />
    <Route
      exact
      path="/competitions/~create/post/:competitionId/:mode"
      render={({ match }) => {
        const { params } = match;
        const { competitionId, mode } = params;

        // Announcement can be one of these only
        if (!['declare_winners', 'announce'].find(i => i === mode)) {
          return <Redirect to="/competitions" />;
        }

        return <AnnouncementPost competitionId={competitionId} mode={mode} />;
      }}
    />,
  </Switch>
);
