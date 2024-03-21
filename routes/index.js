var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");
const LocalStrategy = require("passport-local");
//passport.use(new LocalStrategy(userModel.authenticate()));
passport.use(userModel.createStrategy());

router.get("/", function(req, res, next){
  res.render("index");
});

router.post('/', async function(req, res, err) {
  const email = req.body.landemail;
  if(email){
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
});

router.get("/login", function(req, res){
  const emailValue = req.query.email;
  res.render("login_page", {email: emailValue || ""});
});

router.post("/login", 
passport.authenticate("local", {successRedirect: "/profile",failureRedirect: "/login"}),
 function(req, res, next) {
  
});


router.get("/register", function(req, res) {
  const emailValue = req.query.email;
  res.render("register_page", {email: emailValue || ""});
  
});


router.post("/register", async function(req, res, next) {
  const emailValue = req.query.email;
  const name = (req.body.name).charAt(0).toUpperCase()+(req.body.name).slice(1);
  const email = req.body.email;
  const exist = await userModel.findOne({email: email});
  if(!exist){
  const userdata = new userModel({
    name: name,
    username: req.body.username,
    number: req.body.mobile,
    email: req.body.email,
    profile: "/public/images/default.png"
  });
  userModel.register(userdata, req.body.password)
.then(function() {
  passport.authenticate("local")(req, res, function () {
    res.redirect("/profile");
  })

});
  }
  else{
    res.redirect("/login");
  }
});


router.get("/profile", isLoggedIn ,async function(req, res){
  const name = req.user.name;
  const username = req.user.username;
  res.render("profile_page",{name: name, username: username, phone: req.user.number, email: req.user.email} );
  userdata = {profile: req.body.picchng};
});

router.get("/logout", function (req, res, next){
  req.logout(function(err){
    if(err) {return next(err);}
    res.redirect("/login");
  });
});

function isLoggedIn (req, res, next) {
  if(req.isAuthenticated()) {return next();}
  else {
  res.redirect("/login");}
}

module.exports = router;
