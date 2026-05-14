var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.MapGet("/cityweather", async (string city, IHttpClientFactory httpClientFactory) =>
{
    var client = httpClientFactory.CreateClient();

    // Step 1 — Geocoding : city name → coordinates
    var geoUrl = $"https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1";
    var geoResponse = await client.GetFromJsonAsync<GeocodingResponse>(geoUrl);

    if (geoResponse?.Results == null || geoResponse.Results.Length == 0)
        return Results.NotFound($"City '{city}' not found");

    var location = geoResponse.Results[0];

    // Step 2 — Weather : coordinates → current weather
    var weatherUrl = string.Format(
        System.Globalization.CultureInfo.InvariantCulture,
        "https://api.open-meteo.com/v1/forecast" +
        "?latitude={0}&longitude={1}" +
        "&current=temperature_2m,windspeed_10m,weathercode" +
        "&timezone=auto",
        location.Latitude,
        location.Longitude
    );

    var weatherResponse = await client.GetFromJsonAsync<OpenMeteoResponse>(weatherUrl);

    if (weatherResponse?.Current == null)
        return Results.Problem("Could not fetch weather data");

    // Step 3 — Return clean DTO
    var result = new CityWeatherDto(
        City: location.Name,
        Country: location.Country,
        Latitude: location.Latitude,
        Longitude: location.Longitude,
        TemperatureC: weatherResponse.Current.Temperature,
        WindSpeedKmh: weatherResponse.Current.WindSpeed
    );

    return Results.Ok(result);
})
.WithName("GetCityWeather");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
