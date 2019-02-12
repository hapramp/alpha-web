import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import uniq from 'lodash/uniq';
import PropTypes from 'prop-types';

import ViewContainer from '../../../components/ViewContainer';
import InterestsSelector from '../../../post/create/CreatePost/CommunitySelector';
import TagSelector from '../../../post/create/CreateArticle/ArticleNext/TagsSelector';
import Icon from '../../../icons/Icon';
import DefaultButton from '../../../components/buttons/DefaultButton';
import GrayButton from '../../../components/buttons/GrayButton';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import { getNewCompetitionField } from './reducer';
import { changeField } from './actions';
import { uploadImage } from '../../../post/create/CreateArticle/actions';
import styles from './styles.scss';
import { getSumPrize } from '../../utils';

const NewCompetitionDetails = props => (
  <ViewContainer style={{ paddingBottom: 80 }}>
    <InterestsSelector
      backgroundColor="white"
      interestBackground="#f5f5f5"
      selectedCommunities={props.interests}
      onClick={(community) => {
        /**
         * Handle logic when an interest is selected
         */
        const { id } = community;
        let newInterests;
        if (props.interests.indexOf(id) >= 0) { // Already selected
          newInterests = props.interests.filter(iId => iId !== id);
          return props.changeField('interests', newInterests);
        } else if (props.interests.length < 3) { // Can select more interests
          newInterests = props.interests.concat([id]);
          return props.changeField('interests', newInterests);
        }
        return null;
      }}
    />
    <TagSelector
      tags={props.tags}
      addTag={tag => props.changeField('tags', uniq([...props.tags, tag.toLowerCase()]))}
      removeTag={tag => props.changeField('tags', props.tags.filter(t => t !== tag))}
    />

    {/* Time range selector */}
    <div className={styles.dateRangeContainer}>
      <div className={styles.header}>Timings</div>
      <div className="uk-grid uk-margin-top">
        {/* Start time */}
        <div className="uk-flex">
          <div>Starts At</div>
          <div className={`uk-margin-small-left ${styles.inputsContainer}`}>
            <div className="uk-flex">
              <input
                type="date"
                min={new Date().toISOString().substr(0, 10)}
                value={props.startDate.date}
                onChange={event => props.changeField('startDate', { ...props.startDate, date: event.target.value })}
              />
              <Icon name="calender" />
            </div>
            <div className="uk-flex">
              <input
                type="time"
                min={new Date().toISOString().substr(11, 5)}
                value={props.startDate.time}
                onChange={event => props.changeField('startDate', { ...props.startDate, time: event.target.value })}
              />
              <Icon name="clock" />
            </div>
          </div>
        </div>
        {/* End time */}
        <div className="uk-flex">
          <div className={styles.label}>Ends At</div>
          <div className={`uk-margin-small-left ${styles.inputsContainer}`}>
            <div className="uk-flex">
              <input
                type="date"
                // Should not be before start date
                min={props.startDate.date || new Date().toISOString().substr(0, 10)}
                value={props.endDate.date}
                onChange={event => props.changeField('endDate', { ...props.endDate, date: event.target.value })}
              />
              <Icon name="calender" />
            </div>
            <div className="uk-flex">
              <input
                type="time"
                min={new Date().toISOString().substr(11, 5)}
                value={props.endDate.time}
                onChange={event => props.changeField('endDate', { ...props.endDate, time: event.target.value })}
              />
              <Icon name="clock" />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* For entering prizes */}
    <div className={styles.prizesEntry}>
      <div className={styles.header}>Prizes</div>
      <div className="uk-margin-top">
        <div className="uk-flex uk-margin-small-bottom">
          <div className={styles.prizeLabel}>Total:</div>
          <div style={{ padding: '0 8px' }}>{getSumPrize(props.prizes.filter(p => p.length))}</div>
        </div>
        <div className="uk-flex uk-margin-small-bottom">
          <div className={styles.prizeLabel}>
            1<sup>st</sup> Prize:
            <span className={styles.importantMark}>*</span>
          </div>
          <div>
            <input
              value={props.prizes[0]}
              onChange={(event) => {
                const newPrizes = [...props.prizes];
                newPrizes[0] = event.target.value;
                props.changeField('prizes', newPrizes);
              }}
            />
          </div>
        </div>
        <div className="uk-flex uk-margin-small-bottom">
          <div className={styles.prizeLabel}>
            3<sup>nd</sup> Prize:
          </div>
          <div>
            <input
              value={props.prizes[1]}
              onChange={(event) => {
                const newPrizes = [...props.prizes];
                newPrizes[1] = event.target.value;
                props.changeField('prizes', newPrizes);
              }}
            />
          </div>
        </div>
        <div className="uk-flex uk-margin-small-bottom">
          <div className={styles.prizeLabel}>
            3<sup>rd</sup> Prize:
          </div>
          <div>
            <input
              value={props.prizes[2]}
              onChange={(event) => {
                const newPrizes = [...props.prizes];
                newPrizes[2] = event.target.value;
                props.changeField('prizes', newPrizes);
              }}
              className="uk-margin-small-bottom"
            />
          </div>
        </div>
      </div>
    </div>

    <div className={styles.imageContainer}>
      <div className={`${styles.header} uk-margin-small-bottom`}>Competition Banner</div>
      {
        props.image && (
          <img
            src={props.image}
            alt=""
          />
        )
      }
      <GrayButton
        className={styles.button}
        onClick={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.addEventListener('change', () => {
            if (input.files.length > 0) {
              const [file] = input.files;
              props.uploadImage(file)
                .then(({ url }) => {
                  props.changeField('image', url);
                });
            }
          });
          input.click();
        }}
      >
        Choose Image
      </GrayButton>
    </div>

    <div className={styles.bottomBar}>
      <Link to="/competitions/~create">
        <DefaultButton className={styles.button}>
          GO BACK
        </DefaultButton>
      </Link>
      <PrimaryButton className={styles.button}>
        PUBLISH
      </PrimaryButton>
    </div>
  </ViewContainer>
);

NewCompetitionDetails.propTypes = {
  changeField: PropTypes.func.isRequired,
  interests: PropTypes.arrayOf(PropTypes.number).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  startDate: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
  }).isRequired,
  endDate: PropTypes.shape({
    date: PropTypes.string,
    time: PropTypes.string,
  }).isRequired,
  prizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tags: getNewCompetitionField(state, 'tags'),
  interests: getNewCompetitionField(state, 'interests'),
  startDate: getNewCompetitionField(state, 'startDate'),
  endDate: getNewCompetitionField(state, 'endDate'),
  prizes: getNewCompetitionField(state, 'prizes'),
  image: getNewCompetitionField(state, 'image'),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { changeField, uploadImage },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(NewCompetitionDetails);
