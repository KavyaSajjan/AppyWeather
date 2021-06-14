/* api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

a108fdf3a1fab16601ffcc2496becd6a */


const weatherapi = {
    key: "a108fdf3a1fab16601ffcc2496becd6a",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input_box');

//Event Listener function on keypress
searchInputBox.addEventListener('keypress', (event) => {

    if (event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather_body').style.display = "block";
    }

});

//Get weather report

function getWeatherReport(city) {
    fetch(`${weatherapi.baseUrl}?q=${city}&appid=${weatherapi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

//show weather report

function showWeatherReport(weather){
    console.log(weather);


    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min_max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerHTML = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if (weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.webp')";
    }else if (weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url('images/clouds.png')";
    }else if (weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('images/rain.jpg')";
    }else if (weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    }else if (weatherType.textContent == 'Haze') {
        document.body.style.backgroundImage = "url('images/haze.jpg')";
    }else if (weatherType.textContent == 'Thunderstrom') {
        document.body.style.backgroundImage = "url('images/thunder.jpg')";
    }else if (weatherType.textContent == 'Sunny') {
        document.body.style.backgroundImage = "url('images/sunny.jpg')";
    }else if (weatherType.textContent == 'Mist') {
        document.body.style.backgroundImage = "url('images/mist.jpg')";
    }
}

//date manage
function dateManage(dateArg) {

    let days = ["Sunday", 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date}, ${month}, (${day}), ${year}`;
}