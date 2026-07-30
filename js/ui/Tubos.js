/**
 * ==========================================================
 * AI-7
 * Archivo: Tubos.js
 * ----------------------------------------------------------
 * RED NEXUS
 *
 * - Tubo madre horizontal.
 * - Tubos verticales individuales.
 * - Conectores.
 * - Torre NEXUS.
 * - Activación por agente.
 * - Responsive para tablet y móvil.
 *
 * ESCRITORIO:
 * - Mantiene las coordenadas originales.
 *
 * TABLET / MÓVIL:
 * - Distribución 3 / 1 / 3.
 * - AI-04 queda en el centro.
 * - NEXUS queda a la derecha.
 * - Tubos verticales terminan en el hexágono.
 * - AI-04 utiliza una ruta independiente.
 *
 * ==========================================================
 */

export default class Tubos {

    constructor(tablero, agentes) {

        this.tablero = tablero;
        this.agentes = agentes;

        this.red = null;
        this.svg = null;

        this.tubos = new Map();
        this.conectores = new Map();

        this.tuboMadre = null;
        this.torre = null;

        this.resizeHandler = null;

    }


    /* ======================================================
       INICIAR
       ====================================================== */

    iniciar() {

        if (!this.tablero) {

            console.error(
                "Tubos: no se encontró el tablero."
            );

            return;

        }

        this.red =
            this.tablero.querySelector(
                ".nexus-red"
            );

        if (!this.red) {

            console.error(
                "Tubos: no se encontró .nexus-red."
            );

            return;

        }

        this.crearRed();

        this.resizeHandler =
            () => this.adaptarResponsive();

        window.addEventListener(
            "resize",
            this.resizeHandler
        );

    }


    /* ======================================================
       CREAR RED
       ====================================================== */

    crearRed() {

        this.red.innerHTML = `

            <svg
                class="nexus-red-svg"
                viewBox="0 0 1200 700"
                preserveAspectRatio="none"
                aria-hidden="true"
            >

                <defs>

                    <filter
                        id="nexusShadow"
                        x="-100%"
                        y="-100%"
                        width="300%"
                        height="300%"
                    >

                        <feDropShadow
                            dx="0"
                            dy="5"
                            stdDeviation="5"
                            flood-color="#000000"
                            flood-opacity=".9"
                        />

                    </filter>

                </defs>


                <!-- ======================================
                     TUBO MADRE
                     ====================================== -->

                <path
                    class="nexus-tubo-madre"
                    d="
                        M 125 350
                        L 980 350
                    "
                />


                <!-- ======================================
                     TORRE NEXUS
                     ====================================== -->

                ${this.generarTorre()}


                <!-- ======================================
                     TUBOS INDIVIDUALES
                     ====================================== -->

                ${this.generarTubos()}


                <!-- ======================================
                     CONECTORES
                     ====================================== -->

                ${this.generarConectores()}

            </svg>

        `;


        this.svg =
            this.red.querySelector(
                ".nexus-red-svg"
            );


        this.tuboMadre =
            this.svg.querySelector(
                ".nexus-tubo-madre"
            );


        this.torre =
            this.svg.querySelector(
                ".nexus-torre"
            );


        this.registrarTubos();

        this.adaptarResponsive();

    }


    /* ======================================================
       GENERAR TORRE NEXUS
       ====================================================== */

    generarTorre() {

        return `

            <g class="nexus-torre">

                <rect
                    class="nexus-torre-cuerpo"
                    x="980"
                    y="170"
                    width="160"
                    height="360"
                    rx="18"
                />

                <rect
                    class="nexus-torre-nucleo"
                    x="1005"
                    y="310"
                    width="110"
                    height="80"
                    rx="12"
                />

                <circle
                    class="nexus-torre-conexion"
                    cx="980"
                    cy="350"
                    r="12"
                />

                <line
                    class="nexus-torre-linea"
                    x1="980"
                    y1="350"
                    x2="1005"
                    y2="350"
                />

                <line
                    class="nexus-torre-detalle"
                    x1="1010"
                    y1="220"
                    x2="1110"
                    y2="220"
                />

                <line
                    class="nexus-torre-detalle"
                    x1="1010"
                    y1="480"
                    x2="1110"
                    y2="480"
                />

            </g>

        `;

    }


