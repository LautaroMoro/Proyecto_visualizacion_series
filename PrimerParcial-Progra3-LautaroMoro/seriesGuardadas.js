import { Serie } from "./serie.js";

let series = [];
function cargarGuardadas(){
    const seGuardadas = JSON.parse(localStorage.getItem("series")) || [];
    series = seGuardadas.map(sg => new Serie(sg.id, sg.url, sg.name, sg.generes, sg.image));
}

const contenedorSeries = document.getElementById("series");

function mostrarSeries(){
    contenedorSeries.innerHTML = "";
    series.forEach(serie => {
        contenedorSeries.appendChild(serie.createHTMLElement())
    });
}

document.getElementById("ordenar_porNombre").addEventListener("click", () =>{
    series.sort((a, b) => a.nombre.localeCompare(b.nombre));
    mostrarSeries();
});

document.getElementById("ordenar_porGenero").addEventListener("click", () =>{
    series.sort((a, b) => a.generes.localeCompare(b.generes));
    mostrarSeries();
});

cargarGuardadas();
mostrarSeries();