import React from 'react';

function WeatherInfo({ weather, air }) {
  return (
    <div className="info">
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>
      <p>🌡 Temp: {weather.main.temp} °C</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>🌤 Condition: {weather.weather[0].description}</p>
      <p>🌫 AQI: {air?.main?.aqi || 'N/A'}</p>
    </div>
  );
}

export default WeatherInfo;
