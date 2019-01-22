import React from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import PrimaryButton from '../../components/buttons/PrimaryButton';
import UserCoverContainer from '../UserCoverContainer';
import { getUserJSONMetadata, isProfileMetaLoading } from '../reducer';
import { loadUserProfileInfo, updateProfile } from '../actions';
import { getAuthUsername } from '../../reducers/authUserReducer';

import styles from './styles.scss';
import inputStyles from '../../styles/globals.scss';

const editableKeys = ['name', 'about', 'location', 'website'];

class EditProfile extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    loadUserProfileInfo: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    updateProfile: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    bio: '',
    location: '',
    website: '',
  };

  componentDidMount() {
    this.makeNetworkRequests(this.props.username);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.username !== newProps.username) {
      this.makeNetworkRequests(newProps.username);
    }
    this.setState({
      name: get(newProps, 'JSONMetadata.profile.name', ''),
      about: get(newProps, 'JSONMetadata.profile.about', ''),
      location: get(newProps, 'JSONMetadata.profile.location', ''),
      website: get(newProps, 'JSONMetadata.profile.website', ''),
      coverImage: get(newProps, 'JSONMetadata.profile.cover_image', null),
    });
  }

  onUpdate = () => {
    const updates = {};
    editableKeys.forEach((key) => {
      if (this.state[key] !== get(this.props, `JSONMetadata.profile.${key}`, '')) {
        updates[key] = this.state[key];
      }
    });
    if (Object.keys(updates).length === 0) {
      return;
    }
    this.props.updateProfile(updates);
  };

  changeContent = (event, key) => {
    const { value } = event.target;
    const newState = { ...this.state };
    newState[key] = value;
    this.setState(newState);
  }

  changeName = event => this.changeContent(event, 'name');
  changeAbout = event => this.changeContent(event, 'about');
  changeLocation = event => this.changeContent(event, 'location');
  changeWebsite = event => this.changeContent(event, 'website');

  makeNetworkRequests = (username) => {
    this.props.loadUserProfileInfo(username);
  }


  render() {
    const { username } = this.props;
    if (this.props.isLoading) {
      return <div className="uk-position-center">Loading...</div>;
    }
    return (
      <div className={`uk-container uk-margin-top uk-padding uk-padding-remove-top ${inputStyles.white}`}>
        <div className={styles.userCoverWrapper}>
          <UserCoverContainer username={username} coverImageUrl={this.state.coverImage} />
        </div>
        <div className="uk-flex uk-flex-center">
          <div className={styles.editorInputContainer}>
            <div className={styles.inputContainer}>
              <div className={styles.label}>NAME</div>
              <div>
                <input
                  className={styles.inputField}
                  onChange={this.changeName}
                  value={this.state.name}
                />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.label}>ABOUT ME</div>
              <div>
                <input
                  className={styles.inputField}
                  onChange={this.changeAbout}
                  value={this.state.about}
                />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.label}>LOCATION</div>
              <div>
                <input
                  className={styles.inputField}
                  onChange={this.changeLocation}
                  value={this.state.location}
                />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.label}>WEBSITE</div>
              <div>
                <input
                  className={styles.inputField}
                  onChange={this.changeWebsite}
                  value={this.state.website}
                />
              </div>
            </div>
            <div className={styles.saveButton}>
              <PrimaryButton onClick={this.onUpdate}>
                Save
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const username = getAuthUsername(state);
  return {
    JSONMetadata: getUserJSONMetadata(state, username),
    username,
    isLoading: isProfileMetaLoading(state, username),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  loadUserProfileInfo, updateProfile,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
