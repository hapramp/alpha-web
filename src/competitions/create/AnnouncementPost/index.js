import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ViewContainer from '../../../components/ViewContainer';
import MarkdownEditor from '../../../post/create/CreateArticle/MarkdownEditor';
import TagsSelector from '../../../post/create/CreateArticle/ArticleNext/TagsSelector';
import Input from '../../../components/input/Input';
import PrimaryButton from '../../../components/buttons/PrimaryButton';

import {
  setPostContent as setContent, setTags as setPostTags,
  setTitle as setPostTitle, fillAnnouncementPost as fillAnnouncement,
  registerAndCreatePost,
} from './actions';
import { getPostContent, getTags, getTitle, isPostRegistering } from './reducer';
import {
  isCompetitionAvailable, isAnnounceAllowed as canAnnounce,
  getCompetitionById as getCompetition,
} from '../../reducer';
import { getCompetitionById } from '../../actions';

const AnnouncementPost = ({
  mode, competitionId, doesCompetitionExist,
  isAnnounceAllowed, fetchCompetition, postContent,
  setPostContent, tags, setTags, title, setTitle,
  fillAnnouncementPost, isRegistering, register,
}) => {
  /**
   * Fetch competition and use loading variable
   * to check if the action is complete
   */
  const [loading, setLoading] = useState(true);
  useEffect(
    () => {
      setLoading(true);
      fetchCompetition(competitionId)
        .then(() => fillAnnouncementPost(competitionId, mode))
        .finally(() => setLoading(false));
    },
    [competitionId],
  );
  if (loading) {
    return (
      <ViewContainer>
        Loading...
      </ViewContainer>
    );
  }

  /**
   * Now that the request for competition
   * has been completed, check to see if we
   * can see the editor for creating the post
   */
  if (!doesCompetitionExist || !isAnnounceAllowed) {
    return (
      <ViewContainer>
        Competition not found or insufficient permission.
      </ViewContainer>
    );
  }

  /**
   * All good: the competition exists and the current user
   * has proper permissions to make announcement posts
   * for the competition
   * Show the editor
   */
  return (
    <ViewContainer>
      <div>
        Writing {mode} post for competition with ID {competitionId}
      </div>
      <div>
        <Input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="uk-margin-bottom"
        />
        <MarkdownEditor onChange={setPostContent} bodyMarkdown={postContent} />
        <TagsSelector
          tags={tags}
          addTag={tag => setTags([...tags, tag])}
          removeTag={tag => setTags(tags.filter(t => t !== tag))}
          style={{ padding: 0, margin: '24px 0' }}
        />
      </div>
      <div>
        <PrimaryButton
          onClick={() => register(competitionId, mode)}
          disabled={isRegistering}
          style={{
            width: 'fit-content',
            padding: '8px 24px',
            marginLeft: 'auto',
          }}
        >
          Publish and Register
        </PrimaryButton>
      </div>
    </ViewContainer>
  );
};

AnnouncementPost.propTypes = {
  mode: PropTypes.string.isRequired,
  competitionId: PropTypes.string.isRequired,
  doesCompetitionExist: PropTypes.bool.isRequired,
  isAnnounceAllowed: PropTypes.bool.isRequired,
  fetchCompetition: PropTypes.func.isRequired,
  postContent: PropTypes.string.isRequired,
  setPostContent: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTags: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  fillAnnouncementPost: PropTypes.func.isRequired,
  isRegistering: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
};

AnnouncementPost.defaultProps = {
};

const mapStateToProps = (state, ownProps) => ({
  doesCompetitionExist: isCompetitionAvailable(state, ownProps.competitionId),
  isAnnounceAllowed: canAnnounce(state, ownProps.competitionId),
  competition: getCompetition(state, ownProps.competitionId),
  postContent: getPostContent(state),
  tags: getTags(state),
  title: getTitle(state),
  isRegistering: isPostRegistering(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCompetition: getCompetitionById,
  setPostContent: setContent,
  setTags: setPostTags,
  setTitle: setPostTitle,
  fillAnnouncementPost: fillAnnouncement,
  register: registerAndCreatePost,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementPost);
