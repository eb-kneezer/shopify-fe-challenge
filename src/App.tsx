import React from "react";
import "./App.scss";

import { Route, Switch } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Listings from "./Pages/Listings/Listings";

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/listings/:query' component={Listings} />
    </Switch>
  );
}

export default App;
