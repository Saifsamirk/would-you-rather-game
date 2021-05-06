import * as types from "./actionTypes";
import * as api from "../../../api/mockData";

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

// Export all actions to be used in all components
export { loadUsers };
