import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import * as actions from "./redux/actionCreators";
import "./style.scss";
import "../../default/layout.scss";

function Leaderboard() {
  // Import all values of the state from the store
  // Destruct the state object to get all necessary values
  const { users } = useSelector((state) => state.leaderboard);

  // Dispatch all actions imported from redux
  const dispatch = useDispatch();

  // Invoke all functions below whenever the app renders
  useEffect(() => {
    dispatch(actions.loadUsers());
  }, [dispatch]);

  // Get the score of a certain user to sort them accordingly
  const getScore = (user) => {
    return user?.questions.length + Object.values(user.answers)?.length;
  };

  return (
    <div id="leaderboard">
      <h1>Users statistics</h1>
      <Row className="all-users mx-auto">
        {Object.values(users)
          .sort((prev, curr) => {
            return getScore(curr) - getScore(prev);
          })
          .map((user) => (
            <Col key={user.id} md={3} sm={6} xs={12} className="mb-3">
              <div className="user-container">
                <main>"{user.name}"</main>
                <img
                  src={user.avatarURL}
                  width={80}
                  height={80}
                  className="mb-3"
                />
                <div className="user-wrapper">
                  <strong className="title">Answered</strong>
                  <div className="options">
                    <span>{Object.values(user.answers)?.length}</span>
                  </div>
                </div>
                <div className="user-wrapper">
                  <strong className="title">Created</strong>
                  <div className="options">
                    <span>{user?.questions.length}</span>
                  </div>
                </div>
                <div className="user-wrapper">
                  <strong className="title">Score</strong>
                  <div className="options">
                    <span>
                      {user?.questions.length +
                        Object.values(user.answers)?.length}
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default Leaderboard;
