/**
 * ==========================================================
 * AI-7
 * Archivo: NucleoNexus.js
 * ----------------------------------------------------------
 * NÚCLEO CENTRAL NEXUS
 * ==========================================================
 */

export default class NucleoNexus {

    constructor(tablero) {

        this.tablero = tablero;
        this.nucleo = null;

    }

    iniciar() {

        if (!this.tablero) {
            return;
        }

        this.crear();

    }

    crear() {

        if (this.nucleo) {
            return;
        }

        this.nucleo =
            document.createElement("div");

        this.nucleo.className =
            "nexus-nucleo";

        this.nucleo.innerHTML = `

            <div class="nexus-nucleo-anillo nexus-anillo-externo"></div>

            <div class="nexus-nucleo-anillo nexus-anillo-medio"></div>

            <div class="nexus-nucleo-cuerpo">

                <div class="nexus-nucleo-luz"></div>

                <div class="nexus-nucleo-centro"></div>

            </div>

        `;

        this.tablero.appendChild(this.nucleo);

    }

    activar() {

        if (!this.nucleo) {
            return;
        }

        this.nucleo.classList.add("nucleo-activo");

    }

    desactivar() {

        if (!this.nucleo) {
            return;
        }

        this.nucleo.classList.remove("nucleo-activo");

    }

    destruir() {

        if (!this.nucleo) {
            return;
        }

        this.nucleo.remove();

        this.nucleo = null;

    }

}