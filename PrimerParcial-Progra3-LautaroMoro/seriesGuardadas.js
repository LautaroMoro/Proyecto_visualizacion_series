import { Serie } from "./serie.js";

let series = [];
function cargarGuardadas(){
    const seGuardadas = JSON.parse(localStorage.getItem("seriesGuardadas")) || [];
    series = seGuardadas.map(sg => new Serie(sg.id, sg.url, sg.name, sg.language, sg.genres, sg.image));
}

const contenedorSeries = document.getElementById("series");

function mostrarSeries(){
    contenedorSeries.innerHTML = "";
    series.forEach(serie => {
        contenedorSeries.appendChild(serie.createHTMLElement())
    });
}

document.getElementById("ordenar_porNombre").addEventListener("click", () =>{
    series.sort((a, b) => a.name.localeCompare(b.name));
    mostrarSeries();
});

document.getElementById("ordenar_porIdioma").addEventListener("click", () =>{
    series.sort((a, b) => a.language.localeCompare(b.language));
    mostrarSeries();
});


cargarGuardadas();
mostrarSeries();