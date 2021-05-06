import * as types from "./actionTypes";
import * as api from "../../../api/mockData";

// Submit a request to the server to add a new question to
// the list of questions what we have
const createQuestion = (form) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      ._saveQuestion(form)
      // Change the initial state of the user's array in the reducer
      // throughout the reducer function to hold the new fetched data
      .then((res) => {
        dispatch({
          type: types.ADD_NEW_QUESTION,
          payload: res,
        });
        resolve(res);
      })
      // Return an error to be displayed to the user when the fetch is
      // not done properly
      .catch((err) => {
        reject(err);
      });
  });
};

// Set the form fields to the value inserted by the user
function setFormValue(field) {
  return function (dispatch) {
    dispatch({ type: types.SET_FORM_VALUE, payload: field });
  };
}

// Export all actions to be used in all components
export { createQuestion, setFormValue };
