// === DOM Elementlari ===
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loadingContainer = document.getElementById('loadingContainer');
const errorContainer = document.getElementById('errorContainer');
const errorMessage = document.getElementById('errorMessage');
const errorClose = document.getElementById('errorClose');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const weatherIcon = document.getElementById('weatherIcon');
const feelsLike = document.getElementById('feelsLike');

// === Weather Icon Mapping ===
const weatherIcons = {
  'Sunny': '☀️',
  'Clear': '☀️',
  'Partly cloudy': '⛅',
  'Cloudy': '☁️',
  'Overcast': '☁️',
  'Mist': '🌫️',
  'Fog': '🌫️',
  'Rain': '🌧️',
  'Light rain': '🌧️',
  'Moderate rain': '🌧️',
  'Heavy rain': '🌧️',
  'Drizzle': '🌦️',
  'Light drizzle': '🌦️',
  'Snow': '❄️',
  'Light snow': '❄️',
  'Moderate snow': '❄️',
  'Heavy snow': '❄️',
  'Sleet': '🌨️',
  'Thunderstorm': '⛈️',
  'Thunder': '⛈️',
  'default': '🌤️'
};

// === Weather Class Mapping ===
const weatherClasses = {
  'Sunny': 'clear',
  'Clear': 'clear',
  'Partly cloudy': 'clouds',
  'Cloudy': 'clouds',
  'Overcast': 'clouds',
  'Mist': 'clouds',
  'Fog': 'clouds',
  'Rain': 'rain',
  'Light rain': 'rain',
  'Moderate rain': 'rain',
  'Heavy rain': 'rain',
  'Drizzle': 'rain',
  'Light drizzle': 'rain',
  'Snow': 'snow',
  'Light snow': 'snow',
  'Moderate snow': 'snow',
  'Heavy snow': 'snow',
  'Sleet': 'snow',
  'Thunderstorm': 'thunder',
  'Thunder': 'thunder',
  'default': 'clear'
};

// === Qidiruv Event ===
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city === '') {
    showError('Iltimos, shahar nomini kiriting.');
    return;
  }
  getWeather(city);
});

// Enter bilan qidirish
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

// Error yopish
errorClose.addEventListener('click', () => {
  hideError();
});

// === Asosiy API funksiyasi ===
async function getWeather(city) {
  showLoading();
  hideError();
  hideWeatherInfo();
  
  const apiKey = 'a11a0886f3f84a67a34212104262503';
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Shahar topilmadi');
    }
    
    const data = await response.json();
    displayWeather(data);
    
  } catch (error) {
    showError(error.message || 'Xatolik yuz berdi');
    hideLoading();
  }
}

// === Ma'lumotlarni Ko'rsatish ===
function displayWeather(data) {
  hideLoading();
  
  // Ma'lumotlarni yangilash
  cityName.textContent = data.location.name;
  temperature.textContent = Math.round(data.current.temp_c);
  description.textContent = data.current.condition.text;
  humidity.textContent = `${data.current.humidity}%`;
  wind.textContent = `${data.current.wind_kph} km/s`;
  feelsLike.textContent = `${Math.round(data.current.feelslike_c)}°C`;
  
  // Icon yangilash
  const condition = data.current.condition.text;
  weatherIcon.textContent = weatherIcons[condition] || weatherIcons['default'];
  
  // Body class yangilash (background uchun)
  const weatherClass = weatherClasses[condition] || weatherClasses['default'];
  document.body.className = `weather-body ${weatherClass}`;
  
  // Weather info ko'rsatish
  showWeatherInfo();
}

// === UI State Funksiyalar ===
function showLoading() {
  loadingContainer.hidden = false;
  weatherInfo.hidden = true;
  errorContainer.hidden = true;
}

function hideLoading() {
  loadingContainer.hidden = true;
}

function showError(message) {
  errorMessage.textContent = message;
  errorContainer.hidden = false;
  weatherInfo.hidden = true;
  loadingContainer.hidden = true;
}

function hideError() {
  errorContainer.hidden = true;
}

function showWeatherInfo() {
  weatherInfo.hidden = false;
}

function hideWeatherInfo() {
  weatherInfo.hidden = true;
}
