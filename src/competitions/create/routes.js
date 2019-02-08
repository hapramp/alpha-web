import React from 'react';
import { Switch, Route } from 'react-router-dom';

export default () => (
  <Switch>
    <Route exact path="/competitions/~create/description" render={() => 'Description'} />
    <Route exact path="/competitions/~create/details" render={() => 'Details'} />
    <Route exact path="/competitions/~create/post/:competitionId/announce" render={() => 'Announce'} />,
  </Switch>
);
