const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/userdb", { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.error(err);
  });

const userschema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = new mongoose.model("user", userschema);
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", function (req, res) {
  const email = req.body.username;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((founduser) => {
      bcrypt.compare(password, founduser.password, function (err, result) {
        if (!err) {
          res.render("secrets");
        } else {
          console.err(err);
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post("/register", function (req, res) {
  const newemail = req.body.username;
  const newpassword = req.body.password;
  bcrypt.hash(newpassword, saltRounds, function (err, hash) {
    if (!err) {
      const newuser = new User({
        email: newemail,
        password: hash,
      });
      newuser.save();
      res.render("secrets");
    } else {
      console.error(err);
    }
  });
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.listen(3000, function () {
  console.log("running on port 3000");
});
