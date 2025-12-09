import React from "react";
import Weather from "./weather";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <Weather />
        <footer>
          This project was coded by{" "}
          <a href="https://github.com/JohnNesha" target="_blank">
            JohnNesha G
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/JohnNesha/react-weather-app"
            target="_blank"
          >
            {" "}
            open-sourced on Github
          </a>
        </footer>
      </div>
    </div>
  );
}
