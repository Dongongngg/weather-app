const express = require("express");
const fetch = require("node-fetch");

let router = express.Router();

//get weather by city name
router.get("/:cityName", (req, res) => {
  const cityName = req.params.cityName;

  //send cityName to get city id
  fetch("https://www.metaweather.com/api/location/search/?query=" + cityName)
    .then((res) => res.json())
    .then((data) => {
      console.log("server fetch location : ", cityName);

      //send cityid to get city weather
      fetch("https://www.metaweather.com/api/location/" + data[0].woeid + "/")
        .then((res) => res.json())
        .then((data) => {
          let d = data.consolidated_weather[0];
          let imgUrl = "http://localhost:5000/static/img/";
          let weatherStateName = d.weather_state_name.toLowerCase();

          if (
            weatherStateName.includes("rain") ||
            weatherStateName.includes("shower")
          ) {
            imgUrl += "rain.png";
          } else if (weatherStateName.includes("cloud")) {
            imgUrl += "cloudy.png";
          } else if (weatherStateName.includes("sunny")) {
            imgUrl += "sunny.png";
          } else if (weatherStateName.includes("snow")) {
            imgUrl += "snow.png";
          }

          let sendData = {
            img: imgUrl,
            weather: d.weather_state_name,
            min: parseInt(d.min_temp),
            max: parseInt(d.max_temp),
            the: parseInt(d.the_temp),
          };
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.send(sendData);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
