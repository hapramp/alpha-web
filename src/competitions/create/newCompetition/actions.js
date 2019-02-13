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

export const createCompetition = () => (dispatch, getState, { haprampAPI }) => {
  const state = getState();

  const name = getNewCompetitionField(state, 'name');
  const description = getNewCompetitionField(state, 'description');
  const rules = getNewCompetitionField(state, 'rules');
  const tags = getNewCompetitionField(state, 'tags');
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
    tags,
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

  // Process dates
  let startDate;
  let endDate;
  try {
    startDate = new Date(`${startDateObj.data}T${startDateObj.time}`);
    endDate = new Date(`${endDateObj.data}T${endDateObj.time}`);
  } catch (error) {
    return dispatch({
      type: actionTypes.createCompetition.error,
      reason: new Error(`Invalid dates entered: ${error}`),
    });
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
    return dispatch({
      type: actionTypes.createCompetition.error,
      reason: new Error('Name, description or rules are required'),
    });
  }
  // There should be 1 to 3 interests
  if (
    interests.length < 1
    || interests.length > 3
  ) {
    return dispatch({
      type: actionTypes.createCompetition.error,
      reason: new Error('Please select 1 to 3 communities'),
    });
  }
  // There should be 1 - 3 judges
  if (
    judges.length < 1
    || judges.length > 3
  ) {
    return dispatch({
      type: actionTypes.createCompetition.error,
      reason: new Error('There shold be 1 to 3 judges'),
    });
  }
  // Validation for dates
  const now = new Date();
  if (
    startDate < now
    || endDate <= startDate
  ) {
    return dispatch({
      type: actionTypes.createCompetition.error,
      reason: new Error("Invalid dates: Competitions can't start in the past and the end date can't be before start date"),
    });
  }

  // Create the contest at backend
  return haprampAPI.v2.competitions.createCompetition({
    image,
    title: name,
    description,
    starts_at: startDate.toISOString(),
    ends_at: endDate.toISOString(),
    rules,
    communities: interests,
    judge_usernames: judges,
  }).then(({ id }) => {
    /**
     * TODO: Insert action to navigate to competition
     * announcement post creation page
     */
    dispatch();
    return dispatch({
      type: actionTypes.createCompetition.done,
      fields,
      id,
    });
  }).catch((reason) => {
    console.error('[Create Competition] Error creating competition', reason);
    return dispatch({
      type: actionTypes.createCompetition.error,
      reason,
    });
  });
};
