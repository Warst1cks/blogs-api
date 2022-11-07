const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId

const blogsSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "A title is required for your blog."],
  },
  description: {
    type: String,
    trim: true,
  },
  body: {
    type: String,
    trim: true,
    required: [true, "A body is required"],
  },
  author: {
    type: ObjectId,
    trim: true,
  },
  author_id:{
    type : ObjectId,
    ref:"User",
  },
  state: {
    type: String,
    trim: true,
    default: "draft",
    enum: ["draft", "published"],
  },
  read_count: {
    type: Number,
    default: 0,
  },
  reading_time: {
    type: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  tags: {
    type: [String],
    trim: true,
  },
});
const blogs = mongoose.model("blogs", blogsSchema);

 module.exports = blogs;