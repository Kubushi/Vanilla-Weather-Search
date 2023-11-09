function updateWeatherDetails(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city

    temperatureElement.innerHTML = Math.round(temperature);
    console.log(response.data.temperature.current);
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