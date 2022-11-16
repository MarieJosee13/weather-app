//real date for day & time
function formatDate(date) {
  let backgroundColor = document.querySelector("#card-body");
  let hours = date.getHours();
  if (((hours = 12), 13, 14, 15, 16, 17)) {
    backgroundColor.style.background =
      "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)";
  }
  if (hours >= 18) {
    backgroundColor.style.background =
      "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)";
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  if (hours >= 12) {
    return `${day} ${hours}:${minutes} pm`;
  } else {
    return `${day} ${hours}:${minutes} am`;
  }
}
//API for searchCity engine
function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humid").innerHTML = Math.round(
    response.data.main.humidity
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
}
function searchCity(city) {
  let apiKey = "5e910c08188e49716f20c4b9bf7bd81f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

//Geo Location button
function searchPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "5e910c08188e49716f20c4b9bf7bd81f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function CurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

function displayForecast() {
  let forecastElement = document.querySelector("#five-weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  
            <div class="col-2">
              <h4>${day}</h4>
              <p class="percipitation">
                Light rain
                <br />
                42% 💧
              </p>
              <img
                src="http://openweathermap.org/img/wn/03d@2x.png"
                alt=""
                width="45"
              />
              <p class="high-low">
                High 19°C
                <br />
                Low 12°C
              </p>
            </div>
          
            `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
let date = document.querySelector("#present-day");
let now = new Date();
date.innerHTML = formatDate(now);

let button = document.querySelector("#geo-btn");
button.addEventListener("click", CurrentPosition);

let form = document.querySelector("#form-city");
form.addEventListener("submit", handleSubmit);
searchCity("Vancouver");

displayForecast();
