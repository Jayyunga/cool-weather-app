function displayTemperature(response) {
  let livetempElement = document.querySelector("#livetemp");
  livetempElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let liveiconElement = document.querySelector("#liveicon");
  liveiconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let timeElement = document.querySelector("#time");
let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

timeElement.innerHTML = `${hours} : ${minutes} (*)`;

function dDay(date) {
  let liveDay = date.getDay();
  let day = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  let monthIndex = date.getMonth();
  let month = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  let year = date.getFullYear();
  let currentDate = date.getDate();

  return `${day[liveDay]} ${currentDate} ${month[monthIndex]} ${year}`;
}
let dateElement = document.querySelector("#date");
dateElement.innerHTML = dDay(currentTime);

function searchCity(city) {
  let apiKey = "2094a2cc37204236b97edd7028b5edc3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

for (let index = 0; index < 6; index++) {
forecast = response.data.list[index];
forecastElement.innerHTML += `
     <div class="col-sm-2">
            <ul>
                <li id="ftime">
${forecastTime(forecast.dt *  1000)}
                </li>
                <li id="ficon">
<img src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png" />
                </li>
                <li id="ftemp">
<strong>${Math.round(forecast.main.temp_max)}°</strong>  ${Math.round(forecast.main.temp_min)}°
                </li>
            </ul>
        </div>
    
    `;
  }
}

function forecastTime(timestamp) {
  let forecastTime = new Date(timestamp);
  let hours = forecastTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = forecastTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}


function submitCity(event) {
  event.preventDefault();
  let cityformlocationElement = document.querySelector("#cityform-location");
  searchCity(cityformlocationElement.value);
}
searchCity("Brussels");

let formElement = document.querySelector("#cityform");
formElement.addEventListener("submit", submitCity);
