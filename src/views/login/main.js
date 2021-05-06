import React from "react";
import Home from "./index";
import Profile from "../profile/index";
import ProtectedRoute from "./protectedRoute";
import store from "../../redux/store";
import { Provider } from "react-redux";
import {
  Route,
  Switch,
  useRouteMatch,
  Redirect,
  Router,
  withRouter,
} from "react-router-dom";

function Login(props) {
  // Extract the relative path from react router
  let { url, path } = useRouteMatch();
  return (
    <Provider store={store}>
      <Router history={props.history}>
        <Switch>
          <Route exact path={path}>
            {localStorage.getItem("wur-user") ? (
              <Redirect to={`/control/questions`} />
            ) : (
              <Home />
            )}
          </Route>
          <ProtectedRoute
            path="/control"
            component={() => <Profile url={url} history={props.history} />}
          ></ProtectedRoute>
          <Route
            component={() => {
              return <h1 style={{ padding: "20px" }}>404 Page Not Found</h1>;
            }}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default withRouter(Login);
