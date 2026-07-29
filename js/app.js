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
import TableroAgentes from "./ui/TableroAgentes.js";
import PointerGlobal from "./ui/PointerGlobal.js";

// ==========================================================
// MODO DE PRUEBA
// ==========================================================

// true  = saltar el prólogo y entrar directamente al juego
// false = mostrar el prólogo normalmente

const MODO_PRUEBA = true;


// ==========================================================
// Elementos de la interfaz
// ==========================================================

const pantallaPrologo =
    document.getElementById("pantalla-prologo");

const pantallaJuego =
    document.getElementById("pantalla-juego");


// ==========================================================
// INICIAR APLICACIÓN
// ==========================================================

if (MODO_PRUEBA) {

    // ======================================================
    // MODO PRUEBA
    // ======================================================

    console.log("AI-7: Modo prueba activado");


    // ------------------------------------------------------
    // Ocultar completamente el prólogo
    // ------------------------------------------------------

    if (pantallaPrologo) {

        pantallaPrologo.style.display = "none";

    }


    // ------------------------------------------------------
    // Mostrar directamente la pantalla del juego
    // ------------------------------------------------------

    if (pantallaJuego) {

        pantallaJuego.style.display = "block";
        pantallaJuego.classList.add("juego-visible");

    }


    // ------------------------------------------------------
    // Iniciar juego
    // ------------------------------------------------------

    const pointer = new PointerGlobal();

    pointer.iniciar();

     const tableroAgentes = new TableroAgentes();
     tableroAgentes.iniciar();


    const juego = new Juego();

    juego.iniciar();


} else {

    // ======================================================
    // MODO NORMAL
    // ======================================================

    const prologo = new Prologo();


    prologo.iniciar(() => {

        // ==================================================
        // Iniciar transición de salida del prólogo
        // ==================================================

        pantallaPrologo.classList.add(
            "prologo-finalizando"
        );


        // ==================================================
        // Esperar a que termine la transición
        // ==================================================

        setTimeout(() => {

            // ----------------------------------------------
            // Ocultar completamente el prólogo
            // ----------------------------------------------

            pantallaPrologo.style.display = "none";


            // ----------------------------------------------
            // Crear juego
            // ----------------------------------------------
       
            const pointer = new PointerGlobal();
            pointer.iniciar();

            const tableroAgentes = new TableroAgentes();
            tableroAgentes.iniciar();


            const juego =
                new Juego();


            // ----------------------------------------------
            // Iniciar juego
            // ----------------------------------------------

            juego.iniciar();


            // ----------------------------------------------
            // Mostrar pantalla del juego
            // ----------------------------------------------

            pantallaJuego.style.display = "block";

            pantallaJuego.classList.add(
                "juego-visible"
            );

        }, 300);

    });

}