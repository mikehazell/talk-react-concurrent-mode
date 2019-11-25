const express = require("express");
const posts = require("./posts");
const comments = require("./comments");
const morgan = require("morgan");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan("tiny"));

app.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const d = await posts.byId({ id });
    res.json(d);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  const { filter, limit, relatedTo } = req.query;
  try {
    const d = await posts.list({ filter, limit, relatedTo });
    res.json(d);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/api/comments/:postId", async (req, res) => {
  try {
    const d = await comments.byPost({
      postId: parseInt(req.params.postId, 10)
    });
    res.json(d);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log("Running on http://localhost:%s", PORT);
});
