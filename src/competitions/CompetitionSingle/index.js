import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';
import ordinal from 'ordinal-js';
import get from 'lodash/get';

import PostCard from '../../post/PostCard';
import PostLoading from '../../post/PostLoading';
import PostUserMeta from '../../post/PostUserMeta';
import Icon from '../../icons/Icon';
import UserAvatar from '../../components/UserAvatar';
import CompetitionMetaTags from './CompetitionMetaTags';
import ParticipateButton from '../ParticipateButton';

import indexStyles from '../../styles/globals.scss';
import styles from './styles.scss';

import { getSumPrize, getFormattedDate, isParticipatePossible } from '../utils';
import {
  getPostsForCompetition, getCompetitionById as fetchCompetitionById, getCompetitionWinners,
  participateInCompetition,
} from '../actions';
import {
  getCompetitionPostPermlinks, getCompetitionById, isPostsLoading,
  isWinnerDeclareAllowed, isAnnouncePostAllowed, isDeclareWinnerPostAllowed,
} from '../reducer';
import { getAuthUsername } from '../../reducers/authUserReducer';
import { getCompleteHTML } from '../../post/utils';
import PrimaryButton from '../../components/buttons/PrimaryButton';

const CompetitionSingle = ({
  match, postPermlinks, fetchPosts, fetchCompetition,
  competition, fetchWinners, participate, authUsername,
  canDeclareResults, canAnnounce, canDeclareWinnersPost,
  ...props
}) => {
  const { competitionId } = match.params;
  useEffect(
    () => {
      fetchCompetition(competitionId);
      fetchPosts(competitionId);
    },
    [competitionId],
  );

  const isWinnersAnnounced = get(competition, 'winners_announced', false);
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

  const canParticipate = isParticipatePossible(competition.starts_at, competition.ends_at);
  return (
    <div className={`${styles.wrapper} ${indexStyles.white}`}>
      <CompetitionMetaTags competition={competition} />
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
            __html: getCompleteHTML(competition.description),
          }}
          />
        </div>

        {/** Rules */}
        <div className={styles.textParagraph}>
          <h3>Rules</h3>
          <p dangerouslySetInnerHTML={{
            __html: getCompleteHTML(competition.rules),
          }}
          />
        </div>

        {
          // Render participate button if competition not ended
          canParticipate && (
            <ParticipateButton
              participatingTag={competition.participating_tag}
              style={{ marginLeft: 24 }}
            />
          )
        }

        {/* Buttons that only contest creator can see */}
        <div className="uk-grid">
          {
            // Render declare winners button if allowed
            canDeclareResults && (
              <Link to={`/competitions/~create/declare-winners/${competition.id}`} className="uk-margin-small-bottom">
                <PrimaryButton style={{ width: 'fit-content', padding: '8px 24px' }}>
                  Declare Results
                </PrimaryButton>
              </Link>
            )
          }
          {
            // Render competition announcement post creation button
            canAnnounce && (
              <Link to={`/competitions/~create/post/${competition.id}/announce`} className="uk-margin-small-bottom">
                <PrimaryButton style={{ width: 'fit-content', padding: '8px 24px' }}>
                  Post Competition Announcement
                </PrimaryButton>
              </Link>
            )
          }
          {
            // Render competition winner declation post creation button
            canDeclareWinnersPost && (
              <Link to={`/competitions/~create/post/${competition.id}/declare_winners`}>
                <PrimaryButton style={{ width: 'fit-content', padding: '8px 24px' }}>
                  Post Winner Announcement
                </PrimaryButton>
              </Link>
            )
          }
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
              competition.judge_usernames.map(judge => (
                <div className={styles.judgeMeta} key={judge}>
                  <UserAvatar username={judge} size="small" />
                  <div>{judge}</div>
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
          {
            props.isPostsLoading && (
              <div className={`uk-width-1-2@m uk-margin-bottom ${styles.postCardWrapper}`}>
                <div className={styles.postCardContainer}>
                  <PostLoading />
                </div>
              </div>
            )
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
  fetchCompetition: PropTypes.func.isRequired,
  competition: PropTypes.shape(),
  fetchWinners: PropTypes.func.isRequired,
  participate: PropTypes.func.isRequired,
  authUsername: PropTypes.string,
  isPostsLoading: PropTypes.bool.isRequired,
  canDeclareResults: PropTypes.bool.isRequired,
  canAnnounce: PropTypes.bool.isRequired,
  canDeclareWinnersPost: PropTypes.bool.isRequired,
};

CompetitionSingle.defaultProps = {
  competition: null,
  authUsername: null,
};

const mapStateToProps = (state, ownProps) => ({
  postPermlinks: getCompetitionPostPermlinks(state, ownProps.match.params.competitionId),
  competition: getCompetitionById(state, ownProps.match.params.competitionId),
  authUsername: getAuthUsername(state),
  isPostsLoading: isPostsLoading(state, ownProps.match.params.competitionId),
  canDeclareResults: isWinnerDeclareAllowed(state, ownProps.match.params.competitionId),
  canAnnounce: isAnnouncePostAllowed(state, ownProps.match.params.competitionId),
  canDeclareWinnersPost: isDeclareWinnerPostAllowed(state, ownProps.match.params.competitionId),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchPosts: getPostsForCompetition,
    fetchCompetition: fetchCompetitionById,
    fetchWinners: getCompetitionWinners,
    participate: participateInCompetition,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionSingle);
