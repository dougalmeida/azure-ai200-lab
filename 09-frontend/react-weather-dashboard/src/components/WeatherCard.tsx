interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface Props {
  forecast: WeatherForecast;
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
      <p><strong>Date:</strong> {forecast.date}</p>
      <p><strong>Temperature:</strong> {forecast.temperatureC}°C / {forecast.temperatureF}°F</p>
      <p><strong>Summary:</strong> {forecast.summary}</p>
    </div>
  );
}

export default WeatherCard;