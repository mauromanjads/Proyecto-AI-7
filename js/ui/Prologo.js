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

        this.puntos =
            document.getElementById("prologo-puntos");

        this.contador =
            document.getElementById("prologo-contador");

        this.boton =
            document.getElementById("btn-prologo");

        this.botonAtras =
            document.getElementById("btn-prologo-atras");

        this.escenaActual = 0;

        this.callbackFinal = null;

        this.transicionando = false;

        this.pantalla.style.backgroundImage =
            `url("${PROLOGO.background}")`;

    }


    iniciar(callbackFinal) {

        this.callbackFinal =
            callbackFinal;

        this.escenaActual = 0;

        this.crearIndicadores();

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


    crearIndicadores() {

        this.puntos.innerHTML = "";

        PROLOGO.escenas.forEach(
            (_, indice) => {

                const punto =
                    document.createElement("span");

                punto.classList.add(
                    "prologo-punto"
                );

                punto.dataset.escena =
                    indice;

                this.puntos.appendChild(
                    punto
                );

            }
        );

    }


    actualizarIndicadores() {

        const puntos =
            this.puntos.querySelectorAll(
                ".prologo-punto"
            );

        puntos.forEach(
            (punto, indice) => {

                punto.classList.toggle(
                    "activo",
                    indice === this.escenaActual
                );

                punto.classList.toggle(
                    "completado",
                    indice < this.escenaActual
                );

            }
        );

    }


    mostrarEscena() {

        const escena =
            PROLOGO.escenas[this.escenaActual];


        this.titulo.textContent =
            escena.titulo;


        this.texto.innerHTML =
            escena.texto;


        this.contador.textContent =
            `ESCENA ${this.escenaActual + 1} DE ${PROLOGO.escenas.length}`;


        this.actualizarIndicadores();


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


    cambiarEscena(nuevaEscena) {

        if (this.transicionando) {

            return;

        }


        this.transicionando = true;


        this.titulo.classList.add(
            "prologo-salida"
        );

        this.texto.classList.add(
            "prologo-salida"
        );


        setTimeout(
            () => {

                this.escenaActual =
                    nuevaEscena;


                this.mostrarEscena();


                this.titulo.classList.remove(
                    "prologo-salida"
                );

                this.texto.classList.remove(
                    "prologo-salida"
                );


                this.titulo.classList.add(
                    "prologo-entrada"
                );

                this.texto.classList.add(
                    "prologo-texto-entrada"
                );


                setTimeout(
                    () => {

                        this.titulo.classList.remove(
                            "prologo-entrada"
                        );

                        this.texto.classList.remove(
                            "prologo-texto-entrada"
                        );

                        this.transicionando =
                            false;

                    },
                    500
                );

            },
            250
        );

    }


    siguienteEscena() {

        if (this.transicionando) {

            return;

        }


        if (
            this.escenaActual <
            PROLOGO.escenas.length - 1
        ) {

            this.cambiarEscena(
                this.escenaActual + 1
            );

            return;

        }


        this.terminar();

    }


    escenaAnterior() {

        if (this.transicionando) {

            return;

        }


        if (
            this.escenaActual > 0
        ) {

            this.cambiarEscena(
                this.escenaActual - 1
            );

        }

    }


   terminar() {

        this.pantalla.classList.add(
            "prologo-finalizando"
        );


        setTimeout(
            () => {

                if (this.callbackFinal) {

                    this.callbackFinal();

                }

            },
            300
        );

    }

}