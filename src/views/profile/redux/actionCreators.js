import * as types from "./actionTypes";

// Toggle all modals, popovers and drop downs in the admin panel
function setToggle(field) {
  return (dispatch) => {
    dispatch({ type: types.SET_TOGGLE, payload: field });
  };
}

// Toggle all modals, popovers and drop downs in the admin panel
function setLink(field) {
  return (dispatch) => {
    dispatch({ type: types.SET_LINK, payload: field });
  };
}

// Logout the user from the system after clicking the power button
const logout = (history) => () => {
  // Navigate to the home page as the user logs out
  history.push("/");
  // Remove the token from the localStorage
  localStorage.removeItem("wur-user");
};

export { setToggle, setLink, logout };
