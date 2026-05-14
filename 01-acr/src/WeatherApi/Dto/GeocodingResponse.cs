// DTOs for Open-Meteo API responses
record GeocodingResponse(GeocodingResult[]? Results);

record GeocodingResult(
    string Name,
    string Country,
    double Latitude,
    double Longitude
);

record OpenMeteoResponse(OpenMeteoCurrent? Current);

record OpenMeteoCurrent(
    [property: System.Text.Json.Serialization.JsonPropertyName("temperature_2m")]
    double Temperature,
    [property: System.Text.Json.Serialization.JsonPropertyName("windspeed_10m")]
    double WindSpeed
);
