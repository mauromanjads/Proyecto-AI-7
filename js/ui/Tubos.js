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
 *
 * ==========================================================
 */

export default class Tubos {

    constructor(
        tablero,
        agentes
    ) {

        this.tablero =
            tablero;

        this.agentes =
            agentes;

        this.red =
            null;

        this.svg =
            null;

        this.tubos =
            new Map();

        this.conectores =
            new Map();

        this.tuboMadre =
            null;

        this.torre =
            null;

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
                     ESQUELETO
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

    }


    /* ======================================================
       GENERAR TORRE NEXUS
       ------------------------------------------------------
       ESQUELETO INICIAL
       ====================================================== */

    generarTorre() {

        return `

            <g
                class="nexus-torre"
            >

                <!-- ==================================
                     CUERPO PRINCIPAL
                     ================================== -->

                <rect
                    class="nexus-torre-cuerpo"
                    x="980"
                    y="170"
                    width="160"
                    height="360"
                    rx="18"
                />


                <!-- ==================================
                     NÚCLEO CENTRAL
                     ================================== -->

                <rect
                    class="nexus-torre-nucleo"
                    x="1005"
                    y="310"
                    width="110"
                    height="80"
                    rx="12"
                />


                <!-- ==================================
                     CONEXIÓN DEL TUBO MADRE
                     ================================== -->

                <circle
                    class="nexus-torre-conexion"
                    cx="980"
                    cy="350"
                    r="12"
                />


                <!-- ==================================
                     LÍNEA CENTRAL DEL NÚCLEO
                     ================================== -->

                <line
                    class="nexus-torre-linea"
                    x1="980"
                    y1="350"
                    x2="1005"
                    y2="350"
                />


                <!-- ==================================
                     DETALLE SUPERIOR
                     ================================== -->

                <line
                    class="nexus-torre-detalle"
                    x1="1010"
                    y1="220"
                    x2="1110"
                    y2="220"
                />


                <!-- ==================================
                     DETALLE INFERIOR
                     ================================== -->

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
       ====================================================== */

    generarTubos() {

        return `

            <!-- ==========================================
                 ATLAS
                 ========================================== -->

            <path
                class="nexus-tubo"
                data-tubo="AI-01"
                d="
                    M 125 125
                    L 125 350
                "
            />


            <!-- ==========================================
                 NOVA
                 ========================================== -->

            <path
                class="nexus-tubo"
                data-tubo="AI-02"
                d="
                    M 329 125
                    L 329 350
                "
            />


            <!-- ==========================================
                 ORION
                 ========================================== -->

            <path
                class="nexus-tubo"
                data-tubo="AI-03"
                d="
                    M 533 125
                    L 533 350
                "
            />


            <!-- ==========================================
                 ECHO
                 ========================================== -->

            <path
                class="nexus-tubo"
                data-tubo="AI-04"
                d="
                    M 737 125
                    L 737 350
                "
            />


            <!-- ==========================================
                 TITAN
                 ========================================== -->

            <path
                class="nexus-tubo"
                data-tubo="AI-05"
                d="
                    M 329 575
                    L 329 350
                "
            />


            <!-- ==========================================
                 VEGA
                 ========================================== -->

            <path
                class="nexus-tubo"
                data-tubo="AI-06"
                d="
                    M 533 575
                    L 533 350
                "
            />


            <!-- ==========================================
                 ZERO
                 ========================================== -->

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
                class="nexus-conector"
                data-conector="AI-04"
                cx="737"
                cy="350"
                r="9"
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
       ACTIVAR AGENTE
       ====================================================== */

    activar(
        codigo
    ) {

        const tubo =
            this.tubos.get(
                codigo
            );


        const conector =
            this.conectores.get(
                codigo
            );


        /* ==============================================
           TUBO INDIVIDUAL
           ============================================== */

        if (tubo) {

            tubo.classList.add(
                "tubo-activo"
            );

        }


        /* ==============================================
           CONECTOR
           ============================================== */

        if (conector) {

            conector.classList.add(
                "conector-activo"
            );

        }


        /* ==============================================
           TUBO MADRE COMPLETO
           ============================================== */

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

    desactivar(
        codigo
    ) {

        const tubo =
            this.tubos.get(
                codigo
            );


        const conector =
            this.conectores.get(
                codigo
            );


        /* ==============================================
           TUBO INDIVIDUAL
           ============================================== */

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


        /* ==============================================
           CONECTOR
           ============================================== */

        if (conector) {

            conector.classList.remove(
                "conector-activo"
            );

        }


        /* ==============================================
           COMPROBAR AGENTES ACTIVOS
           ============================================== */

        const quedanActivos =
            this.svg.querySelector(
                ".nexus-tubo.tubo-activo"
            );


        /* ==============================================
           SI NO QUEDA NINGÚN AGENTE ACTIVO
           ============================================== */

        if (!quedanActivos) {

            if (this.tuboMadre) {

                this.tuboMadre.classList.remove(
                    "tubo-madre-activo"
                );

            }

        }

    }

}