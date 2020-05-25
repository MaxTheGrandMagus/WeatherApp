let appId = '4ec3da749c87b7f5d9aa41cd1f617381';
let units ='metric';
let searchMethod;
var date = new Date();
var hour = date.getHours();

function getSearchMethod(searchTerm) {
  if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
    searchMethod = 'zip'
  else 
    searchMethod = 'q'
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
    .then(result => { return result.json(); })
    .then(result => {
      init(result);
    })
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  // let year = d.getFullYear();

  return `${day} ${date} ${month},`;
  // ${year}
}

function init(resultFromServer) {
  console.log(resultFromServer);
  // if (resultFromServer.weather[0].main == "Clear") {
  //   document.body.style.backgroundImage = 'url("content/images/clearNight.jpg")';
  // }
  // if (resultFromServer.weather[0].main == "Clear" && (hour <= 20 && hour >= 6)) {
  //   document.body.style.backgroundImage = 'url("content/images/clearDay.jpg")';
  // }
  // if (resultFromServer.weather[0].main == "Rain") {
  //   document.body.style.backgroundImage = 'url("content/images/rain.jpg")';
  // }
  // if (resultFromServer.weather[0].main == "Clouds") {
  //   document.body.style.backgroundImage = 'url("content/images/cloudsNight.jpg")';
  // }
  // if (resultFromServer.weather[0].main == "Clouds" && (hour <= 20 && hour >= 6)) {
  //   document.body.style.backgroundImage = 'url("content/images/cloudsDay.jpg")';
  // }
  // if (resultFromServer.weather[0].main == "Snow") {
  //   document.body.style.backgroundImage = 'url("content/images/snow.jpg")';
  // }
  // if (resultFromServer.weather[0].main == "Mist") {
  //   document.body.style.backgroundImage = 'url("content/images/mist.jpg")';
  // }
  // if (resultFromServer.weather[0].main == "Thunderstorm") {
  //   document.body.style.backgroundImage = 'url("content/images/thunderstorm.jpg")';
  // }

  if (resultFromServer.weather[0].main == "Clear") {
    $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="/content/videos/clearNight.mp4" type="video/mp4"></video>');
  }
  if (resultFromServer.weather[0].main == "Clear" && (hour <= 20 && hour >= 6)) {
    $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="/content/videos/clearDay.mp4" type="video/mp4"></video>');
  }
  if (resultFromServer.weather[0].main == "Rain") {
    $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="/content/videos/rain.mp4" type="video/mp4"></video>');
  }
  if (resultFromServer.weather[0].main == "Clouds") {
    $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="/content/videos/cloudsNight.mp4" type="video/mp4"></video>');
  }
  if (resultFromServer.weather[0].main == "Clouds" && (hour <= 20 && hour >= 6)) {
    $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="/content/videos/clouds.mp4" type="video/mp4"></video>');
  }
  if (resultFromServer.weather[0].main == "Snow") {
    $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="/content/videos/snow.mp4" type="video/mp4"></video>');
  }
  if (resultFromServer.weather[0].main == "Mist" || resultFromServer.weather[0].main == "Fog") {
    $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="/content/videos/mist.mp4" type="video/mp4"></video>');
  }
  if (resultFromServer.weather[0].main == "Thunderstorm") {
    $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="/content/videos/thunderstorm.mp4" type="video/mp4"></video>');
  }
  if (resultFromServer.weather[0].main == "Dust") {
    $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="/content/videos/dust.mp4" type="video/mp4"></video>');
  }

  let now = new Date();  
  
  let cityHeader = document.getElementById('cityHeader');
  let date = document.getElementById('date');
  let time = document.getElementById('time');
  let temperatureElement = document.getElementById('temperature');
  let lowHighTemperature = document.getElementById('min-max');
  let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
  let weatherIcon = document.getElementById('documentIconImg');
  let feelsLikeElement = document.getElementById('feelsLike');
  let windSpeedElement = document.getElementById('windSpeed');
  let humidityElement = document.getElementById('humidity');
  let sunriseElement = document.getElementById('sunrise');
  let sunsetElement = document.getElementById('sunset');
  
  let resultDescription = resultFromServer.weather[0].description;

  cityHeader.innerHTML = resultFromServer.name;
  date.innerText = dateBuilder(now);
  time.innerHTML = `${now.getHours().toString().padStart(2, "0")} : ${now.getMinutes().toString().padStart(2, "0")} (Local)`;
  temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176C';
  lowHighTemperature.innerHTML = `${Math.floor(resultFromServer.main.temp_min)}&#176C / ${Math.round(resultFromServer.main.temp_max)}&#176C`;
  weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
  weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '@2x.png';
  feelsLikeElement.innerHTML = 'Feels like <br>' + `<img class="bottom-icons" src='/content/icons/thermometer.png' width="40px" height="40px"></img>` + Math.floor(resultFromServer.main.feels_like) + '&#176C';
  windSpeedElement.innerHTML = 'Winds <br>' + `<img class="bottom-icons" src='/content/icons/wind.png' width="40px" height="40px"></img>` + Math.floor(resultFromServer.wind.speed) + ' m/s';
  humidityElement.innerHTML = 'Humidity <br>' + `<img class="bottom-icons" src='/content/icons/drops.png' width="40px" height="40px"></img>` + resultFromServer.main.humidity + '%';
  sunriseElement.innerHTML = `Sunrise <br> ${new Date(resultFromServer.sys.sunrise * 1000).toLocaleTimeString("ru-Ru")}`;
  sunsetElement.innerHTML = `Sunset <br> ${new Date(resultFromServer.sys.sunset * 1000).toLocaleTimeString("ru-Ru")}`;

  setVisibleForWeatherInfo();
}

