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

const MODO_PRUEBA = true;

const pantallaPrologo =
    document.getElementById("pantalla-prologo");

const pantallaJuego =
    document.getElementById("pantalla-juego");

if (MODO_PRUEBA) {

    console.log("AI-7: Modo prueba activado");

    if (pantallaPrologo) {
        pantallaPrologo.style.display = "none";
    }

    if (pantallaJuego) {
        pantallaJuego.style.display = "block";
        pantallaJuego.classList.add("juego-visible");
    }

  
    const tableroAgentes = new TableroAgentes();
    tableroAgentes.iniciar();

    const juego = new Juego();

    juego.tablero.tableroAgentes = tableroAgentes;

    juego.iniciar();

} else {

    const prologo = new Prologo();

    prologo.iniciar(() => {

        pantallaPrologo.classList.add(
            "prologo-finalizando"
        );

        setTimeout(() => {

            pantallaPrologo.style.display = "none";

            const pointer = new PointerGlobal();
            pointer.iniciar();

            const tableroAgentes = new TableroAgentes();
            tableroAgentes.iniciar();

            const juego = new Juego();

            juego.tablero.tableroAgentes = tableroAgentes;

            juego.iniciar();

            pantallaJuego.style.display = "block";
            pantallaJuego.classList.add("juego-visible");

        }, 300);

    });

}