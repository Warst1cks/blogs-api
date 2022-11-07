const express = require("express");
const passport = require("passport");
const blogsRouter = express.Router();
const {
createBlog,
getAllBlogs,
getBlogById,
updateBlog,
deleteBlog,
} = require("../controllers/blogsController");

blogsRouter.post("/create", passport.authenticate("jwt",{session: false }), createBlog);
blogsRouter.get("/get", getAllBlogs);
blogsRouter.get("/:id", getBlogById);
blogsRouter.patch("/:id", passport.authenticate("jwt",{session: false }), updateBlog);
blogsRouter.delete("/:id", passport.authenticate("jwt",{session: false }), deleteBlog);

module.exports = blogsRouter;
