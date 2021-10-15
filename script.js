let weather = {
    apiKey: "42570739984e2284f8071f19553be3ae",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city + "&units=metric&appid="
            + this.apiKey
        ).then((Response) => Response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = humidity + " %";
        document.querySelector(".wind").innerText = speed + " Km/h";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?landscape," + name + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".searchBar").value);
    }
};
document
    .querySelector(".search button")
    .addEventListener("click", function () {
        weather.search();
    });
document
    .querySelector(".searchBar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });
weather.fetchWeather("Kolkata");