    /* ======================================================
       GENERAR TUBOS INDIVIDUALES
       ------------------------------------------------------
       COORDENADAS ORIGINALES DE ESCRITORIO.
       ====================================================== */

    generarTubos() {

        return `

            <!-- ATLAS -->

            <path
                class="nexus-tubo"
                data-tubo="AI-01"
                d="
                    M 125 125
                    L 125 350
                "
            />


            <!-- NOVA -->

            <path
                class="nexus-tubo"
                data-tubo="AI-02"
                d="
                    M 329 125
                    L 329 350
                "
            />


            <!-- ORION -->

            <path
                class="nexus-tubo"
                data-tubo="AI-03"
                d="
                    M 533 125
                    L 533 350
                "
            />


            <!-- ECHO -->

            <path
                class="nexus-tubo nexus-tubo-central"
                data-tubo="AI-04"
                d="
                    M 737 125
                    L 737 350
                "
            />


            <!-- TITAN -->

            <path
                class="nexus-tubo"
                data-tubo="AI-05"
                d="
                    M 329 575
                    L 329 350
                "
            />


            <!-- VEGA -->

            <path
                class="nexus-tubo"
                data-tubo="AI-06"
                d="
                    M 533 575
                    L 533 350
                "
            />


            <!-- ZERO -->

            <path
                class="nexus-tubo"
                data-tubo="AI-07"
                d="
                    M 737 575
                    L 737 350
                "
            />

        `;

    }


    /* ======================================================
       GENERAR CONECTORES
       ====================================================== */

    generarConectores() {

        return `

            <circle
                class="nexus-conector"
                data-conector="AI-01"
                cx="125"
                cy="350"
                r="9"
            />

            <circle
                class="nexus-conector"
                data-conector="AI-02"
                cx="329"
                cy="350"
                r="9"
            />

            <circle
                class="nexus-conector"
                data-conector="AI-03"
                cx="533"
                cy="350"
                r="9"
            />

            <circle
                class="nexus-conector nexus-conector-central"
                data-conector="AI-04"
                cx="737"
                cy="350"
                r="7"
            />

            <circle
                class="nexus-conector"
                data-conector="AI-05"
                cx="329"
                cy="350"
                r="9"
            />

            <circle
                class="nexus-conector"
                data-conector="AI-06"
                cx="533"
                cy="350"
                r="9"
            />

            <circle
                class="nexus-conector"
                data-conector="AI-07"
                cx="737"
                cy="350"
                r="9"
            />

        `;

    }


    /* ======================================================
       REGISTRAR TUBOS
       ====================================================== */

    registrarTubos() {

        this.tubos.clear();
        this.conectores.clear();


        this.svg
            .querySelectorAll(
                ".nexus-tubo[data-tubo]"
            )
            .forEach(
                tubo => {

                    this.tubos.set(
                        tubo.dataset.tubo,
                        tubo
                    );

                }
            );


        this.svg
            .querySelectorAll(
                ".nexus-conector[data-conector]"
            )
            .forEach(
                conector => {

                    this.conectores.set(
                        conector.dataset.conector,
                        conector
                    );

                }
            );

    }


    /* ======================================================
       RESPONSIVE
       ------------------------------------------------------
       SOLO TABLET / MÓVIL.
       ESCRITORIO NO SE TOCA.
       ====================================================== */

