import React from 'react';
import { Link } from 'react-router-dom';

import PrimaryButton from '../../../components/buttons/PrimaryButton';
import ViewContainer from '../../../components/ViewContainer';
import Input from '../../../components/input/Input';
import TextArea from '../../../components/input/TextArea';
import styles from './styles.scss';

const NewCompetitionDescription = () => (
  <ViewContainer>
    <div>
      <Input
        placeholder="Competition Name"
        className="uk-form-large uk-margin-large-bottom"
      />
      <TextArea
        placeholder="Description"
        className="uk-margin-small-bottom"
        rows={2}
      />
      <TextArea
        placeholder="Rules"
        rows={2}
      />
    </div>
    <div className={styles.bottomBar}>
      <Link to="/competitions/~create/details">
        <PrimaryButton className={styles.button}>
          CONTINUE
        </PrimaryButton>
      </Link>
    </div>
  </ViewContainer>
);

export default NewCompetitionDescription;
