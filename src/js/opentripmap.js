import { nomVilleAPI } from "./app.js";
import { nomVilleAPIRandom } from "./random-city.js";
import { main, lat, lon } from "./app.js";
import { forecast } from "./forecast-5days.js";
import { appidOpentripMap } from "./param.js";
export { discoverButton };

let modal = document.querySelector("#modal");

export function findAttractions(e) {
  e.preventDefault();
  let villeAPI = nomVilleAPI || nomVilleAPIRandom;
  villeAPI = villeAPI.toLowerCase();
  if (document.querySelector('#modal')) {
    document.querySelector('#modal').innerHTML = '';
  }


  fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${lon}&lat=${lat}&rate=3h&format=json&apikey=${appidOpentripMap}
  `)
    .then((response) => response.json())
    .then((data) => {
      const attraction1 = data[0].name
      const attraction2 = data[1].name
      const attraction3 = data[2].name
      
      const point1 = document.createElement('div'); point1.textContent = attraction1;
      const point2 = document.createElement('div'); point2.textContent = attraction2;
      const point3 = document.createElement('div'); point3.textContent = attraction3;

      const modalContainer = document.createElement("div");
      modalContainer.classList.add("texte");
      modalContainer.id = "modal";

      const modalContent = document.createElement("div");
      modalContent.classList.add("modal-content");

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");

    modalBody.appendChild(point1);
    modalBody.appendChild(point2);
    modalBody.appendChild(point3);
    

    const modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer");

    const modalCloseButton = document.createElement("button");
    modalCloseButton.classList.add("attractions-modal-btn");
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

    main.append(modalContainer);
    })
    .catch((error) => {
      console.log("erreur");
    });
}

export function findAttractionsInit() {
  if (modal) {
    modal.addEventListener("click", function () {
      modal.classList.remove("show");
    });
    const modalCloseButton = document.createElement('button');
    modalCloseButton.classList.add('attractions-modal-btn');
    if (modalCloseButton) {
      modalCloseButton.addEventListener("click", function () {
        modal.classList.add('hide');
      });
    }
  }
}

export default findAttractionsInit;
const discoverButton = document.querySelector(".discover-more");
