import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <Link to="/profile/edit">
    <div className="uk-button uk-button-default uk-margin-top" style={{ borderRadius: 20 }}>
      Edit Profile
    </div>
  </Link>
);
