let home;
const favContainerHeading = document.createElement('h2');
favContainerHeading.textContent = 'Vos lieux favoris';
export const favContainer = document.createElement('div');
favContainer.id='favContainer';


const previousSearchContainerHeading = document.createElement('h2');
previousSearchContainerHeading.textContent = 'Dernières recherches';
export const previousSearchContainer = document.createElement('div');
previousSearchContainer.id = 'previousSearchContainer';

const main = document.querySelector('.main');

//Vérifier si les données des tableaux stockés sont accessibles
let favoris = [];
const favorisData = localStorage.getItem("favoris");
if (favorisData) {
  try {
    favoris = JSON.parse(favorisData).slice();
  } catch (error) {
    console.error("Erreur conversion des données JSON :", error);
  }
}

let recherches = [];
const recherchesData = localStorage.getItem("recherches");
if (recherchesData) {
  try {
    recherches = JSON.parse(recherchesData).slice();
  } catch (error) {
    console.error("Erreur conversion des données JSON :", error);
  }
}

/*
 * 
 * 
 * générer la vue sur les villes enregistrées dans des tableaux
 * 
 */ 
export function createView(dataArray, containerSelector) {
  containerSelector.innerHTML = '';
  if (dataArray.length === 0) {
    const emptyView = document.createElement("div");
    emptyView.classList.add("container");
    emptyView.classList.add("home__places");
    emptyView.textContent = "Vous n'avez pas encore de ville enregistrée !";
    emptyView.style.display = "flex";
    emptyView.style.alignItems = "center";
    emptyView.style.padding = "0";
    emptyView.style.textAlign = "center";
    containerSelector.replaceChildren(emptyView);
  } else {
    dataArray.forEach((element) => {
      const view = document.createElement("div"),
            place = document.createElement("div"),
            weather = document.createElement("div"),
            location = document.createElement("div"),
            villeElement = document.createElement('div'),
            pays = document.createElement("div");

      view.classList.add("home__container--places");
      place.classList.add("home__container--places--details");
      weather.classList.add("home__container--places--weather");
      location.classList.add("home__container--places--location");
      villeElement.classList.add('home__container--places--ville');
      pays.classList.add("home__container--places--pays");
      
      location.append(villeElement, pays);
      view.append(place);
      view.append(weather);
      place.append(location);
      containerSelector.append(view);

      // ville pour chaque élément du tableau
      pays.textContent = element.pays;
      location.append(pays);
      villeElement.textContent = element.name;
      location.append(villeElement);

      //  illustration pour chaque élément du tableau
      const illustration = document.createElement("div");
      illustration.classList.add("weather-icon");
      weather.append(illustration);

      //  température pour chaque élément du tableau
      const tempElement = document.createElement("p");
      tempElement.textContent = element.temp + "°C";
      tempElement.classList.add("tempElement");
      weather.append(tempElement);

      //  illustration du dernier weather enregistré
      let weatherIcon = view.querySelector(".weather-icon");
      switch (element.weather) {
        case "Clear":
          weatherIcon.classList.add("clear");
          break;
        case "Clouds":
          weatherIcon.classList.add("clouds");
          break;
        case "Rain":
          weatherIcon.classList.add("rain");
          break;
        case "Snow":
          weatherIcon.classList.add("snow");
          break;
      }
    });
    main.append(home);
    containerSelector.classList.add('home__container');
  }
}

home = document.createElement('div');
home.classList.add('home');
home.append(favContainerHeading, favContainer, previousSearchContainerHeading, previousSearchContainer);

// CAS D'UN LOCAL STORAGE TOTALEMENT VIDE
if (favoris.length === 0 && recherches.length ===0) {
  home = document.createElement('div');
  home.classList.add('home');
  const modal = document.createElement('div');
  modal.setAttribute('id', 'homeModal');
  modal.classList.add('home__modal');
  modal.innerHTML = "L'appli est encore toute neuve ! <br> Faites une recherche en saisissant la ville de votre choix, ou laissez-vous suprendre en cliquant sur la carte !"
  main.append(home);
  home.append(modal);
}