console.log("hello");

cityInputContainer = document.querySelector("#city-input");
todayWeatherContainer = document.querySelector("#city-data")

var createInputElements = function () {
  cityInputForm = document.createElement("form");
  cityInputForm.setAttribute("id", "city-input-form");

  cityInputEl = document.createElement("input");
  cityInputBtn = document.createElement("button");

  cityInputBtn.innerHTML = "Search";

  cityInputForm.appendChild(cityInputEl);
  cityInputForm.appendChild(cityInputBtn);

  cityInputContainer.appendChild(cityInputForm);

  return(cityInputForm);
};

var populateWeatherData = function (data, city) {
  const date = new Date();
  const headerString = `${city}, ${date.toString()}`;

  todayWeatherEl = document.createElement("div");

  todayWeatherTitle = document.createElement("h1");
  todayWeatherTitle.innerHTML = headerString;

  twWeather = document.createElement("p");
  twWeather.innerHTML = data.current.weather[0].main;
  twTemp = document.createElement("p");
  twTemp.innerHTML = `Temp: ${data.current.temp} degrees Fahrenheit`;
  twWind = document.createElement("p");
  twWind.innerHTML = `Wind: ${data.current.wind_speed} MPH`;
  twHumidity = document.createElement("p");
  twHumidity.innerHTML = `Humidity: ${data.current.humidity}%`;
  twUV = document.createElement("p");
  twUV.innerHTML = `UVI: ${data.current.uvi}`;

  todayWeatherEl.appendChild(todayWeatherTitle);
  todayWeatherEl.appendChild(twWeather);
  todayWeatherEl.appendChild(twTemp);
  todayWeatherEl.appendChild(twWind);
  todayWeatherEl.appendChild(twHumidity);
  todayWeatherEl.appendChild(twUV);

  todayWeatherContainer.appendChild(todayWeatherEl);
};

var getWeatherFromCity = function (city) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=8dcca6a1bd0ce71b1e042d84b69aec12`
  ).then(function (response) {
    response.json().then(function (data) {
      locData = { lat: data[0].lat, lon: data[0].lon };
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${locData.lat}&lon=${locData.lon}&units=imperial&exclude=minutely,hourly,alerts&appid=8dcca6a1bd0ce71b1e042d84b69aec12`
      ).then(function (response) {
        response.json().then(function (data) {
          populateWeatherData(data, city);
        });
      });
    });
  });
};

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = cityInputEl.value;

  if (city) {
    getWeatherFromCity(city);
    cityInputEl.value = "";
  } else {
    alert("Please enter a city!");
  }
};

createInputElements().addEventListener("submit", formSubmitHandler);


