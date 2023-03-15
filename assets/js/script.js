 var searchBtn = $("#search-btn");
 var searchFormEl = $("#search-form");
 var cityHistory = JSON.parse(localStorage.getItem('city')) ?? [];
 
 
 
 
 
 



 
 // function for local storage
 function weatherInput() {
    var userInput = $("#search-form").val();

    localStorage.setItem("userInput", userInput);


 }

 // function for click event for the search button
 function searchFormSubmit(event) {
    // prevents page from reloading when button is clicked
    event.preventDefault();

    var searchInputVal = $("#search-input").val();
    






     // checks if user added a valid search input
     if (!userInput) {
        console.error("Please enter a valid search input value!")
        return;
    }

 }
 // event listener for submit button that runs the function searchFormSubmit
 searchFormEl.addEventListener('submit', searchFormSubmit);

 // gets weatherAPI and data
 function getWeather() {
    // return fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={1a0e2919a9b4dd8457669d885e90b7b9}')
        .then(function (response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        })
    
 };

 // function to display weather cards in html