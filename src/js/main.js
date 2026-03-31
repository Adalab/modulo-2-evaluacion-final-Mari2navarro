"use strict";

//SECCIÓN DE QUERY-SELECTOR//
const form = document.querySelector(".js__form");
const input = document.querySelector(".js__input");
const resultsList = document.querySelector(".js__results");
const favoritesList = document.querySelector(".js__favorites");

//SECCIÓN DE DATOS//
//Variables globales que almacenan la información principal y se usan por todo el fichero
let series = [];
let favorites = [];

//SECCIÓN DE FUNCIONES//
//Estas son funciones con código auxiliar, con código que usaremos en los eventos o para pintar en la página

function renderSeries() {
  resultsList.innerHTML = "";

  for (let index = 0; index < series.length; index++) {
    const item = series[index];

    const title = item.show.name;

    let image = "";

    if (item.show.image) {
      image = item.show.image.medium;
    } else {
      image = "https://placehold.co/210x295/f5f5f5/666666/?text=TV";
    }

    const found = favorites.find((fav) => fav.show.id === item.show.id);

    let className = "";

    if (found) {
      className = "selected";
    }

    resultsList.innerHTML += `
    <li class="js__series ${className}" data-index="${index}">
    <img src="${image}" />
    <h3>${title}</h3>
    </li>`;
  }
}

//función para pintar los favoritos
function renderFavorites() {
  favoritesList.innerHTML = "";

  for (let i = 0; i < favorites.length; i++) {
    const fav = favorites[i];

    favoritesList.innerHTML += `
    <li>${fav.show.name}</li>
    `;
  }
}

//SECCIÓN DE FUNCIONES DE EVENTOS

//Función para traer el api
function handleSearch(ev) {
  ev.preventDefault();

  const searchText = input.value;

  fetch(`https://api.tvmaze.com/search/shows?q=${searchText}`)
    .then((response) => response.json())
    .then((data) => {
      series = data;
      renderSeries();
    });
}

//Función para acceder al index de series y guardar en favoritos
function handleClickSeries(ev) {
  const clickedElement = ev.target.closest(".js__series");

  if (!clickedElement) {
    return;
  }

  const index = parseInt(clickedElement.dataset.index);
  const selectedSerie = series[index];

  const found = favorites.find((fav) => fav.show.id === selectedSerie.show.id);

  if (!found) {
    favorites.push(selectedSerie);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  //llamamos a la función de pintar favoritos
  renderFavorites();
  renderSeries();
}

//SECCIÓN DE EVENTOS
//Estos son los eventos a los que reacciona la página

//Este evento es para cuando le damos a buscar
form.addEventListener("submit", handleSearch);

//Este evento es para cuando hacemos click en una serie
resultsList.addEventListener("click", handleClickSeries);

//SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA
//Este código se ejecutará cuando se carga la página: pedir datos al servidor, pintar elementos en la página

const savedFavorites = JSON.parse(localStorage.getItem("favorites"));

if (savedFavorites) {
  favorites = savedFavorites;
  renderFavorites();
  renderSeries();
}

console.log("JS conectado");
