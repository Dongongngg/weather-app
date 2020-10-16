import React, { useState, useEffect } from "react";
import "../styles/weather_card.css";

export default function WeatherCard(props) {
  const cityNameList = ["sydney", "melbourne", "brisbane"];
  const [crtCity, setCrtCity] = useState(0);
  const [loadFlags, setLoadFlags] = useState([false, false, false]);
  const [tempMax, setTempMax] = useState([0, 0, 0]);
  const [tempMin, setTempMin] = useState([0, 0, 0]);

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
  //handle load weather
  const handleWeather = () => {
    setLoadFlags({ ...loadFlags, [crtCity]: true });
  };

  useEffect(() => {
    const handleFetch = () => {
      const res = fetch(
        `http://localhost:5000/forcast/${cityNameList[crtCity]}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTempMin({ ...tempMin, [crtCity]: parseInt(data.min_temp) });
          setTempMax({ ...tempMax, [crtCity]: parseInt(data.max_temp) });
        });
    };
    handleFetch();
  }, [loadFlags]);

  return (
    <div className="weather-card">
      <div className="city-name">
        <h1>{cityNameList[crtCity]}</h1>
      </div>
      <div className="info-wrapper">
        <div className="left-icon" onClick={handleLeft}>
          left
        </div>
        {loadFlags[crtCity] ? (
          <div className="weather-info">
            <div>weather icon</div>
            <div>{(tempMin[crtCity] + tempMax[crtCity]) / 2}</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>{tempMin[crtCity]}</div>
              <div>{tempMax[crtCity]}</div>
            </div>
          </div>
        ) : (
          <div className="weather-info" onClick={handleWeather}>
            loading icon
          </div>
        )}
        <div className="right-icon" onClick={handleRight}>
          right
        </div>
      </div>
    </div>
  );
}
