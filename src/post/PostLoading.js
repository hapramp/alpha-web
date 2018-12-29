import React from 'react';
import ContentLoader from 'react-content-loader';

export default props => (
  <div style={{ marginBottom: 32, background: 'white' }}>
    <ContentLoader
      height={856}
      width={800}
      speed={1}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      {...props}
    >
      {/** Avatar */}
      <circle cx="64" cy="64" r="32" />

      {/** Name and date */}
      <rect x="108" y="40" rx="4" ry="4" width="80" height="16" />
      <rect x="198" y="38" rx="0" ry="0" width="2" height="20" />
      <rect x="210" y="40" rx="4" ry="4" width="50" height="16" />

      {/** Interests */}
      <rect x="108" y="72" rx="4" ry="4" width="60" height="16" />
      <rect x="178" y="72" rx="4" ry="4" width="60" height="16" />
      <rect x="250" y="72" rx="4" ry="4" width="60" height="16" />

      {/** Image */}
      <rect x="0" y="120" rx="0" ry="0" width="800" height="450" />

      {/** Text */}
      <rect x="32" y="600" rx="4" ry="4" width="736" height="36" />
      <rect x="32" y="656" rx="4" ry="4" width="736" height="18" />
      <rect x="32" y="680" rx="4" ry="4" width="600" height="18" />

      {/** Rating */}
      <circle cx="50" cy="740" r="16" />
      <rect x="76" y="729" rx="4" ry="4" width="64" height="22" />
      <rect x="550" y="729" rx="4" ry="4" width="140" height="22" />
      <circle cx="754" cy="740" r="16" />
      <circle cx="736" cy="740" r="16" />
      <circle cx="720" cy="740" r="16" />

      {/** Separator */}
      <rect x="32" y="776" rx="0" ry="0" width="736" height="2" />

      {/** Comments and payout */}
      <circle cx="50" cy="810" r="16" />
      <rect x="76" y="799" rx="4" ry="4" width="36" height="22" />
      <circle cx="144" cy="810" r="16" />
      <rect x="170" y="799" rx="4" ry="4" width="36" height="22" />
    </ContentLoader>
  </div>
);
