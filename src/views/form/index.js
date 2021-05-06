import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "./redux/actionCreators";

function CreateForm() {
  // Declare the initial state of the component
  const [validated, setValidated] = useState(false);

  // Import all values of the state from the store
  const { form } = useSelector((state) => state.createForm);
  const { isValue } = useSelector((state) => state.login);

  // Fetch the user's data from the login reducer
  const { user } = isValue ? isValue : "";

  const history = useHistory();

  // Dispatch all actions imported from redux
  const dispatch = useDispatch();

  // Handle the process of adding a new question to the list of
  // questions and also the answers
  const handleSubmit = (event) => {
    // Get all data from the form
    const createQuestionForm = event.currentTarget;
    // Check if all fields are valid or not
    if (createQuestionForm.checkValidity()) {
      dispatch(actions.createQuestion({ ...form, author: user.id })).then(
        (data) => {
          history.push("questions");
        }
      );
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
    <div id="form">
      <h1>Create a New Question!</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Text>Complete The Questions</Form.Text>
          <Form.Label>
            <b>Would you Rather?</b>
          </Form.Label>
          <Form.Control
            required
            name="optionOneText"
            size="lg"
            onChange={(e) => dispatch(actions.setFormValue(e))}
          />
          <Form.Text className="mt-3 mb-3">
            <b>OR</b>
          </Form.Text>
          <Form.Control
            required
            name="optionTwoText"
            size="lg"
            onChange={(e) => dispatch(actions.setFormValue(e))}
          />
        </Form.Group>
        <Button size="lg" className="mt-3" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}

export default CreateForm;
