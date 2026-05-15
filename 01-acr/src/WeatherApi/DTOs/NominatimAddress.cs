
namespace WeatherApi.DTOs;

record NominatimAddress(
    string? City,
    string? Town,
    string? Village,
    string? Country
);
