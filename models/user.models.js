const mongoose  = require("mongoose");
const plm = require("passport-local-mongoose");


const userSchema =  new mongoose.Schema({
  username : {
    type : String,
    required : true,
    unique : true,
    minlength : 3,
    maxlength : 20,
    trim : true,
    lowercase : true
  },
  email : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    validate : {
      validator : (email) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email),
      message : "{VALUE} is not a valid email address"
    }
  },
  password : {
    type : String,
  },
},{timestamps : true});

userSchema.plugin(plm); 

const User = mongoose.model("User", userSchema);
module.exports = User;