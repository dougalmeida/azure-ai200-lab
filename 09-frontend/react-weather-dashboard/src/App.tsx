import { useState } from 'react';
import useCityWeather from './hooks/useCityWeather';
import WeatherCard from './components/WeatherCard';
import CitySearch from './components/CitySearch';

function App() {
  const [city, setCity] = useState<string | null>(null);
  const [minTemp, setMinTemp] = useState<number>(-100);

  const { forecasts, loading, error } = useCityWeather(city);

  const filtered = forecasts.filter(f => f.temperatureMax >= minTemp);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1>🌤 Weather Dashboard</h1>

      <CitySearch onSearch={setCity} />

      {!city && (
        <p style={{ color: '#94a3b8', marginTop: '2rem' }}>
          Search for a city to see the 5-day forecast.
        </p>
      )}

      {loading && (
        <>
          <hr style={{ margin: '2rem 0', borderColor: '#e2e8f0' }} />
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '0.75rem',
              backgroundColor: '#f1f5f9',
              height: '80px',
            }} />
          ))}
        </>
      )}

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>Error: {error}</p>}

      {forecasts.length > 0 && (
        <>
          <hr style={{ margin: '2rem 0', borderColor: '#e2e8f0' }} />

          <p style={{ color: '#475569', fontWeight: 'bold', marginBottom: '1rem' }}>
            {forecasts[0].city}, {forecasts[0].country}
          </p>

          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <label style={{ fontWeight: 'bold' }}>Min temperature:</label>
            <input
              type="range"
              min={-20}
              max={40}
              value={minTemp}
              onChange={e => setMinTemp(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ fontWeight: 'bold', color: '#2563eb' }}>{minTemp}°C</span>
          </div>

          <p style={{ color: '#64748b', marginBottom: '1rem' }}>
            Showing {filtered.length} of {forecasts.length} days
          </p>

          {filtered.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>No days match your filter</p>
          ) : (
            filtered.map((f, i) => <WeatherCard key={i} forecast={f} />)
          )}
        </>
      )}
    </div>
  );
}

export default App;