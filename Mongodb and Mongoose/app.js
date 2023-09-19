const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/FruitsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String,
});
const Fruiti = mongoose.model("Fruit", fruitSchema);
const Apple = new Fruiti({
  name: "Apple",
  rating: 7,
  review: "pretty solid fruit",
});
const banana = new Fruiti({
  name: "banaina",
  rating: 7,
  review: "pretty solid fruit",
});
// fruit.save();
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Person = mongoose.model("Person", personSchema);
const person = new Person({
  name: "shivam",
  age: 20,
});
// Fruiti.insertMany([Apple, banana])
//   .then(function () {
//     console.log("successfull");
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// Fruiti.find()
//   .then(function (fruits) {
//     for (let i = 0; i < fruits.length; i++) {
//       console.log(fruits[i].name);
//     }
//   })
//   .catch(function (err) {
//     console.log(err);
//   });
Fruiti.updateOne({ _id: "65099d319d0da17ef1944e93" }, { name: "shivam" }).then(
  () => {
    console.log("Hi");
  }
);
