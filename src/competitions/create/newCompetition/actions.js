export const baseName = '@competitions/create/newCompetition';

export const actionTypes = {
  changeField: `${baseName}/changeField`,
};

export const changeField = (field, value) => dispatch => dispatch({
  type: actionTypes.changeField, field, value,
});
