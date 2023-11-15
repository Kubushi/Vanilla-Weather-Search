function updateWeatherDetails(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElelment = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#timestamp");
    let currentDayElement = document.querySelector("#present-day");
    let date = new Date(response.data.time * 1000)
    let iconElement = document.querySelector("#icon");
   
    temperatureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElelment.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = newDate(date);
    currentDayElement.innerHTML = formatDate(date);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

    getForecast(response.data.city);
}

function formatDate(date) {
    let days = ["Sunday", 
                "Monday", 
                "Tuesday", 
                "Wednesday", 
                "Thursday", 
                "Friday", 
                "Saturday"];

    let day = days[date.getDay()];

    return `${day}`;
}

function newDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let time = `${date.getHours}:${date.getMinutes}`;

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
 
    return `${hours}:${minutes}`;
}

function searchCity(city) {
    //make an api call and update interface
    //separation of concerns
    let apiKey = "a7db2f0b5do924083t9a4312e2c436b2"
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeatherDetails);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = "a7db2f0b5do924083t9a4312e2c436b2";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    console.log(apiUrl);

    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    console.log(response.data)


    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
        forecastHtml = 
        forecastHtml +

        `
        <div class="weekly-weather-date">
            <div class="weekly-forecast-days">${formatDay(day.time)}</div>
                <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
                <div class="weather-forecast-temperatures">
                    <span class="forecast-temperature-max">
                        <strong>${Math.round(day.temperature.maximum)}</strong>
                    </span>
                    <span class="forecast-temperature-min">
                        <strong>${Math.round(day.temperature.minimum)}°</strong>
                    </span>
                 </div>
            </div>
            </div>
        </div>`
    ;
        }
}); 

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}

function retrieveSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-bar-input");
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", retrieveSearchSubmit);

searchCity("Soweto");
newDate();
displayForecast();