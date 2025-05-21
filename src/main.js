const apiKey = "54f19a0bc022a12a24c203ed52811bee";

const searchInput= document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const city = document.getElementById("city");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const icon = document.getElementById("icon");
const cityWeather = document.getElementById("cityWeather");
const notCityFound = document.getElementById("notCityFound");

searchButton.addEventListener("click", updateWeatherData);
searchInput.addEventListener("keydown",(event) => {
  if (event.key === "Enter") {
    updateWeatherData();
  }
});

async function updateWeatherData() {
  try {
    if (!searchInput.value.trim()) {
      alert("Svp entrez une ville");
      return;
    }
    const weatherData = await getWeatherData(searchInput.value);
    city.textContent = weatherData.city;
    wind.textContent = weatherData.wind + " km/h";
    humidity.textContent = weatherData.humidity + " % ";
    icon.src = weatherData.icon;
    cityWeather.classList.remove("hidden");
    notCityFound.classList.add("hidden");
  } catch (error) {
    if (error?.code === "404") {
      cityWeather.classList.add("hidden");
      notCityFound.classList.remove("hidden");
      console.error(error.message);
    } else {
      alert(" Une erreur est survenue: " + error);
    }
  }
}

/*
function getIconUrl(icon) {
  return `./src/images/${icon.toLowerCase()}.png`;
}  */

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const apiResponse = await fetch(apiUrl);
  const apiResponseBody = await apiResponse.json();

  if(apiResponseBody.code === "404") {
    throw {code: "404", message: "City not found"};
  }
  return {
    city: apiResponseBody.name,
    wind: Math.round(apiResponseBody.wind.speed),
    humidity: apiResponseBody.main.humidity,
    icon: `https://openweathermap.org/img/wn/${apiResponseBody.weather[0].icon}@2x.png`,
  };
}