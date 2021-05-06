import * as types from "./actionTypes";

const initialState = {
  fetchedData: [{}],
  toggle: { toggleNav: true },
  active: {
    Home: true,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_DATA_SUCCESS:
      return {
        ...state,
        fetchedData: action.payload,
      };
    case types.SET_TOGGLE:
      return {
        ...state,
        toggle: {
          ...state.toggle,
          [action.payload.name]: action.payload.value,
        },
      };
    case types.SET_LINK:
      return {
        ...state,
        active: {
          [action.payload.name]: action.payload.value,
        },
      };
    default:
      return state;
  }
}
