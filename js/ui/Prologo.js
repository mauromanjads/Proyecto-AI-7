/**
 * ==========================================================
 * AI-7
 * Archivo: Prologo.js
 * ----------------------------------------------------------
 * Controlador visual del prólogo.
 * ==========================================================
 */

import PROLOGO from "../datos/prologo.js";

export default class Prologo {

    constructor() {

        this.pantalla =
            document.getElementById("pantalla-prologo");

        this.titulo =
            document.getElementById("prologo-titulo");

        this.texto =
            document.getElementById("prologo-texto");

        this.progreso =
            document.getElementById("prologo-progreso");

        this.boton =
            document.getElementById("btn-prologo");

        this.botonAtras =
            document.getElementById("btn-prologo-atras");

        this.escenaActual = 0;

        this.callbackFinal = null;

        this.pantalla.style.backgroundImage =
            `url("${PROLOGO.background}")`;

    }


    iniciar(callbackFinal) {

        this.callbackFinal =
            callbackFinal;

        this.escenaActual = 0;

        this.mostrarEscena();

        this.boton.addEventListener(
            "click",
            () => this.siguienteEscena()
        );

        this.botonAtras.addEventListener(
            "click",
            () => this.escenaAnterior()
        );

    }


    mostrarEscena() {

        const escena =
            PROLOGO.escenas[this.escenaActual];


        this.titulo.textContent =
            escena.titulo;


        this.texto.innerHTML =
            escena.texto;


        this.progreso.textContent =
            `${this.escenaActual + 1} / ${PROLOGO.escenas.length}`;


        this.botonAtras.disabled =
            this.escenaActual === 0;


        if (
            this.escenaActual ===
            PROLOGO.escenas.length - 1
        ) {

            this.boton.textContent =
                "COMENZAR INVESTIGACIÓN";

        } else {

            this.boton.textContent =
                "CONTINUAR";

        }

    }


    siguienteEscena() {

        if (
            this.escenaActual <
            PROLOGO.escenas.length - 1
        ) {

            this.escenaActual++;

            this.mostrarEscena();

            return;

        }


        this.terminar();

    }


    escenaAnterior() {

        if (
            this.escenaActual > 0
        ) {

            this.escenaActual--;

            this.mostrarEscena();

        }

    }


    terminar() {

        if (this.callbackFinal) {

            this.callbackFinal();

        }

    }

}