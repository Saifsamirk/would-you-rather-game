import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Row, Col, Form, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import * as actions from "./redux/actionCreators";
import "./style.scss";
import "../../default/layout.scss";

function Login() {
  // Import all values of the state from the store
  // Destruct the state object to get all necessary values
  const { isValue, users } = useSelector((state) => state.login);

  // Dispatch all actions imported from redux
  const dispatch = useDispatch();

  // Initialize the local state of the component
  const [validated, setValidated] = useState(false);
  const [toggle, setToggle] = useState(false);

  // Fetch the route's history using the react router dom hook
  const history = useHistory();

  // Invoke all functions below whenever the app renders
  useEffect(() => {
    dispatch(actions.loadUsers());
  }, [dispatch]);

  // Handle selecting a user from the list before we login to the system
  const handleSelectUser = (user) => {
    // Set the id of the user inside the isValue object before we
    // proceed to the login process
    dispatch(
      actions.setLoginValue({
        target: {
          name: "user",
          value: user,
        },
      })
    );
    // Close the dropdown list and change its label to point to the
    // selected user
    setToggle(!toggle);
  };

  const locationObj = useLocation();

  // Handle the process of logging in and submit the email and password
  // to the action and then to the server
  const handleSubmit = (event) => {
    // Get all data from the form
    const loginForm = event.currentTarget;
    // Check if all fields are valid or not
    if (loginForm.checkValidity()) {
      dispatch(actions.login(isValue.user, history, locationObj));
      setValidated(false);
    }
    // Display all validation messages when there is an invalid field
    else {
      setValidated(true);
    }
    // Stop the page from actually submitting or navigating
    // to another page
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div id="login">
      <Row className="content">
        <Col
          md={{ span: 6, offset: 3 }}
          sm={12}
          xs={12}
          className="login-section"
        >
          <div className="login-header">
            <h1>Would You Rather!</h1>
            <p>Welcome to your one stop dashboard. Please login below</p>
          </div>
          <Form
            className="login-form"
            name="form"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            {isValue.error && (
              <Alert variant="danger">
                Please make sure that email and password are correct
              </Alert>
            )}
            <Form.Group>
              <Form.Label>User</Form.Label>
              <Form.Control
                readOnly
                size="lg"
                required
                placeholder={isValue?.user?.name ?? "Select a User"}
                onClick={() => setToggle(!toggle)}
              />
            </Form.Group>
            {toggle && (
              <section className="users-options-wrapper">
                {Object.values(users)?.map((user, index) => {
                  return (
                    <div key={index} onClick={() => handleSelectUser(user)}>
                      <img
                        alt=""
                        src={user.avatarURL}
                        width={35}
                        height={35}
                        loading="lazy"
                      />
                      <span>{user.name}</span>
                    </div>
                  );
                })}
              </section>
            )}
            <Button
              disabled={!isValue.user}
              size="lg"
              type="submit"
              className="btn btn-primary btn-block"
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
