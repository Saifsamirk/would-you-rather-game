import React from "react";
import QuestionsList from "./index";
import store from "../../redux/store";
import { Provider } from "react-redux";
import { useRouteMatch, withRouter } from "react-router-dom";

function Questions() {
  const { url } = useRouteMatch();
  return (
    <Provider store={store}>
      <QuestionsList url={url} />
    </Provider>
  );
}
export default withRouter(Questions);
