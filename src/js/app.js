import { createView, previousSearchContainer, favContainer } from "./home.js";
import {
  selectRandomCity,
  cityIdRandom,
  nomVilleAPIRandom,
} from "./random-city.js";

import { forecast } from "./forecast-5days.js";
import { googleSearch, googleSearchInit } from "./scrap-google.js";
import { appid } from "./param.js";

const searchButton = document.querySelector("#search-button");
const divRecherches = document.querySelector(".popular");
export let recherches = JSON.parse(localStorage.getItem("recherches")) || [];
localStorage.setItem("recherches", JSON.stringify(recherches));
export let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
localStorage.setItem("favoris", JSON.stringify(favoris));
export const main = document.querySelector("main");
let discoverBtn, detail;

export function kelvinToCelsius(number) {
  return Math.round(number - 273.15);
}

let component;

export let ville = {};
export let cityNameView2;
export let weather;

export const heure = new Date().getHours();
export let nomVilleAPI;
let toForecastBtn;
export let cityId;

/*
 * CHARGEMENT DE LA PAGE D'ACCUEIL AVEC AFFICHAGE DES FAVORIS
 */
window.addEventListener("load", function () {
  createView(favoris, favContainer);
  createView(recherches, previousSearchContainer);
});

/*
 *
 * RECUPERER L'ID DE LA VILLE
 *
 */

export async function searchByCity() {
  const searchInput = document.querySelector("#search");
  let search = searchInput.value;
  const home = document.querySelector("#home");
  let tempActuelle = document.querySelector(".current-temperature");
  search = search.replace(/\s/g, "-");

  return fetch("./city.list.json")
    .then((response) => response.json())
    .then((data) => {
      function removeDiacritics(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }

      search = removeDiacritics(search);

      let city = data.find(
        (item) =>
          removeDiacritics(item.name.toLowerCase()) ===
          removeDiacritics(search.toLowerCase())
      );
      
      cityId = city.id;

      if (city) {
        console.log(`L'ID de la ville ${search} est ${cityId}`);
        return city.id;
      } else {
        return null; // Retourner null ici
      }
    });
}

