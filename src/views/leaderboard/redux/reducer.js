import * as types from "./actionTypes";

// Initialize the state of the reducer to be passed to the parent components
const initialState = {
  users: [],
};

// Import all actions to change the state upon each action accordingly
export default function reducer(state = initialState, action) {
  switch (action.type) {
    // Load all users from the backend and change the initial list
    // of users inside the reducer to the new fetched data
    case types.LOAD_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}
