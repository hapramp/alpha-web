import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CommunityCard from '../communityCard';
import styles from './styles.scss';

const Browse = props => (
  <div className={['uk-container', 'uk-margin-large-top', 'uk-margin-large-bottom'].join(' ')}>
    <div className={['uk-margin-bottom', styles.browseHeader].join(' ')}>
      SELECT COMMUNITY
    </div>
    <div uk-grid="true" className="uk-grid-large uk-child-width-expand@s">
      {props.communities.map(community => (
        <CommunityCard
          key={community.id}
          community={community}
        />))}
    </div>
  </div>);

Browse.propTypes = {
  communities: PropTypes.arrayOf(PropTypes.shape),
};

Browse.defaultProps = {
  communities: [],
};

const mapStateToProps = state => ({
  communities: state.communities.communities,
});

export default connect(mapStateToProps)(Browse);
