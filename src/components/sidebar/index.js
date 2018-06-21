import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import indexStyles from '../../index.scss';

const Sidebar = props => (
  <div className={['uk-margin-top', 'uk-padding', 'uk-padding-remove-right', indexStyles.white, styles.sideBarContainer].join(' ')}>
    <div className={[styles.communitiesHeader].join(' ')}>COMMUNITIES</div>
    <div>
      {props.communities.map(community => (
        <Link key={community.id} to={`/browse/${community.tag}`} className={[].join(' ')}>
          <div
            className={['uk-margin-top', styles.communityContainer, indexStyles.transition,
              props.match.params.community === community.tag ? styles.active : ''].join(' ')}
          >
            <img
              src={community.image_uri}
              className={['uk-border-circle', styles.communityImage].join(' ')}
              alt=""
            />
            <span className={['uk-margin-left'].join(' ')}>{community.name}</span>
          </div>
        </Link>))}
    </div>
  </div>
);

Sidebar.propTypes = {
  communities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    tag: PropTypes.string.isRequired,
    image_uri: PropTypes.string,
  })),
  match: PropTypes.shape({
    params: PropTypes.shape.isRequired,
  }),
};

Sidebar.defaultProps = {
  communities: [],
  match: {
    params: {},
  },
};

const mapStateToProps = state => ({
  communities: state.communities.communities,
});

export default withRouter(connect(mapStateToProps)(Sidebar));
