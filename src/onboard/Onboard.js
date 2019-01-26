import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import { shouldShowModal, getActiveModalIndex, shouldShowNextButton } from './reducer';
import { startOnboarding, stopOnboarding, showNextPage } from './actions';
import { onboardCookieKey, overlayPages } from './constants';
import BodyModal from '../components/BodyModal';
import Icon from '../icons/Icon';
import PageController from './PageController';
import styles from './styles.scss';

class Onboard extends React.Component {
  static propTypes = {
    startOnboarding: PropTypes.func.isRequired,
    stopOnboarding: PropTypes.func.isRequired,
    showNextPage: PropTypes.func.isRequired,
    shouldShowModal: PropTypes.bool.isRequired,
    shouldShowNextButton: PropTypes.bool.isRequired,
    activeModalIndex: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    /**
     * If user is not signed in and (s)he has not already seen the onboarding,
     * show the onboarding
     */
    if (!Cookies.get(onboardCookieKey, false) && !Cookies.get('access_token', false)) {
      this.props.startOnboarding();
    }
    Cookies.set(onboardCookieKey, true);
  }

  render() {
    // Get the current active page component
    const ModalPage = overlayPages[this.props.activeModalIndex];
    return (
      <BodyModal
        isOpen={this.props.shouldShowModal}
        onRequestClose={this.props.stopOnboarding}
        className="uk-position-center"
      >
        <div className={styles.modalWrapper}>
          <ModalPage />

          {/** Cancel button */}
          <div
            className={styles.closeButton}
            onClick={this.props.stopOnboarding}
            role="button"
            tabIndex={-1}
            onKeyDown={() => { }}
          >
            <Icon name="cancel" />
          </div>

          {
            this.props.shouldShowNextButton && (
              <div
                className={styles.nextButton}
                onClick={this.props.showNextPage}
                role="button"
                tabIndex={-1}
                onKeyDown={() => { }}
              >
                Next
              </div>
            )
          }

          <PageController />
        </div>
      </BodyModal>
    );
  }
}

const mapStateToProps = state => ({
  shouldShowModal: shouldShowModal(state),
  shouldShowNextButton: shouldShowNextButton(state),
  activeModalIndex: getActiveModalIndex(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  startOnboarding, stopOnboarding, showNextPage,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Onboard);
