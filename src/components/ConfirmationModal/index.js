import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from '../buttons/PrimaryButton';
import DefaultButton from '../buttons/DefaultButton';
import BodyModal from '../BodyModal';
import styles from './styles.scss';

const noop = () => { };

const ConfirmationModal = ({
  onConfirm, onCancel, children, confirmContent,
  cancelContent, confirmActive, cancelActive,
}) => (
  <BodyModal
    isOpen
    onClose={onCancel}
    className="uk-position-center"
  >
    <div className={styles.modalContainer}>
      <div style={{ maxHeight: 200 }}>
        {children}
      </div>

      {/* Cancel/Confirm buttons */}
      <div className="uk-flex uk-flex-right">
        <DefaultButton
          className="uk-margin-right"
          onClick={onCancel}
          disabled={!cancelActive}
        >
          {cancelContent}
        </DefaultButton>
        <PrimaryButton
          onClick={onConfirm}
          disabled={!confirmActive}
        >
          {confirmContent}
        </PrimaryButton>
      </div>
    </div>
  </BodyModal>
);

const contentPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.node,
  PropTypes.arrayOf(PropTypes.node),
]);

ConfirmationModal.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  children: contentPropType,
  confirmContent: contentPropType,
  cancelContent: contentPropType,
  confirmActive: PropTypes.bool,
  cancelActive: PropTypes.bool,
};

ConfirmationModal.defaultProps = {
  onConfirm: noop,
  onCancel: noop,
  children: 'Confirm?',
  confirmContent: 'Confirm',
  cancelContent: 'Cancel',
  confirmActive: true,
  cancelActive: true,
};

export default ConfirmationModal;
