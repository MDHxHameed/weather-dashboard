import React, { useState } from 'react';
import axios from 'axios';
import './styles/App.css';

const API_KEY = '5327d7760984d7f7123517e5b7cce801'; // 🔁 Replace with your real API key

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      setError('');
    } catch (err) {
      setError('City not found or API error');
      setWeather(null);
    }
  };

  return (
    <div className="app-container">
      <h1>🌍 Real-Time Global Weather</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter a city or country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="not-found">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Condition:</strong> {weather.weather[0].description}</p>
          <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
          <p><strong>Coordinates:</strong> {weather.coord.lat}, {weather.coord.lon}</p>
        </div>
      )}
    </div>
  );
}

export default App;
