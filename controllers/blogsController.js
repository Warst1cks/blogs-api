const blogs = require("../models/blogsModel");
// const User = require("../models/userModel");
const createBlog = async (req, res, next) => {
  try {
    const blogDetails = {
      ...req.body,
      authorId: req.user._id,
      author: `${req.user.firstname} ${req.user.lastname}`,
    };
    const words =
    title.split("").length +
    body.split("").length + (blogDetails.description ? blogDetails.description.split("").length:0);
    const reading_time = words/200;
    blogDetails.reading_time = reading_time;
    const blog = await blogs.create(blogDetails);
    return res.status(201).json({
      status: "success",
      data: { blog },
    });
  } catch (error) {
    return next(error);
  }
};
const getAllBlogs = async (req, res, next) => {
  try {
    let page = +req.query.page || 1
    const limit = 20;
    const skip = (page - 1) * limit
    const blog = await blogs.find().skip(skip).limit(limit);
    if(req.query.state == 'draft'){
      const draftedBlogs = await blogs.find({state : "draft"});
      res.json(draftedBlogs);
    }
     if (req.query.state == "published") {
       const publishedBlogs = await blogs.find({ state: "published" });
      res.json(publishedBlogs);
     }
    return res.status(200).json({
      status: "success",
      data: { blog },
    });
  } catch (error) {
    return next(error);
  }
};
// you still have pagination and getting blogs of a specific user

const getBlogById = async (req, res, next) => {
  try {
    const id = req.params.id
    // const author = req.user.author
    const blog = await blogs.findById(id).populate("authorId","-password")
    
    blog.read_count += 1;
    blog.save();
    return res.status(200).json({
      status: "success",
      data: { blog },
    });
  } catch (error) {
    return next(error);
  }
};
const updateBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blogToUpdate = await blogs.findById(id)
    if(blogToUpdate.authorId.toString() !== req.user._id) return next(new Error("blog is not found"))
    if (!blogToUpdate) return next(new Error("blog not found!"));
    const blog = await blogs.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      status: "success",
      data: { blog },
    });
  } catch (error) {
    return next(error);
  }
};
const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogToDelete = await blogs.findById(id);
        if (blogToDelete.authorId.toString() !== req.user._id)
          return next(new Error("blog is not found"));
    if (!blogToDelete) return next(new Error("blog not found!"));
    const deletedBlog = await blogs.findByIdAndDelete(id);
    return res.status(204).json({
      status: "success",
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog ,
  deleteBlog
};
