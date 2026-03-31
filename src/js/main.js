"use strict";
//SECCIÓN DE QUERY-SELECTOR
//elementos que nos traemos de HTML
const form = document.querySelector(".js__form");
const input = document.querySelector(".js__input");
const resultsList = document.querySelector(".js__results");

//SECCIÓN DE DATOS
//Variables globales que almacenan la información principal y se usan por todo el fichero
let series = [];

//SECCIÓN DE FUNCIONES
//Estas son funciones con código auxiliar, con código que usaremos en los eventos o para pintar en la página

function renderSeries() {
  resultsList.innerHTML = "";

  for (const item of series) {
    const title = item.show.name;

    let image = "";

    if (item.show.image) {
      image = item.show.image.medium;
    } else {
      image = "https://placehold.co/210x295/f5f5f5/666666/?text=TV";
    }

    resultsList.innerHTML += `
    <li>
    <img src="${image}" />
    <h3>${title}</h3>
    </li>`;
  }
}

//SECCIÓN DE FUNCIONES DE EVENTOS
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

//SECCIÓN DE EVENTOS
//Estos son los eventos a los que reacciona la página
form.addEventListener("submit", handleSearch);
//escucha que cuando se pulsa enviar sale un mensaje en la consola

//SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA
//Este código se ejecutará cuando se carga la página: pedir datos al servidor, pintar elementos en la página

console.log("JS conectado");
