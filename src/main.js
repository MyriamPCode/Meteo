const apiKey = "54f19a0bc022a12a24c203ed52811bee";

const searchInput= document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const city = document.getElementById("city");
const wind = document.getElementById("wind");

searchButton.addEventListener("click", updateWeatherData);
searchInput.addEventListener("keydown",(event) => event.key === "Enter" && updateWeatherData());

async function updateweatherData() {
  try {
    if (!searchInput.value.trim()) {
      alert("Svp entrez une ville");
      return;
    }
  } catch (error) {
    if (error?.code === "404") {
      noCityFound.classlist.remove("hidden");
      console.error(error.message);
    } else {
      alert(" Une erreur est survenue: " + error);
    }
  }
}