    adaptarResponsive() {

        if (!this.svg || !this.tablero) {
            return;
        }


        /* ==================================================
           ESCRITORIO
           ================================================== */

        if (window.innerWidth > 900) {

            this.restaurarEscritorio();

            return;

        }


        const tableroRect =
            this.tablero.getBoundingClientRect();


        if (
            tableroRect.width === 0 ||
            tableroRect.height === 0
        ) {

            return;

        }


        const escalaX =
            1200 /
            tableroRect.width;


        const escalaY =
            700 /
            tableroRect.height;


        /* ==================================================
           OBTENER POSICIÓN DEL HEXÁGONO
           ================================================== */

        const obtenerPosicionHexagono =
            codigo => {

                const agente =
                    this.tablero.querySelector(
                        `.tablero-agente[data-agente="${codigo}"]`
                    );


                if (!agente) {
                    return null;
                }


                const base =
                    agente.querySelector(
                        ".tablero-agente-base"
                    );


                if (!base) {
                    return null;
                }


                const rect =
                    base.getBoundingClientRect();


                return {

                    x:
                        (
                            rect.left -
                            tableroRect.left +
                            rect.width / 2
                        ) *
                        escalaX,

                    y:
                        (
                            rect.top -
                            tableroRect.top +
                            rect.height / 2
                        ) *
                        escalaY

                };

            };


        /* ==================================================
           POSICIONES
           ================================================== */

        const posiciones =
            new Map();


        [
            "AI-01",
            "AI-02",
            "AI-03",
            "AI-04",
            "AI-05",
            "AI-06",
            "AI-07"
        ].forEach(
            codigo => {

                const posicion =
                    obtenerPosicionHexagono(
                        codigo
                    );


                if (posicion) {

                    posiciones.set(
                        codigo,
                        posicion
                    );

                }

            }
        );


        /* ==================================================
           AGENTES SUPERIORES
           --------------------------------------------------
           TERMINAN EN EL HEXÁGONO.
           ================================================== */

        [
            "AI-01",
            "AI-02",
            "AI-03"
        ].forEach(
            codigo => {

                const posicion =
                    posiciones.get(codigo);


                const tubo =
                    this.tubos.get(codigo);


                const conector =
                    this.conectores.get(codigo);


                if (!posicion) {
                    return;
                }


                if (tubo) {

                    tubo.setAttribute(
                        "d",
                        `
                            M ${posicion.x} ${posicion.y}
                            L ${posicion.x} 350
                        `
                    );

                }


                if (conector) {

                    conector.setAttribute(
                        "cx",
                        posicion.x
                    );

                    conector.setAttribute(
                        "cy",
                        350
                    );

                }

            }
        );


        /* ==================================================
           AGENTES INFERIORES
           --------------------------------------------------
           TERMINAN EN EL HEXÁGONO.
           ================================================== */

        [
            "AI-05",
            "AI-06",
            "AI-07"
        ].forEach(
            codigo => {

                const posicion =
                    posiciones.get(codigo);


                const tubo =
                    this.tubos.get(codigo);


                const conector =
                    this.conectores.get(codigo);


                if (!posicion) {
                    return;
                }


                if (tubo) {

                    tubo.setAttribute(
                        "d",
                        `
                            M ${posicion.x} ${posicion.y}
                            L ${posicion.x} 350
                        `
                    );

                }


                if (conector) {

                    conector.setAttribute(
                        "cx",
                        posicion.x
                    );

                    conector.setAttribute(
                        "cy",
                        350
                    );

                }

            }
        );


        /* ==================================================
           AI-04 — RUTA INDEPENDIENTE
           --------------------------------------------------
           AI-04 NO SE MONTA SOBRE EL TUBO MADRE.
           --------------------------------------------------
           RUTA:

                 HEXÁGONO
                     |
                     |
                     +--------+
                              |
                              |
                              +------ NEXUS
           ================================================== */

        const posicionCentral =
            posiciones.get("AI-04");


        const tuboCentral =
            this.tubos.get("AI-04");


        const conectorCentral =
            this.conectores.get("AI-04");


        if (
            posicionCentral &&
            tuboCentral
        ) {

            /*
             * Punto intermedio vertical.
             *
             * Se separa del tubo madre para que
             * visualmente no se fusione con él.
             */

            const separacionVertical =
                55;


            const yRuta =
                350 +
                separacionVertical;


            /*
             * Punto horizontal antes de entrar
             * al NEXUS.
             */

            const xEntrada =
                900;


            tuboCentral.setAttribute(
                "d",
                `
                    M ${posicionCentral.x} ${posicionCentral.y}
                    L ${posicionCentral.x} ${yRuta}
                    L ${xEntrada} ${yRuta}
                    L ${xEntrada} 350
                    L 980 350
                `
            );

        }


        if (conectorCentral) {

            conectorCentral.setAttribute(
                "cx",
                posicionCentral
                    ? posicionCentral.x
                    : 737
            );


            /*
             * El conector queda en el hexágono,
             * no sobre el tubo madre.
             */

            conectorCentral.setAttribute(
                "cy",
                posicionCentral
                    ? posicionCentral.y
                    : 350
            );

        }


        /* ==================================================
           TUBO MADRE
           --------------------------------------------------
           AI-04 YA NO FORMA PARTE DE ESTA LÍNEA.
           ================================================== */

        if (this.tuboMadre) {

            const xs =
                [
                    "AI-01",
                    "AI-02",
                    "AI-03",
                    "AI-05",
                    "AI-06",
                    "AI-07"
                ]
                .map(
                    codigo => {

                        const posicion =
                            posiciones.get(
                                codigo
                            );

                        return posicion
                            ? posicion.x
                            : null;

                    }
                )
                .filter(
                    x =>
                        x !== null
                );


            const minimoX =
                xs.length
                    ? Math.min(...xs)
                    : 125;


            this.tuboMadre.setAttribute(
                "d",
                `
                    M ${minimoX} 350
                    L 980 350
                `
            );

        }

    }


