import Questions from "../questions/main";
import Board from "../leaderboard/main";
import Form from "../form/main";
import Details from "../questions/details";
import * as icons from "../../default/icons";

// Initialize the sidebar routes to be rendered accordingly when clicked on
export const sideBar = [
  {
    id: 0,
    name: "Home",
    icon: icons.home,
    navigable: true,
    path: "questions",
    exact: true,
    component: () => {
      return <Questions />;
    },
  },
  {
    id: 1,
    name: "Board",
    icon: icons.dashboard,
    navigable: true,
    path: "leaderboard",
    exact: false,
    component: () => {
      return <Board />;
    },
  },
  {
    id: 2,
    name: "Questions",
    icon: icons.question,
    navigable: true,
    path: `add`,
    exact: false,
    component: () => {
      return <Form />;
    },
  },
  {
    id: 3,
    name: "Details",
    icon: icons.question,
    navigable: false,
    path: `questions/:id`,
    exact: false,
    component: () => {
      return <Details />;
    },
  },
  {
    id: 4,
    name: "Not Found",
    exact: false,
    navigable: false,
    component: () => {
      return <h1>404 Page Not Found</h1>;
    },
  },
];
