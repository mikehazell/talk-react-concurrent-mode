import { createRouter } from "./lib/createRouter";

// Routes
const routes = [
  {
    path: "/posts/:postId",
    loadCode: () => import("./pages/Detail")
  },
  {
    path: "/",
    loadCode: () => import("./pages/List")
  }
];

const { Router, Link } = createRouter(routes);

export { Link, Router };
