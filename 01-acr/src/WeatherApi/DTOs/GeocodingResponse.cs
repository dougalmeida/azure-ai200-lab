using System.Text.Json.Serialization;

namespace WeatherApi.DTOs;

public record GeocodingResponse(
    [property: JsonPropertyName("results")]
    GeocodingResult[]? Results
);
