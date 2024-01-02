var express = require('express');
var router = express.Router();
const userModel = require("./users");


router.get('/', function(req, res, next) {
  res.render("index");
});

router.post();

module.exports = router;
