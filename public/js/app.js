console.log('client side java script file is loaded');

//fetch the api and then run the function
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data.puzzle);
    });
});




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationMsg = document.querySelector('#location');
const forecastMsg = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    locationMsg.textContent = 'Loading...';
    forecastMsg.textContent = '';

    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationMsg.textContent = data.error;
            } else {
                locationMsg.textContent = 'Weather forecast for '+data.location;
                forecastMsg.textContent = data.forecast;
            };

        });
    });

});