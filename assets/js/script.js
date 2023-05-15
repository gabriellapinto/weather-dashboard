const apiKey = "1a0e2919a9b4dd8457669d885e90b7b9";
var currWeatherDiv = $("#currentWeather");
var forecastDiv = $("#weatherForecast");
var citiesArray;

if (localStorage.getItem("localWeatherSearches")) {
    citiesArray = JSON.parse(localStorage.getItem("localWeatherSearches"));
    writeSearchHistory(citiesArray);
} else {
    citiesArray = [];
};

function returnCurrentWeather(cityName) {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;
  
    $.get(queryURL).then(function(response){

        let currTime = new Date(response.dt*1000);
        let weatherIcon = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
  
        currWeatherDiv.html(`
        <h2>${response.name}, ${response.sys.country} (${currTime.getMonth()+1}/${currTime.getDate()}/${currTime.getFullYear()})<img src=${weatherIcon} height="70px"></h2>
        <p>Temperature: ${response.main.temp} &#176;C</p>
        <p>Humidity: ${response.main.humidity}%</p>
        <p>Wind Speed: ${response.wind.speed} m/s</p>
        `, returnUVIndex(response.coord))
        createHistoryButton(response.name);
    });
  };

  function createHistoryButton(cityName) {
    
    var citySearch = cityName.trim();
    var buttonCheck = $(`#previousSearch > BUTTON[value='${citySearch}']`);
    if (buttonCheck.length == 1) {
      return;
    }
    
    if (!citiesArray.includes(cityName)){
        citiesArray.push(cityName);
        localStorage.setItem("localWeatherSearches", JSON.stringify(citiesArray));
    }
  
    $("#previousSearch").prepend(`
    <button class="btn btn-dark cityHistoryBtn" value='${cityName}'>${cityName}</button>
    `);
  }

  function writeSearchHistory(array) {
    $.each(array, function(i) {
        createHistoryButton(array[i]);
    })
  }
  






