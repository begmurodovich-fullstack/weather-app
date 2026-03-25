const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');

const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');



searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }
    getWeather(city);
});


async function getWeather(city) {
    const apiKey = 'YOUR_API_KEY';  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);  
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = `Harorat: ${Math.round(data.main.temp)}°C`;
  description.textContent = `Holat: ${data.weather[0].description}`;
  humidity.textContent = `Namlik: ${data.main.humidity}%`;
  wind.textContent = `Shamol: ${data.wind.speed} km/s`;
};


cityInput.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        searchBtn.click();
    }
});