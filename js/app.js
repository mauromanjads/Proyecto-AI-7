/**
 * ==========================================================
 * AI-7
 * Archivo: app.js
 * ----------------------------------------------------------
 * Punto de entrada de la aplicación.
 * ==========================================================
 */

import Juego from "./juego.js";
import Prologo from "./ui/Prologo.js";


// ==========================================================
// Elementos de la interfaz
// ==========================================================

const pantallaPrologo =
    document.getElementById("pantalla-prologo");

const pantallaJuego =
    document.getElementById("pantalla-juego");


// ==========================================================
// Mostrar prólogo
// ==========================================================

const prologo =
    new Prologo();


// ==========================================================
// Iniciar prólogo
// ==========================================================

prologo.iniciar(() => {

    // ======================================================
    // Iniciar transición de salida del prólogo
    // ======================================================

    pantallaPrologo.classList.add(
        "prologo-finalizando"
    );


    // ======================================================
    // Esperar a que termine la transición
    // ======================================================

    setTimeout(() => {

        pantallaPrologo.classList.add(
            "prologo-oculto"
        );


        // ==================================================
        // Iniciar juego
        // ==================================================

        const juego =
            new Juego();

        juego.iniciar();


        // ==================================================
        // Mostrar juego
        // ==================================================

        pantallaJuego.classList.add(
            "juego-visible"
        );

    }, 300);

});