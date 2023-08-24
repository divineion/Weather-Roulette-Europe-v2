import { recherches, favoris, heure } from "./app.js";
import { main } from "./app.js";
import { forecast } from "./forecast-5days.js";
import {
  searchByiD,
  nomVilleAPI,
  cityId,
  weather,
  cityNameView2,
  ville,
} from "./app.js";




/*****************RECHERCHE RANDOM D'UN NOM DE VILLE************************/
let map = document.querySelector(".header__maps");
let villeRandom;
export let cityIdRandom;
let nomPaysAPI;
let lat;
let lon;
let coord;
let indiceVille;
export let nomVilleAPIRandom;

/**************************RECHERCHE D'UNE VILLE DANS LE TABLEAU*************************/
export async function selectRandomCity() {

  function kelvinToCelsius(number) {
    return number - 273.15;
  }
  // Charger le fichier JSON à partir de l'URL
  return fetch("./city.list.europe.44.json")
    .then((response) => response.json())
    .then((data) => {
      const listeVilles = data;
      indiceVille = Math.floor(Math.random() * listeVilles.length);

      villeRandom = listeVilles[indiceVille];
      nomVilleAPIRandom = villeRandom.name;
      cityIdRandom = villeRandom.id;
      nomPaysAPI = villeRandom.country;
    })
    .catch((error) => {
      console.log("Une erreur s'est produite:", error);
    });
}

async function searchByRandomAndId() {
  await selectRandomCity();
  if (cityIdRandom) {
    searchByiD(cityIdRandom);
  } else {
    console.log("l'id de la ville n'a pas été trouvée");
  }
}

map.addEventListener("click", searchByRandomAndId);

/********************NOUVELLE RECHERCHE*************************************/
const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchByiD);


/****************VERS LES EXTRAITS DE RESULTATS GOOGLE*********************************/
//placement des imports une fois les éléments créés
import { discoverButton, findAttractions } from "./opentripmap.js";
import findAttractionsInit from "./opentripmap.js";
if (discoverButton) {
  discoverButton.addEventListener("click", findAttractions);
}
