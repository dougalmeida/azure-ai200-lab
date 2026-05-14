using System.Text.Json.Serialization;

namespace WeatherApi.DTOs;
record OpenMeteoResponse(
    [property: JsonPropertyName("current")]
    OpenMeteoCurrent? Current,
    [property: JsonPropertyName("daily")]
    OpenMeteoDaily? Daily
);