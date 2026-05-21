import useFetch from './useFetch';

export interface CityWeather {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  windSpeedKmh: number;
}

function useCityWeather(city: string | null) {
  const url = city
    ? `http://localhost:5000/cityweather?city=${encodeURIComponent(city)}`
    : null;

  const { data, loading, error } = useFetch<CityWeather[]>(url);
  return { forecasts: data ?? [], loading, error };
}

export default useCityWeather;