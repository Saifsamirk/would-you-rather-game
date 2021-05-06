import { combineReducers } from "redux";
import loginReducer from "../views/login/redux/reducer";
import profileReducer from "../views/profile/redux/reducer";
import questionsReducer from "../views/questions/redux/reducer";
import leaderboardReducer from "../views/leaderboard/redux/reducer";
import formReducer from "../views/form/redux/reducer";

/** Modules' reducers will be added here */
const rootReducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
  questions: questionsReducer,
  leaderboard: leaderboardReducer,
  createForm: formReducer,
});

export default rootReducer;
