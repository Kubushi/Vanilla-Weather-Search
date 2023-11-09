function updateWeatherDetails(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;
    let descriptionElement = document.querySelector("#description");
    let humidityElelment = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-  speed");
    let timeElement = document.querySelector("#time-stamp");
    let currentDayElement = document.querySelector("#present-day")

    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElelment.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = `${response.data.time} * 1000`;
    console.log(response.data);
}

function searchCity(city) {
    //make an api call and update interface
    //separation of concerns
    let apiKey = "a7db2f0b5do924083t9a4312e2c436b2"
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeatherDetails);
}

function retrieveSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-bar-input");
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", retrieveSearchSubmit);

searchCity("Soweto");