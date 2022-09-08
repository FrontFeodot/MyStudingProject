import { profileAPI } from '../api/api';

const SET_ERROR = 'SET_ERROR';

let initialState = {
  errorMessage: '',
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

const setError = (errorMessage) => ({ type: SET_ERROR, errorMessage });

export const saveProfile = (profile) => async (dispatch) => {
  let response = await profileAPI.saveProfile(profile);
  if (response.data.resultCode === 0) {
    dispatch(setError(''));
  }
  if (response.data.resultCode === 1) {
    dispatch(setError(response.data.messages));
  }
};
export default settingsReducer;
