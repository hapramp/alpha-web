import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const CommunitySelector = ({
  communities, selectedCommunities, onClick, className, ...props
}) => (
  <div {...props} className={`${className} ${styles.container}`}>
    <div style={{ color: 'rgba(0, 0, 0, 0.38)', marginBottom: 8 }}>
      <span style={{ fontSize: 14 }}>
        Select Community
      </span>
    </div>
    <div style={{ height: 24 }}>
      {
        communities.map(community => (
          <span
            key={community.id}
            style={{
              padding: '4px 10px',
            }}
            className={`${styles.communityLabel} ${selectedCommunities.includes(community.id) ? styles.communitySelected : styles.communityNormal}`}
            onClick={() => onClick(community)}
            onKeyUp={e => e.keyCode === 13 && onClick(community)}
            role="switch"
            tabIndex={0}
            aria-checked={selectedCommunities.includes(community.id)}
          >
            {community.name}
          </span>
        ))
      }
    </div>
  </div>
);

CommunitySelector.propTypes = {
  communities: PropTypes.arrayOf(PropTypes.shape()),
  selectedCommunities: PropTypes.arrayOf(PropTypes.shape()),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

CommunitySelector.defaultProps = {
  communities: [],
  selectedCommunities: [],
  onClick: () => {},
  className: '',
};

export default CommunitySelector;
