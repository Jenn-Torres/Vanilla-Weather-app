function formatDate(timesTamp) {
  let date = new Date(timesTamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (dailyForecast, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="forecast-date">${formatDay(dailyForecast.dt)}</div>
          <img
          src="https://openweathermap.org/img/wn/${
            dailyForecast.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
          />
        <div class="forecast-temperature">
          <span class="temperature-max"> ${Math.round(
            dailyForecast.temp.max
          )}°</span>
          <span class="temperature-min"> ${Math.round(
            dailyForecast.temp.min
          )}°</span>
        </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showForecast(coordinates) {
  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function changeWeatherBackground(weatherDescription) {
  let container = document.querySelector("#weather-app-container");
  switch (weatherDescription) {
    case "Clear":
      container.style.background =
        "linear-gradient(24deg, rgba(62,226,228,1) 21%, rgba(39,149,226,1) 79%)";
      break;

    case "Clouds":
      container.style.background =
        "linear-gradient(186deg, rgba(158,169,170,1) 30%, rgba(182,199,211,1) 50%, rgba(81,113,170,1) 80%)";
      break;

    case "Snow":
      container.style.background =
        "linear-gradient(139deg, rgba(185,193,200,1) 17%, rgba(239,240,242,1) 78%)";
      break;

    case "Rain":
      container.style.background =
        "linear-gradient(35deg, rgba(60,169,172,1) 7%, rgba(29,182,253,1) 42%, rgba(99,117,226,1) 71%)";
      break;

    case "Drizzle":
      container.style.background =
        "linear-gradient(35deg, rgba(60,172,169,1) 19%, rgba(29,182,253,1) 51%, rgba(30,143,187,1) 79%)";
      break;

    case "Thunderstorm":
      container.style.background =
        "linear-gradient(circle, rgba(238,174,202,1) 0%, rgba(31,64,145,1) 81%)";
      break;

    default:
      container.style.background =
        "linear-gradient(25deg, rgba(34, 193, 195, 1) 21%,rgba(253, 187, 45, 1) 100%)";
  }
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  showForecast(response.data.coord);

  let weatherDescription = response.data.weather[0].main;
  changeWeatherBackground(weatherDescription);
}

function search(city) {
  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("London");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
