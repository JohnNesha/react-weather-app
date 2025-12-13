import React, { useState, useEffect } from "react";
import "./weatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./weatherForecastDay";

export default function WeatherForecast(props) {
  const [forecast, setForecast] = useState(null);
  const [loadedCity, setLoadedCity] = useState(null);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoadedCity(props.city);
  }

  if (loadedCity !== props.city) {
    const apiKey = "a723fd412o41a9d1a23tfcb7443f0307";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${props.city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
    return null;
  }

  if (!forecast) return null;

  return (
    <div className="WeatherForecast">
      <div className="row">
        {forecast.slice(0, 5).map((dailyForecast, index) => (
          <div className="col" key={index}>
            <WeatherForecastDay data={dailyForecast} />
          </div>
        ))}
      </div>
    </div>
  );
}
