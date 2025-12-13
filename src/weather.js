import React, { useState } from "react";
import WeatherInfo from "./weatherInfo";
import WeatherForecast from "./weatherForecast";
import axios from "axios";
import "./weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    const iconUrl = response.data.condition.icon_url;

    let iconCode = "01d";
    if (iconUrl.includes("clear-sky-day")) iconCode = "01d";
    else if (iconUrl.includes("clear-sky-night")) iconCode = "01n";
    else if (iconUrl.includes("few-clouds-day")) iconCode = "02d";
    else if (iconUrl.includes("few-clouds-night")) iconCode = "02n";
    else if (iconUrl.includes("scattered-clouds")) iconCode = "03d";
    else if (iconUrl.includes("broken-clouds")) iconCode = "04d";
    else if (iconUrl.includes("shower-rain")) iconCode = "09d";
    else if (iconUrl.includes("rain-day")) iconCode = "10d";
    else if (iconUrl.includes("rain-night")) iconCode = "10n";
    else if (iconUrl.includes("thunderstorm")) iconCode = "11d";
    else if (iconUrl.includes("snow")) iconCode = "13d";
    else if (iconUrl.includes("mist")) iconCode = "50d";
    else if (iconUrl.includes("overcast-clouds")) iconCode = "04d";

    setWeatherData({
      ready: true,
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      date: new Date(response.data.time * 1000),
      description: response.data.condition.description,
      icon: iconCode,
      wind: response.data.wind.speed,
      city: response.data.city,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    const apiKey = "a723fd412o41a9d1a23tfcb7443f0307";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast city={weatherData.city} />
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
