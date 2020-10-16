import React, { useState, useEffect } from "react";
import "../styles/weather_page.css";
import WeatherCard from "../components/WeatherCard";

export default function WeatherPage() {
  const [weatherList, setWeatherList] = useState([]);
  const [loadFlag, setLoadFlag] = useState(true);

  //request for weather
  const handleWeather = async () => {};

  return (
    <div className="weather-page">
      <WeatherCard
        weatherHigh={20}
        weatherLow={10}
        weatherAvg={15}
        loadFlag={loadFlag}
      />
    </div>
  );
}
