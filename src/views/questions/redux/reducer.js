import * as types from "./actionTypes";

// Initialize the state of the reducer to be passed to the parent components
const initialState = {
  users: [],
  questions: [],
  active: { unanswered: true },
  form: {},
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
    // Load all questions from the backend and change the initial list
    // of questions inside the reducer to the new fetched data
    case types.LOAD_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
      };
    // Switch tabs between the answered an unanswered questions for
    // a certain user
    case types.SET_ACTIVE:
      return {
        ...state,
        active: action.payload,
      };
    // Set the value of the fields to the form object according to the user
    // inputs to be submitted later to the server
    case types.SET_FORM_VALUE:
      return {
        ...state,
        form: {
          ...state.form,
          [action.payload.target.name]: action.payload.target.value,
        },
      };
    default:
      return state;
  }
}
