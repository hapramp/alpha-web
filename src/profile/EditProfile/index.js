import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import PrimaryButton from '../../components/buttons/PrimaryButton';
import UserCoverContainer from '../UserCoverContainer';
import { getUserJSONMetadata, isProfileMetaLoading } from '../reducer';
import { loadUserProfileInfo } from '../actions';
import { getAuthUsername } from '../../reducers/authUserReducer';

import styles from './styles.scss';
import inputStyles from '../../styles/globals.scss';

class EditProfile extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    loadUserProfileInfo: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
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
      name: _.get(newProps, 'JSONMetadata.profile.name', ''),
      bio: _.get(newProps, 'JSONMetadata.profile.about', ''),
      location: _.get(newProps, 'JSONMetadata.profile.location', ''),
      website: _.get(newProps, 'JSONMetadata.profile.website', ''),
      coverImage: _.get(newProps, 'JSONMetadata.profile.cover_image', null),
    });
  }

  onUpdate = () => { };

  changeContent = (event, key) => {
    const { value } = event.target;
    const newState = { ...this.state };
    newState[key] = value;
    this.setState(newState);
  }

  changeName = event => this.changeContent(event, 'name');
  changeBio = event => this.changeContent(event, 'bio');
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
      <div className={inputStyles.white}>
        <UserCoverContainer username={username} coverImageUrl={this.state.coverImage} />
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
                  onChange={this.changeBio}
                  value={this.state.bio}
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
  loadUserProfileInfo,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
