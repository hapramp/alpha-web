import React from 'react';
import { Link } from 'react-router-dom';

import ViewContainer from '../../../components/ViewContainer';
import InterestsSelector from '../../../post/create/CreatePost/CommunitySelector';
import TagSelector from '../../../post/create/CreateArticle/ArticleNext/TagsSelector';
import Icon from '../../../icons/Icon';
import DefaultButton from '../../../components/buttons/DefaultButton';
import GrayButton from '../../../components/buttons/GrayButton';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import styles from './styles.scss';

const NewCompetitionDetails = () => (
  <ViewContainer>
    <InterestsSelector
      backgroundColor="white"
      interestBackground="#f5f5f5"
      selectedCommunities={[1, 2]}
    />
    <TagSelector
      tags={['lol']}
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
              <input type="date" min={new Date().toISOString().substr(0, 10)} />
              <Icon name="calender" />
            </div>
            <div className="uk-flex">
              <input type="time" min={new Date().toISOString().substr(11, 5)} />
              <Icon name="clock" />
            </div>
          </div>
        </div>
        {/* End time */}
        <div className="uk-flex">
          <div className={styles.label}>Ends At</div>
          <div className={`uk-margin-small-left ${styles.inputsContainer}`}>
            <div className="uk-flex">
              <input type="date" min={new Date().toISOString().substr(0, 10)} />
              <Icon name="calender" />
            </div>
            <div className="uk-flex">
              <input type="time" min={new Date().toISOString().substr(11, 5)} />
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
          <div className={styles.prizeLabel}>
            1<sup>st</sup> Prize:
            <span className={styles.importantMark}>*</span>
          </div>
          <div>
            <input />
          </div>
        </div>
        <div className="uk-flex uk-margin-small-bottom">
          <div className={styles.prizeLabel}>
            3<sup>nd</sup> Prize:
          </div>
          <div>
            <input />
          </div>
        </div>
        <div className="uk-flex uk-margin-small-bottom">
          <div className={styles.prizeLabel}>
            3<sup>rd</sup> Prize:
          </div>
          <div>
            <input />
          </div>
        </div>
      </div>
    </div>

    <div className={styles.imageContainer}>
      <div className={`${styles.header} uk-margin-small-bottom`}>Competition Banner</div>
      <GrayButton className={styles.button}>
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

export default NewCompetitionDetails;
