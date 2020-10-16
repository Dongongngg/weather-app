import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/app.css";
//pages
// import Landing_page from "./page/Landing_page";
import Weather_page from "./page/Weather_page";

function App() {
  return (
    <Router className="app">
      <Switch>
        {/* <Route path="/" exact component={Landing_page}></Route> */}
        <Route path="/weather" component={Weather_page}></Route>
      </Switch>
    </Router>
  );
}

export default App;
