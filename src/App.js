import React, { useState } from 'react';
import Fuse from 'fuse.js';
import FAKE_WEATHER from './data/fake_global_weather_data.json';
import './styles/App.css';

function App() {
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);

  const fuse = new Fuse(FAKE_WEATHER, {
    keys: ['city', 'country'],
    threshold: 0.3,
  });

  const handleSearch = () => {
    const result = fuse.search(query);
    if (result.length > 0) {
      setSelectedCity(result[0].item);
    } else {
      setSelectedCity(null);
    }
  };

  return (
    <div className="app-container">
      <h1>🌍 Global Weather Dashboard</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter a city or country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {selectedCity ? (
        <div className="weather-info">
          <h2>{selectedCity.city}, {selectedCity.country}</h2>
          <p><strong>Temperature:</strong> {selectedCity.temp}°C</p>
          <p><strong>Humidity:</strong> {selectedCity.humidity}%</p>
          <p><strong>Condition:</strong> {selectedCity.condition}</p>
          <p><strong>Air Quality Index:</strong> {selectedCity.aqi}</p>
          <p><strong>Coordinates:</strong> {selectedCity.coords.lat}, {selectedCity.coords.lon}</p>
        </div>
      ) : (
        query && <p className="not-found">No data found for "{query}"</p>
      )}
    </div>
  );
}

export default App;
