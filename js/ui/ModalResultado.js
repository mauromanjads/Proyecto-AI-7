/**
 * ==========================================================
 * AI-7
 * Archivo: ModalResultado.js
 * ----------------------------------------------------------
 * Modal para mostrar el resultado de la selección
 * del posible culpable.
 * ==========================================================
 */

export default class ModalResultado {

    constructor() {

        this.modal = null;

        this.accionContinuar = null;
    }

    // ======================================================
    // MOSTRAR RESULTADO
    // ======================================================

    mostrar(
        tipo,
        titulo,
        mensaje,
        accionContinuar
    ) {

        this.cerrar();

        this.accionContinuar =
            accionContinuar;

        this.modal =
            document.createElement("div");

        this.modal.className =
            `modal-resultado ${tipo}`;

        this.modal.innerHTML = `

            <div class="modal-resultado-contenido">

                <div class="modal-resultado-icono">

                    ${tipo === "correcto" ? "✓" : "✕"}

                </div>

                <div class="modal-resultado-etiqueta">

                    VEREDICTO

                </div>

                <div class="modal-resultado-linea"></div>

                <h2>
                    ${titulo}
                </h2>

                <div class="modal-resultado-mensaje">

                    ${mensaje}

                </div>

                <button
                    class="btn-continuar-resultado"
                    type="button">

                    CONTINUAR

                </button>

            </div>

        `;

        document.body.appendChild(
            this.modal
        );

        this.configurarEventos();
    }

    // ======================================================
    // EVENTOS
    // ======================================================

    configurarEventos() {

        const btnContinuar =
            this.modal.querySelector(
                ".btn-continuar-resultado"
            );

        btnContinuar.addEventListener(
            "click",
            () => {

                const accion =
                    this.accionContinuar;

                this.cerrar();

                if (accion) {
                    accion();
                }
            }
        );
    }

    // ======================================================
    // CERRAR MODAL
    // ======================================================

    cerrar() {

        if (this.modal) {

            this.modal.remove();

            this.modal = null;

            this.accionContinuar = null;
        }
    }
}