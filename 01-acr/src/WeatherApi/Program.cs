using WeatherApi.DTOs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddHttpClient();

var app = builder.Build();

app.UseCors("AllowReact");

app.MapGet("/cityweather", async (
    string? city,
    double? lat,
    double? lng,
    IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient();

    double latitude;
    double longitude;
    string cityName;
    string country;

    if (lat.HasValue && lng.HasValue)
    {
        // Coordinates provided — reverse geocode to get city name
        latitude = lat.Value;
        longitude = lng.Value;

        var reverseUrl = string.Format(
            System.Globalization.CultureInfo.InvariantCulture,
            "https://nominatim.openstreetmap.org/reverse" +
            "?lat={0}&lon={1}&format=json",
            latitude, longitude
        );

        var reverseClient = httpClientFactory.CreateClient();
        reverseClient.DefaultRequestHeaders.Add(
            "User-Agent", "AzureAI200Lab/1.0"
        );

        var reverseResponse = await reverseClient
            .GetFromJsonAsync<NominatimResponse>(reverseUrl);

        cityName = reverseResponse?.Address?.City
            ?? reverseResponse?.Address?.Town
            ?? reverseResponse?.Address?.Village
            ?? "Unknown";
        country = reverseResponse?.Address?.Country ?? "";
    }
    else if (!string.IsNullOrEmpty(city))
    {
        // City name provided — geocode to get coordinates
        var geoUrl = $"https://geocoding-api.open-meteo.com/v1/search" +
                     $"?name={city}&count=1";
        var geoResponse = await client
            .GetFromJsonAsync<GeocodingResponse>(geoUrl);

        if (geoResponse?.Results == null || geoResponse.Results.Length == 0)
            return Results.NotFound($"City '{city}' not found");

        var location = geoResponse.Results[0];
        latitude = location.Latitude;
        longitude = location.Longitude;
        cityName = location.Name;
        country = location.Country;
    }
    else
    {
        return Results.BadRequest("Provide either city or lat/lng");
    }

    // Fetch weather for coordinates
    var weatherUrl = string.Format(
        System.Globalization.CultureInfo.InvariantCulture,
        "https://api.open-meteo.com/v1/forecast" +
        "?latitude={0}&longitude={1}" +
        "&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max" +
        "&timezone=auto&forecast_days=5",
        latitude, longitude
    );

    var weatherResponse = await client
        .GetFromJsonAsync<OpenMeteoResponse>(weatherUrl);

    if (weatherResponse?.Daily == null)
        return Results.Problem("Could not fetch weather data");

    var forecasts = Enumerable.Range(0, 5).Select(i => new CityWeatherDto(
        City: cityName,
        Country: country,
        Latitude: latitude,
        Longitude: longitude,
        Date: weatherResponse.Daily.Time[i],
        TemperatureMax: weatherResponse.Daily.TemperatureMax[i],
        TemperatureMin: weatherResponse.Daily.TemperatureMin[i],
        WindSpeedKmh: weatherResponse.Daily.WindSpeedMax[i]
    )).ToList();

    return Results.Ok(forecasts);
})
.WithName("GetCityWeather");

app.Run();
