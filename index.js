const button = document.getElementById("Search-button");
const input = document.getElementById("city-input");
const display = document.getElementById("weather-display");

async function getData(cityName) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=8f4dce360e3a453ba9a162731240412&q=${cityName}&aqi=yes`);
    return await response.json();
}

button.addEventListener("click", async () => {
    const value = input.value.trim(); // Trim to handle extra spaces
    if (!value) {
        display.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    try {
        const result = await getData(value);

        // Format the time and date
        const localTime = result.location.localtime;

        // Display the weather information with all details
        display.innerHTML = `
            <h2>Weather in ${result.location.name}, ${result.location.country}</h2>
            <p><strong>Local Time:</strong> ${localTime}</p>
            <p><strong>Temperature:</strong> ${result.current.temp_c}°C</p>
            <p><strong>Condition:</strong> ${result.current.condition.text}</p>
            <p><strong>Wind Speed:</strong> ${result.current.wind_kph} km/h</p>
            <p><strong>Wind Direction:</strong> ${result.current.wind_dir}</p>
            <p><strong>Pressure:</strong> ${result.current.pressure_mb} mb</p>
            <p><strong>Precipitation:</strong> ${result.current.precip_mm} mm</p>
            <p><strong>Humidity:</strong> ${result.current.humidity}%</p>
            <p><strong>Cloud Cover:</strong> ${result.current.cloud}%</p>
            <img src="${result.current.condition.icon}" alt="Weather Icon">
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        display.innerHTML = "<p>Unable to fetch weather data. Please try again later.</p>";
    }
});





// http://api.weatherapi.com/v1/current.json?key=8f4dce360e3a453ba9a162731240412&q=London&aqi=yes