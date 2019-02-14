import { push } from 'connected-react-router';

import { getNewCompetitionField } from './reducer';

export const baseName = '@competitions/create/newCompetition';

export const actionTypes = {
  changeField: `${baseName}/changeField`,
  createCompetition: {
    init: `${baseName}/createCompetition/init`,
    done: `${baseName}/createCompetition/done`,
    error: `${baseName}/createCompetition/error`,
  },
};

export const changeField = (field, value) => dispatch => dispatch({
  type: actionTypes.changeField, field, value,
});

export const createCompetition = () => (dispatch, getState, { haprampAPI, notify }) => {
  const state = getState();

  const name = getNewCompetitionField(state, 'name');
  const description = getNewCompetitionField(state, 'description');
  const rules = getNewCompetitionField(state, 'rules');
  const interests = getNewCompetitionField(state, 'interests');
  const startDateObj = getNewCompetitionField(state, 'startDate');
  const endDateObj = getNewCompetitionField(state, 'endDate');
  const prizes = getNewCompetitionField(state, 'prizes').filter(p => p.length > 0);
  const image = getNewCompetitionField(state, 'image');
  const judges = getNewCompetitionField(state, 'judges');

  const fields = {
    name,
    description,
    rules,
    interests,
    startDateObj,
    endDateObj,
    prizes,
    image,
    judges,
  };

  dispatch({
    type: actionTypes.createCompetition.init,
    fields,
  });

  let errorString = null;

  // Process dates
  let startDate;
  let endDate;
  let startDateStr;
  let endDateStr;
  try {
    startDate = new Date(`${startDateObj.date}T${startDateObj.time}`);
    startDateStr = startDate.toISOString();
    endDate = new Date(`${endDateObj.date}T${endDateObj.time}`);
    endDateStr = endDate.toISOString();
  } catch (error) {
    errorString = `You've entered invalid date(s): ${error}`;
  }

  /**
   * Validation for the data present
   */
  // Name, description and rules can't be empty
  if (
    name.length === 0
    || description.length === 0
    || rules.length === 0
  ) {
    errorString = 'Name, description or rules are required';
  }
  // There should be 1 to 3 interests
  if (
    interests.length < 1
    || interests.length > 3
  ) {
    errorString = 'Please select 1 to 3 communities';
  }
  // There should be 1 - 3 judges
  if (
    judges.length < 1
    || judges.length > 3
  ) {
    errorString = 'There should be 1 to 3 judges';
  }
  // Validation for dates
  const now = new Date();
  if (
    startDate < now
    || endDate <= startDate
  ) {
    errorString = "Invalid dates: Competitions can't start in the past and the end date can't be before start date";
  }

  if (errorString) {
    notify.danger(errorString);
    return dispatch({
      type: actionTypes.createCompetition.error,
      reason: new Error(errorString),
    });
  }

  // Create the contest at backend
  return haprampAPI.v2.competitions.createCompetition({
    image,
    title: name,
    description,
    starts_at: startDateStr,
    ends_at: endDateStr,
    rules,
    communities: interests,
    judge_usernames: judges,
    prizes,
  }).then(({ id }) => {
    notify.success('Competition created!');
    notify.info('Please write a post to announce your competition on Steem');
    dispatch(push(`/competitions/~create/post/${id}/announce`));
    return dispatch({
      type: actionTypes.createCompetition.done,
      fields,
      id,
    });
  }).catch((reason) => {
    notify.danger('Error creating competition');
    console.error('[Create Competition] Error creating competition', reason);
    return dispatch({
      type: actionTypes.createCompetition.error,
      reason,
    });
  });
};
