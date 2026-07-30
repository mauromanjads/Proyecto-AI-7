/**
 * ==========================================================
 * AI-7
 * Archivo: TableroAgentes.js
 * ----------------------------------------------------------
 * TABLERO NEXUS
 *
 * RESPONSABILIDAD:
 * - Cargar los agentes desde el catálogo oficial.
 * - Recibir los agentes reales del caso lógico.
 * - Recibir las declaraciones del caso lógico.
 * - Renderizar agentes.
 * - Renderizar personajes.
 * - Renderizar plataformas / hexágonos.
 * - Gestionar interacción con agentes.
 * - Gestionar UN SOLO agente activo.
 * - Gestionar menú radial transparente del agente.
 * ==========================================================
 */

import Tubos from "./Tubos.js";
import Mensajes from "./Mensajes.js";
import { PERSONAJES } from "../datos/personajes.js";

export default class TableroAgentes {

    constructor() {

        this.contenedor = null;

        this.tablero = null;

        this.tubos = null;

        this.agenteActivo = null;

        this.tarjetaActiva = null;

        this.modalAgente = null;

        this.declaraciones = [];

        /*
         * ==================================================
         * CATÁLOGO OFICIAL
         * ==================================================
         */

        this.agentes =
            this.prepararAgentes(
                PERSONAJES
            );

    }


    /* ======================================================
       PREPARAR AGENTES
       ====================================================== */

    prepararAgentes(
        agentes
    ) {

        if (
            !Array.isArray(agentes)
        ) {

            return [];

        }

        return agentes.map(
            agente => ({

                ...agente,

                posicion:
                    agente.posicion ??
                    (
                        agente.id <= 4
                            ? "arriba"
                            : "abajo"
                    )

            })
        );

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

        this.iniciarTubos();

    }


    /* ======================================================
       CARGAR AGENTES DEL CASO
       ====================================================== */

    cargarAgentes(
        agentes,
        declaraciones = []
    ) {

        /*
         * El caso lógico es ahora
         * la fuente de agentes.
         */

        if (
            !Array.isArray(agentes) ||
            agentes.length === 0
        ) {

            return;

        }


        /*
         * Guardar las declaraciones
         * correspondientes al caso actual.
         */

        this.declaraciones =
            Array.isArray(declaraciones)
                ? declaraciones
                : [];


        /*
         * Preparar los personajes recibidos.
         */

        this.agentes =
            this.prepararAgentes(
                agentes
            );


        /*
         * Limpiar cualquier estado anterior.
         */

        this.agenteActivo = null;

        this.tarjetaActiva = null;


        /*
         * Si el tablero todavía no existe,
         * no intentamos renderizar.
         */

        if (!this.contenedor) {

            return;

        }


        /*
         * Renderizar nuevamente NEXUS
         * con los agentes del caso actual.
         */

        this.renderizar();


        /*
         * Crear nuevamente la red
         * con los agentes actuales.
         */

        this.iniciarTubos();

    }


    /* ======================================================
       INICIAR TUBOS
       ====================================================== */

    iniciarTubos() {

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

        if (
            this.agenteActivo
        ) {

            return;

        }

        this.agenteActivo =
            codigo;

        this.tarjetaActiva =
            tarjeta;

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

        if (this.tubos) {

            this.tubos.activar(
                codigo
            );

        }

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

        if (
            !this.modalAgente
        ) {

            return;

        }

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

        switch (
            tipo
        ) {

            case "interrogar":

                this.interrogarAgente();

                break;


            case "perfil":

                break;


            case "culpable":

                break;


            case "cancelar":

                this.desactivarAgente();

                break;

        }

    }


    /* ======================================================
       INTERROGAR AGENTE
       ====================================================== */

    interrogarAgente() {

        const agente =
            this.agentes.find(
                elemento =>
                    elemento.codigo ===
                    this.agenteActivo
            );

        if (!agente) {

            return;

        }


        const declaracion =
            this.declaraciones.find(
                elemento =>
                    elemento.personaje.nombre ===
                    agente.nombre
            );

        if (!declaracion) {

            console.warn(
                `No se encontró declaración para ${agente.nombre}`
            );

            return;

        }


        /*
         * Mensajes.js ya tiene el modal
         * preparado para mostrar declaraciones.
         *
         * Como cada agente tiene una sola,
         * enviamos únicamente esa declaración.
         */

        new Mensajes().mostrar(
            agente,
            [declaracion]
        );

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

        this.ocultarMenuAgente();

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

        if (this.tubos) {

            this.tubos.desactivar(
                codigo
            );

        }

        this.agenteActivo =
            null;

        this.tarjetaActiva =
            null;

    }


    /* ======================================================
       OCULTAR MENÚ
       ====================================================== */

    ocultarMenuAgente() {

        if (
            !this.modalAgente
        ) {

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