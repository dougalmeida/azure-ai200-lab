import useWeather from './hooks/useWeather';
import WeatherCard from './components/WeatherCard';

function App() {
  const { forecasts, loading, error } = useWeather(
    'http://localhost:5000/weatherforecast'
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1>🌤 Weather Dashboard</h1>
      <p style={{ color: '#64748b' }}>{forecasts.length} forecasts loaded</p>
      {forecasts.map((f, i) => (
        <WeatherCard key={i} forecast={f} />
      ))}
    </div>
  );
}

export default App;