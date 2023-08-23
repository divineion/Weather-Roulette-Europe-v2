document.getElementById("search").addEventListener('click', function(e){
    e.stopPropagation();
  });
  
  document.querySelector(".header__maps").addEventListener('click', function(e){
    e.stopPropagation();
  });

  document.querySelector("#search-button").addEventListener('click', function(e){
    e.stopPropagation();
  });

const header = document.querySelector('.header');
const homeButton = document.querySelector('.header__home-button');
const map = document.querySelector('.header__maps');
const searchbar = document.querySelector('.header__search-bar');
console.log(homeButton);
header.addEventListener('click', () => {
    header.classList.toggle('expanded');
    homeButton.classList.toggle('expanded');
    map.classList.toggle('expanded');
    searchbar.classList.toggle('expanded');  
});