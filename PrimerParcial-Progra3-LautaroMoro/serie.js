export class Serie{
    constructor(id, url, name, language, genres, image) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.language = language;
        this.genres = genres;
        this.image = image;
    }


    toJsonString() {
        return JSON.stringify({
            id: this.id,
            url: this.url,
            name: this.name,
            language: this.language,
            genres: this.genres,
            image: this.image
        });
    }

    static createFromJsonString(json) {
        const datosSerie = JSON.parse(json);
        return new Serie (
            datosSerie.id,
            datosSerie.url,
            datosSerie.name,
            datosSerie.language,
            datosSerie.genres,
            datosSerie.image
        );
    }

    static guardarSerie(serie) {
    const guardadas = JSON.parse(localStorage.getItem("seriesGuardadas") || "[]");
    guardadas.push(serie);
    localStorage.setItem("seriesGuardadas", JSON.stringify(guardadas));
    alert(`${serie.name}  fue guardada!`);
    }
    /*TENER EN CUENTA COMO SE NOMBRA EL CONTENEDOR DONDE SE PUSHEA  GUARDADAS
    A la 1er carga de las series(las que se muestran en inicio),  su contenedor tiene otro nombre... no te confundas con eso!!*/ 

    createHTMLElement() {
        const div = document.createElement("div");
        div.className = "serie";

        const titulo = document.createElement("h3");
        titulo.textContent = this.name;

        const lenguaje = document.createElement("h5");
        lenguaje.textContent = this.language;

        const imagen = document.createElement("img");
        imagen.src = this.image;
        imagen.alt = this.name;

        const generos = document.createElement("p");
        generos.textContent = `Generos: ${this.genres.join(", ")}`;

        const enlace = document.createElement("a");
        enlace.href = this.url;
        enlace.target = "_blank";
        enlace.appendChild(imagen);

        const btnGuardar = document.createElement("button");
        btnGuardar.textContent = "Guardar";
        btnGuardar.addEventListener("click", () => Serie.guardarSerie(this));

        div.appendChild(titulo);
        div.appendChild(lenguaje);
        div.appendChild(imagen);
        div.appendChild(enlace);
        div.appendChild(generos);
        div.appendChild(btnGuardar);

        return div;
    }

}