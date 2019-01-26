import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { getActiveModalIndex } from './reducer';
import { showPageAtIndex } from './actions';
import styles from './styles.scss';
import { overlayPages } from './constants';

const PageController = ({ activeIndex, setPage }) => (
  <div className={styles.pageController}>
    <div className={styles.dotWrapper}>
      {
        overlayPages.map((Page, idx) => (
          <div
            key={Page}
            className={`${styles.dot} ${activeIndex === idx ? styles.active : ''}`}
            onClick={() => setPage(idx)}
            onKeyDown={() => { }}
            role="button"
            tabIndex={0}
          />
        ))
      }
    </div>
  </div>
);

PageController.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activeIndex: getActiveModalIndex(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setPage: showPageAtIndex,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageController);
