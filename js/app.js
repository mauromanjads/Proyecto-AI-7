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
    // Finalizar prólogo
    // ======================================================

    pantallaPrologo.style.display = "none";

    pantallaJuego.style.display = "block";


    // ======================================================
    // Iniciar juego
    // ======================================================

    const juego =
        new Juego();

    juego.iniciar();

});