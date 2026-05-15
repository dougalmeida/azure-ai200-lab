using System.Text.Json.Serialization;

namespace WeatherApi.DTOs;
record NominatimResponse(NominatimAddress? Address);
