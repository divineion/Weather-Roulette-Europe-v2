import { nomVilleAPI } from "./app.js";
export { discoverButton };
let modal = document.querySelector("#modal");

export function googleSearch(e) {
  e.preventDefault();
  let villeAPI = nomVilleAPI.toLowerCase();

  fetch(`./../php/scrap-google.php?villeAPI=${villeAPI}`)
    .then((response) => response.text())
    .then((paragraph) => {
      const modal = document.querySelector("#modal");
      const decoder = new TextDecoder("ISO-8859-2");
      const encodedData = new TextEncoder().encode(paragraph);
      const decodedText = decoder.decode(encodedData);
      let modalBody = document.querySelector(".modal-body");
      modalBody.textContent = paragraph;
      modal.classList.add("show");
    })
    .catch((error) => {
      console.log("erreur");
    });
}

export function googleSearchInit() {
  if (modal) {
    modal.addEventListener("click", function () {
      modal.classList.remove("show");
    });
      const modalCloseButton = document.querySelector(".btn");

      modalCloseButton.addEventListener("click", function () {
        modal.classList.remove("show");
      });
      modal.firstChild.addEventListener("click", function (e) {
        e.stopPropagation();
      });


  }
}

export default googleSearchInit;
const discoverButton = document.querySelector(".discover-more");
