import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

// Show modal at app root
const parentSelector = () => document.getElementById('root');
const preventParentScroll = () => {
  document.body.style.overflow = 'hidden';
};
const enableParentScroll = () => {
  document.body.removeAttribute('style');
};

const noOp = () => { };

const BodyModal = props => (
  <Modal
    {...props}
    /**
     * The document starts scrolling once the modal is
     * scrolled to bottom. To prevent this, disable document
     * scrolling once the modal is active and enable
     * it again when done
     */
    onAfterOpen={() => {
      if (props.onAfterOpen) {
        props.onAfterOpen();
      }
      preventParentScroll();
    }}
    onAfterClose={() => {
      if (props.onAfterClose) {
        props.onAfterClose();
      }
      enableParentScroll();
    }}
    parentSelector={parentSelector}
  />
);

BodyModal.propTypes = {
  onAfterOpen: PropTypes.func,
  onAfterClose: PropTypes.func,
  style: PropTypes.shape({}),
};

BodyModal.defaultProps = {
  onAfterOpen: noOp,
  onAfterClose: noOp,
  style: {
    overlay: {
      backgroundColor: '#fafafafa',
      zIndex: 1,
    },
    content: {
      boxShadow: '0 4px 12px rgba(0,0,0,.15)',
    },
  },
};

export default BodyModal;
