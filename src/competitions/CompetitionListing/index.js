import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  getAllCompetitions as getAllCompetitionsSelector,
  isCompetitionsFetching,
} from '../reducer';
import { getAllCompetitions as getAllCompetitionsAction } from '../actions';
import styles from './styles.scss';
import CompetitionCard from '../CompetitionCard';

const CompetitionListing = ({ isFetching, competitions, getAllCompetitions }) => {
  useEffect(() => {
    if (!isFetching) {
      getAllCompetitions();
    }
  }, true);

  return (
    <div className={`${styles.container}`}>
      <div className="uk-grid">
        {
          competitions.map(competition => (
            <div key={competition.id} className={`uk-width-1-2@m ${styles.competitionCardContainer}`}>
              <CompetitionCard competition={competition} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

CompetitionListing.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  competitions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  getAllCompetitions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  competitions: getAllCompetitionsSelector(state),
  isFetching: isCompetitionsFetching(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { getAllCompetitions: getAllCompetitionsAction },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionListing);
