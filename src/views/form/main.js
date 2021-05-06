import React from "react";
import CreateForm from "./index";
import store from "../../redux/store";
import { Provider } from "react-redux";

function Form() {
  return (
    <Provider store={store}>
      <CreateForm />
    </Provider>
  );
}

export default Form;
