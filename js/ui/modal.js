/**
 * ==========================================================
 * AI-7
 * Archivo: Modal.js
 * ----------------------------------------------------------
 * Componente visual para mostrar la información completa
 * de un agente dentro de un modal.
 * ==========================================================
 */

export default class Modal {

    static agente(agente, declaraciones = []) {

        return `

            <div class="modal-overlay">

                <div class="modal-agente">

                    <button class="modal-cerrar" type="button">
                        ×
                    </button>

                    <div class="modal-agente-header">

                        <div class="modal-agente-imagen">

                            ${
                                agente.imagen
                                ?
                                `<img src="assets/img/${agente.imagen}" alt="${agente.nombre}">`
                                :
                                ""
                            }

                        </div>

                        <div class="modal-agente-titulo">

                            <div
                                class="modal-agente-codigo"
                                style="background:${agente.color}"
                            >
                                ${agente.codigo}
                            </div>

                            <h2>${agente.nombre}</h2>

                            <span>${agente.especialidad}</span>

                        </div>

                    </div>

                    <div class="modal-agente-descripcion">

                        <p>
                            ${agente.descripcion}
                        </p>

                    </div>

                    <div class="modal-agente-declaraciones">

                        <h3>Declaraciones</h3>

                        ${
                            declaraciones.length > 0
                            ?
                            declaraciones.map(d => `
                                <p>
                                    "${d.obtenerTexto()}"
                                </p>
                            `).join("")
                            :
                            "<p>Este agente no tiene declaraciones.</p>"
                        }

                    </div>

                    <div class="modal-agente-info">

                        <div class="fila">

                            <span>📏 Altura</span>

                            <strong>
                                ${agente.altura} cm
                            </strong>

                        </div>

                    </div>

                    <button
                        class="modal-cerrar-grande"
                        type="button"
                    >
                        CERRAR
                    </button>

                </div>

            </div>

        `;

    }

}