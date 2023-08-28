const express = require("express");
const { dirname } = require("path");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/weather.html", function (req, res) {
  res.sendFile(__dirname + "/weather.html");
});

app.post("/weather.html", function (req, res) {
  const query = req.body.cityName;
  const appid = "5d864ce5c1bb468a772a5cc0e631e358";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    appid +
    "&units=" +
    unit;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const desc = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.setHeader("Content-Type", "text/html");
      res.write("<h3>weather is currently " + desc + " </h3>");
      res.write(
        "<h1> temperature in " + query + " is " + temp + "degrees celcius.</h1>"
      );
      res.write("<img style='border:solid black' src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server started on port 3000");
});
