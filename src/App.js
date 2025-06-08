import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';
import MapView from './components/MapView';
import './styles/app.css';

const FAKE_WEATHER = [
  {
    city: 'London',
    country: 'UK',
    coords: { lat: 51.5074, lon: -0.1278 },
    temp: 18,
    humidity: 70,
    condition: 'Rainy',
    aqi: 3,
  },
  {
    city: 'New York',
    country: 'USA',
    coords: { lat: 40.7128, lon: -74.006 },
    temp: 25,
    humidity: 50,
    condition: 'Sunny',
    aqi: 1,
  },
  {
    city: 'Delhi',
    country: 'India',
    coords: { lat: 28.6139, lon: 77.209 },
    temp: 38,
    humidity: 40,
    condition: 'Smog',
    aqi: 5,
  },
];

function App() {
  const [weather, setWeather] = useState(null);
  const [coords, setCoords] = useState(null);
  const [air, setAir] = useState(null);

  const fetchWeather = (cityName) => {
    const result = FAKE_WEATHER.find(
      (c) => c.city.toLowerCase() === cityName.toLowerCase()
    );
    if (result) {
      setWeather({
        name: result.city,
        sys: { country: result.country },
        main: {
          temp: result.temp,
          humidity: result.humidity,
        },
        weather: [{ description: result.condition }],
        coord: result.coords,
      });
      setAir({ main: { aqi: result.aqi } });
      setCoords(result.coords);
    } else {
      alert('City not found in local data');
    }
  };

  return (
    <div className={`app ${weather?.weather[0].description.toLowerCase()}`}>
      <h1>🌍 Local Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeather} />
      {weather && <WeatherInfo weather={weather} air={air} />}
      {coords && <MapView lat={coords.lat} lon={coords.lon} />}
    </div>
  );
}

export default App;
