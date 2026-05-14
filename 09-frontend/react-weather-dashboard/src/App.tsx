import { useState, useEffect } from 'react';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

function App() {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/weatherforecast')
      .then(res => res.json())
      .then(data => {
        setForecasts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Weather Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {forecasts.map((f, i) => (
            <li key={i}>
              {f.date} — {f.temperatureC}°C — {f.summary}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;