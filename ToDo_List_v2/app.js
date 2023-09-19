const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose
  .connect("mongodb://127.0.0.1:27017/todolistdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const todoschema = mongoose.Schema({
  name: String,
});

const Item = mongoose.model("item", todoschema);

const Item1 = new Item({
  name: "he",
});

const Item3 = new Item({
  name: "heee",
});

const Item2 = new Item({
  name: "hee",
});

const defaultItem = [Item1, Item2, Item3];

app.get("/", function (req, res) {
  let day = date.getdate();
  Item.find().then((foundItem) => {
    if (foundItem.length === 0) {
      Item.insertMany(defaultItem)
        .then(() => {
          console.log("success");
        })
        .catch((err) => {
          console.log(err);
        });
      res.redirect("/");
    } else {
      res.render("lists", { listitem: day, newitem: foundItem });
    }
  });
});

app.post("/", function (req, res) {
  let itemName = req.body.newitem;
  const newitembyuse = new Item({
    name: itemName,
  });
  newitembyuse.save();
  res.redirect("/");
});

app.get("/work", function (req, res) {
  res.render("lists", { listitem: "work list", newitem: workitems });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
