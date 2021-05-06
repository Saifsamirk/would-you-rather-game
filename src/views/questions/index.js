import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import * as actions from "./redux/actionCreators";
import "./style.scss";
import "../../default/layout.scss";

function Questions(props) {
  // Import all values of the state from the store
  // Destruct the state object to get all necessary values
  const { questions, users, active } = useSelector((state) => state.questions);
  const { isValue } = useSelector((state) => state.login);

  // Get the user object from the main reducer to be used here
  const { user } = isValue ? isValue : "";

  // Dispatch all actions imported from redux
  const dispatch = useDispatch();

  // Fetch the route's history using the react router dom hook
  const history = useHistory();

  // Invoke all functions below whenever the app renders
  useEffect(() => {
    dispatch(actions.loadUsers());
    dispatch(actions.loadQuestions());
    // Reset the question tab to be unanswered when the component un-mounts
    return () => {
      dispatch(actions.setActive({ unanswered: true }));
    };
  }, [dispatch]);

  // Set the key value to be answered or unanswered and filter the list
  // of questions accordingly
  const filter = (question) =>
    active.answered
      ? [...Object.keys(user.answers)].includes(question.id)
      : ![...Object.keys(user.answers)].includes(question.id);

  // Get the image of the question's author to display it in the list
  // of all questions (answered - unanswered)
  const getImage = (name) => {
    return users[name].avatarURL;
  };

  return (
    <div id="questions-list">
      <section className="questions-options-wrapper">
        <h3
          className={active.answered ? "active" : ""}
          onClick={() => dispatch(actions.setActive({ answered: true }))}
        >
          Answered
        </h3>
        <h3
          className={active.unanswered ? "active" : ""}
          onClick={() => dispatch(actions.setActive({ unanswered: true }))}
        >
          Unanswered
        </h3>
      </section>
      <Row className="all-questions mx-auto">
        {Object.values(questions)
          .filter((question) => filter(question))
          .sort((prev, curr) => {
            return curr.timestamp - prev.timestamp;
          })
          .map((question) => (
            <Col key={question.id} md={3} sm={6} xs={12} className="mb-3">
              <div key={question.id} className="question-container">
                <main>"{question.author} asks:"</main>
                <img
                  src={getImage(question.author)}
                  width={80}
                  height={80}
                  className="mb-3"
                />
                <div key={question.id} className="question-wrapper">
                  <strong className="title">Would You Rather?</strong>
                  <div className="options">
                    <span>{question.optionOne.text}...</span>
                  </div>
                </div>
                <Button
                  className="mt-3"
                  onClick={() => history.push(`${props.url}/${question.id}`)}
                >
                  View Poll
                </Button>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default Questions;
