/**
 * ==========================================================
 * AI-7
 * Archivo: TableroAgentes.js
 * ----------------------------------------------------------
 * TABLERO NEXUS
 * ==========================================================
 */

import Tubos from "./Tubos.js";
import Mensajes from "./Mensajes.js";
import Modal from "./ModalPerfil.js";
import BaseHexagonal3D from "./BaseHexagonal3D.js";
import NucleoNexus from "./NucleoNexus.js";
import { PERSONAJES } from "../datos/personajes.js";

export default class TableroAgentes {

    constructor() {

        this.contenedor = null;
        this.tablero = null;

        this.tubos = null;
        this.nucleo = null;

        this.agenteActivo = null;
        this.tarjetaActiva = null;
        this.modalAgente = null;

        this.declaraciones = [];

        this.tableroPrincipal = null;

        this.bases3D = [];

        this.agentes =
            this.prepararAgentes(PERSONAJES);

    }

    prepararAgentes(agentes) {

        if (!Array.isArray(agentes)) {
            return [];
        }

        return agentes.map(
            agente => ({
                ...agente
            })
        );

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
        this.iniciarTubos();
        this.iniciarNucleo();

    }

    cargarAgentes(
        agentes,
        declaraciones = []
    ) {

        if (!Array.isArray(agentes)) {
            return;
        }

        this.declaraciones =
            Array.isArray(declaraciones)
                ? declaraciones
                : [];

        this.agentes =
            this.prepararAgentes(agentes);

        this.agenteActivo = null;
        this.tarjetaActiva = null;

        if (!this.contenedor) {
            return;
        }

        this.renderizar();
        this.iniciarTubos();
        this.iniciarNucleo();

    }

