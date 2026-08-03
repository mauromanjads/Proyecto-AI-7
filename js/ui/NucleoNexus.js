/**
 * ==========================================================
 * AI-7
 * Archivo: NucleoNexus.js
 * ----------------------------------------------------------
 * NÚCLEO CENTRAL NEXUS
 * ----------------------------------------------------------
 * POSICIONAMIENTO BASADO EN LOS HEXÁGONOS
 * ----------------------------------------------------------
 * ESCRITORIO:
 *   - Centrado vertical respecto a los hexágonos.
 *
 * MÓVIL:
 *   - Centrado vertical respecto a los hexágonos.
 *   - Ajuste vertical específico.
 *   - Posicionado hacia la derecha.
 *   - Mantiene margen de seguridad.
 * ==========================================================
 */

export default class NucleoNexus {

    constructor(tablero) {

        this.tablero = tablero;
        this.nucleo = null;

        this.reposicionar =
            this.posicionar.bind(this);

    }


    iniciar() {

        if (!this.tablero) {
            return;
        }

        this.crear();

        requestAnimationFrame(() => {

            this.posicionar();

        });

        window.addEventListener(
            "resize",
            this.reposicionar
        );

    }


    crear() {

        if (this.nucleo) {
            return;
        }

        this.nucleo =
            document.createElement("div");

        this.nucleo.className =
            "nexus-nucleo";

        this.nucleo.innerHTML = `

            <div class="nexus-nucleo-anillo nexus-anillo-externo"></div>

            <div class="nexus-nucleo-anillo nexus-anillo-medio"></div>

            <div class="nexus-nucleo-cuerpo">

                <div class="nexus-nucleo-luz"></div>

                <div class="nexus-nucleo-centro"></div>

            </div>

        `;

        this.tablero.appendChild(
            this.nucleo
        );

    }


    posicionar() {

        if (
            !this.tablero ||
            !this.nucleo
        ) {
            return;
        }

        this.centrarVerticalmente();
        this.posicionarHorizontalmente();

    }


    centrarVerticalmente() {

        const hexagonos =
            this.tablero.querySelectorAll(
                ".tablero-agente-centro"
            );

        if (!hexagonos.length) {
            return;
        }

        let superior =
            Infinity;

        let inferior =
            -Infinity;

        hexagonos.forEach(
            hexagono => {

                const rect =
                    hexagono.getBoundingClientRect();

                if (
                    rect.width <= 0 ||
                    rect.height <= 0
                ) {
                    return;
                }

                superior =
                    Math.min(
                        superior,
                        rect.top
                    );

                inferior =
                    Math.max(
                        inferior,
                        rect.bottom
                    );

            }
        );

        if (
            superior === Infinity ||
            inferior === -Infinity
        ) {
            return;
        }

        const rectTablero =
            this.tablero.getBoundingClientRect();

        const centroHexagonos =
            (
                superior +
                inferior
            ) / 2;

        const centroRelativo =
            centroHexagonos -
            rectTablero.top;

        const esMovil =
            window.matchMedia(
                "(max-width: 700px)"
            ).matches;

        /*
         * Ajuste vertical exclusivo para móvil.
         *
         * Positivo = baja el núcleo.
         * Negativo = sube el núcleo.
         */

        const ajusteMovil =
            esMovil
                ? 20
                : 0;

        const posicion =
            centroRelativo -
            (
                this.nucleo.offsetHeight /
                2
            ) +
            ajusteMovil;

        this.nucleo.style.top =
            `${posicion}px`;

    }


    posicionarHorizontalmente() {

        const esMovil =
            window.matchMedia(
                "(max-width: 700px)"
            ).matches;

        if (!esMovil) {

            this.nucleo.style.left =
                "calc(50% + 330px)";

            this.nucleo.style.transform =
                "translateX(-50%) translateZ(40px)";

            return;

        }

        /*
         * MÓVIL
         *
         * Lo desplazamos hacia la izquierda
         * dejando margen suficiente para que
         * los anillos no se corten.
         */

        const margen =
            45;

        const anchoNucleo =
            this.nucleo.offsetWidth;

        const anchoViewport =
            window.innerWidth;

        let izquierda =
            anchoViewport -
            anchoNucleo -
            margen;

        izquierda =
            Math.max(
                margen,
                izquierda
            );

        this.nucleo.style.left =
            `${izquierda}px`;

        /*
         * No usamos translateX(-50%) en móvil
         * porque left representa directamente
         * el borde izquierdo del núcleo.
         */

        this.nucleo.style.transform =
            "translateZ(40px)";

    }


    activar() {

        if (!this.nucleo) {
            return;
        }

        this.nucleo.classList.add(
            "nucleo-activo"
        );

    }


    desactivar() {

        if (!this.nucleo) {
            return;
        }

        this.nucleo.classList.remove(
            "nucleo-activo"
        );

    }


    destruir() {

        window.removeEventListener(
            "resize",
            this.reposicionar
        );

        if (!this.nucleo) {
            return;
        }

        this.nucleo.remove();

        this.nucleo = null;

    }

}