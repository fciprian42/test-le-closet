import React from "react";
import { withRouter } from "react-router";

import Sidebar from "./navigation/Sidebar";
import Routes from "./navigation/Routes";

const App = () => (
  <div style={{ display: "flex" }}>
    <Sidebar />
    <div style={{ flexGrow: 1 }}>
      <Routes />
    </div>
  </div>
);

export default withRouter(App);
