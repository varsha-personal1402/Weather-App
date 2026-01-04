import { useState } from 'react';
import './Weather.css';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "8a37036beaade1f9892aa5743c8669aa"; 

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log(response.data);
      setWeather(response.data);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  const handleClick = () => {
    if (city.trim() !== "") {
      fetchWeather();
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter City Name"
        value={city}
        onChange={handleCityChange}
      />
      <button onClick={handleClick}>Get Weather</button>

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default Weather;
