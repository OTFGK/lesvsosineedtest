const preguntas = [
    {
        pregunta: "¿Cómo se llama la canción más conocida de unas de las icon en lesv que además hizo colaboración con Sabrina Carpenter?",
        respuestas: ["girls", "Vogue", "We Fell in Love in October", "First Love"],
        correcta: 2
    },
    {
        pregunta: "¿Cómo se llama la canción más gay que tiene tu artista favorita? Y es de color blanco y negro el álbum",
        respuestas: ["Born This Way", "Girls In Bikinis", "bad idea!", "Woman"],
        correcta: 0
    },
    {
        pregunta: "Tuve que ir a mi playlist gay, así que espero que adivines esta. Es una canción que me recomendaste en 2023, y te dije que era muy parecida a una canción de Babymetal. Más fácil la pista, son de unas rusas.",
        respuestas: ["Single Ladies", "A quién le importa", "Todos Me Miran", "All The Things She Said"],
        correcta: 3
    }

];


let indice_aleatorio = 0;

let pregunta_txt = "";

let interval;

window.onload = iniciar();

function iniciar() {
    loadQuestions();
    if (localStorage.getItem("SCORE") != null) {
        localStorage.removeItem("SCORE");
    }
}


function iniciarCronometro() {
  const contador = 15, cronometroDisplay = document.getElementById("cronometro")

  iniciarTiempo(contador, cronometroDisplay)
  
}

function iniciarTiempo(duracion, componente) {
    interval = setInterval(() => {
    if (duracion === 0) {

      componente.innerHTML = "Se acabó el tiempo";

      clearInterval(interval);

      loadQuestions()

    } else {
      
      duracion = duracion < 10 ? "0" + duracion : duracion;

      componente.textContent = "00:" + duracion;

      duracion--;
    }
    }, 1000)

}

function loadQuestions() {
  iniciarCronometro();
  
    if (preguntas.length > 0) {

        indice_aleatorio = Math.floor(Math.random() * preguntas.length);

        pregunta_txt = "";

        pregunta_txt += '<p class="pregunta">' + preguntas[indice_aleatorio].pregunta + '</p>';

        pregunta_txt += '<button id="opcion0" class="botonTrivias  btn btn-outline-warning" onclick="verificarRespuestaCorrecta(0, ' + preguntas[indice_aleatorio].correcta + ')">' + preguntas[indice_aleatorio].respuestas[0] + '</button>';

        pregunta_txt += '<button id="opcion1" class="botonTrivias  btn btn-outline-warning" onclick="verificarRespuestaCorrecta(1, ' + preguntas[indice_aleatorio].correcta + ')">' + preguntas[indice_aleatorio].respuestas[1] + '</button>';

        pregunta_txt += '<button id="opcion2" class="botonTrivias  btn btn-outline-warning" onclick="verificarRespuestaCorrecta(2, ' + preguntas[indice_aleatorio].correcta + ')">' + preguntas[indice_aleatorio].respuestas[2] + '</button>';

        pregunta_txt += '<button id="opcion3" class="botonTrivias  btn btn-outline-warning" onclick="verificarRespuestaCorrecta(3, ' + preguntas[indice_aleatorio].correcta + ')">' + preguntas[indice_aleatorio].respuestas[3] + '</button>';

        document.getElementById("pregunta").innerHTML = pregunta_txt;

        preguntas.splice(indice_aleatorio, 1);
    } else {
        window.location.href = "../pages/resultado.html";
    }
}

let puntos = 0;

function verificarRespuestaCorrecta(indice, correcta) {
    if (correcta === indice) {
        puntos = puntos + 5;   
    }
    
    localStorage.setItem("SCORE", puntos);

    document.getElementById("opcion0").disabled = true;
    document.getElementById("opcion1").disabled = true;
    document.getElementById("opcion2").disabled = true;
    document.getElementById("opcion3").disabled = true;
}

document.getElementById("siguientePregunta").addEventListener("click", () => { clearInterval(interval), loadQuestions() });