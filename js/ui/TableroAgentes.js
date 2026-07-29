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
 * - Gestionar UN SOLO agente activo.
 * - Gestionar menú radial transparente del agente.
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

        this.agenteActivo = null;

        this.tarjetaActiva = null;

        this.modalAgente = null;

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

                <div class="nexus-red"></div>

                <div class="nexus-agentes">

                    ${this.agentes.map(
                        agente =>
                            this.crearAgente(
                                agente
                            )
                    ).join("")}

                </div>

                <div
                    class="nexus-modal-agente"
                    aria-hidden="true"
                >

                    <button
                        class="nexus-accion nexus-accion-interrogar"
                        type="button"
                        aria-label="Interrogar"
                        data-accion="interrogar"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <circle
                                cx="11"
                                cy="11"
                                r="6"
                            ></circle>
                            <path
                                d="M16 16l5 5"
                            ></path>
                        </svg>
                    </button>

                    <button
                        class="nexus-accion nexus-accion-perfil"
                        type="button"
                        aria-label="Perfil"
                        data-accion="perfil"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <circle
                                cx="12"
                                cy="8"
                                r="4"
                            ></circle>
                            <path
                                d="M4 21c.8-4.2 3.4-6 8-6s7.2 1.8 8 6"
                            ></path>
                        </svg>
                    </button>

                    <button
                        class="nexus-accion nexus-accion-culpable"
                        type="button"
                        aria-label="Culpable"
                        data-accion="culpable"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="8"
                            ></circle>
                            <circle
                                cx="12"
                                cy="12"
                                r="3"
                            ></circle>
                            <path
                                d="M12 2v3M12 19v3M2 12h3M19 12h3"
                            ></path>
                        </svg>
                    </button>

                    <button
                        class="nexus-accion nexus-accion-cancelar"
                        type="button"
                        aria-label="Cancelar"
                        data-accion="cancelar"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M6 6l12 12M18 6L6 18"
                            ></path>
                        </svg>
                    </button>

                </div>

            </div>

        `;

        this.tablero =
            this.contenedor.querySelector(
                ".nexus-tablero"
            );

        this.modalAgente =
            this.tablero.querySelector(
                ".nexus-modal-agente"
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

                <div class="tablero-agente-personaje">

                    <img
                        src="assets/img/${agente.avatar}"
                        alt="${agente.nombre}"
                        draggable="false"
                    >

                </div>

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

                const activar =
                    () => {

                        const codigo =
                            tarjeta.dataset.agente;

                        /*
                         * SOLO UN AGENTE ACTIVO.
                         *
                         * Si ya existe uno activo,
                         * ningún otro puede activarse.
                         */

                        if (
                            this.agenteActivo &&
                            this.agenteActivo !== codigo
                        ) {

                            return;

                        }

                        if (
                            this.agenteActivo === codigo
                        ) {

                            return;

                        }

                        this.activarAgente(
                            tarjeta,
                            codigo
                        );

                    };


                tarjeta.addEventListener(
                    "click",
                    activar
                );


                tarjeta.addEventListener(
                    "keydown",
                    evento => {

                        if (
                            evento.key === "Enter" ||
                            evento.key === " "
                        ) {

                            evento.preventDefault();

                            activar();

                        }

                    }
                );

            }
        );


        /*
         * ==================================================
         * ACCIONES DEL MENÚ
         * ==================================================
         */

        const acciones =
            this.modalAgente.querySelectorAll(
                ".nexus-accion"
            );

        acciones.forEach(
            accion => {

                accion.addEventListener(
                    "click",
                    evento => {

                        evento.stopPropagation();

                        const tipo =
                            accion.dataset.accion;

                        this.ejecutarAccion(
                            tipo
                        );

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
         * SEGURIDAD:
         * Nunca permitir dos agentes activos.
         */

        if (this.agenteActivo) {

            return;

        }


        this.agenteActivo = codigo;

        this.tarjetaActiva = tarjeta;


        /*
         * ==========================================
         * ESTADO VISUAL
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
         * RED NEXUS
         * ==========================================
         */

        if (this.tubos) {

            this.tubos.activar(
                codigo
            );

        }


        /*
         * ==========================================
         * ABRIR MENÚ RADIAL
         * ==========================================
         */

        this.mostrarMenuAgente(
            tarjeta
        );

    }


    /* ======================================================
       MOSTRAR MENÚ
       ====================================================== */

    mostrarMenuAgente(
        tarjeta
    ) {

        if (!this.modalAgente) {

            return;

        }


        /*
         * Posicionar el menú sobre el agente.
         */

        const x =
            tarjeta.offsetLeft +
            tarjeta.offsetWidth / 2;

        const y =
            tarjeta.offsetTop +
            105;


        this.modalAgente.style.left =
            `${x}px`;

        this.modalAgente.style.top =
            `${y}px`;


        this.modalAgente.classList.remove(
            "menu-cerrando"
        );


        /*
         * Forzar reinicio de animación.
         */

        void this.modalAgente.offsetWidth;


        this.modalAgente.classList.add(
            "menu-visible"
        );

        this.modalAgente.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    /* ======================================================
       EJECUTAR ACCIÓN
       ====================================================== */

    ejecutarAccion(
        tipo
    ) {

        if (
            !this.agenteActivo
        ) {

            return;

        }


        switch (tipo) {

            case "interrogar":

                /*
                 * Aquí se conectará posteriormente
                 * con la lógica de interrogación.
                 */

                break;


            case "perfil":

                /*
                 * Aquí se conectará posteriormente
                 * con el perfil del agente.
                 */

                break;


            case "culpable":

                /*
                 * Aquí se conectará posteriormente
                 * con la selección de culpable.
                 */

                break;


            case "cancelar":

                this.desactivarAgente();

                break;

        }

    }


    /* ======================================================
       DESACTIVAR AGENTE
       ====================================================== */

    desactivarAgente() {

        if (
            !this.tarjetaActiva ||
            !this.agenteActivo
        ) {

            return;

        }


        const tarjeta =
            this.tarjetaActiva;

        const codigo =
            this.agenteActivo;


        /*
         * ==========================================
         * CERRAR MENÚ
         * ==========================================
         */

        this.ocultarMenuAgente();


        /*
         * ==========================================
         * DESACTIVAR ESTADO VISUAL
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
         * RED NEXUS
         * ==========================================
         */

        if (this.tubos) {

            this.tubos.desactivar(
                codigo
            );

        }


        /*
         * ==========================================
         * LIMPIAR ESTADO
         * ==========================================
         */

        this.agenteActivo = null;

        this.tarjetaActiva = null;

    }


    /* ======================================================
       OCULTAR MENÚ
       ====================================================== */

    ocultarMenuAgente() {

        if (!this.modalAgente) {

            return;

        }


        this.modalAgente.classList.remove(
            "menu-visible"
        );

        this.modalAgente.classList.add(
            "menu-cerrando"
        );

        this.modalAgente.setAttribute(
            "aria-hidden",
            "true"
        );

    }

}