import { createRouter } from "./lib/createRouter";
import { getPosts, getPostById } from "./api";

// Routes
const routes = [
  {
    path: "/posts/:postId",
    loadCode: () => import("./pages/Detail"),
    loadData: ({ postId }) => ({
      post: getPostById({ id: postId }),
      relatedPosts: getPosts({ limit: 3, relatedTo: postId })
    })
  },
  {
    path: "/",
    loadCode: () => import("./pages/List"),
    loadData: () => ({
      posts: getPosts({ limit: 36, filter: "" })
    })
  }
];

const { Router, Link } = createRouter(routes);

export { Link, Router };
