function updateWeatherDetails(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElelment = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time-stamp");
    let currentDayElement = document.querySelector("#present-day");
    let date = new Date(response.data.time * 1000)
    let iconElement = document.querySelector("#icon");
   
    temperatureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElelment.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
    currentDayElement.innerHTML = formatDate(date);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
}

function formatDate(date) {
    let days = ["Sunday", 
                "Monday", 
                "Tuesday", 
                "wednesday", 
                "Thursday", 
                "Friday", 
                "Saturday"];

    let day = days[date.getDay()];

    return `${day}`;
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

searchCity("Bloemfontein");

 let minutes = date.getMinutes();

    if(minutes < 10) {
        minutes = `0${minutes}`;
    }