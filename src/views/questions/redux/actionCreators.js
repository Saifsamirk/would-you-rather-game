import * as types from "./actionTypes";
import * as api from "../../../api/mockData";

// Load all questions from the mockAPI
const loadQuestions = () => async (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      ._getQuestions()
      // Change the initial state of the user's array in the reducer
      // throughout the reducer function to hold the new fetched data
      .then((res) => {
        dispatch({
          type: types.LOAD_QUESTIONS_SUCCESS,
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

// Load all users from the mockAPI to be use within the module
const loadUsers = () => async (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      ._getUsers()
      // Change the initial state of the user's array in the reducer
      // throughout the reducer function to hold the new fetched data
      .then((res) => {
        dispatch({
          type: types.LOAD_ALL_USERS,
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

// Save the answer of the question that the user doesn't answer
const saveAnswer = (form) => async () => {
  return new Promise((resolve, reject) => {
    api
      ._saveQuestionAnswer(form)
      .then((res) => {
        // Resolve the promise and return a success msg
        resolve(res);
      })
      // Return an error to be displayed to the user when the fetch is
      // not done properly
      .catch((err) => {
        reject(err);
      });
  });
};

// Set the tab value to answered or unanswered and display their
// question accordingly
function setActive(field) {
  return function (dispatch) {
    dispatch({ type: types.SET_ACTIVE, payload: field });
  };
}

// Set the form fields to the value inserted by the user
function setFormValue(field) {
  return function (dispatch) {
    dispatch({ type: types.SET_FORM_VALUE, payload: field });
  };
}

// Export all actions to be used in all components
export { loadQuestions, loadUsers, setActive, setFormValue, saveAnswer };
