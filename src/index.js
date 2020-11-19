function displayTemperature(response) {
    console.log(response.data);

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
        "SATURDAY"
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
        "DECEMBER"
    ];

    let year = date.getFullYear();
    let currentDate = date.getDate();

    return `${day[liveDay]} ${currentDate} ${month[monthIndex]} ${year}`;
}
let dateElement = document.querySelector("#date");
dateElement.innerHTML = dDay(currentTime);

  let apiKey = "2094a2cc37204236b97edd7028b5edc3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Brussels&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
