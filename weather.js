const apikey = 'your api key'; // Replace with your real key

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please check the city name and try again.');
    }
}

function displayWeather(data) {
    const { main: { temp, humidity }, weather, wind: { speed }, sys: { country }, name } = data;
    const [{ main: weatherMain, description, icon }] = weather;

    const weatherHtml = `
        <h2>Weather in ${name}, ${country}</h2>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${speed} m/s</p>
        <p><strong>Condition:</strong> ${weatherMain} (${description})</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
    `;
    
    document.getElementById('weatherDisplay').innerHTML = weatherHtml;
}
