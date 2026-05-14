import useFetch from './useFetch';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

function useWeather(url: string) {
  const { data, loading, error } = useFetch<WeatherForecast[]>(url);
  return { forecasts: data ?? [], loading, error };
}

export default useWeather;