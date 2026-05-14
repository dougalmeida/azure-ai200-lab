import { useState } from 'react';
import useCityWeather from '../hooks/useCityWeather';

function CitySearch() {
  const [input, setInput] = useState('');
  const [searchCity, setSearchCity] = useState<string | null>(null);

  const { weather, loading, error } = useCityWeather(searchCity);

  const handleSearch = () => {
    if (input.trim()) setSearchCity(input.trim());
  };

  return (
    <div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Search city..."
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div>
          <h3>{weather.city}, {weather.country}</h3>
          <p>🌡 {weather.temperatureC}°C</p>
          <p>💨 {weather.windSpeedKmh} km/h</p>
        </div>
      )}
    </div>
  );
}

export default CitySearch;