    /* ======================================================
       RESTAURAR ESCRITORIO
       ------------------------------------------------------
       COORDENADAS ORIGINALES.
       ====================================================== */

    restaurarEscritorio() {

        const posiciones = {

            "AI-01": {
                x: 125,
                arriba: true
            },

            "AI-02": {
                x: 329,
                arriba: true
            },

            "AI-03": {
                x: 533,
                arriba: true
            },

            "AI-04": {
                x: 737,
                arriba: true
            },

            "AI-05": {
                x: 329,
                arriba: false
            },

            "AI-06": {
                x: 533,
                arriba: false
            },

            "AI-07": {
                x: 737,
                arriba: false
            }

        };


        Object.entries(
            posiciones
        ).forEach(
            (
                [
                    codigo,
                    posicion
                ]
            ) => {

                const tubo =
                    this.tubos.get(codigo);


                const conector =
                    this.conectores.get(codigo);


                if (tubo) {

                    const yInicial =
                        posicion.arriba
                            ? 125
                            : 575;


                    tubo.setAttribute(
                        "d",
                        `
                            M ${posicion.x} ${yInicial}
                            L ${posicion.x} 350
                        `
                    );

                }


                if (conector) {

                    conector.setAttribute(
                        "cx",
                        posicion.x
                    );

                    conector.setAttribute(
                        "cy",
                        350
                    );

                }

            }
        );


        if (this.tuboMadre) {

            this.tuboMadre.setAttribute(
                "d",
                `
                    M 125 350
                    L 980 350
                `
            );

        }

    }


    /* ======================================================
       ACTIVAR AGENTE
       ====================================================== */

    activar(codigo) {

        const tubo =
            this.tubos.get(codigo);


        const conector =
            this.conectores.get(codigo);


        if (tubo) {

            tubo.classList.add(
                "tubo-activo"
            );

        }


        if (conector) {

            conector.classList.add(
                "conector-activo"
            );

        }


        if (this.tuboMadre) {

            this.tuboMadre.classList.add(
                "tubo-madre-activo"
            );

        }


        if (this.torre) {

            this.torre.classList.add(
                "torre-activa"
            );

        }

    }


    /* ======================================================
       DESACTIVAR AGENTE
       ====================================================== */

    desactivar(codigo) {

        const tubo =
            this.tubos.get(codigo);


        const conector =
            this.conectores.get(codigo);


        if (tubo) {

            tubo.classList.remove(
                "tubo-activo"
            );

        }


        if (this.torre) {

            this.torre.classList.remove(
                "torre-activa"
            );

        }


        if (conector) {

            conector.classList.remove(
                "conector-activo"
            );

        }


        const quedanActivos =
            this.svg.querySelector(
                ".nexus-tubo.tubo-activo"
            );


        if (!quedanActivos) {

            if (this.tuboMadre) {

                this.tuboMadre.classList.remove(
                    "tubo-madre-activo"
                );

            }

        }

    }

}