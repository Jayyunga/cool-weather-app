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

timeElement.innerHTML = `${hours}: ${minutes}`;

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

    return `TODAY : ${day[liveDay]}, ${currentDate} ${month[monthIndex]}, ${year}`;
}
let dateElement = document.querySelector("#date");
dateElement.innerHTML = dDay(currentTime);

function displayLiveWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#livetemp").innerHTML = Math.round(
        response.data.main.temp
    );
}

function searchcity(event) {
    event.preventDefault();
    let apiKey = "2094a2cc37204236b97edd7028b5edc3";
    let city = document.querySelector("#cityform-location").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayLiveWeather);
}
let form = document.querySelector("#cityform");
form.addEventListener("submit", searchcity);
