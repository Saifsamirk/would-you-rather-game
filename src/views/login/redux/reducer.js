import * as types from "./actionTypes";

// Get the user data from the local storage and pass it to all
// child components
const userObj = localStorage.getItem("wur-user");

// Initialize the state of the reducer to be passed to the parent components
const initialState = {
  users: [],
  isValue: {
    user: JSON.parse(userObj) || {},
    submitted: false,
    error: false,
    loggingIn: false,
  },
};

// Import all actions to change the state upon each action accordingly
export default function reducer(state = initialState, action) {
  switch (action.type) {
    // Load all details when the login process succeeds
    case types.LOGIN_DETAILS_SUCCESS:
      return {
        ...state,
        isValue: {
          ...state.isValue,
          loggingIn: true,
          submitted: true,
          error: false,
        },
      };
    case types.LOGIN_DETAILS_FAILURE:
      return {
        ...state,
        isValue: {
          ...state.isValue,
          loggingIn: false,
          submitted: false,
          error: true,
        },
      };
    // Load all users from the backend and change the initial list
    // of users inside the reducer to the new fetched data
    case types.LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    // Update the data of the user
    case types.UPDATE_USER_DATA:
      return {
        ...state,
        isValue: {
          ...state.isValue,
          user: { ...state.user, ...action.payload },
        },
      };
    // Set the fields of (email - password) set by users to
    // login in to the system
    case types.SET_LOGIN_VALUE:
      return {
        ...state,
        isValue: {
          ...state.isValue,
          [action.payload.target.name]: action.payload.target.value,
        },
      };
    default:
      return state;
  }
}
