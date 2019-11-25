import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

// Routes
import List from "./pages/List";
import Detail from "./pages/Detail";

const routes = [
  {
    path: "/posts/:postId",
    component: Detail
  },
  {
    path: "/",
    component: List
  }
];

const Router = () => (
  <BrowserRouter>
    <Switch>
      {routes.map(r => (
        <Route key={r.path} {...r} />
      ))}
    </Switch>
  </BrowserRouter>
);

export { Link, Router };
