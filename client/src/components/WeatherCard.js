import React, { useState } from "react";
import "../styles/weather_card.css";

export default function WeatherCard(props) {
  const { weatherHigh, weatherLow, weatherAvg, loadFlag } = props;

  const cityNameList = ["sydney", "melbourne", "brisbane"];
  const [crtCity, setCrtCity] = useState(0);

  //handle current city
  const handleLeft = () => {
    if (crtCity + 1 === cityNameList.length) {
      setCrtCity(0);
    } else {
      setCrtCity(crtCity + 1);
    }
  };
  const handleRight = () => {
    if (crtCity - 1 === -1) {
      setCrtCity(2);
    } else {
      setCrtCity(crtCity - 1);
    }
  };

  return (
    <div className="weather-card">
      <div className="city-name">
        <h1>{cityNameList[crtCity]}</h1>
      </div>
      <div className="info-wrapper">
        <div className="left-icon" onClick={handleLeft}>
          left
        </div>
        {loadFlag ? (
          <div className="weather-info">
            <div>icon</div>
            <div>tem avg</div>
            <div style={{ display: "flex" }}>
              <div>tem low</div>
              <div>tem high</div>
            </div>
          </div>
        ) : (
          <div className="weather-info">not ready</div>
        )}
        <div className="right-icon" onClick={handleRight}>
          right
        </div>
      </div>
    </div>
  );
}
