/**
 * ==========================================================
 * AI-7
 * Archivo: Tubos.js
 * ----------------------------------------------------------
 * RED NEXUS
 *
 * TUBOS SVG 3D - CRISTAL / METAL / CABLEADO INTERNO
 *
 * ==========================================================
 *
 * RESPONSABILIDADES:
 *
 * - Crear la capa SVG de conexiones.
 * - Mantener las posiciones configuradas.
 * - Conectar personajes con NEXUS.
 * - Dibujar tubos transparentes con profundidad.
 * - Dibujar cableado interno.
 * - Dibujar codos 3D.
 * - Dibujar anillos metálicos.
 * - Gestionar estados normal / activo.
 * - Adaptarse al tamaño del contenedor.
 *
 * ==========================================================
 *
 * IMPORTANTE:
 *
 * LA GEOMETRÍA DE LOS RECORRIDOS SE CONTROLA ÚNICAMENTE
 * DESDE CONFIGURACION_TUBOS.
 *
 * NO modificar esta configuración desde la lógica visual.
 *
 * ==========================================================
 */


/* ==========================================================
   CONFIGURACIÓN MANUAL DE LOS TUBOS
   ========================================================== */

const CONFIGURACION_TUBOS = {

    "AI-01": {

        punto1X: -100,
        punto1Y: 0,

        punto2X: -100,
        punto2Y: 405,

        punto3X: 790,
        punto3Y: 405,

        punto4X: 790,
        punto4Y: 200

    },

    "AI-02": {

        punto1X: 100,
        punto1Y: 0,

        punto2X: 100,
        punto2Y: 110,

        punto3X: 460,
        punto3Y: 110,

        punto4X: 460,
        punto4Y: 110

    },

    "AI-03": {

        punto1X: 100,
        punto1Y: 0,

        punto2X: 100,
        punto2Y: 80,

        punto3X: 300,
        punto3Y: 80,

        punto4X: 300,
        punto4Y: 80

    },

    "AI-04": {

        punto1X: 140,
        punto1Y: 0,

        punto2X: 140,
        punto2Y: 0,

        punto3X: 140,
        punto3Y: 80,

        punto4X: 140,
        punto4Y: 80

    },

    "AI-05": {

        punto1X: 100,
        punto1Y: 0,

        punto2X: 100,
        punto2Y: -170,

        punto3X: 460,
        punto3Y: -170,

        punto4X: 460,
        punto4Y: -170

    },

    "AI-06": {

        punto1X: 100,
        punto1Y: 0,

        punto2X: 100,
        punto2Y: -140,

        punto3X: 300,
        punto3Y: -140,

        punto4X: 300,
        punto4Y: -140

    },

    "AI-07": {

        punto1X: 100,
        punto1Y: 0,

        punto2X: 100,
        punto2Y: 0,

        punto3X: 100,
        punto3Y: -80,

        punto4X: 100,
        punto4Y: -80

    }

};


/* ==========================================================
   CÓDIGOS
   ========================================================== */

const CODIGOS = [

    "AI-01",
    "AI-02",
    "AI-03",
    "AI-04",
    "AI-05",
    "AI-06",
    "AI-07"

];


/* ==========================================================
   CLASE TUBOS
   ========================================================== */

export default class Tubos {

    constructor(
        tablero,
        agentes
    ) {

        this.tablero = tablero;

        this.agentes = agentes;

        this.red = null;

        this.svg = null;

        this.tubos = new Map();

        this.conectores = new Map();

        this.resizeObserver = null;

        this.resizeHandler = null;

        this.id = `nexus-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 8)}`;

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

        this.crearSVG();

        this.crearTubos();

        this.resizeObserver =
            new ResizeObserver(
                () => this.actualizar()
            );

        this.resizeObserver.observe(
            this.red
        );

        requestAnimationFrame(
            () => this.actualizar()
        );

    }


    /* ======================================================
       CREAR SVG
       ====================================================== */

