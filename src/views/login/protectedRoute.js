import React from "react";
import { Route, Redirect } from "react-router-dom";
import { routesConfig } from "../profile/routesConfig";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // Get the path name of the current url
      const loc = props.location.pathname.split("/").filter(Boolean);
      return localStorage.getItem("wur-user") ? (
        // Check if this url is present in our system or not and show
        // the page or the not found page instead
        loc.includes("control") &&
        loc.some((fr) => routesConfig.includes(fr)) ? (
          <Component {...props} />
        ) : (
          <h1 style={{ padding: "20px" }}>404 Page Not Found</h1>
        )
      ) : (
        <Redirect
          to={{
            pathname: `/`,
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);

export default ProtectedRoute;
