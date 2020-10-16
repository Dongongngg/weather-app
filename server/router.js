const express = require("express");
const fetch = require("node-fetch");

let router = express.Router();

//get weather by city name
router.get("/:cityName", (req, res) => {
  const cityName = req.params.cityName;
  console.log(cityName);

  //send cityName to get city id
  fetch("https://www.metaweather.com/api/location/search/?query=" + cityName)
    .then((res) => res.json())
    .then((data) => {
      console.log("fetch location : ", cityName);

      //send cityid to get city weather
      fetch("https://www.metaweather.com/api/location/" + data[0].woeid + "/")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.consolidated_weather[0]);
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.send(data.consolidated_weather[0]);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
