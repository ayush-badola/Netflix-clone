var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/netcdata");


const user_schema = mongoose.schema ({
  name: String,
  username: String,
  email : String,
  number: Number,
  password: String,
  profile: String
})

user_schema.plugin(plm);
module.exports = router;
module.exports = mongoose.model("user",user_schema);
