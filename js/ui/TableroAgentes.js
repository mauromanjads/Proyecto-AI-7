/**
 * ==========================================================
 * AI-7
 * Archivo: TableroAgentes.js
 * ==========================================================
 */

export default class TableroAgentes {

    constructor() {

        this.contenedor = null;
        this.agenteActivo = false;

    }

    iniciar() {

        this.contenedor =
            document.getElementById(
                "tablero-agentes"
            );

        if (!this.contenedor) {

            console.error(
                "No se encontró #tablero-agentes"
            );

            return;

        }

        this.renderizar();

    }

    renderizar() {

        const agente = {

            codigo: "AI-01",
            nombre: "ATLAS",
            avatar: "atlas_avt.png"

        };

        this.contenedor.innerHTML = `

            <div
                class="tablero-agente"
                data-pointer="agente"
                data-agente="${agente.codigo}"
                role="button"
                tabindex="0"
                aria-label="Activar ${agente.nombre}"
                aria-pressed="false"
            >

                <div class="tablero-agente-personaje">

                    <img
                        src="assets/img/${agente.avatar}"
                        alt="${agente.nombre}"
                        draggable="false"
                    >

                </div>

                <div class="tablero-agente-base">

                    <div class="tablero-agente-hex">

                        <div class="tablero-agente-hex-pared"></div>

                        <div class="tablero-agente-hex-superficie">

                            <div class="tablero-agente-etiqueta">

                                <span class="tornillo tornillo-arriba-izquierda"></span>
                                <span class="tornillo tornillo-arriba-derecha"></span>
                                <span class="tornillo tornillo-abajo-izquierda"></span>
                                <span class="tornillo tornillo-abajo-derecha"></span>

                                <span class="etiqueta-nombre">${agente.nombre}</span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        `;

        const tarjeta =
            this.contenedor.querySelector(
                ".tablero-agente"
            );

        if (!tarjeta) {

            return;

        }

        this.configurarInteraccion(
            tarjeta
        );

    }

    configurarInteraccion(tarjeta) {

        const alternarAgente = () => {

            this.agenteActivo =
                !this.agenteActivo;

            tarjeta.classList.toggle(
                "agente-presionado",
                this.agenteActivo
            );

            tarjeta.setAttribute(
                "aria-pressed",
                String(this.agenteActivo)
            );

        };

        tarjeta.addEventListener(
            "click",
            alternarAgente
        );

        tarjeta.addEventListener(
            "keydown",
            (evento) => {

                if (
                    evento.key === "Enter" ||
                    evento.key === " "
                ) {

                    evento.preventDefault();

                    alternarAgente();

                }

            }
        );

    }

}