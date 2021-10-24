const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");

const Post = mongoose.model("Post");

const router = express.Router();

router.use(requireAuth);

router.get("/posts", async (req, res) => {
  const posts = await Post.find();

  res.send(posts);
});

router.post("/posts", async (req, res) => {
  const { content, photoUrl, username } = req.body;
  console.log(content, photoUrl, username);
  if (!content) {
    return res.status(422).send({ error: "You must enter a post to submit" });
  }

  try {
    const post = new Post({
      username,
      content,
      media: photoUrl,
      userId: req.user._id,
    });
    console.log(post);
    await post.save();
    res.send(post);
  } catch (err) {
    return res.status(422).send({ error: err.message });
  }
});

router.put("/posts/:id", async (req, res) => {
  const { content, photoUrl } = req.body;
  console.log(content, photoUrl);
  const id = req.params.id;
  const media = photoUrl;
  console.log(id);
  try {
    Post.findByIdAndUpdate(id, { content }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("updated post: ", docs);
      }
    });
    Post.findByIdAndUpdate(id, { media }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("updated post: ", docs);
        res.send("successfully updated");
      }
    });
  } catch (err) {
    return res.status(422).send({ error: err.message });
  }
});

router.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    Post.findByIdAndDelete(id, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("deleted post: ", docs);
        res.send("successfully deleted");
      }
    });
  } catch (err) {
    return res.status(422).send({ error: err.message });
  }
});

module.exports = router;
