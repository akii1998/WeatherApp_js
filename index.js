const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city));
    const respData = await resp.json();

    console.log(respData);

    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);
    const cityName=data.name;
    const humdity=data.main.humidity;
    const wind =data.wind.speed;

    const weather = document.createElement("div");
    weather.classList.add("weather");
    weather.innerHTML = `
        <h5>
        <p>Weather Details</p>
       <small> <i class="fa-solid fa-location-dot"></i>  <b>${cityName}</b></small><br>
       <small><i class="fa-solid fa-temperature-low"></i>  <b>${temp}°C </b></small><br>
       <small><i class="fa-light fa-cloud" ></i>  <b>${data.weather[0].main}</b></small><br>
        <small><i class="fa-solid fa-wind"></i>  <b>${wind}km/hr</b></small><br>
        <small><i class="fa-duotone fa-raindrops"></i>Humdity <b>${humdity}°C</b></small><br>
        </h5>
    `;

    // cleanup
    main.innerHTML = "";

    main.appendChild(weather);
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
});
