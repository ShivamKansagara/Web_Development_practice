const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
let items = [];
let workitems = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let day = date.getdate();
  res.render("lists", { listitem: day, newitem: items });
});

app.post("/", function (req, res) {
  let item = req.body.newitem;
  console.log(req.body);
  if (req.body.button != "work") {
    items.push(item);
    res.redirect("/");
  } else {
    workitems.push(item);
    res.redirect("/work");
  }
});

app.get("/work", function (req, res) {
  res.render("lists", { listitem: "work list", newitem: workitems });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
