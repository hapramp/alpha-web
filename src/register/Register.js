import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import { actionTypes } from '../actions/loginActions';
import CommunityButton from '../components/CommunityButton';

class Register extends React.Component {
  static propTypes = {
    allCommunities: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    allCommunities: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedCommunities: [],
    };
  }

  selectCommunity = communityId => () => {
    const communitySelected = !!this.state.selectedCommunities.find(i => i === communityId);
    if (communitySelected) {
      this.setState(state => ({ ...state, selectedCommunities: state.selectedCommunities.filter(i => i !== communityId) }));
    } else {
      this.setState(state => ({ ...state, selectedCommunities: state.selectCommunity.concat([ communityId ])}));
    }
  }

  render() {
    const { allCommunities } = this.props;
    const { selectedCommunities } = this.state;
    return (
      <div className={`uk-container ${styles.container}`}>
        <div>PICK YOUR COMMUNITIES</div>
        <div>
          {
            allCommunities.map(community => (
              <CommunityButton
                key={community.id}
                isSelected={!!selectedCommunities.find(i => i === community.id)}
                onClick={this.selectCommunity(community.id)}
                community={community}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allCommunities: state.communities.communities,
});

const mapDispatchToProps = dispatch => ({
  markRegistered: () => dispatch({ type: actionTypes.REGISTERED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
