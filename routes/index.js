var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

router.get("/", function(req, res, next){
  res.render("index");
});

router.post('/', async function(req, res, next) {
  
  const email = req.body.landemail;
  if(email){
  console.log("Landing page confirmed");
  const existinguser = await userModel.findOne({email: email});
  if(existinguser)
  {
    res.redirect(`/login?email=${encodeURIComponent(email)}`);
  }
  else
  {
    res.redirect(`/register?email=${encodeURIComponent(email)}`);
  }
  }
else{
  console.log("Else block before render");
  res.render("index");
  console.log("Else block after render");
}
});

router.get("/login", function(req, res, next){
  const emailValue = req.query.email;
  res.render("login_page", {email: emailValue || ""});
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login"
})//,function(req, res, next) {
  //console.log("Inside login function");
  //res.redirect("/profile");
 );


router.get("/register", function(req, res, next) {
  const emailValue = req.query.email;
  res.render("register_page", {email: emailValue || ""});
  
});


router.post("/register", function(req, res, next) {
  const emailValue = req.query.email;
  const userdata = new userModel({
    name: req.body.name,
    username: req.body.username,
    number: req.body.mobile,
    email: req.body.email
  });
  userModel.register(userdata, req.body.password)
.then(function(registereduser) {
    res.redirect("/profile");

});

});

router.get("/profile", function(req, res){
  res.send("profile");
});

module.exports = router;
