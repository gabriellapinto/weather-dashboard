 var searchBtn = $("#search-btn");
 var searchForm = $("#search-form");
 var cityHistory = JSON.parse(localStorage.getItem('city')) ?? [];
 
// event listener for search button
 searchBtn.click(function(event) {
    event.preventDefault();
    var userCity = searchForm.val();
    // checks user input is valid
    if (!userCity) {
        console.error("Please enter a valid search input value!");
        return;
    }
    getWeather(userCity);
 });

 
 


 // gets weatherAPI and data
 function getWeather(userCity) {
    return fetch('https://api.openweathermap.org/data/2.5/forecast?q='+ userCity +'&units=imperial&appid=1a0e2919a9b4dd8457669d885e90b7b9')
        .then(function (response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        })
    
 };
 
