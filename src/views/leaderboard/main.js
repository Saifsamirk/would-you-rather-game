import React from "react";
import Leaderboard from "./index";
import store from "../../redux/store";
import { Provider } from "react-redux";

function Board() {
  return (
    <Provider store={store}>
      <Leaderboard />
    </Provider>
  );
}

export default Board;
