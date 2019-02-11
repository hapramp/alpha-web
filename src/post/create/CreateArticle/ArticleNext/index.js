import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CommunitySelector from '../../CreatePost/CommunitySelector';
import TagsSelector from './TagsSelector';
import DefaultButton from '../../../../components/buttons/DefaultButton';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';

import { getSelectedCommunities, getActiveTags, isArticlePublishable } from '../reducer';
import { changeCommunity, addTag, removeTag, createArticle } from '../actions';
import indexStyles from '../../../../styles/globals.scss';
import styles from './styles.scss';

class ArticleNext extends React.Component {
  static propTypes = {
    selectedCommunities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    changeCommunity: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    addTag: PropTypes.func.isRequired,
    removeTag: PropTypes.func.isRequired,
    isPublishEnabled: PropTypes.bool.isRequired,
    createArticle: PropTypes.func.isRequired,
  };

  bloop = () => {};

  render() {
    return (
      <div className={`uk-container uk-padding ${indexStyles.white}`}>
        <CommunitySelector
          selectedCommunities={this.props.selectedCommunities}
          onClick={c => this.props.changeCommunity(c.id)}
          className={styles.communitySelectorContainer}
        />
        <TagsSelector
          tags={this.props.tags}
          addTag={this.props.addTag}
          removeTag={this.props.removeTag}
          className={styles.tagsSelectorContainer}
        />
        <div className="uk-flex uk-flex-right">
          <Link to="/create/article">
            <DefaultButton
              className="uk-margin-small-right"
            >
              Back
            </DefaultButton>
          </Link>
          <PrimaryButton
            disabled={!this.props.isPublishEnabled}
            onClick={this.props.createArticle}
          >
            Publish
          </PrimaryButton>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedCommunities: getSelectedCommunities(state),
  tags: getActiveTags(state),
  isPublishEnabled: isArticlePublishable(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    changeCommunity,
    addTag,
    removeTag,
    createArticle,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ArticleNext);
