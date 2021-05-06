import * as types from "./actionTypes";
import * as api from "../../../api/mockData";

// Load all users from the mockAPI to be displayed as options in the login
// page
const loadUsers = () => async (dispatch) => {
  return new Promise((resolve, reject) => {
    api
      ._getUsers()
      // Change the initial state of the user's array in the reducer
      // throughout the reducer function to hold the new fetched data
      .then((res) => {
        dispatch({
          type: types.LOAD_USERS_SUCCESS,
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

// Handle the process of logging to the system using the id of the
// user
const login = (user, history, location) => (dispatch) => {
  if (user.id) {
    // Get all details of the user in case the login details are valid
    dispatch({
      type: types.LOGIN_DETAILS_SUCCESS,
      payload: user,
    });
    // Set the token in the localStorage
    localStorage.setItem("wur-user", JSON.stringify(user));
    // Navigate to the next page as the user logs in
    history.push(location?.state?.from?.pathname);
  } else {
    // Show an error message when the login process fails
    dispatch({
      type: types.LOGIN_DETAILS_FAILURE,
    });
  }
};

// Set the data inserted by the user (email - password)
const setLoginValue = (field) => {
  return function (dispatch) {
    dispatch({
      type: types.SET_LOGIN_VALUE,
      payload: field,
    });
  };
};

// Update the data of the user
const updateUser = (data, oldUser) => {
  return function (dispatch) {
    dispatch({
      type: types.UPDATE_USER_DATA,
      payload: data,
    });
    localStorage.setItem("wur-user", JSON.stringify({ oldUser, ...data }));
  };
};

// Export all actions to be used in all components
export { setLoginValue, loadUsers, login, updateUser };
