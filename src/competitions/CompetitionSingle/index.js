import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';
import ordinal from 'ordinal-js';
import _ from 'lodash';

import PostCard from '../../post/PostCard';
import PostUserMeta from '../../post/PostUserMeta';
import Icon from '../../icons/Icon';
import UserAvatar from '../../components/UserAvatar';

import indexStyles from '../../styles/globals.scss';
import styles from './styles.scss';

import { getSumPrize, getFormattedDate } from '../utils';
import { getPostsForCompetition, getAllCompetitions, getCompetitionWinners } from '../actions';
import { getCompetitionPostPermlinks, getCompetitionById } from '../reducer';

const CompetitionSingle = ({
  match, postPermlinks, fetchPosts, fetchCompetitions,
  competition, fetchWinners,
}) => {
  const { competitionId } = match.params;
  useEffect(
    () => {
      fetchCompetitions();
      fetchPosts(competitionId);
    },
    [competitionId],
  );

  const isWinnersAnnounced = _.get(competition, 'winners_announced', false);
  useEffect(
    () => {
      if (isWinnersAnnounced) {
        fetchWinners(competitionId);
      }
    },
    [competitionId, isWinnersAnnounced],
  );

  if (!competition) {
    return <div>Loading...</div>;
  }
  return (
    <div className={`${styles.wrapper} ${indexStyles.white}`}>
      <div className={styles.container}>
        {/** Competition header with metadata */}
        <PostUserMeta
          created={competition.created_at.substr(0, 19)}
          communities={competition.communities}
          profile={{
            username: competition.user.username,
            name: competition.user.username,
          }}
        />

        {/** Competition cover image */}
        {
          competition.image && (
            <div
              style={{ backgroundImage: `url("${competition.image}")` }}
              className={styles.image}
            />
          )
        }

        {/** Title */}
        <div className={styles.title}>
          {competition.title}
        </div>

        {/** Prizes */}
        <div className={styles.twoSectionInfo}>
          <div><Icon name="award" /></div>
          <div>
            <div><b>Total</b>: {getSumPrize(competition.prizes)}</div>
            {
              competition.prizes.map((prize, idx) => (
                <div key={prize}>
                  <b>{ordinal.toOrdinal(idx + 1)} Prize</b>: {prize}
                </div>
              ))
            }
          </div>
        </div>

        {/** Time related details */}
        <div className={styles.twoSectionInfo}>
          <div><Icon name="clock" /></div>
          <div>
            <div>
              <b>Starts at</b>: {getFormattedDate(competition.starts_at)}
            </div>
            <div>
              <b>Ends at</b>: {getFormattedDate(competition.ends_at)}
            </div>
          </div>
        </div>

        {/** Description */}
        <div className={styles.textParagraph}>
          <h3>Description</h3>
          <p dangerouslySetInnerHTML={{
              __html: window.markdownToHtmlConverter.makeHtml(competition.description),
            }}
          />
        </div>

        {/** Rules */}
        <div className={styles.textParagraph}>
          <h3>Rules</h3>
          <p dangerouslySetInnerHTML={{
              __html: window.markdownToHtmlConverter.makeHtml(competition.rules),
            }}
          />
        </div>

        {/** Hashtag info */}
        <div className={styles.hashTagText}>
          Participate using&nbsp;
          <span>#{competition.participating_tag}</span>
          <CopyToClipboard text={competition.participating_tag}>
            <Icon name="copy-paste" uk-tooltip="Copy to clipboard" />
          </CopyToClipboard>
          from any steem platform.
        </div>

        {/** Judge info */}
        <div className={styles.judgesContainer}>
          <h4>JUDGES</h4>
          <div className="uk-grid">
            {
              competition.judges.map(judge => (
                <div className={styles.judgeMeta} key={judge.username}>
                  <UserAvatar username={judge.username} size="small" />
                  <div>{judge.username}</div>
                </div>
              ))
            }
          </div>
        </div>

        {/** Entry count */}
        <div className={styles.entryCount}>
          <span>{competition.post_count}</span> ENTR{competition.post_count === 1 ? 'Y' : 'IES'}
        </div>

        {/** Render entries */}
        <div className="uk-grid">
          {
            postPermlinks.map(permlink => (
              <div key={permlink} className={`uk-width-1-2@m uk-margin-bottom ${styles.postCardWrapper}`}>
                <div className={styles.postCardContainer}>
                  <PostCard postPermlink={permlink} border maintainAspectRatio showPrize />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

CompetitionSingle.propTypes = {
  match: PropTypes.shape().isRequired,
  postPermlinks: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchPosts: PropTypes.func.isRequired,
  fetchCompetitions: PropTypes.func.isRequired,
  competition: PropTypes.shape(),
  fetchWinners: PropTypes.func.isRequired,
};

CompetitionSingle.defaultProps = {
  competition: null,
};

const mapStateToProps = (state, ownProps) => ({
  postPermlinks: getCompetitionPostPermlinks(state, ownProps.match.params.competitionId),
  competition: getCompetitionById(state, ownProps.match.params.competitionId),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchPosts: getPostsForCompetition,
    fetchCompetitions: getAllCompetitions,
    fetchWinners: getCompetitionWinners,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionSingle);
