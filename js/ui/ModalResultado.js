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
            document.createElement(
                "div"
            );


        this.modal.className =
            `modal-resultado ${tipo}`;


        this.modal.innerHTML = `

            <div class="modal-resultado-contenido">

                <div class="modal-resultado-header">

                    <h2>
                        ${titulo}
                    </h2>

                    <button
                        class="modal-resultado-cerrar"
                        type="button">

                        ✕

                    </button>

                </div>


                <div class="modal-resultado-mensaje">

                    <p>
                        ${mensaje}
                    </p>

                </div>


                <div class="modal-resultado-footer">

                    <button
                        class="btn-continuar-resultado"
                        type="button">

                        CONTINUAR

                    </button>

                </div>

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

        const btnCerrar =
            this.modal.querySelector(
                ".modal-resultado-cerrar"
            );


        const btnContinuar =
            this.modal.querySelector(
                ".btn-continuar-resultado"
            );


        // ==================================================
        // CERRAR CON X
        // ==================================================

        btnCerrar.addEventListener(
            "click",
            () => this.cerrar()
        );


        // ==================================================
        // CONTINUAR
        // ==================================================

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


        // ==================================================
        // CERRAR AL HACER CLIC FUERA
        // ==================================================

        this.modal.addEventListener(
            "click",
            evento => {

                if (
                    evento.target ===
                    this.modal
                ) {

                    this.cerrar();

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

            this.modal =
                null;

            this.accionContinuar =
                null;

        }

    }

}