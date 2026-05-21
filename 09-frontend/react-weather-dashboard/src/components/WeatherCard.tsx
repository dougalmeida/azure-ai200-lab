import { CityWeather } from '../hooks/useCityWeather';

interface Props {
  forecast: CityWeather;
}

function WeatherCard({ forecast }: Props) {
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '0.75rem',
      backgroundColor: '#f8fafc'
    }}>
      <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
        {new Date(forecast.date).toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' })}
      </p>
      <p>🌡 {forecast.temperatureMin}°C – {forecast.temperatureMax}°C</p>
      <p>💨 {forecast.windSpeedKmh} km/h</p>
    </div>
  );
}

export default WeatherCard;