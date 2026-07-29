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
 * RED:
 * - Tubo madre horizontal.
 * - Tubos verticales independientes.
 * - Cada tubo se conecta directamente con su plataforma.
 * - Cada tubo tiene su propio ID.
 *
 * INTERACCIÓN:
 * - Click activa/desactiva agente.
 * - Múltiples agentes pueden estar activos.
 * - Tubo individual se ilumina.
 * - Conector individual se ilumina.
 * - Segmento del tubo madre se ilumina.
 * ==========================================================
 */

export default class TableroAgentes {

    constructor() {

        this.contenedor = null;

        this.tablero = null;

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

        this.resizeObserver =
            null;

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

        this.configurarRedimensionamiento();

        requestAnimationFrame(
            () => {

                this.actualizarTubos();

            }
        );

    }


    /* ======================================================
       RENDERIZAR
       ====================================================== */

    renderizar() {

        this.contenedor.innerHTML = `

            <div class="nexus-tablero">

                <div class="nexus-red">

                    <svg
                        class="nexus-red-svg"
                        viewBox="0 0 1200 700"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >

                        <!-- ==================================
                             TUBO MADRE APAGADO
                             ================================== -->

                        <path
                            id="nexus-tubo-madre"
                            class="nexus-tubo-madre"
                            d="M 0 350 L 1200 350"
                        ></path>


                        <!-- ==================================
                             TUBO MADRE ACTIVO
                             Segmentos individuales
                             ================================== -->

                        ${this.agentes.map(
                            agente => `

                                <path
                                    id="nexus-madre-${agente.codigo.toLowerCase()}"
                                    class="nexus-madre-segmento"
                                    data-madre="${agente.codigo}"
                                    d="M 0 350 L 0 350"
                                ></path>

                            `
                        ).join("")}


                        <!-- ==================================
                             TUBOS VERTICALES
                             Cada uno es independiente.
                             ================================== -->

                        ${this.agentes.map(
                            agente => `

                                <path
                                    id="nexus-tubo-${agente.codigo.toLowerCase()}"
                                    class="nexus-tubo"
                                    data-tubo="${agente.codigo}"
                                    d="M 0 0 L 0 0"
                                ></path>

                            `
                        ).join("")}


                        <!-- ==================================
                             CONECTORES
                             ================================== -->

                        ${this.agentes.map(
                            agente => `

                                <circle
                                    id="nexus-conector-${agente.codigo.toLowerCase()}"
                                    class="nexus-conector"
                                    data-conector="${agente.codigo}"
                                    cx="0"
                                    cy="350"
                                    r="9"
                                ></circle>

                            `
                        ).join("")}

                    </svg>

                </div>


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


                <!-- ==========================================
                     NÚCLEO
                     ========================================== -->

                <div class="nexus-nucleo">

                    <div class="nexus-nucleo-anillo"></div>

                    <span class="nexus-nucleo-centro">
                        NEXUS
                    </span>

                </div>

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

    crearAgente(agente) {

        return `

            <div
                class="
                    tablero-agente
                    agente-${agente.posicion}
                "
                data-agente="${agente.codigo}"
                data-tubo="${agente.codigo}"
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


                tarjeta.addEventListener(
                    "click",
                    alternar
                );


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

        this.agentesActivos.add(
            codigo
        );

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


        const tubo =
            this.tablero.querySelector(
                `[data-tubo="${codigo}"]`
            );

        if (tubo) {

            tubo.classList.add(
                "tubo-activo"
            );

        }


        const conector =
            this.tablero.querySelector(
                `[data-conector="${codigo}"]`
            );

        if (conector) {

            conector.classList.add(
                "conector-activo"
            );

        }


        const madre =
            this.tablero.querySelector(
                `[data-madre="${codigo}"]`
            );

        if (madre) {

            madre.classList.add(
                "madre-segmento-activo"
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

        this.agentesActivos.delete(
            codigo
        );

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


        const tubo =
            this.tablero.querySelector(
                `[data-tubo="${codigo}"]`
            );

        if (tubo) {

            tubo.classList.remove(
                "tubo-activo"
            );

        }


        const conector =
            this.tablero.querySelector(
                `[data-conector="${codigo}"]`
            );

        if (conector) {

            conector.classList.remove(
                "conector-activo"
            );

        }


        const madre =
            this.tablero.querySelector(
                `[data-madre="${codigo}"]`
            );

        if (madre) {

            madre.classList.remove(
                "madre-segmento-activo"
            );

        }

    }


    /* ======================================================
       ACTUALIZAR TUBOS
       ------------------------------------------------------
       Calcula la posición REAL de cada plataforma.

       Esto evita que los tubos queden flotando o separados.
       ====================================================== */

    actualizarTubos() {

        if (!this.tablero) {

            return;

        }

        const tableroRect =
            this.tablero.getBoundingClientRect();


        const madreY =
            this.tablero.clientHeight / 2;


        const svg =
            this.tablero.querySelector(
                ".nexus-red-svg"
            );


        if (!svg) {

            return;

        }


        this.agentes.forEach(
            agente => {

                const tarjeta =
                    this.tablero.querySelector(
                        `[data-agente="${agente.codigo}"]`
                    );


                if (!tarjeta) {

                    return;

                }


                const base =
                    tarjeta.querySelector(
                        ".tablero-agente-base"
                    );


                if (!base) {

                    return;

                }


                const baseRect =
                    base.getBoundingClientRect();


                /*
                 * =========================================
                 * CENTRO HORIZONTAL DE LA PLATAFORMA
                 * =========================================
                 */

                const x =
                    (
                        baseRect.left +
                        baseRect.width / 2 -
                        tableroRect.left
                    )
                    *
                    (
                        1200 /
                        tableroRect.width
                    );


                /*
                 * =========================================
                 * BORDE DE LA PLATAFORMA
                 * =========================================
                 *
                 * Para agentes superiores:
                 * el tubo termina en la parte inferior.
                 *
                 * Para agentes inferiores:
                 * el tubo empieza en la parte superior.
                 * =========================================
                 */

                let y;


                if (
                    agente.posicion ===
                    "arriba"
                ) {

                    y =
                        (
                            baseRect.bottom -
                            tableroRect.top
                        )
                        *
                        (
                            700 /
                            tableroRect.height
                        );

                } else {

                    y =
                        (
                            baseRect.top -
                            tableroRect.top
                        )
                        *
                        (
                            700 /
                            tableroRect.height
                        );

                }


                const tubo =
                    this.tablero.querySelector(
                        `#nexus-tubo-${agente.codigo.toLowerCase()}`
                    );


                if (tubo) {

                    if (
                        agente.posicion ===
                        "arriba"
                    ) {

                        tubo.setAttribute(
                            "d",
                            `
                                M ${x} ${y}
                                L ${x} ${madreY}
                            `
                        );

                    } else {

                        tubo.setAttribute(
                            "d",
                            `
                                M ${x} ${madreY}
                                L ${x} ${y}
                            `
                        );

                    }

                }


                /*
                 * =========================================
                 * CONECTOR
                 * =========================================
                 */

                const conector =
                    this.tablero.querySelector(
                        `#nexus-conector-${agente.codigo.toLowerCase()}`
                    );


                if (conector) {

                    conector.setAttribute(
                        "cx",
                        x
                    );

                    conector.setAttribute(
                        "cy",
                        madreY
                    );

                }


                /*
                 * =========================================
                 * SEGMENTO DEL TUBO MADRE
                 * =========================================
                 */

                const madre =
                    this.tablero.querySelector(
                        `#nexus-madre-${agente.codigo.toLowerCase()}`
                    );


                if (madre) {

                    madre.setAttribute(
                        "d",
                        `
                            M ${x} ${madreY}
                            L ${x} ${madreY}
                        `
                    );

                }

            }
        );

    }


    /* ======================================================
       RESPONSIVE
       ====================================================== */

    configurarRedimensionamiento() {

        if (
            typeof ResizeObserver !==
            "undefined"
        ) {

            this.resizeObserver =
                new ResizeObserver(
                    () => {

                        requestAnimationFrame(
                            () => {

                                this.actualizarTubos();

                            }
                        );

                    }
                );


            this.resizeObserver.observe(
                this.tablero
            );

        }


        window.addEventListener(
            "resize",
            () => {

                requestAnimationFrame(
                    () => {

                        this.actualizarTubos();

                    }
                );

            }
        );

    }

}