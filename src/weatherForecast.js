import React, { useState, useEffect } from "react";
import "./weatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./weatherForecastDay";

export default function WeatherForecast(props) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
    const { lon, lat } = props.coordinates;
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then((response) => {
      setForecast(response.data.daily);
    });
  }, [props.coordinates]);

  if (!forecast) return null;

  return (
    <div className="WeatherForecast">
      <div className="row">
        {forecast.slice(1, 6).map((dailyForecast, index) => (
          <div className="col" key={index}>
            <WeatherForecastDay data={dailyForecast} />
          </div>
        ))}
      </div>
    </div>
  );
}
