import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PrimaryButton from '../../../components/buttons/PrimaryButton';
import ViewContainer from '../../../components/ViewContainer';
import Input from '../../../components/input/Input';
import TextArea from '../../../components/input/TextArea';
import styles from './styles.scss';
import { getNewCompetitionField } from './reducer';
import { changeField } from './actions';

const NewCompetitionDescription = ({
  name, description, rules,
  setName, setDescription, setRules,
}) => (
  <ViewContainer>
    <div>
      <Input
        placeholder="Competition Name"
        className="uk-form-large uk-margin-large-bottom"
        value={name}
        onChange={setName}
      />
      <TextArea
        placeholder="Description"
        className="uk-margin-small-bottom"
        rows={2}
        value={description}
        onChange={setDescription}
      />
      <TextArea
        placeholder="Rules"
        rows={2}
        value={rules}
        onChange={setRules}
      />
    </div>
    <div className={styles.bottomBar}>
      <Link to="/competitions/~create/details">
        <PrimaryButton className={styles.button}>
          NEXT
        </PrimaryButton>
      </Link>
    </div>
  </ViewContainer>
);

NewCompetitionDescription.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rules: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  setRules: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  name: getNewCompetitionField(state, 'name'),
  description: getNewCompetitionField(state, 'description'),
  rules: getNewCompetitionField(state, 'rules'),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setName: event => changeField('name', event.target.value),
  setDescription: event => changeField('description', event.target.value),
  setRules: event => changeField('rules', event.target.value),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewCompetitionDescription);
