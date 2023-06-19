//import { createContext, useContext, useEffect, useState } from "react";

//const WeatherContext = createContext();
//const [query, setQuery] = useState("");
//const {weather} = useContext(WeatherContext);
import { useState, useEffect } from "react";
import "./App.css";

//const url ="https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m";

const api = {
  key: "393ae86f5b290d3e7ae5df94d505a85a",
  base: "https://api.openweathermap.org/data/2.5/",
};

//const url = "https://api.openweathermap.org/data/2.5/weather?q={query}&appid={393ae86f5b290d3e7ae5df94d505a85a}"

function WeatherApp() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({});

  //const url = `${api.base}weather?q=${query}&unit=metric&appid=${api.key}`;

  // When using useEffect React hook
  // useEffect(() => {
  //   const GetWeather = (e) => {
  //     if (e.key === "Enter") {
  //       fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
  //         .then((res) => res.json())
  //         .then((result) => {
  //           setWeather(result);
  //           setQuery("");
  //           console.log(result);
  //         });
  //     }
  //   };
  //   window.addEventListener("keydown", GetWeather);

  //   return () => {
  //     window.removeEventListener("keydown", GetWeather);
  //   };
  // }, [query]);

  
const GetWeather = (e) => {
  if (e.key === "Enter") {
    fetch(`${api.base}weather?q=${location}&appid=${api.key}`)
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
            setLocation("");
            console.log(result);
          });
      }
    };


  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    // <WeatherContext.Provider >
    <div className={
      (typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "weather-app" : "weather-app cold") 
      : "weather-app"}>
      <main>
      <div className="search-box">
        <input
          type="text"
          className="search"
          placeholder="search location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          onKeyDown={GetWeather}
        />
      </div>
      {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location">
            {weather.name}, {weather.sys.country}
          </div>
          <div className="location-date">{dateBuilder(new Date())}</div>
          <div className="weather">
            <div className="weather-temp">{Math.round(weather.main.temp)}℃</div>
            <div className="weather-desc">{weather.weather[0].main}</div>
          </div>
        </div>
      ) : (
        ""
      )}
      </main>
      
    </div>
  );
}

export default WeatherApp;