function setVisibleForWeatherInfo() {
  let weatherContainer = document.getElementById('weatherContainer');
  weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
  let searchTerm = document.getElementById('searchInput').value;
  if (searchTerm) {
    searchWeather(searchTerm); 
  }
})

// major cities finder function for dropdown
var selectedSuggestionIndex = -1;
var searchInput = document.getElementById('searchInput');
const suggestionsPanel = document.querySelector('.suggestions');

function resetSelectedSuggestion() {
  for (var i = 0; i < suggestionsPanel.children.length; i++) {
    suggestionsPanel.children[i].classList.remove('selected');
  }
}

searchInput.addEventListener('keyup', function(e) {
  if (e.key === 'ArrowDown') { 
    resetSelectedSuggestion();
    selectedSuggestionIndex = (selectedSuggestionIndex < suggestionsPanel.children.length - 1) ? selectedSuggestionIndex + 1 : suggestionsPanel.children.length - 1;
    suggestionsPanel.children[selectedSuggestionIndex].classList.add('selected');
    return;
  }
  if (e.key === 'ArrowUp') { 
    resetSelectedSuggestion();
    selectedSuggestionIndex = (selectedSuggestionIndex > 0) ? selectedSuggestionIndex - 1 : 0;
    suggestionsPanel.children[selectedSuggestionIndex].classList.add('selected');
    return;
  }
  if (e.key === 'Enter') { 
    searchInput.value = suggestionsPanel.children[selectedSuggestionIndex].innerHTML;
    suggestionsPanel.classList.add('show');
    selectedSuggestionIndex = -1;
    return;
  }
  suggestionsPanel.classList.add('show');
  const input = searchInput.value;
  suggestionsPanel.innerHTML = '';
  const suggestions = cities.filter(function(city) {
    return city.toLowerCase().startsWith(input.toLowerCase());
  });
  suggestions.forEach(function(suggested) {
    const div = document.createElement('div');
    div.innerHTML = suggested;
    div.setAttribute('class', 'suggestion');
    suggestionsPanel.appendChild(div);
  });

  if (input)
    document.querySelector('.suggestions').style.overflowY = 'scroll';
  if (input === '') {
    suggestionsPanel.innerHTML = '';  
    document.querySelector('.suggestions').style.overflowY = 'hidden';
  }
  // if (input != suggestions)
  //   document.querySelector('.suggestions').style.overflowY = 'hidden';
  
  document.addEventListener('click', function(e) {
    if (e.target.className === 'suggestion') {
      searchInput.value = e.target.innerHTML;
      suggestionsPanel.classList.remove('show');
    }
  })
})