import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import CommunitySelector from '../../CreatePost/CommunitySelector';

import { getAllCommunities } from '../../../../reducers/communitiesReducer';
import { getSelectedCommunities } from '../reducer';
import { changeCommunity } from '../actions';
import indexStyles from '../../../../styles/globals.scss';

class ArticleNext extends React.Component {
  static propTypes = {
    communities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    selectedCommunities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    changeCommunity: PropTypes.func.isRequired,
  };

  bloop = () => {};

  render() {
    return (
      <div className={`uk-container uk-margin-top uk-padding ${indexStyles.white}`}>
        <CommunitySelector
          communities={this.props.communities}
          selectedCommunities={this.props.selectedCommunities}
          onClick={c => this.props.changeCommunity(c.id)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  communities: getAllCommunities(state),
  selectedCommunities: getSelectedCommunities(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { changeCommunity },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ArticleNext);
