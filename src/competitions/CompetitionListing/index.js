import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet-async';

import {
  getAllCompetitions as getAllCompetitionsSelector,
  isCompetitionsFetching,
} from '../reducer';
import { getAllCompetitions as getAllCompetitionsAction } from '../actions';
import styles from './styles.scss';
import CompetitionCard from '../CompetitionCard';
import Leaderboard from '../Leaderboard';

const CompetitionListing = ({ isFetching, competitions, getAllCompetitions }) => {
  useEffect(() => {
    if (!isFetching) {
      getAllCompetitions();
    }
  }, true);

  return (
    <div className={`${styles.container}`}>
      <Helmet>
        <title>Competitions | 1Ramp</title>
        <meta name="title" content="Competitions | 1Ramp" />
        <meta name="twitter:title" content="Competitions | 1Ramp" />
        <meta name="og:title" content="Competitions | 1Ramp" />
        <meta name="description" content="Participate in contests and win exciting prizes" />
        <meta name="twitter:description" content="Participate in contests and win exciting prizes" />
        <meta name="og:description" content="Participate in contests and win exciting prizes" />
        <meta name="og:url" content="https://alpha.1ramp.io/competitions" />
      </Helmet>
      <div>
        <Leaderboard />
      </div>
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