    crearSVG() {

        const anterior =
            this.red.querySelector(
                ".nexus-red-svg"
            );

        if (anterior) {

            anterior.remove();

        }

        this.svg =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
            );

        this.svg.classList.add(
            "nexus-red-svg"
        );

        this.svg.setAttribute(
            "preserveAspectRatio",
            "none"
        );

        this.crearDefs();

        this.red.appendChild(
            this.svg
        );

    }


    /* ======================================================
       DEFINICIONES SVG
       ====================================================== */

    crearDefs() {

        const defs =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "defs"
            );


        /* ==================================================
           GRADIENTE DEL CRISTAL
           ================================================== */

        const cristal =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "linearGradient"
            );

        cristal.id =
            "nexusCristal";

        cristal.setAttribute(
            "x1",
            "0%"
        );

        cristal.setAttribute(
            "y1",
            "0%"
        );

        cristal.setAttribute(
            "x2",
            "0%"
        );

        cristal.setAttribute(
            "y2",
            "100%"
        );

        this.agregarStop(
            cristal,
            "0%",
            "#d9fbff",
            ".72"
        );

        this.agregarStop(
            cristal,
            "10%",
            "#64c5dd",
            ".42"
        );

        this.agregarStop(
            cristal,
            "27%",
            "#16495c",
            ".30"
        );

        this.agregarStop(
            cristal,
            "47%",
            "#071e2b",
            ".18"
        );

        this.agregarStop(
            cristal,
            "58%",
            "#65d9ef",
            ".30"
        );

        this.agregarStop(
            cristal,
            "78%",
            "#123b4a",
            ".40"
        );

        this.agregarStop(
            cristal,
            "94%",
            "#07131c",
            ".78"
        );

        this.agregarStop(
            cristal,
            "100%",
            "#c8f8ff",
            ".50"
        );

        defs.appendChild(
            cristal
        );


        /* ==================================================
           GRADIENTE DEL BORDE
           ================================================== */

        const borde =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "linearGradient"
            );

        borde.id =
            "nexusCristalBorde";

        borde.setAttribute(
            "x1",
            "0%"
        );

        borde.setAttribute(
            "y1",
            "0%"
        );

        borde.setAttribute(
            "x2",
            "0%"
        );

        borde.setAttribute(
            "y2",
            "100%"
        );

        this.agregarStop(
            borde,
            "0%",
            "#effeff",
            ".95"
        );

        this.agregarStop(
            borde,
            "14%",
            "#55cce8",
            ".82"
        );

        this.agregarStop(
            borde,
            "40%",
            "#0c718e",
            ".75"
        );

        this.agregarStop(
            borde,
            "55%",
            "#b8f5ff",
            ".92"
        );

        this.agregarStop(
            borde,
            "78%",
            "#17647c",
            ".78"
        );

        this.agregarStop(
            borde,
            "100%",
            "#d8fbff",
            ".90"
        );

        defs.appendChild(
            borde
        );


        /* ==================================================
           GRADIENTE DEL CABLE AZUL
           ================================================== */

        const cable =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "linearGradient"
            );

        cable.id =
            "nexusCable";

        cable.setAttribute(
            "x1",
            "0%"
        );

        cable.setAttribute(
            "y1",
            "0%"
        );

        cable.setAttribute(
            "x2",
            "100%"
        );

        cable.setAttribute(
            "y2",
            "0%"
        );

        this.agregarStop(
            cable,
            "0%",
            "#007ea3",
            ".75"
        );

        this.agregarStop(
            cable,
            "50%",
            "#75f3ff",
            "1"
        );

        this.agregarStop(
            cable,
            "100%",
            "#009cc5",
            ".75"
        );

        defs.appendChild(
            cable
        );


        /* ==================================================
           GRADIENTE DEL CABLE ROJO
           ================================================== */

        const cableRojo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "linearGradient"
            );

        cableRojo.id =
            "nexusCableRojo";

        cableRojo.setAttribute(
            "x1",
            "0%"
        );

        cableRojo.setAttribute(
            "x2",
            "100%"
        );

        this.agregarStop(
            cableRojo,
            "0%",
            "#6b101b",
            ".7"
        );

        this.agregarStop(
            cableRojo,
            "50%",
            "#ff405d",
            "1"
        );

        this.agregarStop(
            cableRojo,
            "100%",
            "#7f1423",
            ".7"
        );

        defs.appendChild(
            cableRojo
        );


        /* ==================================================
           GRADIENTE METÁLICO DE LOS CODOS
           ================================================== */

        const metal =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "radialGradient"
            );

        metal.id =
            "nexusMetal";

        metal.setAttribute(
            "cx",
            "35%"
        );

        metal.setAttribute(
            "cy",
            "30%"
        );

        metal.setAttribute(
            "r",
            "75%"
        );

        this.agregarStop(
            metal,
            "0%",
            "#effeff",
            "1"
        );

        this.agregarStop(
            metal,
            "18%",
            "#a9eaf5",
            ".95"
        );

        this.agregarStop(
            metal,
            "42%",
            "#33788b",
            ".95"
        );

        this.agregarStop(
            metal,
            "70%",
            "#092431",
            "1"
        );

        this.agregarStop(
            metal,
            "100%",
            "#02080d",
            "1"
        );

        defs.appendChild(
            metal
        );


        /* ==================================================
           GRADIENTE DEL CENTRO DEL CODO
           ================================================== */

        const nucleoCodo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "radialGradient"
            );

        nucleoCodo.id =
            "nexusCodoNucleo";

        this.agregarStop(
            nucleoCodo,
            "0%",
            "#efffff",
            "1"
        );

        this.agregarStop(
            nucleoCodo,
            "22%",
            "#66efff",
            "1"
        );

        this.agregarStop(
            nucleoCodo,
            "52%",
            "#087b9b",
            ".95"
        );

        this.agregarStop(
            nucleoCodo,
            "100%",
            "#031923",
            "1"
        );

        defs.appendChild(
            nucleoCodo
        );


        /* ==================================================
           GRADIENTE ACTIVO
           ================================================== */

        const activo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "linearGradient"
            );

        activo.id =
            "nexusTuboActivo";

        activo.setAttribute(
            "x1",
            "0%"
        );

        activo.setAttribute(
            "y1",
            "0%"
        );

        activo.setAttribute(
            "x2",
            "100%"
        );

        activo.setAttribute(
            "y2",
            "0%"
        );

        this.agregarStop(
            activo,
            "0%",
            "#168ba6",
            ".75"
        );

        this.agregarStop(
            activo,
            "40%",
            "#dfffff",
            "1"
        );

        this.agregarStop(
            activo,
            "65%",
            "#67e8f9",
            "1"
        );

        this.agregarStop(
            activo,
            "100%",
            "#0ea5c6",
            ".75"
        );

        defs.appendChild(
            activo
        );


        /* ==================================================
           FILTRO DE PROFUNDIDAD
           ================================================== */

        const sombra =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "filter"
            );

        sombra.id =
            "nexusTuboSombra";

        sombra.setAttribute(
            "x",
            "-30%"
        );

        sombra.setAttribute(
            "y",
            "-30%"
        );

        sombra.setAttribute(
            "width",
            "160%"
        );

        sombra.setAttribute(
            "height",
            "160%"
        );

        const blur =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "feGaussianBlur"
            );

        blur.setAttribute(
            "stdDeviation",
            "2.2"
        );

        blur.setAttribute(
            "result",
            "blur"
        );

        const offset =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "feOffset"
            );

        offset.setAttribute(
            "dx",
            "2"
        );

        offset.setAttribute(
            "dy",
            "3"
        );

        offset.setAttribute(
            "result",
            "offset"
        );

        const merge =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "feMerge"
            );

        const mergeNode1 =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "feMergeNode"
            );

        mergeNode1.setAttribute(
            "in",
            "offset"
        );

        const mergeNode2 =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "feMergeNode"
            );

        mergeNode2.setAttribute(
            "in",
            "SourceGraphic"
        );

        merge.appendChild(
            mergeNode1
        );

        merge.appendChild(
            mergeNode2
        );

        sombra.appendChild(
            blur
        );

        sombra.appendChild(
            offset
        );

        sombra.appendChild(
            merge
        );

        defs.appendChild(
            sombra
        );


        this.svg.appendChild(
            defs
        );

    }


    /* ======================================================
       AGREGAR STOP
       ====================================================== */

    agregarStop(
        gradiente,
        offset,
        color,
        opacity
    ) {

        const stop =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "stop"
            );

        stop.setAttribute(
            "offset",
            offset
        );

        stop.setAttribute(
            "stop-color",
            color
        );

        stop.setAttribute(
            "stop-opacity",
            opacity
        );

        gradiente.appendChild(
            stop
        );

    }


    /* ======================================================
       CREAR TUBOS
       ====================================================== */

    crearTubos() {

        this.tubos.clear();

        this.conectores.clear();

        CODIGOS.forEach(
            codigo => {

                const grupo =
                    this.crearGrupoTubo(
                        codigo
                    );

                this.tubos.set(
                    codigo,
                    grupo
                );

                const conector =
                    this.crearConector(
                        codigo
                    );

                this.conectores.set(
                    codigo,
                    conector
                );

            }
        );

    }


    /* ======================================================
       CREAR GRUPO DE TUBO
       ====================================================== */

    crearGrupoTubo(
        codigo
    ) {

        const grupo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g"
            );

        grupo.classList.add(
            "nexus-tubo-grupo"
        );

        grupo.dataset.codigo =
            codigo;


        /* ==================================================
           HALO
           ================================================== */

        const halo =
            this.crearPath(
                "nexus-tubo-halo"
            );


        /* ==================================================
           SOMBRA
           ================================================== */

        const sombra =
            this.crearPath(
                "nexus-tubo-sombra"
            );


        /* ==================================================
           CRISTAL EXTERIOR
           ================================================== */

        const cristal =
            this.crearPath(
                "nexus-tubo-cristal"
            );


        /* ==================================================
           BORDE
           ================================================== */

        const borde =
            this.crearPath(
                "nexus-tubo-borde"
            );


        /* ==================================================
           CABLE INTERNO AZUL
           ================================================== */

        const cableAzul =
            this.crearPath(
                "nexus-tubo-cable-azul"
            );


        /* ==================================================
           CABLE INTERNO ROJO
           ================================================== */

        const cableRojo =
            this.crearPath(
                "nexus-tubo-cable-rojo"
            );


        /* ==================================================
           NÚCLEO
           ================================================== */

        const nucleo =
            this.crearPath(
                "nexus-tubo-nucleo"
            );


        /* ==================================================
           REFLEJO SUPERIOR
           ================================================== */

        const reflejo =
            this.crearPath(
                "nexus-tubo-reflejo"
            );


        grupo.userData = {

            codigo,

            halo,

            sombra,

            cristal,

            borde,

            cableAzul,

            cableRojo,

            nucleo,

            reflejo,

            puntos: [],

            segmentos: {

                personajePunto1: null,

                punto1Punto2: null,

                punto2Punto3: null,

                punto3Punto4: null,

                punto4Nexus: null

            },

            codos: []

        };


        grupo.appendChild(
            halo
        );

        grupo.appendChild(
            sombra
        );

        grupo.appendChild(
            cristal
        );

        grupo.appendChild(
            borde
        );

        grupo.appendChild(
            cableAzul
        );

        grupo.appendChild(
            cableRojo
        );

        grupo.appendChild(
            nucleo
        );

        grupo.appendChild(
            reflejo
        );


        this.svg.appendChild(
            grupo
        );


        return grupo;

    }


    /* ======================================================
       CREAR PATH
       ====================================================== */

    crearPath(
        clase
    ) {

        const path =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );

        path.classList.add(
            clase
        );

        path.setAttribute(
            "fill",
            "none"
        );

        path.setAttribute(
            "stroke-linecap",
            "round"
        );

        path.setAttribute(
            "stroke-linejoin",
            "round"
        );

        return path;

    }


    /* ======================================================
       CREAR CONECTOR
       ====================================================== */

    crearConector(
        codigo
    ) {

        const grupo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g"
            );

        grupo.classList.add(
            "nexus-conector-grupo"
        );

        grupo.dataset.codigo =
            codigo;


        const sombra =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        sombra.classList.add(
            "nexus-conector-sombra"
        );


        const halo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        halo.classList.add(
            "nexus-conector-halo"
        );


        const cuerpo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        cuerpo.classList.add(
            "nexus-conector"
        );


        const aro =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        aro.classList.add(
            "nexus-conector-aro"
        );


        const nucleo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        nucleo.classList.add(
            "nexus-conector-nucleo"
        );


        grupo.appendChild(
            sombra
        );

        grupo.appendChild(
            halo
        );

        grupo.appendChild(
            cuerpo
        );

        grupo.appendChild(
            aro
        );

        grupo.appendChild(
            nucleo
        );


        this.svg.appendChild(
            grupo
        );


        return grupo;

    }


    /* ======================================================
       ACTUALIZAR
       ====================================================== */

    actualizar() {

        if (
            !this.red ||
            !this.svg
        ) {

            return;

        }

        const ancho =
            this.red.clientWidth;

        const alto =
            this.red.clientHeight;

        if (
            ancho <= 0 ||
            alto <= 0
        ) {

            return;

        }

        this.svg.setAttribute(
            "viewBox",
            `0 0 ${ancho} ${alto}`
        );

        this.svg.setAttribute(
            "width",
            ancho
        );

        this.svg.setAttribute(
            "height",
            alto
        );

        this.ajustarAHexagonos();

    }


    /* ======================================================
       AJUSTAR A PERSONAJES Y NEXUS
       ====================================================== */

    ajustarAHexagonos() {

        const rectRed =
            this.red.getBoundingClientRect();

        if (
            rectRed.width <= 0 ||
            rectRed.height <= 0
        ) {

            return;

        }


        const nucleo =
            this.tablero.querySelector(
                ".nexus-nucleo-centro"
            );

        if (!nucleo) {

            return;

        }


        const rectNucleo =
            nucleo.getBoundingClientRect();

        if (
            rectNucleo.width <= 0 ||
            rectNucleo.height <= 0
        ) {

            return;

        }


        const destinoX =
            rectNucleo.left -
            rectRed.left +
            rectNucleo.width / 2;

        const destinoY =
            rectNucleo.top -
            rectRed.top +
            rectNucleo.height / 2;


        this.tubos.forEach(
            (tubo, codigo) => {

                const agente =
                    this.tablero.querySelector(
                        `.tablero-agente[data-agente="${codigo}"]`
                    );

                if (!agente) {

                    return;

                }


                const origenElemento =
                    agente.querySelector(
                        ".tablero-agente-base"
                    ) ||
                    agente.querySelector(
                        ".tablero-agente-centro"
                    );

                if (!origenElemento) {

                    return;

                }


                const rect =
                    origenElemento.getBoundingClientRect();


                const origenX =
                    rect.left -
                    rectRed.left +
                    rect.width / 2;

                const origenY =
                    rect.top -
                    rectRed.top +
                    rect.height / 2;


                const config =
                    CONFIGURACION_TUBOS[codigo];

                if (!config) {

                    return;

                }


                this.reposicionarTubo(

                    tubo,

                    origenX,
                    origenY,

                    destinoX,
                    destinoY,

                    config

                );


                this.posicionarConector(

                    codigo,

                    origenX,
                    origenY

                );

            }
        );

    }


    /* ======================================================
       POSICIONAR CONECTOR
       ====================================================== */

    posicionarConector(
        codigo,
        x,
        y
    ) {

        const conector =
            this.conectores.get(
                codigo
            );

        if (!conector) {

            return;

        }

        conector.setAttribute(
            "transform",
            `translate(${x} ${y})`
        );

    }


    /* ======================================================
       REPOSICIONAR TUBO
       ====================================================== */

    reposicionarTubo(

        tubo,

        x1,
        y1,

        x2,
        y2,

        config

    ) {

        const punto1 = {

            x:
                x1 +
                (config.punto1X || 0),

            y:
                y1 +
                (config.punto1Y || 0)

        };


        const punto2 = {

            x:
                x1 +
                (config.punto2X || 0),

            y:
                y1 +
                (config.punto2Y || 0)

        };


        const punto3 = {

            x:
                x1 +
                (config.punto3X || 0),

            y:
                y1 +
                (config.punto3Y || 0)

        };


        const punto4 = {

            x:
                x1 +
                (config.punto4X || 0),

            y:
                y1 +
                (config.punto4Y || 0)

        };


        const puntos = [

            {
                x: x1,
                y: y1
            },

            punto1,

            punto2,

            punto3,

            punto4,

            {
                x: x2,
                y: y2
            }

        ];


        tubo.userData.puntos =
            puntos;


        const d =
            this.crearPathData(
                puntos
            );


        tubo.userData.halo.setAttribute(
            "d",
            d
        );

        tubo.userData.sombra.setAttribute(
            "d",
            d
        );

        tubo.userData.cristal.setAttribute(
            "d",
            d
        );

        tubo.userData.borde.setAttribute(
            "d",
            d
        );


        /*
         * Cableado interno.
         *
         * Se utilizan pequeños desplazamientos
         * para que los cables parezcan estar
         * dentro del cristal.
         */

        tubo.userData.cableAzul.setAttribute(
            "d",
            this.crearPathDesplazado(
                puntos,
                -2.2,
                1
            )
        );


        tubo.userData.cableRojo.setAttribute(
            "d",
            this.crearPathDesplazado(
                puntos,
                2,
                -1
            )
        );


        tubo.userData.nucleo.setAttribute(
            "d",
            this.crearPathDesplazado(
                puntos,
                0,
                0
            )
        );


        tubo.userData.reflejo.setAttribute(
            "d",
            this.crearPathDesplazado(
                puntos,
                -4,
                -2
            )
        );


        tubo.userData.segmentos =
            this.crearReferenciasSegmentos(
                puntos
            );


        this.crearCodos(
            tubo,
            puntos
        );

    }


    /* ======================================================
       PATH DESPLAZADO
       ====================================================== */

    crearPathDesplazado(
        puntos,
        offsetX,
        offsetY
    ) {

        if (
            !puntos ||
            !puntos.length
        ) {

            return "";

        }


        let d =
            `M ${puntos[0].x + offsetX} ${puntos[0].y + offsetY}`;


        for (
            let i = 1;
            i < puntos.length;
            i++
        ) {

            d +=
                ` L ${puntos[i].x + offsetX} ${puntos[i].y + offsetY}`;

        }


        return d;

    }


    /* ======================================================
       PATH
       ====================================================== */

    crearPathData(
        puntos
    ) {

        if (
            !puntos ||
            !puntos.length
        ) {

            return "";

        }


        let d =
            `M ${puntos[0].x} ${puntos[0].y}`;


        for (
            let i = 1;
            i < puntos.length;
            i++
        ) {

            d +=
                ` L ${puntos[i].x} ${puntos[i].y}`;

        }


        return d;

    }


    /* ======================================================
       CREAR CODOS 3D
       ====================================================== */

    crearCodos(
        tubo,
        puntos
    ) {

        tubo.userData.codos.forEach(
            codo => codo.remove()
        );

        tubo.userData.codos = [];


        /*
         * Los puntos 1-4 son los puntos de quiebre.
         *
         * No se dibuja un codo cuando dos segmentos
         * están realmente alineados.
         */

        for (
            let i = 1;
            i < puntos.length - 1;
            i++
        ) {

            const anterior =
                puntos[i - 1];

            const actual =
                puntos[i];

            const siguiente =
                puntos[i + 1];


            const dx1 =
                actual.x -
                anterior.x;

            const dy1 =
                actual.y -
                anterior.y;

            const dx2 =
                siguiente.x -
                actual.x;

            const dy2 =
                siguiente.y -
                actual.y;


            const horizontal1 =
                Math.abs(dx1) >
                Math.abs(dy1);

            const horizontal2 =
                Math.abs(dx2) >
                Math.abs(dy2);


            /*
             * Si ambos segmentos tienen la misma
             * orientación no existe codo.
             */

            if (
                horizontal1 === horizontal2
            ) {

                continue;

            }


            const codo =
                this.crearCodo3D(
                    actual
                );


            tubo.appendChild(
                codo
            );


            tubo.userData.codos.push(
                codo
            );

        }

    }


    /* ======================================================
       CREAR CODO 3D
       ====================================================== */

    crearCodo3D(
        punto
    ) {

        const grupo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g"
            );

        grupo.classList.add(
            "nexus-codo-3d"
        );


        grupo.setAttribute(
            "transform",
            `translate(${punto.x} ${punto.y})`
        );


        /*
         * Sombra.
         */

        const sombra =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        sombra.classList.add(
            "nexus-codo-sombra"
        );


        /*
         * Halo cristalino.
         */

        const halo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        halo.classList.add(
            "nexus-codo-halo"
        );


        /*
         * Cuerpo metálico.
         */

        const cuerpo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        cuerpo.classList.add(
            "nexus-codo-cuerpo"
        );


        /*
         * Aro exterior.
         */

        const aro =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        aro.classList.add(
            "nexus-codo-aro"
        );


        /*
         * Núcleo interno.
         */

        const nucleo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
            );

        nucleo.classList.add(
            "nexus-codo-nucleo"
        );


        /*
         * Reflejo.
         */

        const reflejo =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "ellipse"
            );

        reflejo.classList.add(
            "nexus-codo-reflejo"
        );


        grupo.appendChild(
            sombra
        );

        grupo.appendChild(
            halo
        );

        grupo.appendChild(
            cuerpo
        );

        grupo.appendChild(
            aro
        );

        grupo.appendChild(
            nucleo
        );

        grupo.appendChild(
            reflejo
        );


        return grupo;

    }


    /* ======================================================
       REFERENCIAS DE SEGMENTOS
       ====================================================== */

    crearReferenciasSegmentos(
        puntos
    ) {

        const nombres = [

            "personajePunto1",

            "punto1Punto2",

            "punto2Punto3",

            "punto3Punto4",

            "punto4Nexus"

        ];


        const segmentos = {};


        for (
            let i = 0;
            i < nombres.length;
            i++
        ) {

            segmentos[nombres[i]] = {

                desde:
                    puntos[i],

                hasta:
                    puntos[i + 1]

            };

        }


        return segmentos;

    }


    /* ======================================================
       ACTIVAR
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

    }


    /* ======================================================
       DESACTIVAR
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


        if (tubo) {

            tubo.classList.remove(
                "tubo-activo"
            );

        }


        if (conector) {

            conector.classList.remove(
                "conector-activo"
            );

        }

    }


    /* ======================================================
       ACTIVAR RED COMPLETA
       ====================================================== */

    activarRed() {

        if (this.red) {

            this.red.classList.add(
                "red-activa"
            );

        }

    }


    /* ======================================================
       DESACTIVAR RED COMPLETA
       ====================================================== */

    desactivarRed() {

        if (this.red) {

            this.red.classList.remove(
                "red-activa"
            );

        }

    }


    /* ======================================================
       DESTRUIR
       ====================================================== */

    destruir() {

        if (
            this.resizeObserver
        ) {

            this.resizeObserver.disconnect();

            this.resizeObserver =
                null;

        }


        if (
            this.resizeHandler
        ) {

            window.removeEventListener(
                "resize",
                this.resizeHandler
            );

            this.resizeHandler =
                null;

        }


        this.tubos.clear();

        this.conectores.clear();


        if (this.svg) {

            this.svg.remove();

            this.svg =
                null;

        }

    }

}