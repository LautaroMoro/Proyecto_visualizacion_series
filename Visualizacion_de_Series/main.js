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
            const res = await fetch(`https://api.tvmaze.com/shows/${i}`)
            if(!res.ok){
                throw new Error("Error al traer la serie");
            }
            const data = await res.json();


            const serie = new Serie(data.id, data.url, data.name, data.language, data.genres, data.image.medium);
            contenedorSeries.appendChild(serie.createHTMLElement());
        }catch(err){
            console.log("No se pudieron cargar las series!!, ERROR:", err);
        }
    }
}

/*ERROR ARREGLADO: ME FALTABA CARGAR EL LENGUAJE EN LA INSTANCIA DE LA SERIE.
Tambien me falto ponerle a data.image un".medium" para que cargara la imagen de la api.
Darle bolilla a los atributos de la clase para que se puedan monstrar correctamente.

*/
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