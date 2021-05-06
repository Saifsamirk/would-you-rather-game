import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Row, Col, Form } from "react-bootstrap";
import * as actions from "./redux/actionCreators";
import { updateUser } from "../login/redux/actionCreators";
import * as icons from "../../default/icons";
import "./style.scss";

function Details() {
  // Fetch the state from reducer to be used within the module
  const { questions, users, form } = useSelector((state) => state.questions);
  const { isValue } = useSelector((state) => state.login);

  // Get the user's details from the main reducer
  const { user } = isValue ? isValue : "";

  // Dispatch all actions imported from redux
  const dispatch = useDispatch();

  // Get the parameter from the url to fetch the details of the question
  // accordingly
  const param = useParams();

  // Invoke all functions below whenever the component renders
  useEffect(() => {
    dispatch(actions.loadQuestions());
    dispatch(actions.loadUsers());
  }, [dispatch]);

  // Filter the questions upon the id in the url to display the details of the
  // the selected question
  const filterQuestions = (id) => {
    return Object.values(questions)?.filter(
      (question) => question.id === id
    )?.[0];
  };

  // Get the author's details from the users array
  const getUserDetails = (id) => {
    return Object.values(users)?.filter((user) => user.id === id);
  };

  // Get the target question upon the URL parameter
  const questionToBeDisplayed = filterQuestions(param?.id);

  // Get the data of the author after invoking the function above that
  // filters the users' array
  const author = getUserDetails(questionToBeDisplayed?.author)[0];

  // Check if this question is already answered by the user or not
  const checkIfAnswered = () => {
    return Object.keys(user?.answers)?.includes(param.id);
  };

  // Get the sum of the votes of the question
  const votes =
    questionToBeDisplayed?.optionOne?.votes?.length +
    questionToBeDisplayed?.optionTwo?.votes?.length;

  // Get the corresponding answer for the selected question
  const userChoice = user?.answers?.[param.id];

  // Handle the process of saving a question's answer inside the database
  const handleSubmit = (form) => {
    dispatch(
      actions.saveAnswer({ ...form, authedUser: user.id, qid: param.id }, user)
    ).then((data) => {
      dispatch(
        updateUser(
          Object.values(data)?.filter(
            (currentUser) => currentUser.id === user.id
          )[0]
        )
      );
      // Refresh the UI when the user submits an answer
      checkIfAnswered();
    });
  };

  // Get the percentage of the votes for each question
  const getPercentage = (target) => {
    return `${(questionToBeDisplayed?.[target]?.votes?.length / votes) * 100}%`;
  };

  return (
    <div id="details">
      {questionToBeDisplayed ? (
        <>
          <h1>"{questionToBeDisplayed?.author}" asks:</h1>
          <Row className="details-result-wrapper">
            <Col md={3}>
              <img src={author?.avatarURL} width={150} height={150} />
            </Col>
            {checkIfAnswered() ? (
              <Col md={6} style={{ textAlign: "left" }}>
                <Col>
                  {userChoice === "optionOne" && (
                    <img
                      className="mr-2"
                      src={icons.check}
                      width={20}
                      height={20}
                    />
                  )}
                  <span className={userChoice === "optionOne" ? "checked" : ""}>
                    <b>Would You Rather</b>{" "}
                    {questionToBeDisplayed?.optionOne?.text}
                    <b className="ml-2">
                      ({questionToBeDisplayed?.optionOne?.votes?.length} /{" "}
                      {votes} votes) {getPercentage("optionOne")}
                    </b>
                  </span>
                </Col>
                <Col>
                  {userChoice === "optionTwo" && (
                    <img
                      className="mr-2"
                      src={icons.check}
                      width={20}
                      height={20}
                    />
                  )}
                  <span className={userChoice === "optionTwo" ? "checked" : ""}>
                    <b>Would You Rather</b>{" "}
                    {questionToBeDisplayed?.optionTwo?.text}
                    <b className="ml-2">
                      ({questionToBeDisplayed?.optionTwo?.votes?.length} /{" "}
                      {votes} votes) {getPercentage("optionTwo")}
                    </b>
                  </span>
                </Col>
              </Col>
            ) : (
              <Col md={4}>
                <h3>Would You Rather?</h3>
                <Form.Check
                  name="answer"
                  value="optionOne"
                  type="radio"
                  label={questionToBeDisplayed?.optionOne?.text}
                  onChange={(e) => dispatch(actions.setFormValue(e))}
                />
                <Form.Check
                  name="answer"
                  value="optionTwo"
                  type="radio"
                  label={questionToBeDisplayed?.optionTwo?.text}
                  onChange={(e) => dispatch(actions.setFormValue(e))}
                />
                <Button
                  type="button"
                  disabled={form.answer ? false : true}
                  onClick={() => handleSubmit(form)}
                >
                  Save
                </Button>
              </Col>
            )}
          </Row>
        </>
      ) : (
        <h1 style={{ color: "red" }}>
          Please make sure that the question does exist. It is not found!
        </h1>
      )}
    </div>
  );
}

export default Details;