/************************RECUPERER LES DONNEES METEO A PARTIR DE L'ID*******************************************/
export async function searchByiD(cityId) {
  try {
    const response = await fetch(
      `./../php/meteo-consume-api-forecast.php?id=${cityId}&appid=${appid}`
    )
    const data = await response.json();
    console.log(data)

    let temp = Math.round(kelvinToCelsius(data.main.temp));
    let feels_like = kelvinToCelsius(data.main.feels_like);
    let humidity = data.main.humidity;
    let wind = Math.round(data.wind.speed);
    let pays = data.sys.country,
    weather = data.weather[0].main,
    nomVilleAPI = data.name;

    /*******************création des éléments HTML****************************/
    const results = document.createElement("div");
    results.classList.add("results");
    results.classList.id = "results";

    const favorisIcon = document.createElement("div");
    favorisIcon.classList.add("results__favoris-icon");

    const favButton = document.createElement("input");
    favButton.alt = "image cliquable en forme de coeur";
    favButton.type = "image";
    favButton.src = "../public/css/assets/2/coeur-blanc.png";
    favButton.id = "favBtn";
    favorisIcon.appendChild(favButton);

    const selectedPlace = document.createElement("div");
    selectedPlace.classList.add("results__selected-place");

    const selectedPlaceVille = document.createElement("p");
    selectedPlaceVille.classList.add("results__selected-place--ville");
    const selectedPlacePays = document.createElement("p");
    selectedPlacePays.classList.add("results__selected-place--pays");
    selectedPlace.append(selectedPlaceVille);
    selectedPlace.append(selectedPlacePays);

    const currentDate = document.createElement("div");
    currentDate.classList.add("results__current-date");

    const searchResult = document.createElement("div");
    searchResult.classList.add("results__search-result");
    const currentTemp = document.createElement("div");
    currentTemp.classList.add("current-temperature");

    const resultDetail = document.createElement("div");
    resultDetail.classList.add("results__search-result--details");

    const detailsData = [
      { phenomenon: "HUMIDITE", value: humidity + "%" },
      { phenomenon: "VENT", value: wind + "km/h" },
      { phenomenon: "T° RESSENTIE", value: feels_like + "°" },
    ];

    const detailParagraphs = [];

    detailsData.forEach((data) => {
      let detail = document.createElement("div");
      detail.classList.add("results__search-result--details--current-weather");

      const phenomenon = document.createElement("p");
      phenomenon.classList.add("details-phenomenon");
      phenomenon.textContent = data.phenomenon;

      const value = document.createElement("p");
      value.classList.add("details-value");
      value.textContent = data.value;

      detail.appendChild(phenomenon);
      detail.appendChild(value);

      resultDetail.appendChild(detail);

      detailParagraphs.push(detail);
    });

    const paragraphAttributes = ["humidity", "wind", "feelsLike"];
    console.log(detailParagraphs);
    for (let i=0; i<detailParagraphs.length; i++) {
        const paragraph = detailParagraphs[i];
        const attributeName = paragraphAttributes[i];
        paragraph.setAttribute("id", attributeName)
    };

    const resultsDivs = document.querySelectorAll(
      ".results__search-result--details--current-weather"
    );
    const humidite = resultsDivs[0];
    const vent = resultsDivs[1];
    const ressentie = resultsDivs[2];

    const moreInfo = document.createElement("div");
    moreInfo.classList.add("more");

    const modalContainer = document.createElement("div");
    modalContainer.classList.add("texte");
    modalContainer.id = "modal";

    const modalContent = document.createElement("div");
    modalContent.classList.add("results__search-result--more");
    modalContent.classList.add("modal-content");

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");

    const modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer");
    const modalCloseButton = document.createElement("button");
    modalCloseButton.classList.add("btn");
    const readMore = document.createElement("a");
    readMore.classList.add("read-more");
    readMore.href = "https://www.google.com/search?q=" + nomVilleAPI;
    readMore.target = "blank";
    readMore.textContent = "Voir plus d'informations";
    modalFooter.append(readMore);
    modalFooter.append(modalCloseButton);

    modalContent.append(modalBody);
    modalContent.append(modalFooter);

    modalContainer.append(modalContent);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    toForecastBtn = document.createElement("button");
    toForecastBtn.classList.add("toForecastBtn");
    toForecastBtn.textContent = "5 jours de prévisions";

    /*******************VERS LES PREVISIONS SUR 5 JOURS***********************************/
    toForecastBtn.addEventListener("click", forecast);

    discoverBtn = document.createElement("button");
    discoverBtn.classList.add("discover-more");
    discoverBtn.textContent = `Plus de détails sur ${nomVilleAPI}`;
    discoverBtn.dataset.target = "#modal";
    discoverBtn.dataset.toggle = "modal";
    discoverBtn.addEventListener("click", googleSearch);

    buttonContainer.append(toForecastBtn);
    buttonContainer.append(discoverBtn);

    moreInfo.append(buttonContainer);

    moreInfo.append(modalContainer);

    searchResult.append(currentTemp);
    searchResult.append(resultDetail);
    searchResult.append(moreInfo);

    results.append(favorisIcon);
    results.append(selectedPlace);
    results.append(currentDate);
    results.append(searchResult);

    main.appendChild(results);
    main.replaceChildren(results);

    cityNameView2 = document.querySelector(".results__selected-place--ville");

    const tempActuelle = JSON.stringify(temp);
    currentTemp.textContent = tempActuelle;

    cityNameView2.textContent = nomVilleAPI;
    selectedPlacePays.textContent = pays;

    const dateActuelle = new Date().toDateString();
    currentDate.textContent = dateActuelle;

    /********************VERIFIER SI LA VILLE EST EN FAVORIS********************/
    function verifFav() {
      let index = favoris.findIndex((item) => item.name === data.name);
      if (index === -1) {
        favButton.src = "sass/assets/2/coeur-blanc.png";
      } else {
        favButton.src = "sass/assets/2/coeur-rouge.png";
      }
    }
    verifFav();
    // // BOUTON FAVORIS
    favButton.addEventListener("click", function () {
      let tempActuelle = document.querySelector(".current-temperature");
      // let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
      localStorage.setItem("favoris", JSON.stringify(favoris));
      cityNameView2 = document.querySelector(".results__selected-place--ville");
      ville = {
        name: nomVilleAPI,
        pays: pays,
        temp: tempActuelle.textContent,
        weather: data.weather[0].main,
      };

      let index = favoris.findIndex((item) => item.name === data.name);
      if (index === -1) {
        favoris.push(ville);
        favButton.src = "sass/assets/2/coeur-rouge.png";
        localStorage.setItem("favoris", JSON.stringify(favoris));
      } else {
        favButton.src = "sass/assets/2/coeur-blanc.png";
        favoris.splice(index, 1);
        localStorage.setItem("favoris", JSON.stringify(favoris));
      }
    });

    /********************auquel cas, mise à jour des données météo********************/
    for (let i = 0; i < favoris.length; i++) {
      if (favoris[i].name == nomVilleAPI) {
        favoris[i].pays = pays;
        favoris[i].temp = temp;
        favoris[i].weather = weather;
      }
    }
    component = document.querySelector(".component");
    //     un background par tranche horaire
    if (heure >= 6 && heure < 10) {
      component.classList.add("aube");
    } else if (heure >= 10 && heure < 16) {
      component.classList.add("aprem");
    } else if (heure >= 16 && heure < 21) {
      component.classList.add("soir");
    } else {
      component.classList.add("nuit");
    }

    //      AJOUT DE LA VILLE AUX DERNIERES RECHERCHES
    let recherches = JSON.parse(localStorage.getItem("recherches")) || [];
    localStorage.setItem("recherches", JSON.stringify(recherches));
    let recherchesIndex = recherches.findIndex(
      (item) => item.name === nomVilleAPI || nomVilleAPIRandom
    );

    //ajouter la ville recherchée si elle n'y est pas déjà
    if (recherchesIndex === -1) {
      recherches.push(ville);
      ville.name = nomVilleAPI || nomVilleAPIRandom;
      ville.pays = pays;
      ville.temp = temp;
      ville.weather = weather;
      localStorage.setItem("recherches", JSON.stringify(recherches));
    } else {
      recherches[recherchesIndex] = ville;
    }

    // supprimer le premier item du tableau à partir de 3 items
    const MAX_RECHERCHES = 3;
    if (recherches.length > MAX_RECHERCHES) {
      recherches.shift();
      localStorage.setItem("recherches", JSON.stringify(recherches));
    }
  } catch (error) {
    console.log("Une erreur s'est produite:", error);
  }
}

/******************RECUPERER LES DONNEES METEO DEPUIS LE NOM DE VILLE VIA L'ID****************************/
async function searchByCityAndId() {
  await searchByCity(nomVilleAPI);
  if (cityId) {
    searchByiD(cityId || cityIdRandom);
  }
}

/*****************************************L'ECOUTEUR D'EVENEMENTS*****************************************/
searchButton.addEventListener("click", function () {
    console.log('test button');
  searchByCityAndId();
});

/*************************VERS LES EXTRAITS DE RESULTATS GOOGLE*******************************************/
//placer les imports une fois les éléments créés
googleSearchInit();

/***********************************RECHERCHE RANDOM D'UN NOM DE VILLE*************************************/
let map = document.querySelector(".header__maps");
map.addEventListener("click", selectRandomCity);
