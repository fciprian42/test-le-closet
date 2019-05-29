import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../Home";
import Postes from "../Postes";
import Dashboard from "../Dashboard";
import Operators from "../Operators";
import NotFound from "../NotFound";

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/dashboard/:id" component={Dashboard} />
    <Route exact path="/operators" component={Operators} />
    <Route exact path="/postes" component={Postes} />
    <Route component={NotFound} />
  </Switch>
);
