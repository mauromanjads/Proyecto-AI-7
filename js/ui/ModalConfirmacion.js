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

        const modal = document.createElement("div");

        modal.className = "modal-confirmacion";

        modal.innerHTML = `

            <div class="modal-confirmacion-contenido">

                <div class="modal-confirmacion-alerta">
                    ⚠️
                </div>

                <div class="modal-confirmacion-etiqueta">
                    DECISIÓN CRÍTICA
                </div>

                <div class="modal-confirmacion-linea"></div>

                <h2>
                    ¿ACUSAR A?
                </h2>

                <div class="modal-confirmacion-agente">
                    ${agente.nombre}
                </div>

                <div class="modal-confirmacion-botones">

                    <button
                        type="button"
                        class="btn-confirmar-culpable">
                        ACUSAR CULPABLE
                    </button>

                    <button
                        type="button"
                        class="btn-cancelar-culpable">
                        VOLVER
                    </button>

                </div>

            </div>

        `;

        document.body.appendChild(modal);

        return modal;
    }
}