const apiKey = "649d0d9f246d3f717c2f0afb08ef3250";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  // Effectue une requête pour obtenir les données météorologiques de la ville spécifiée
  const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);

  if (response.status == 404) {
    // Si la ville n'est pas trouvée, affiche un message d'erreur et masque les informations météorologiques
    document.querySelector(".weather").style.display = "none";
  } else {
    // Sinon, récupère les données météorologiques
    let data = await response.json();

    // console.log(data);

    // Met à jour les éléments HTML avec les informations météorologiques
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Met à jour l'icône météorologique en fonction des conditions météorologiques
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "./images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "./images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "./images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "./images/mist.png";
    }

    // Affiche les informations météorologiques
    document.querySelector(".weather").style.display = "block";
  }
}

async function getRandomCity() {
  // Effectue une requête pour récupérer les données du fichier "conf.json"
  const response = await fetch("conf.json");
  // Convertit les données de la réponse en format JSON
  const data = await response.json();
  // Récupère la liste des villes à partir des données
  const cities = data.cities;
  // Génère un index aléatoire en fonction de la longueur de la liste des villes
  const randomIndex = Math.floor(Math.random() * cities.length);
  // Récupère la ville correspondant à l'index aléatoire
  const randomCity = cities[randomIndex];
  // Retourne la ville aléatoire
  return randomCity;
}

function loadRandomWeather() {
  // Obtient une ville aléatoire et appelle la fonction checkWeather avec le nom de la ville aléatoire
  getRandomCity().then((randomCity) => {
    checkWeather(randomCity.name);
  });
}

// Mise à jour de la météo initiale
loadRandomWeather();

// Programmation de la mise à jour de la météo toutes les heures
setInterval(loadRandomWeather, 60 * 60 * 1000); // 60 minutes * 60 secondes * 1000 millisecondes

document.querySelector(".search button").addEventListener("click", loadRandomWeather);
