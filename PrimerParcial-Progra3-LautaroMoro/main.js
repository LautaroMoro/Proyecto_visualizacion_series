import { Serie } from "./serie.js";
let paginaActual = 1;
const seriesPorPagina = 6;
const contenedorSeries = document.getElementById("series");
const btnSiguiente = document.getElementById("siguiente");
const btnAnterior = document.getElementById("anterior");

async function cargarSeries(pagina = 1){
    contenedorSeries.innerHTML = "";
    const inicio = (pagina - 1) * seriesPorPagina + 1;
    const fin = inicio + seriesPorPagina;
    for(let i = inicio; i < fin; i++){
        try{
            const res = await fetch(`https://api.tvmaze.com/shows/${i}.`)
            if(!res.ok){
                throw new Error("Error al traer la serie");
            }
            const data = await res.json();

            let imagen = null;
            if (data.image) {
              imagen = data.image.medium || data.image.original || null;
            }

            const serie = new Serie(data.id, data.url, data.name, data.genres, imagen);
            contenedorSeries.appendChild(serie.createHTMLElement());
        }catch(err){
            console.log("No se pudieron cargar las series!!, ERROR:", err);
        }
    }
}

function paginaSiguiente() {
  paginaActual++;
  cargarSeries(paginaActual);
}

function paginaAnterior() {
  if (paginaActual > 1) {
    paginaActual--;
    cargarSeries(paginaActual);
  }
}

btnSiguiente.addEventListener("click", paginaSiguiente);
btnAnterior.addEventListener("click", paginaAnterior);


window.addEventListener("DOMContentLoaded", () => cargarSeries(paginaActual));