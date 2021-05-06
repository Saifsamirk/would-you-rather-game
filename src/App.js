import "./App.css";
import Home from "./views/login/main";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";

// Initialize the history of the routes to be able to navigate forward and backward through pages
const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router>
        <Home history={history} />
      </Router>
    </div>
  );
}

export default App;
