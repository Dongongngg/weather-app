import React, { useState, useEffect } from "react";
import "../styles/weather_card.css";

//information section
const WeatherInfo = (props) => {
  const { min, max, the, weather, crtCity, imgSrc } = props;

  return (
    <div className="weather-info">
      <div>
        <img src={imgSrc[crtCity]} alt="weather"></img>
      </div>
      <h2>{the[crtCity]}&#8451;</h2>
      <div className="temp-box">
        <h2>{min[crtCity]}&#8451;</h2>
        <h2>{max[crtCity]}&#8451;</h2>
      </div>
      <h2>{weather[crtCity]}</h2>
    </div>
  );
};

export default function WeatherCard(props) {
  const cityNameList = ["Sydney", "Melbourne", "Brisbane"];
  const [crtCity, setCrtCity] = useState(0);
  const [loadFlags, setLoadFlags] = useState([false, false, false]);
  //weather information states
  const [tempMax, setTempMax] = useState([]);
  const [tempMin, setTempMin] = useState([]);
  const [tempThe, setTempThe] = useState([]);
  const [weatherState, setWeatherState] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);

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
    fetch(`http://localhost:5000/forcast/${cityNameList[crtCity]}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("weather response", data);
        setTempMin({ ...tempMin, [crtCity]: data.min });
        setTempMax({ ...tempMax, [crtCity]: data.max });
        setTempThe({ ...tempThe, [crtCity]: data.the });
        setWeatherState({ ...weatherState, [crtCity]: data.weather });
        setImgSrc({ ...imgSrc, [crtCity]: data.img });
      })
      .catch((err) => err);
  }, [loadFlags]);

  return (
    <div className="weather-card">
      <div className="city-name">
        <h1>{cityNameList[crtCity]}</h1>
      </div>
      <div className="info-wrapper">
        <div className="left-icon" onClick={handleLeft}>
          <img
            className="icon"
            src="http://localhost:5000/static/img/leftArrow.png"
            alt="leftArrow"
          ></img>
        </div>
        {/* temperature information section */}
        {loadFlags[crtCity] ? (
          <WeatherInfo
            min={tempMin}
            max={tempMax}
            the={tempThe}
            weather={weatherState}
            crtCity={crtCity}
            imgSrc={imgSrc}
          />
        ) : (
          <div className="loading-icon" onClick={handleWeather}>
            <img
              className="icon"
              src="http://localhost:5000/static/img/refresh.png"
              alt="loading"
            ></img>
          </div>
        )}
        <div className="right-icon" onClick={handleRight}>
          <img
            className="icon"
            src="http://localhost:5000/static/img/rightArrow.png"
            alt="rightArrow"
          ></img>
        </div>
      </div>
    </div>
  );
}
