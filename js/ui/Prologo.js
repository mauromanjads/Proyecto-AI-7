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

        this.escenaActual = 0;

        this.callbackFinal = null;

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


    terminar() {

        if (this.callbackFinal) {

            this.callbackFinal();

        }

    }

}