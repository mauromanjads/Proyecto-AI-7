/**
 * ==========================================================
 * AI-7
 * Archivo: Modal.js
 * ----------------------------------------------------------
 * Componentes visuales para mostrar información dentro
 * de modales.
 *
 * - Modal de información de agentes.
 * - Modal de contenido narrativo.
 * ==========================================================
 */

export default class Modal {

    /* ======================================================
       MODAL DE PERFIL DEL AGENTE
       ====================================================== */

    static agente(agente) {

        return `

            <div class="modal-overlay">

                <div class="modal-agente">

                    <button
                        class="modal-cerrar"
                        type="button"
                        aria-label="Cerrar"
                    >
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

                            <h2>
                                ${agente.nombre}
                            </h2>

                            <span>
                                ${agente.especialidad}
                            </span>

                        </div>

                    </div>

                    <div class="modal-agente-descripcion">

                        <p>
                            ${agente.descripcion}
                        </p>

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

    /* ======================================================
       MODAL NARRATIVO
       ====================================================== */

    static narrativo(
        titulo,
        contenidoTitulo,
        contenido
    ) {

        return `

            <div class="modal-overlay">

                <div class="modal-narrativo">

                    <button
                        class="modal-narrativo-cerrar"
                        type="button"
                        aria-label="Cerrar"
                    >
                        ×
                    </button>

                    <div class="modal-narrativo-header">

                        <h2>
                            ${titulo}
                        </h2>

                    </div>

                    <div class="modal-narrativo-contenido">

                        <h3>
                            ${contenidoTitulo}
                        </h3>

                        <p>
                            ${contenido}
                        </p>

                    </div>

                    <button
                        class="modal-narrativo-cerrar-grande"
                        type="button"
                    >
                        CERRAR
                    </button>

                </div>

            </div>

        `;

    }

}