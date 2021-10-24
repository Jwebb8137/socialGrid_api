const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  media: {
    type: String,
    default: "",
  },
});

mongoose.model("Post", postSchema);
