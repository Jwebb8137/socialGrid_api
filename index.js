require("./src/models/User");
require("./src/models/Post");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./src/routes/authRoutes");
const postRoutes = require("./src/routes/postRoutes");
const requireAuth = require("./src/middleware/requireAuth");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authRoutes);
app.use(postRoutes);

const mongoUri =
  "mongodb+srv://admin:passwordpassword@cluster0.hhwdr.mongodb.net/testDb?retryWrites=true&w=majority";
mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongodb", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your username: ${req.user.username}`);
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
