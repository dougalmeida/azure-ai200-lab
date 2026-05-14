using System.Text.Json.Serialization;

namespace WeatherApi.DTOs;
record NominatimResponse(NominatimAddress? Address);

record NominatimAddress(
    string? City,
    string? Town,
    string? Village,
    string? Country
);

record OpenMeteoDaily(
    [property: JsonPropertyName("time")]
    string[] Time,
    [property: JsonPropertyName("temperature_2m_max")]
    double[] TemperatureMax,
    [property: JsonPropertyName("temperature_2m_min")]
    double[] TemperatureMin,
    [property: JsonPropertyName("windspeed_10m_max")]
    double[] WindSpeedMax
);