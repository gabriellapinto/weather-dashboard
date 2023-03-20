const searchBtn = $("#search-btn");
const searchForm = $("#search-form");
const userCity = $()
var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + userCity + '&units=imperial&appid=1a0e2919a9b4dd8457669d885e90b7b9';

// gets weatherAPI and data
function getWeather(requestUrl) {
    return fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return data
        })
};




function showWeather() {
    // clears data first so there is no overlapping of content
    let fiveDayForecast = $("#five-day-forecast");
    fiveDayForecast.empty();

    let currentDate = new Date();
    let weatherDay = $('<div>').attr("id", "weatherDay").addClass('col');
    let weatherIcon = 'https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png';

    for (let i=0; i < weatherData.list.length; i++) {
       let weatherDate = new Date(weatherData.list[i].dt * 1000) 

       let date = $("<h4>").attr("id", "dateText");
       date.text("${weatherDate.getMonth() + 1}/${weatherDate.getDate()}/$(weatherDate.getFullYear()}");
       weatherDay.append(date);





    }




}







    // event listener for search button
    searchBtn.click(function (event) {
        event.preventDefault();
        var userCity = searchForm.val();
        // checks user input is valid
        if (!userCity) {
            console.error("Please enter a valid search input value!");
            return;
        }
        getWeather(userCity);
    });







