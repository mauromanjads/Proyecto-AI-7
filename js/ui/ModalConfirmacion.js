/**
 * ==========================================================
 * AI-7
 * Archivo: ModalConfirmacion.js
 * ----------------------------------------------------------
 * Modal para confirmar la selección del culpable.
 * ==========================================================
 */

export default class ModalConfirmacion {

    static mostrar(agente) {

        const modal =
            document.createElement("div");

        modal.className =
            "modal-confirmacion";


        modal.innerHTML = `

            <div class="modal-confirmacion-contenido">

                <button
                    type="button"
                    class="modal-confirmacion-cerrar"
                    aria-label="Cerrar"
                >
                    ×
                </button>


                <div class="modal-confirmacion-icono">

                    🕵️

                </div>


                <h2>

                    ¿Seleccionar culpable?

                </h2>


                <p>

                    Has seleccionado a:

                </p>


                <h3>

                    ${agente.nombre}

                </h3>


                <p class="modal-confirmacion-texto">

                    ¿Estás seguro de que quieres
                    seleccionar a este personaje
                    como culpable?

                </p>


                <div class="modal-confirmacion-botones">

                    <button
                        type="button"
                        class="btn-confirmar-culpable"
                    >

                        ✅ Confirmar

                    </button>


                    <button
                        type="button"
                        class="btn-cancelar-culpable"
                    >

                        ❌ Cancelar

                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        return modal;

    }

}