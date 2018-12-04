import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import PrimaryButtom from '../components/buttons/PrimaryButton';
import styles from './styles.scss';
import { register } from './actions';
import CommunityButton from '../components/CommunityButton';
import { isProcessing } from './reducer';

class Register extends React.Component {
  static propTypes = {
    allCommunities: PropTypes.arrayOf(PropTypes.shape()),
    register: PropTypes.func.isRequired,
    processing: PropTypes.bool.isRequired,
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

  registerCommunities = () => {
    const { selectedCommunities } = this.state;

    this.props.register(selectedCommunities);
  };

  selectCommunity = communityId => () => {
    const communitySelected = !!this.state.selectedCommunities.find(i => i === communityId);
    if (communitySelected) {
      this.setState(state => ({
        ...state,
        selectedCommunities: state.selectedCommunities.filter(i => i !== communityId),
      }));
    } else {
      this.setState(state => ({
        ...state,
        selectedCommunities: state.selectedCommunities.concat([communityId]),
      }));
    }
  }

  render() {
    const { allCommunities } = this.props;
    const { selectedCommunities } = this.state;
    return (
      <div className={`uk-container uk-margin-large uk-padding-large ${styles.container}`}>
        <div className={`${styles.headerText} uk-text-center`}>PICK YOUR COMMUNITIES</div>
        <div className={`uk-grid ${styles.communityWrapper}`} style={{ marginBottom: 40 }}>
          {
            allCommunities.map(community => (
              <div className={`${styles.communityContainer} uk-width-1-4@s`} key={community.id}>
                <CommunityButton
                  isSelected={!!selectedCommunities.find(i => i === community.id)}
                  onClick={this.selectCommunity(community.id)}
                  community={community}
                  className={styles.communityButton}
                />
                <div className={styles.communityLabel}>
                  {community.name}
                </div>
              </div>
            ))
          }
        </div>
        <PrimaryButtom disabled={this.props.processing} onClick={this.registerCommunities}>
          {this.props.processing ? 'Processing...' : 'Continue' }
        </PrimaryButtom>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allCommunities: state.communities.communities,
  processing: isProcessing(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  register,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
