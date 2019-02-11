import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Description from './newCompetition/Description';
import Details from './newCompetition/Details';

export default () => (
  <Switch>
    <Route exact path="/competitions/~create" component={Description} />
    <Route exact path="/competitions/~create/details" component={Details} />
    <Route exact path="/competitions/~create/post/:competitionId/announce" render={() => 'Announce'} />,
  </Switch>
);
