import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../Home";
import Postes from "../Postes";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Operators from "../Operators";
import Pickup from "../actions/Pickup";
import NotFound from "../NotFound";

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/dashboard/:id" component={Dashboard} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/operators" component={Operators} />
    <Route exact path="/pickup" component={Pickup} />
    <Route exact path="/postes" component={Postes} />
    <Route component={NotFound} />
  </Switch>
);
