const express = require("express");
const app = express();
const passport = require('passport');
const authRouter = require('./routes/authRouter');
const blogsRouter = require('./routes/blogsRouter');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/authentication',authRouter)
app.use('/blogs',blogsRouter)
app.use(passport.initialize())
require("./middlewares/passport")

app.post("/signup",(req,res,next) => {})
app.post("/signin", (req, res, next) => {});

// app.use((err,req,res,next) => {
//  const message = err.message || "internal server error";
//  return res.status(500).json({message})
// })
module.exports = app