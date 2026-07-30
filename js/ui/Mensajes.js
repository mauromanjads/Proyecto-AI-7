/**
 * ==========================================================
 * AI-7
 * Archivo: Mensajes.js
 * ----------------------------------------------------------
 * Modal para mostrar la declaración de un personaje.
 * ==========================================================
 */

export default class Mensajes {

    constructor() {
        this.modal = null;
    }

    // ======================================================
    // Mostrar declaración
    // ======================================================

    mostrar(agente, declaraciones = []) {

        this.cerrar();

        this.modal = document.createElement("div");

        this.modal.className = "modal-mensajes";

        const declaracion =
            declaraciones.length > 0
                ? declaraciones[0].obtenerTexto()
                : "Este personaje no tiene declaraciones.";

        this.modal.innerHTML = `

            <div class="modal-mensajes-contenido">

                <button
                    class="modal-mensajes-cerrar"
                    type="button">
                    ×
                </button>

                <div class="modal-mensajes-titulo">
                    DECLARACIÓN
                </div>

                <div class="modal-mensajes-agente">
                    ${agente.nombre}
                </div>

                <div class="modal-mensajes-linea"></div>

                <div class="modal-mensajes-declaracion">
                    ${declaracion}
                </div>

                <button
                    class="btn-cerrar-mensajes"
                    type="button">
                    CERRAR
                </button>

            </div>

        `;

        document.body.appendChild(this.modal);

        this.configurarEventos();
    }

    // ======================================================
    // Eventos
    // ======================================================

    configurarEventos() {

        const btnCerrar =
            this.modal.querySelector(
                ".modal-mensajes-cerrar"
            );

        const btnCerrarFooter =
            this.modal.querySelector(
                ".btn-cerrar-mensajes"
            );

        btnCerrar.addEventListener(
            "click",
            () => this.cerrar()
        );

        btnCerrarFooter.addEventListener(
            "click",
            () => this.cerrar()
        );
    }

    // ======================================================
    // Cerrar modal
    // ======================================================

    cerrar() {

        if (this.modal) {

            this.modal.remove();

            this.modal = null;
        }
    }
}