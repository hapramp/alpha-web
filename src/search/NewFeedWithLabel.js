import React from 'react';

import NewFeed from '../feed/NewFeed';

export default ({ ...props }) => (
  <div>
    <div className="uk-text-center uk-margin-top uk-margin-small-bottom">
      New on 1Ramp
    </div>
    <NewFeed {...props} />
  </div>
);
