import "./App.less"
import LoginPane from "./pages/login";
import AdminPane from "./pages/admin";

import {HashRouter as Router, Route, Switch} from "react-router-dom"

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path={"/login"} component={LoginPane}/>
                <Route path={"/"} component={AdminPane}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
