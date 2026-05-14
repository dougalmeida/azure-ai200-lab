import useFetch from './useFetch';

interface CityWeather {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  temperatureC: number;
  windSpeedKmh: number;
}

function useCityWeather(city: string | null) {
  const url = city
    ? `http://localhost:5000/cityweather?city=${city}`
    : null;

  const { data, loading, error } = useFetch<CityWeather>(url);
  return { weather: data, loading, error };
}

export default useCityWeather;