// Variables
const apiKey = "1a0e2919a9b4dd8457669d885e90b7b9";
var currWeatherDiv = $("#currentWeather");
var forecastDiv = $("#weatherForecast");
var citiesArray;

// Gets local storage for past searches
if (localStorage.getItem("localWeatherSearches")) {
    citiesArray = JSON.parse(localStorage.getItem("localWeatherSearches"));
    writeSearchHistory(citiesArray);
} else {
    citiesArray = [];
};

// Gets user input and writes the current weather in an HTML element
function returnCurrentWeather(cityName) {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;

    $.get(queryURL).then(function (response) {

        let currTime = new Date(response.dt * 1000);
        let weatherIcon = `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;

        currWeatherDiv.html(`
        <h2>${response.name}, ${response.sys.country} (${currTime.getMonth() + 1}/${currTime.getDate()}/${currTime.getFullYear()})<img src=${weatherIcon} height="70px"></h2>
        <p>Temperature: ${response.main.temp} &#176;C</p>
        <p>Humidity: ${response.main.humidity}%</p>
        <p>Wind Speed: ${response.wind.speed} m/s</p>
        `, returnUVIndex(response.coord))
        createHistoryButton(response.name);
    });
};

// Gets user input and writes the 5-day-forecast as card HTML elements
function returnWeatherForecast(cityName) {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${apiKey}`;

    $.get(queryURL).then(function (response) {
        let forecastInfo = response.list;
        forecastDiv.empty();
        $.each(forecastInfo, function (i) {
            if (!forecastInfo[i].dt_txt.includes("12:00:00")) {
                return;
            }
            let forecastDate = new Date(forecastInfo[i].dt * 1000);
            let weatherIcon = `https://openweathermap.org/img/wn/${forecastInfo[i].weather[0].icon}.png`;

            forecastDiv.append(`
            <div class="col-md">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <h4>${forecastDate.getMonth() + 1}/${forecastDate.getDate()}/${forecastDate.getFullYear()}</h4>
                        <img src=${weatherIcon} alt="Icon">
                        <p>Temp: ${forecastInfo[i].main.temp} &#176;C</p>
                        <p>Humidity: ${forecastInfo[i].main.humidity}%</p>
                    </div>
                </div>
            </div>
            `)
        })
    })
};

// Gets the UV index of the user's city and displays the color corresponding to the index
function returnUVIndex(coordinates) {
    let queryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${coordinates.lat}&lon=${coordinates.lon}&APPID=${apiKey}`;

    $.get(queryURL).then(function (response) {
        let currUVIndex = response.value;
        let uvSeverity = "green";
        let textColor = "white"

        if (currUVIndex >= 11) {
            uvSeverity = "purple";
        } else if (currUVIndex >= 8) {
            uvSeverity = "red";
        } else if (currUVIndex >= 6) {
            uvSeverity = "orange";
            textColor = "black"
        } else if (currUVIndex >= 3) {
            uvSeverity = "yellow";
            textColor = "black"
        }
        currWeatherDiv.append(`<p>UV Index: <span class="text-${textColor} uvPadding" style="background-color: ${uvSeverity};">${currUVIndex}</span></p>`);
    })
}

// Creates the history button for a past search
function createHistoryButton(cityName) {

    var citySearch = cityName.trim();
    var buttonCheck = $(`#previousSearch > BUTTON[value='${citySearch}']`);
    if (buttonCheck.length == 1) {
        return;
    }

    if (!citiesArray.includes(cityName)) {
        citiesArray.push(cityName);
        localStorage.setItem("localWeatherSearches", JSON.stringify(citiesArray));
    }

    $("#previousSearch").prepend(`
    <button class="btn btn-dark cityHistoryBtn" value='${cityName}'>${cityName}</button>
    `);
}

// Writes the history button for a past search
function writeSearchHistory(array) {
    $.each(array, function (i) {
        createHistoryButton(array[i]);
    })
}

// Click event for the search button that triggers the weather functions
$("#submitCity").click(function () {
    event.preventDefault();
    let cityName = $("#cityInput").val();
    returnCurrentWeather(cityName);
    returnWeatherForecast(cityName);
});

// Click event for each history button
$("#previousSearch").click(function () {
    let cityName = event.target.value;
    returnCurrentWeather(cityName);
    returnWeatherForecast(cityName);
});

// Converts celsius to fahrenheit for the weather elements
function cToF(celsius) {
    var Temp = celsius;
    var cToFahr = Temp * 9 / 5 + 32;
    var message = Temp + '\xB0C is ' + cToFahr + ' \xB0F.';
    console.log(message);
}

function fToC(fahrenheit) {
    var fTemp = fahrenheit;
    var fToCel = (fTemp - 32) * 5 / 9;
    var message = fTemp + '\xB0F is ' + fToCel + '\xB0C.';
    console.log(message);
}
cToF(60);
fToC(45);