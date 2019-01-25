import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import styles from './styles.scss';
import { participateInCompetition } from '../actions';
import { getAuthUsername } from '../../reducers/authUserReducer';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SignInButton from '../../components/buttons/SignInButton';

/**
 * This component renders a participate button
 * if the user is logged in, else it renders a
 * button which takes them to the SteemConnect
 * login page.
 */
const ParticipateButton = ({
  authUsername, participate, participatingTag, isLink,
  ...props
}) => (
  authUsername ? (
    <PrimaryButton
      className={styles.buttonContainer}
      // Do not go to participate if there is a link in parent
      onClick={() => !isLink && participate(participatingTag)}
      {...props}
    >
      Participate
    </PrimaryButton>
  ) : (
    <SignInButton
      ButtonComponent={PrimaryButton}
      className={styles.buttonContainer}
      {...props}
    >
      Sign in to participate
    </SignInButton>
  )
);

ParticipateButton.propTypes = {
  authUsername: PropTypes.string,
  participate: PropTypes.func.isRequired,
  participatingTag: PropTypes.string.isRequired,
  isLink: PropTypes.bool,
};

ParticipateButton.defaultProps = {
  authUsername: null,
  isLink: false,
};

const mapStateToProps = state => ({
  authUsername: getAuthUsername(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  participate: participateInCompetition,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ParticipateButton);
