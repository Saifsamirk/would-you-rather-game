import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import * as icons from "../../default/icons";
import { useSelector, useDispatch } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import * as actions from "./redux/actionCreators";
import "./style.scss";
import FadeIn from "react-fade-in";
import { sideBar } from "./routes";

function Profile(props) {
  // Extract the props from the parent component to be user within the module
  const { history } = props;

  // initialize the local state of the component
  const [currentPath, setCurrent] = useState("");

  // Get the url from the history of the location using useRouteMatch hook
  const { url } = useRouteMatch();

  // Run the following functions every time the app re-renders
  useEffect(() => {
    // Fetch the current path after reloading the page
    const currentPath = history.location.pathname.substr(
      history.location.pathname.lastIndexOf("/") + 1
    );
    // Set the active link to the current path
    setCurrent(
      `${
        history.location.pathname.includes("questions")
          ? "questions"
          : currentPath
      }-link`
    );
    // Uncheck the home page if it is not selected when the page
    // reloads
    if (!currentPath.includes("control")) dispatch(actions.setLink({}));
  }, [history.location.pathname]);

  // Import all values of the state from the store
  const { active, toggle } = useSelector((state) => state.profile);
  const { isValue } = useSelector((state) => state.login);

  // Fetch the user's data from the login reducer
  const { user } = isValue ? isValue : "";

  useEffect(() => {
    // When a user changes the url, remove the login object and
    // redirect him to the login page
    if (history.action === "POP") {
      localStorage.removeItem("wur-user");
      history.push(history.location.pathname);
    }
  }, [history.action]);

  // Dispatch all actions imported from redux
  const dispatch = useDispatch();

  // Toggle all menus and modals in the admin panel main page
  const toggleFunc = (field) => {
    dispatch(actions.setToggle(field));
  };

  // Change the view of the sidebar links upon the user clicks
  const toggleLink = (field) => {
    dispatch(actions.setLink(field));
  };

  // Get the current width of the window to adjust the style of the menu accordingly
  let appWidth = window.outerWidth;

  // Wrapping all routes and applying an animation when switching between routes
  function FadingRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(routeProps) => (
          <FadeIn transitionDuration={600}>
            <Component {...routeProps} />
          </FadeIn>
        )}
      />
    );
  }

  return (
    <div id="main">
      <Container fluid>
        <Row>
          <Col
            md={2}
            sm={12}
            xs={12}
            className={`sidebar ${toggle.toggleNav ? "toggle" : ""}`}
          >
            <Row>
              {toggle.toggleNav && appWidth > 770 ? (
                <img src={icons.logo} className="logo" />
              ) : (
                <img src={icons.logo} className="logo" />
              )}
            </Row>
            <Row>
              <img src={icons.logo} className="logo-xs" loading="lazy" />
            </Row>
            <Row className="routes-wrapper">
              <Nav
                activeKey={currentPath}
                className="flex-column"
                onSelect={(eventKey) => setCurrent(eventKey)}
              >
                {sideBar.map(
                  (route) =>
                    route.navigable && (
                      <Nav.Link
                        key={route.name}
                        active={active[route.name]}
                        eventKey={`${route.path}-link`}
                        onClick={() => {
                          history.push(
                            `${url}${route.path ? "/" : ""}${route.path}`
                          );
                          toggleLink({ name: route.name, value: true });
                        }}
                      >
                        <img src={route.icon} />
                        <span>{route.name}</span>
                      </Nav.Link>
                    )
                )}
                <Nav.Link
                  eventKey="logout-link"
                  onClick={() => {
                    toggleLink({ name: "logout", value: true });
                    // Dispatch the action to log the user out of the system
                    dispatch(actions.logout(history));
                  }}
                >
                  <img src={icons.logout} />
                  <span>Logout</span>
                </Nav.Link>
              </Nav>
            </Row>
          </Col>
          <Col md sm={12} xs={12} className="main-page">
            <Row className="main-navbar align-items-center">
              <Col
                md={1}
                sm={1}
                xs={1}
                className="open-menu-toggle-wrapper"
                onClick={() =>
                  toggleFunc({ name: "toggleNav", value: !toggle.toggleNav })
                }
              >
                <div className="open-menu-toggle" />
                <div className="open-menu-toggle" />
                <div className="open-menu-toggle" />
              </Col>
              <Col
                md={{ span: 2, offset: 9 }}
                sm={{ span: 4, offset: 4 }}
                xs={{ span: 6, offset: 3 }}
                className="main-profile-dropdown"
              >
                <img src={user.avatarURL} height={35} width={35} />
                <div className="profile-info">
                  <h5>{user?.name}</h5>
                  <span>User</span>
                </div>
              </Col>
            </Row>
            {sideBar.map((route, index) => (
              <FadingRoute
                key={index}
                path={`${url}/${route.path}`}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
