/**
 * ==========================================================
 * AI-7
 * Archivo: TableroAgentes.js
 * ----------------------------------------------------------
 * TABLERO NEXUS
 *
 * 7 AGENTES:
 * - ATLAS
 * - NOVA
 * - ORION
 * - ECHO
 * - TITAN
 * - VEGA
 * - ZERO
 *
 * RESPONSABILIDAD:
 * - Renderizar agentes.
 * - Renderizar personajes.
 * - Renderizar plataformas / hexágonos.
 * - Gestionar interacción con agentes.
 * - Gestionar agentes activos.
 *
 * RED:
 * - La lógica de tubos está delegada a Tubos.js.
 * ==========================================================
 */

import Tubos from "./Tubos.js";

export default class TableroAgentes {

    constructor() {

        this.contenedor = null;

        this.tablero = null;

        this.tubos = null;

        this.agentes = [

            {
                codigo: "AI-01",
                nombre: "ATLAS",
                avatar: "atlas_avt.png",
                posicion: "arriba"
            },

            {
                codigo: "AI-02",
                nombre: "NOVA",
                avatar: "nova_avt.png",
                posicion: "arriba"
            },

            {
                codigo: "AI-03",
                nombre: "ORION",
                avatar: "orion_avt.png",
                posicion: "arriba"
            },

            {
                codigo: "AI-04",
                nombre: "ECHO",
                avatar: "echo_avt.png",
                posicion: "arriba"
            },

            {
                codigo: "AI-05",
                nombre: "TITAN",
                avatar: "titan_avt.png",
                posicion: "abajo"
            },

            {
                codigo: "AI-06",
                nombre: "VEGA",
                avatar: "vega_avt.png",
                posicion: "abajo"
            },

            {
                codigo: "AI-07",
                nombre: "ZERO",
                avatar: "zero_avt.png",
                posicion: "abajo"
            }

        ];

        this.agentesActivos =
            new Set();

    }


    /* ======================================================
       INICIAR
       ====================================================== */

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


        /*
         * ==================================================
         * INICIAR RED DE TUBOS
         * ==================================================
         */

        this.tubos =
            new Tubos(
                this.tablero,
                this.agentes
            );

        this.tubos.iniciar();

    }


    /* ======================================================
       RENDERIZAR
       ====================================================== */

    renderizar() {

        this.contenedor.innerHTML = `

            <div class="nexus-tablero">

                <!-- ==========================================
                     RED DE TUBOS
                     Tubos.js controla su contenido.
                     ========================================== -->

                <div class="nexus-red"></div>


                <!-- ==========================================
                     AGENTES
                     ========================================== -->

                <div class="nexus-agentes">

                    ${this.agentes.map(
                        agente =>
                            this.crearAgente(
                                agente
                            )
                    ).join("")}

                </div>
              
        `;

        this.tablero =
            this.contenedor.querySelector(
                ".nexus-tablero"
            );

        this.configurarInteracciones();

    }


    /* ======================================================
       CREAR AGENTE
       ====================================================== */

    crearAgente(
        agente
    ) {

        return `

            <div
                class="
                    tablero-agente
                    agente-${agente.posicion}
                "
                data-agente="${agente.codigo}"
                role="button"
                tabindex="0"
                aria-label="Activar ${agente.nombre}"
                aria-pressed="false"
            >

                <!-- ======================================
                     PERSONAJE
                     ====================================== -->

                <div class="tablero-agente-personaje">

                    <img
                        src="assets/img/${agente.avatar}"
                        alt="${agente.nombre}"
                        draggable="false"
                    >

                </div>


                <!-- ======================================
                     BASE / HEXÁGONO
                     ====================================== -->

                <div class="tablero-agente-base">

                    <div class="tablero-agente-hex">

                        <div
                            class="
                                tablero-agente-hex-pared
                            "
                        ></div>

                        <div
                            class="
                                tablero-agente-hex-superficie
                            "
                        >

                            <div
                                class="
                                    tablero-agente-etiqueta
                                "
                            >

                                <span
                                    class="
                                        tornillo
                                        tornillo-arriba-izquierda
                                    "
                                ></span>

                                <span
                                    class="
                                        tornillo
                                        tornillo-arriba-derecha
                                    "
                                ></span>

                                <span
                                    class="
                                        tornillo
                                        tornillo-abajo-izquierda
                                    "
                                ></span>

                                <span
                                    class="
                                        tornillo
                                        tornillo-abajo-derecha
                                    "
                                ></span>

                                <span
                                    class="etiqueta-nombre"
                                >
                                    ${agente.nombre}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        `;

    }


    /* ======================================================
       INTERACCIONES
       ====================================================== */

    configurarInteracciones() {

        const tarjetas =
            this.tablero.querySelectorAll(
                ".tablero-agente"
            );

        tarjetas.forEach(
            tarjeta => {

                const alternar =
                    () => {

                        const codigo =
                            tarjeta.dataset.agente;

                        if (
                            this.agentesActivos.has(
                                codigo
                            )
                        ) {

                            this.desactivarAgente(
                                tarjeta,
                                codigo
                            );

                        } else {

                            this.activarAgente(
                                tarjeta,
                                codigo
                            );

                        }

                    };


                /*
                 * ==========================================
                 * CLICK
                 * ==========================================
                 */

                tarjeta.addEventListener(
                    "click",
                    alternar
                );


                /*
                 * ==========================================
                 * TECLADO
                 * ==========================================
                 */

                tarjeta.addEventListener(
                    "keydown",
                    evento => {

                        if (
                            evento.key === "Enter" ||
                            evento.key === " "
                        ) {

                            evento.preventDefault();

                            alternar();

                        }

                    }
                );

            }
        );

    }


    /* ======================================================
       ACTIVAR AGENTE
       ====================================================== */

    activarAgente(
        tarjeta,
        codigo
    ) {

        /*
         * ==========================================
         * GUARDAR AGENTE ACTIVO
         * ==========================================
         */

        this.agentesActivos.add(
            codigo
        );


        /*
         * ==========================================
         * ACTIVAR ESTADO VISUAL DEL AGENTE
         * ==========================================
         */

        tarjeta.classList.add(
            "agente-activo"
        );

        tarjeta.classList.add(
            "agente-presionado"
        );


        tarjeta.setAttribute(
            "aria-pressed",
            "true"
        );


        /*
         * ==========================================
         * ACTIVAR RED DE TUBOS
         * ==========================================
         */

        if (this.tubos) {

            this.tubos.activar(
                codigo
            );

        }

    }


    /* ======================================================
       DESACTIVAR AGENTE
       ====================================================== */

    desactivarAgente(
        tarjeta,
        codigo
    ) {

        /*
         * ==========================================
         * ELIMINAR AGENTE ACTIVO
         * ==========================================
         */

        this.agentesActivos.delete(
            codigo
        );


        /*
         * ==========================================
         * DESACTIVAR ESTADO VISUAL DEL AGENTE
         * ==========================================
         */

        tarjeta.classList.remove(
            "agente-activo"
        );

        tarjeta.classList.remove(
            "agente-presionado"
        );


        tarjeta.setAttribute(
            "aria-pressed",
            "false"
        );


        /*
         * ==========================================
         * DESACTIVAR RED DE TUBOS
         * ==========================================
         */

        if (this.tubos) {

            this.tubos.desactivar(
                codigo
            );

        }

    }

}