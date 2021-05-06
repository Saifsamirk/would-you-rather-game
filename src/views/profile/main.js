import React from "react";
import Profile from "./index";
import store from "./redux/store";
import { Provider } from "react-redux";

function UserProfile() {
  return (
    <Provider store={store}>
      <Profile />
    </Provider>
  );
}

export default UserProfile;
