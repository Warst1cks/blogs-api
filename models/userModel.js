const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    trim: true,
    required: [true, "You need to provide a firstname!!"],
    unique: true,
  },
   lastname: {
    type: String,
    trim: true,
    required: [true, "You need to provide a lastname!!"],
  },
   email: {
    type: String,
    trim: true,
    required: [true, "You need to provide an Email!!"],
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
    trim: true,
    unique: true,
    required: [true, "You need to provide a password for security reasons!!"],
  },
});

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

userSchema.methods.isPasswordCorrect = async function (inputPassword) {
  const correctPassword = await bcrypt.compare(inputPassword, this.password);
  return correctPassword;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