    renderizar() {

        this.limpiarBases3D();

        if (this.nucleo) {

            this.nucleo.destruir();
            this.nucleo = null;

        }

        /*
         * Si en un renderizado anterior movimos el menú
         * de acciones a <body> (ver mostrarMenuAgente),
         * hay que quitarlo antes de reconstruir el tablero
         * o quedaría un nodo huérfano flotando en el body.
         */

        if (
            this.modalAgente &&
            this.modalAgente.parentElement ===
            document.body
        ) {

            this.modalAgente.remove();

        }

        this.contenedor.innerHTML = `

            <div class="nexus-tablero">

                <div class="nexus-red"></div>

                <div class="nexus-agentes">

                    ${this.crearSlots()}

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
                        <svg viewBox="0 0 24 24">
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
                        <svg viewBox="0 0 24 24">
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
                        <svg viewBox="0 0 24 24">
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
                        <svg viewBox="0 0 24 24">
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

        this.iniciarBases3D();
        this.configurarInteracciones();

    }

    crearSlots() {

        const slots = [
            "AI-01",
            "AI-02",
            "AI-03",
            "AI-04",
            "AI-05",
            "AI-06",
            "AI-07"
        ];

        return slots
            .map(codigo => {

                const agente =
                    this.agentes.find(
                        elemento =>
                            elemento.codigo === codigo
                    );

                return agente
                    ? this.crearAgente(agente)
                    : this.crearAgenteVacio(codigo);

            })
            .join("");

    }

    crearAgente(agente) {

        return `

            <div
                class="tablero-agente"
                data-agente="${agente.codigo}"
                role="button"
                tabindex="0"
                aria-label="Activar ${agente.nombre}"
                aria-pressed="false"
            >

                <div class="tablero-agente-centro">

                    <div class="tablero-agente-base">

                        <div
                            class="tablero-agente-hex-superficie"
                        ></div>

                    </div>

                    <div class="tablero-agente-personaje">

                        <img
                            src="assets/img/${agente.avatar}"
                            alt="${agente.nombre}"
                            draggable="false"
                        >

                    </div>

                </div>

                ${this.crearEtiqueta(agente.nombre)}

            </div>

        `;

    }

    crearAgenteVacio(codigo) {

        return `

            <div
                class="
                    tablero-agente
                    agente-vacio
                "
                data-agente="${codigo}"
                aria-hidden="true"
            >

                <div class="tablero-agente-centro">

                    <div class="tablero-agente-base">

                        <div
                            class="tablero-agente-hex-superficie"
                        ></div>

                    </div>

                </div>

                ${this.crearEtiqueta("---")}

            </div>

        `;

    }

    crearEtiqueta(nombre) {

        return `

            <div class="tablero-agente-etiqueta">

                <span
                    class="tornillo tornillo-izquierdo"
                ></span>

                <span class="etiqueta-nombre">
                    ${nombre}
                </span>

                <span
                    class="tornillo tornillo-derecho"
                ></span>

            </div>

        `;

    }

    iniciarNucleo() {

        if (!this.tablero) {
            return;
        }

        this.nucleo =
            new NucleoNexus(this.tablero);

        this.nucleo.iniciar();

    }

    iniciarTubos() {

        if (!this.tablero) {
            return;
        }

        this.tubos =
            new Tubos(
                this.tablero,
                this.agentes
            );

        this.tubos.iniciar();

    }

    iniciarBases3D() {

        this.bases3D = [];

        const superficies =
            this.tablero.querySelectorAll(
                ".tablero-agente-hex-superficie"
            );

        superficies.forEach(
            superficie => {

                const base =
                    new BaseHexagonal3D(
                        superficie
                    );

                base.iniciar();

                this.bases3D.push(base);

            }
        );

    }

    limpiarBases3D() {

        if (!this.bases3D) {
            return;
        }

        this.bases3D.forEach(base => {

            if (
                base &&
                typeof base.destruir ===
                "function"
            ) {

                base.destruir();

            }

        });

        this.bases3D = [];

    }

    configurarInteracciones() {

        const tarjetas =
            this.tablero.querySelectorAll(
                ".tablero-agente:not(.agente-vacio)"
            );

        tarjetas.forEach(tarjeta => {

            const activar = evento => {

                evento.stopPropagation();

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

                        activar(evento);

                    }

                }
            );

        });

        const acciones =
            this.modalAgente.querySelectorAll(
                ".nexus-accion"
            );

        acciones.forEach(accion => {

            accion.addEventListener(
                "click",
                evento => {

                    evento.stopPropagation();

                    this.ejecutarAccion(
                        accion.dataset.accion
                    );

                }
            );

        });

    }

    activarAgente(
        tarjeta,
        codigo
    ) {

        if (this.agenteActivo) {
            return;
        }

        this.agenteActivo = codigo;
        this.tarjetaActiva = tarjeta;

        tarjeta.classList.add(
            "agente-activo",
            "agente-presionado"
        );

        tarjeta.setAttribute(
            "aria-pressed",
            "true"
        );

        if (this.tubos) {
            this.tubos.activar(codigo);
        }

        if (this.nucleo) {
            this.nucleo.activar();
        }

        this.mostrarMenuAgente(tarjeta);

    }

    mostrarMenuAgente(tarjeta) {

        if (!this.modalAgente) {
            return;
        }

        /*
         * FIX CLAVE
         * ------------------------------------------------
         * ".nexus-tablero" tiene "transform" y
         * "#tablero-agentes" tiene "overflow: hidden".
         *
         * Mientras el menú viva DENTRO del tablero, ningún
         * "position: fixed" ni ajuste de coordenadas logra
         * escapar de ese recorte: un ancestro con transform
         * convierte a los hijos "fixed" en descendientes
         * "atrapados" dentro de él, y ese ancestro sigue
         * siendo recortado por el overflow:hidden de su
         * propio padre.
         *
         * La única forma real de que la botonera no se
         * corte (sin importar si el agente está arriba o
         * abajo) es sacarla del DOM del tablero y montarla
         * directo en <body>, ya con coordenadas de pantalla
         * puras (fixed).
         */

        if (
            this.modalAgente.parentElement !==
            document.body
        ) {

            document.body.appendChild(
                this.modalAgente
            );

            this.modalAgente.style.position =
                "fixed";

        }

        const tarjetaRect =
            tarjeta.getBoundingClientRect();

        const centroX =
            tarjetaRect.left +
            tarjetaRect.width / 2;

        const centroY =
            tarjetaRect.top +
            tarjetaRect.height / 2;

        /*
         * Separación visual entre la placa/personaje
         * y la botonera.
         *
         * En móvil se necesita más separación porque
         * las tarjetas son mucho más pequeñas.
         */

        const esMovil =
            window.matchMedia(
                "(max-width: 700px)"
            ).matches;

        const desplazamientoTop =
            esMovil
                ? 105
                : 70;

        this.modalAgente.style.left =
            `${centroX}px`;

        this.modalAgente.style.top =
            `${centroY - desplazamientoTop}px`;

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

        requestAnimationFrame(() => {

            this.ajustarMenuPantalla();

        });

    }

    ajustarMenuPantalla() {

        if (!this.modalAgente) {
            return;
        }

        /*
         * Ahora que el menú vive en <body> con
         * "position: fixed", sus coordenadas ya son
         * coordenadas de pantalla puras.
         *
         * Ya no hace falta convertir nada respecto al
         * tablero ni compensar ninguna escala: solo
         * comparamos el rectángulo del menú contra el
         * viewport y lo desplazamos si se sale.
         */

        const margen = 12;

        const menuRect =
            this.modalAgente.getBoundingClientRect();

        const viewportWidth =
            window.innerWidth;

        const viewportHeight =
            window.innerHeight;

        let desplazamientoX = 0;
        let desplazamientoY = 0;

        /*
         * Límites horizontales.
         */

        if (
            menuRect.left <
            margen
        ) {

            desplazamientoX =
                margen -
                menuRect.left;

        }

        if (
            menuRect.right >
            viewportWidth -
            margen
        ) {

            desplazamientoX =
                viewportWidth -
                margen -
                menuRect.right;

        }

        /*
         * Límites verticales.
         */

        if (
            menuRect.top <
            margen
        ) {

            desplazamientoY =
                margen -
                menuRect.top;

        }

        if (
            menuRect.bottom >
            viewportHeight -
            margen
        ) {

            desplazamientoY =
                viewportHeight -
                margen -
                menuRect.bottom;

        }

        const actualLeft =
            parseFloat(
                this.modalAgente.style.left
            ) || 0;

        const actualTop =
            parseFloat(
                this.modalAgente.style.top
            ) || 0;

        this.modalAgente.style.left =
            `${
                actualLeft +
                desplazamientoX
            }px`;

        this.modalAgente.style.top =
            `${
                actualTop +
                desplazamientoY
            }px`;

    }

    ejecutarAccion(tipo) {

        if (!this.agenteActivo) {
            return;
        }

        switch (tipo) {

            case "interrogar":
                this.interrogarAgente();
                break;

            case "perfil":
                this.mostrarPerfil();
                break;

            case "culpable":
                this.seleccionarCulpable();
                break;

            case "cancelar":
                this.desactivarAgente();
                break;

        }

    }

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
                    elemento.personaje?.nombre ===
                    agente.nombre
            );

        if (!declaracion) {
            return;
        }

        new Mensajes().mostrar(
            agente,
            [declaracion]
        );

    }

    mostrarPerfil() {

        const agente =
            this.agentes.find(
                elemento =>
                    elemento.codigo ===
                    this.agenteActivo
            );

        if (!agente) {
            return;
        }

        document.querySelector(
            ".modal-overlay"
        )?.remove();

        document.body.insertAdjacentHTML(
            "beforeend",
            Modal.agente(agente)
        );

        const modal =
            document.querySelector(
                ".modal-overlay"
            );

        if (!modal) {
            return;
        }

        const cerrar =
            () => modal.remove();

        modal.querySelector(
            ".modal-cerrar"
        )?.addEventListener(
            "click",
            cerrar
        );

        modal.querySelector(
            ".modal-cerrar-grande"
        )?.addEventListener(
            "click",
            cerrar
        );

    }

    seleccionarCulpable() {

        const agente =
            this.agentes.find(
                elemento =>
                    elemento.codigo ===
                    this.agenteActivo
            );

        if (!agente) {
            return;
        }

        if (
            this.tableroPrincipal &&
            typeof this.tableroPrincipal
                .abrirModalConfirmacion ===
            "function"
        ) {

            this.tableroPrincipal
                .abrirModalConfirmacion(
                    agente
                );

        }

    }

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
            "agente-activo",
            "agente-presionado"
        );

        tarjeta.setAttribute(
            "aria-pressed",
            "false"
        );

        if (this.tubos) {
            this.tubos.desactivar(codigo);
        }

        if (this.nucleo) {
            this.nucleo.desactivar();
        }

        this.agenteActivo = null;
        this.tarjetaActiva = null;

    }

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