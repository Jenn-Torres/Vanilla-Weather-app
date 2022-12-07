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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Thu", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="forecast-date">${day}</div>
          <img
          src="https://ssl.gstatic.com/onebox/weather/64/cloudy.png"
          alt=""
          width="42"
          />
        <div class="forecast-temperature">
          <span class="temperature-max">18°</span>
          <span class="temperature-min">12°</span>
        </div>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
displayForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// Degrees Conversion
let currentTempFahrenheit = false;

function convertToCelsius() {
  if (currentTempFahrenheit == false) {
    return;
  }

  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemp = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((fahrenheitTemp - 32) * 5) / 9);
  currentTempFahrenheit = false;
}

function convertToFahrenheit() {
  if (currentTempFahrenheit) {
    return;
  }

  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemp = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
  currentTempFahrenheit = true;
}

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", convertToCelsius);

let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", convertToFahrenheit);
