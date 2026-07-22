/**
 * ==========================================================
 * AI-7
 * Archivo: Mensajes.js
 * ----------------------------------------------------------
 * Modal para mostrar las declaraciones de un personaje.
 * ==========================================================
 */

export default class Mensajes {

    constructor() {

        this.modal = null;

    }

    // ======================================================
    // Mostrar declaraciones
    // ======================================================

    mostrar(agente, declaraciones = []) {

          
        this.cerrar();
       

        this.modal = document.createElement("div");

        this.modal.className = "modal-mensajes";

        this.modal.innerHTML = `

            <div class="modal-mensajes-contenido">

                <div class="modal-mensajes-header">

                    <h2>
                        💬 ${agente.nombre} DICE QUE
                    </h2>

                    <button
                        class="modal-mensajes-cerrar"
                        type="button">
                        ✕
                    </button>

                </div>

                <div class="mensajes-lista">

                   ${
                                    declaraciones.length > 0
                                    ?
                                    declaraciones.map(
                                        declaracion => {
                                        
                                            return `

                                                <div class="mensaje-globo">

                                                   ${declaracion.obtenerTexto()}

                                                </div>

                                            `;

                                        }
                                    ).join("")
                                    :
                                    `

                        <p class="sin-mensajes">

                            Este personaje no tiene
                            declaraciones.

                        </p>

                    `
                }

                </div>

                <div class="modal-mensajes-footer">

                    <button
                        class="btn-cerrar-mensajes"
                        type="button">

                        CERRAR

                    </button>

                </div>

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

        // Cerrar al hacer clic fuera del contenido

        this.modal.addEventListener(
            "click",
            (evento) => {

                if (
                    evento.target === this.modal
                ) {

                    this.cerrar();

                }

            }
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