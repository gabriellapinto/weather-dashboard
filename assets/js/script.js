 
 
 
 
 
 
 
 // function for local storage
 function weatherInput() {
    var searchBtn = $("#search-btn");
    var userInput = $("city-search-form".val());

    localStorage.setItem("userInput", userInput);

 }
 // function for click event for search button
 function searchFormSubmit(event) {
    event.preventDefault();






 }
 // function to display weather cards in html


 
 
 
 
 
 
 
 
 // Gets weatherAPI and data
 function getWeather() {
    return fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={1a0e2919a9b4dd8457669d885e90b7b9}')
        .then(function (response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        })
    
 };