import * as types from "./actionTypes";

// Initialize the state of the reducer to be passed to the parent components
const initialState = {
  form: {},
};

// Import all actions to change the state upon each action accordingly
export default function reducer(state = initialState, action) {
  switch (action.type) {
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
