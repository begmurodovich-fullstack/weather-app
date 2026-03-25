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
    const apiKey = 'a11a0886f3f84a67a34212104262503';  
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
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
    cityName.textContent = `${data.location.name}, ${data.location.region}`;
    temperature.textContent = `Harorat: ${Math.round(data.current.temp_c)}°C`;
    description.textContent = `Holat: ${data.current.condition.text}`;
    humidity.textContent = `Namlik: ${data.current.humidity}%`;
    wind.textContent = `Shamol: ${data.current.wind_kph} km/soat`;
}


cityInput.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        searchBtn.click();
    }
});