import { appid } from "./param.js";
import { nomVilleAPI, ville } from "./app.js";
import { nomVilleAPIRandom } from "./random-city.js";
import { kelvinToCelsius } from "./app.js";
let villeAPI;
export function forecast() {
   villeAPI = nomVilleAPI || nomVilleAPIRandom;
  const forecastContainer = document.querySelector(".forecast5days");
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${villeAPI}&appid=${appid}`
  )
    .then((response) => response.json())
    .then((data) => {

      const forecast5days = document.createElement("div")
      forecast5days.classList.add("forecast5days")
      console.log(data)
      //tableau contenant les prévisions à 9h de jour J à J+4
      const nextDaysForecast = [
        data.list[7],
        data.list[15],
        data.list[31],
        data.list[23],
        data.list[39]
      ]

      const main = document.querySelector('main')
      const title = document.createElement('div')
      title.classList.add('forecast5days__title')
      title.textContent = villeAPI
      forecast5days.appendChild(title)

      //création des div pour chaque jour
      nextDaysForecast.forEach((element) => {
        let forecastPerDay = document.createElement("div")
        let forecastDate = document.createElement("div")
        let forecastTemp = document.createElement("div")
        let forecastWeather = document.createElement("div")
        forecastPerDay.classList.add("forecast5days__forecastPerDay")
        forecastDate.classList.add(
          "forecast5days__forecastPerDay--forecastDate"
        )
        forecastTemp.classList.add(
          "forecast5days__forecastPerDay--forecastTemp"
        )
        forecastWeather.classList.add(
          "forecast5days__forecastPerDay--forecastWeather"
        )
        forecastWeather.classList.add(
          "weather-icon"
        )
        
        switch (element.weather[0].main) {
          case "Clear":
            forecastWeather.classList.add('clear');
            break;
          case "Clouds":
            forecastWeather.classList.add("clouds");
            break;
          case "Rain":
            forecastWeather.classList.add("rain");
            break;
          case "Snow":
            forecastWeather.classList.add("snow");
            break;
        }

        forecastPerDay.appendChild(forecastDate);
        forecastPerDay.appendChild(forecastTemp);
        forecastPerDay.appendChild(forecastWeather);
        forecast5days.appendChild(forecastPerDay);


        let forecastDateValue = new Date(element.dt_txt);  



        forecastDate.textContent = forecastDateValue.toLocaleString("fr-FR", {
          weekday: "long",
        });

        forecastTemp.textContent = kelvinToCelsius(element.main.temp)+'°';
        forecastWeather = element.weather[0].main;
      });

      main.replaceChildren(forecast5days);
    })
    
    .catch((error) =>
      console.log("Une erreur s'est produite lors de la requête fetch :", error)
    );
}