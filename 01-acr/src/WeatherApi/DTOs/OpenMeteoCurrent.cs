using System.Text.Json.Serialization;

namespace WeatherApi.DTOs;
public record OpenMeteoCurrent(
    [property: JsonPropertyName("temperature_2m")]
    double Temperature,
    [property: JsonPropertyName("windspeed_10m")]
    double WindSpeed
);