import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { joinMicroCommunity } from '../actions';
import { hasCurrentUserJoinedTag } from '../reducer';
import styles from './styles.scss';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import GrayButton from '../../components/buttons/GrayButton';

const MicroCommunityInfo = ({ microCommunity, hasJoined, join }) => (
  <div className={styles.infoContainer}>
    <div>
      <img src={microCommunity.image_url} alt={microCommunity.tag} />
      <div className={styles.tag}>#{microCommunity.tag}</div>
      <div className={styles.button}>
        {
          hasJoined
          ? (
            <GrayButton onClick={() => join(microCommunity.tag, true)}>
              JOINED
            </GrayButton>
          ) : (
            <PrimaryButton onClick={() => join(microCommunity.tag)}>
              JOIN
            </PrimaryButton>
          )
        }
      </div>
      <div className={styles.description}>{microCommunity.description}</div>
    </div>
  </div>
);

MicroCommunityInfo.propTypes = {
  microCommunity: PropTypes.shape({}),
  hasJoined: PropTypes.bool.isRequired,
  join: PropTypes.func.isRequired,
};

MicroCommunityInfo.defaultProps = {
  microCommunity: {},
};

const mapStateToProps = (state, ownProps) => ({
  hasJoined: hasCurrentUserJoinedTag(state, ownProps.microCommunity.tag),
});

export default connect(mapStateToProps, { join: joinMicroCommunity })(MicroCommunityInfo);
