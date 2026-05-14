import { useState } from 'react';
import useWeather from './hooks/useWeather';
import WeatherCard from './components/WeatherCard';
import CitySearch from './components/CitySearch';

function App() {
  const { forecasts, loading, error } = useWeather(
    'http://localhost:5000/weatherforecast'
  );
  const [minTemp, setMinTemp] = useState<number>(-100);

  const filtered = forecasts.filter(f => f.temperatureC >= minTemp);

  if (loading) return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1>🌤 Weather Dashboard</h1>
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
    </div>
  );

  if (error) return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🌤 Weather Dashboard</h1>
      <p style={{ color: 'red' }}>Error: {error}</p>
    </div>
  );

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1>🌤 Weather Dashboard</h1>

      {/* City Search */}
      <CitySearch />

      <hr style={{ margin: '2rem 0', borderColor: '#e2e8f0' }} />

      {/* Temperature filter */}
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
        <label style={{ fontWeight: 'bold' }}>Min temperature :</label>
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
        Showing {filtered.length} of {forecasts.length} forecasts
      </p>

      {filtered.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>No forecasts match your filter</p>
      ) : (
        filtered.map((f, i) => <WeatherCard key={i} forecast={f} />)
      )}
    </div>
  );
}

export default App;