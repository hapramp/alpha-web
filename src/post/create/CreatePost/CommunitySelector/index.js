import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles.scss';
import { getAllCommunities } from '../../../../reducers/communitiesReducer';

const CommunitySelector = ({
  communities, selectedCommunities, onClick, className,
  backgroundColor, interestBackground, ...props
}) => (
  <div {...props} style={{ background: backgroundColor }} className={`${className} ${styles.container}`}>
    <div style={{ color: backgroundColor, marginBottom: 8 }}>
      <span className={`${styles.communityHeader}`}>
        Select Communities (Max 3)
      </span>
    </div>
    <div className="uk-flex uk-flex-wrap">
      {
        communities.map(community => (
          <span
            key={community.id}
            style={{
              padding: '4px 10px',
              background: interestBackground,
            }}
            className={`${styles.communityLabel} ${selectedCommunities.includes(community.id) ? styles.communitySelected : styles.communityNormal} uk-margin-small-bottom`}
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
  backgroundColor: PropTypes.string,
  interestBackground: PropTypes.string,
};

CommunitySelector.defaultProps = {
  communities: [],
  selectedCommunities: [],
  onClick: () => {},
  className: '',
  backgroundColor: '#f5f5f5',
  interestBackground: 'white',
};

const mapStateToProps = state => ({
  communities: getAllCommunities(state),
});

export default connect(mapStateToProps)(CommunitySelector);
