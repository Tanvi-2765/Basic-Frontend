document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "ca4a0426f1fe0cd9c156a9fc5f88714e"; //env variable

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    // Possibility of error thrown
    // Server in another continent...always
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });
  async function fetchWeatherData(city) {
    // gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("Response", response);
    if (!response.ok) {
      throw new Error("City Not Found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    // display weather data
    console.log(data);
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;

    // unlock the display
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    temperatureDisplay.textContent = `Temperature: ${main.temp}`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
