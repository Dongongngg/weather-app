import React from "react";
import "../styles/weather_page.css";
import WeatherCard from "../components/WeatherCard";

export default function WeatherPage() {
  return (
    <div className="weather-page">
      <WeatherCard />
    </div>
  );
}
