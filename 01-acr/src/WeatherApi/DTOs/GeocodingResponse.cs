using System.Text.Json.Serialization;

namespace WeatherApi.DTOs;

public record GeocodingResponse(
    [property: JsonPropertyName("results")]
    GeocodingResult[]? Results
);

public record GeocodingResult(
    [property: JsonPropertyName("name")]
    string Name,
    [property: JsonPropertyName("country")]
    string Country,
    [property: JsonPropertyName("latitude")]
    double Latitude,
    [property: JsonPropertyName("longitude")]
    double Longitude
);