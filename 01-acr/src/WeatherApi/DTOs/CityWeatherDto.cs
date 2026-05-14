namespace WeatherApi.DTOs;
public record CityWeatherDto(
    string City,
    string Country,
    double Latitude,
    double Longitude,
    string Date,
    double TemperatureMax,
    double TemperatureMin,
    double WindSpeedKmh
);