import React from 'react';
import PropTypes from 'prop-types';
import ellipsis from 'text-ellipsis';
import { Link } from 'react-router-dom';

import PostUserMeta from '../../post/PostUserMeta';
import CompetitionMeta from '../CompetitionMeta';
import CTAButton from './CTAButton';

import styles from './styles.scss';
import indexStyles from '../../styles/globals.scss';

const CompetitionCard = ({ competition }) => (
  <div className={`${indexStyles.white} ${styles.container}`}>
    <PostUserMeta
      created={competition.created_at.substr(0, 19)}
      communities={competition.communities}
      profile={{
        username: competition.user.username,
        name: competition.user.username,
      }}
    />

    {
      competition.image && (
        <div
          style={{ backgroundImage: `url("${competition.image}")` }}
          className={styles.competitionImage}
        />
      )
    }

    <div className={styles.contentContainer}>
      <Link to={`/competitions/${competition.id}`}>
        <div className={styles.title}>
          {competition.title}
        </div>
      </Link>

      <CompetitionMeta
        prizes={competition.prizes}
        startsAt={competition.starts_at}
        endsAt={competition.ends_at}
        participantCount={competition.participant_count}
      />

      <p className={styles.description}>
        {ellipsis(competition.description, 182)}
      </p>

      <Link to={`/competitions/${competition.id}`} className={styles.ctaContainer}>
        <CTAButton startsAt={competition.starts_at} endsAt={competition.ends_at} />
      </Link>
    </div>
  </div>
);

CompetitionCard.propTypes = {
  competition: PropTypes.shape({
    created_at: PropTypes.string,
    communities: PropTypes.arrayOf(PropTypes.shape()),
    user: PropTypes.shape(),
  }).isRequired,
};

export default CompetitionCard;
