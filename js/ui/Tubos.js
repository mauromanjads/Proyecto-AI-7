/**
 * ==========================================================
 * AI-7
 * Archivo: Tubos.js
 * ----------------------------------------------------------
 * RED NEXUS
 *
 * Tubos 3D mediante Three.js.
 *
 * CADA PERSONAJE TIENE SU PROPIO TUBO.
 *
 * CADA TUBO TIENE 4 PUNTOS DE QUIEBRE MANUALES.
 *
 * ESTRUCTURA:
 *
 * PERSONAJE
 *     │
 *     ▼
 * PUNTO 1
 *     │
 *     ▼
 * PUNTO 2
 *     │
 *     ▼
 * PUNTO 3
 *     │
 *     ▼
 * PUNTO 4
 *     │
 *     ▼
 * NEXUS
 *
 * ==========================================================
 *
 * CONFIGURACIÓN MANUAL
 *
 * TODO EL POSICIONAMIENTO DE LOS TUBOS SE CONTROLA DESDE:
 *
 *     CONFIGURACION_TUBOS
 *
 * Cada personaje tiene:
 *
 *     punto1X
 *     punto1Y
 *
 *     punto2X
 *     punto2Y
 *
 *     punto3X
 *     punto3Y
 *
 *     punto4X
 *     punto4Y
 *
 * ==========================================================
 *
 * IMPORTANTE:
 *
 * Los puntos son relativos al personaje.
 *
 * X positivo = derecha
 * X negativo = izquierda
 *
 * Y positivo = abajo
 * Y negativo = arriba
 *
 * El NEXUS siempre es el destino final.
 *
 * ==========================================================
 */

import * as THREE from "three";


/* ==========================================================
   CONFIGURACIÓN MANUAL DE LOS TUBOS
   ==========================================================

   CADA PERSONAJE ES INDEPENDIENTE.

   Puedes modificar TODOS los puntos manualmente.

   ----------------------------------------------------------

   EJEMPLO:

   punto1X: 100
   punto1Y: 50

   significa:

   100 px a la derecha
   50 px hacia abajo

   ----------------------------------------------------------

   Si quieres subirlo:

   punto1Y: -50

   ----------------------------------------------------------

   Si quieres moverlo a la izquierda:

   punto1X: -100

   ========================================================== */

const CONFIGURACION_TUBOS = {


    /* ======================================================
       AI-01
       ====================================================== */

    "AI-01": {

        punto1X: -100,
        punto1Y: 0,

        punto2X: -100,
        punto2Y: 405,

        punto3X: 790,
        punto3Y: 405,

        punto4X:790,
        punto4Y: 200

    },


    /* ======================================================
       AI-02
       ====================================================== */

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


    /* ======================================================
       AI-03
       ====================================================== */

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


    /* ======================================================
       AI-04
       ====================================================== */

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


    /* ======================================================
       AI-05
       ====================================================== */

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


    /* ======================================================
       AI-06
       ====================================================== */

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


    /* ======================================================
       AI-07
       ====================================================== */

    "AI-07": {

        punto1X: 140,
        punto1Y: 0,

        punto2X: 140,
        punto2Y: 0,

        punto3X: 140,
        punto3Y: -80,

        punto4X: 140,
        punto4Y: -80

    }

};


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

        this.scene = null;

        this.camera = null;

        this.renderer = null;

        this.tubos = new Map();

        this.conectores = new Map();

        this.resizeHandler = null;

        this.animacion = null;

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


        this.crearEscena();


        this.resizeHandler =
            () => this.actualizar();


        window.addEventListener(
            "resize",
            this.resizeHandler
        );


        requestAnimationFrame(
            () => {

                this.actualizar();

            }
        );


        this.animar();

    }


    /* ======================================================
       ESCENA THREE.JS
       ====================================================== */

    crearEscena() {

        this.red.innerHTML = "";


        this.scene =
            new THREE.Scene();


        /* ==================================================
           CÁMARA
           ================================================== */

        this.camera =
            new THREE.OrthographicCamera(
                -600,
                600,
                350,
                -350,
                0.1,
                2000
            );


        this.camera.position.set(
            0,
            0,
            1000
        );


        this.camera.lookAt(
            0,
            0,
            0
        );


        /* ==================================================
           RENDERER
           ================================================== */

        this.renderer =
            new THREE.WebGLRenderer({

                alpha: true,

                antialias: true,

                powerPreference:
                    "high-performance"

            });


        this.renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio || 1,
                2
            )
        );


        this.renderer.setClearColor(
            0x000000,
            0
        );


        this.red.appendChild(
            this.renderer.domElement
        );


        this.renderer.domElement.style.position =
            "absolute";


        this.renderer.domElement.style.inset =
            "0";


        this.renderer.domElement.style.width =
            "100%";


        this.renderer.domElement.style.height =
            "100%";


        this.renderer.domElement.style.display =
            "block";


        /*
         * Three.js solamente dibuja.
         *
         * Los elementos HTML continúan
         * recibiendo los clics.
         */

        this.renderer.domElement.style.pointerEvents =
            "none";


        /* ==================================================
           LUCES
           ================================================== */

        const ambiente =
            new THREE.AmbientLight(
                0xffffff,
                1.5
            );


        this.scene.add(
            ambiente
        );


        const luz =
            new THREE.DirectionalLight(
                0xffffff,
                2.5
            );


        luz.position.set(
            -300,
            500,
            800
        );


        this.scene.add(
            luz
        );


        const luzRelleno =
            new THREE.DirectionalLight(
                0xff5555,
                0.8
            );


        luzRelleno.position.set(
            400,
            -300,
            500
        );


        this.scene.add(
            luzRelleno
        );


        this.crearTubos3D();

    }


    /* ======================================================
       CREAR TUBOS
       ====================================================== */

    crearTubos3D() {

        this.tubos.clear();

        this.conectores.clear();


        const codigos = [

            "AI-01",
            "AI-02",
            "AI-03",
            "AI-04",
            "AI-05",
            "AI-06",
            "AI-07"

        ];


        codigos.forEach(
            codigo => {

                const tubo =
                    this.crearTubo();


                tubo.userData.codigo =
                    codigo;


                tubo.userData.radio =
                    6;


                /*
                 * Guardar configuración
                 * específica del personaje.
                 */

                tubo.userData.configuracion =
                    CONFIGURACION_TUBOS[codigo];


                /*
                 * Los cinco segmentos:
                 *
                 * 1. personaje → punto1
                 * 2. punto1 → punto2
                 * 3. punto2 → punto3
                 * 4. punto3 → punto4
                 * 5. punto4 → nexus
                 */

                tubo.userData.segmentos = {

                    personajePunto1: null,

                    punto1Punto2: null,

                    punto2Punto3: null,

                    punto3Punto4: null,

                    punto4Nexus: null

                };


                this.tubos.set(
                    codigo,
                    tubo
                );


                /*
                 * Conector del personaje.
                 */

                const conector =
                    this.crearConector(
                        0,
                        0
                    );


                conector.userData.codigo =
                    codigo;


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

    crearTubo() {

        const material =
            new THREE.MeshStandardMaterial({

                color:
                    0x4dd9ff,

                emissive:
                    0x09364a,

                emissiveIntensity:
                    1.1,

                metalness:
                    0.92,

                roughness:
                    0.18,

                transparent:
                    true,

                opacity:
                    0.82

            });


        const tubo =
            new THREE.Group();


        tubo.userData.material =
            material;


        /*
         * Colocar detrás de los personajes.
         */

        tubo.position.z =
            -999;


        this.scene.add(
            tubo
        );


        return tubo;

    }


    /* ======================================================
       CREAR CONECTOR
       ====================================================== */

    crearConector(
        x,
        y
    ) {

        const geometria =
            new THREE.SphereGeometry(
                10,
                20,
                20
            );


        const material =
            new THREE.MeshStandardMaterial({

                color:
                    0x7ce8ff,

                metalness:
                    0.95,

                roughness:
                    0.14,

                emissive:
                    0x0a516d,

                emissiveIntensity:
                    0.55

            });


        const conector =
            new THREE.Mesh(
                geometria,
                material
            );


        const posicion =
            this.convertirCoordenada(
                x,
                y
            );


        conector.position.copy(
            posicion
        );


        this.scene.add(
            conector
        );


        return conector;

    }


    /* ======================================================
       CONVERTIR COORDENADAS
       ====================================================== */

    convertirCoordenada(
        x,
        y
    ) {

        const ancho =
            this.red?.clientWidth ||
            1200;


        const alto =
            this.red?.clientHeight ||
            700;


        return new THREE.Vector3(

            x - ancho / 2,

            alto / 2 - y,

            0

        );

    }


    /* ======================================================
       RESPONSIVE
       ====================================================== */

    actualizar() {

        if (
            !this.renderer ||
            !this.red ||
            !this.camera
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


        this.renderer.setSize(
            ancho,
            alto,
            false
        );


        this.camera.left =
            -ancho / 2;


        this.camera.right =
            ancho / 2;


        this.camera.top =
            alto / 2;


        this.camera.bottom =
            -alto / 2;


        this.camera.updateProjectionMatrix();


        this.ajustarAHexagonos();

    }


    /* ======================================================
       PEGAR TUBOS A PERSONAJES
       ====================================================== */

    ajustarAHexagonos() {

        if (!this.tablero) {

            return;

        }


        const rectRed =
            this.red.getBoundingClientRect();


        if (
            rectRed.width <= 0 ||
            rectRed.height <= 0
        ) {

            return;

        }


        /* ==================================================
           NEXUS
           ================================================== */

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


        /*
         * Centro del NEXUS.
         */

        const destinoX =
            rectNucleo.left -
            rectRed.left +
            rectNucleo.width / 2;


        const destinoY =
            rectNucleo.top -
            rectRed.top +
            rectNucleo.height / 2;


        /* ==================================================
           PROCESAR CADA PERSONAJE
           ================================================== */

        this.tubos.forEach(
            (tubo, codigo) => {

                const agente =
                    this.tablero.querySelector(
                        `.tablero-agente[data-agente="${codigo}"]`
                    );


                if (!agente) {

                    return;

                }


                /*
                 * Buscar base del personaje.
                 */

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


                /*
                 * Centro del personaje.
                 */

                const origenX =
                    rect.left -
                    rectRed.left +
                    rect.width / 2;


                const origenY =
                    rect.top -
                    rectRed.top +
                    rect.height / 2;


                /*
                 * Configuración del personaje.
                 */

                const config =
                    tubo.userData.configuracion;


                if (!config) {

                    return;

                }


                /*
                 * Construir la ruta.
                 */

                this.reposicionarTubo(

                    tubo,

                    origenX,
                    origenY,

                    destinoX,
                    destinoY,

                    config

                );


                /*
                 * Conector del personaje.
                 */

                const conector =
                    this.conectores.get(
                        codigo
                    );


                if (conector) {

                    conector.position.copy(

                        this.convertirCoordenada(

                            origenX,

                            origenY

                        )

                    );

                }

            }
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

        /*
         * ==================================================
         * PUNTO INICIAL
         *
         * CENTRO DEL PERSONAJE
         * ==================================================
         */

        const inicio =
            this.convertirCoordenada(
                x1,
                y1
            );


        /*
         * ==================================================
         * PUNTO FINAL
         *
         * CENTRO DEL NEXUS
         * ==================================================
         */

        const fin =
            this.convertirCoordenada(
                x2,
                y2
            );


        const radio =
            tubo.userData.radio || 6;


        /* ==================================================
           PUNTO 1
           ================================================== */

        const punto1 =
            new THREE.Vector3(

                inicio.x +
                (config.punto1X || 0),

                inicio.y -
                (config.punto1Y || 0),

                0

            );


        /* ==================================================
           PUNTO 2
           ================================================== */

        const punto2 =
            new THREE.Vector3(

                inicio.x +
                (config.punto2X || 0),

                inicio.y -
                (config.punto2Y || 0),

                0

            );


        /* ==================================================
           PUNTO 3
           ================================================== */

        const punto3 =
            new THREE.Vector3(

                inicio.x +
                (config.punto3X || 0),

                inicio.y -
                (config.punto3Y || 0),

                0

            );


        /* ==================================================
           PUNTO 4
           ================================================== */

        const punto4 =
            new THREE.Vector3(

                inicio.x +
                (config.punto4X || 0),

                inicio.y -
                (config.punto4Y || 0),

                0

            );


        /* ==================================================
           LIMPIAR TUBO
           ================================================== */

        tubo.clear();


        tubo.userData.segmentos = {

            personajePunto1: null,

            punto1Punto2: null,

            punto2Punto3: null,

            punto3Punto4: null,

            punto4Nexus: null

        };


        /* ==================================================
           TRAMO 1
           
           PERSONAJE → PUNTO 1
           ================================================== */

        const tramo1 =
            this.crearSegmentoTubo(

                inicio,

                punto1,

                radio

            );


        tramo1.userData.codigo =
            tubo.userData.codigo;


        tramo1.userData.tipo =
            "personaje-punto1";


        tubo.userData.segmentos.personajePunto1 =
            tramo1;


        tubo.add(
            tramo1
        );


        /* ==================================================
           TRAMO 2
           
           PUNTO 1 → PUNTO 2
           ================================================== */

        const tramo2 =
            this.crearSegmentoTubo(

                punto1,

                punto2,

                radio

            );


        tramo2.userData.codigo =
            tubo.userData.codigo;


        tramo2.userData.tipo =
            "punto1-punto2";


        tubo.userData.segmentos.punto1Punto2 =
            tramo2;


        tubo.add(
            tramo2
        );


        /* ==================================================
           TRAMO 3
           
           PUNTO 2 → PUNTO 3
           ================================================== */

        const tramo3 =
            this.crearSegmentoTubo(

                punto2,

                punto3,

                radio

            );


        tramo3.userData.codigo =
            tubo.userData.codigo;


        tramo3.userData.tipo =
            "punto2-punto3";


        tubo.userData.segmentos.punto2Punto3 =
            tramo3;


        tubo.add(
            tramo3
        );


        /* ==================================================
           TRAMO 4
           
           PUNTO 3 → PUNTO 4
           ================================================== */

        const tramo4 =
            this.crearSegmentoTubo(

                punto3,

                punto4,

                radio

            );


        tramo4.userData.codigo =
            tubo.userData.codigo;


        tramo4.userData.tipo =
            "punto3-punto4";


        tubo.userData.segmentos.punto3Punto4 =
            tramo4;


        tubo.add(
            tramo4
        );


        /* ==================================================
           TRAMO 5
           
           PUNTO 4 → NEXUS
           ================================================== */

        const tramo5 =
            this.crearSegmentoTubo(

                punto4,

                fin,

                radio

            );


        tramo5.userData.codigo =
            tubo.userData.codigo;


        tramo5.userData.tipo =
            "punto4-nexus";


        tubo.userData.segmentos.punto4Nexus =
            tramo5;


        tubo.add(
            tramo5
        );

    }


    /* ======================================================
       CREAR SEGMENTO DE TUBO
       ====================================================== */

    crearSegmentoTubo(

        desde,

        hasta,

        radio

    ) {

        const delta =
            new THREE.Vector3(

                hasta.x - desde.x,

                hasta.y - desde.y,

                0

            );


        const longitud =
            Math.max(
                delta.length(),
                1
            );


        /*
         * Cilindro.
         */

        const geometria =
            new THREE.CylinderGeometry(

                radio,

                radio,

                longitud,

                18,

                1,

                false

            );


        /*
         * Material.
         */

        const material =
            new THREE.MeshStandardMaterial({

                color:
                    0x4dd9ff,

                emissive:
                    0x09364a,

                emissiveIntensity:
                    1.1,

                metalness:
                    0.92,

                roughness:
                    0.18,

                transparent:
                    true,

                opacity:
                    0.82

            });


        /*
         * Crear segmento.
         */

        const segmento =
            new THREE.Mesh(

                geometria,

                material

            );


        /*
         * Posición.
         */

        segmento.position.set(

            (desde.x + hasta.x) / 2,

            (desde.y + hasta.y) / 2,

            0

        );


        /*
         * Dirección.
         */

        const direccion =
            delta
                .clone()
                .normalize();


        /*
         * Rotación del cilindro.
         */

        const quaternion =
            new THREE.Quaternion()
                .setFromUnitVectors(

                    new THREE.Vector3(
                        0,
                        1,
                        0
                    ),

                    direccion

                );


        segmento.quaternion.copy(
            quaternion
        );


        return segmento;

    }


    /* ======================================================
       ANIMACIÓN
       ====================================================== */

    animar() {

        this.animacion =
            requestAnimationFrame(
                () => this.animar()
            );


        if (
            !this.renderer ||
            !this.scene ||
            !this.camera
        ) {

            return;

        }


        this.renderer.render(

            this.scene,

            this.camera

        );

    }


    /* ======================================================
       ACTIVAR TUBO
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


        /*
         * Activar solamente
         * el tubo seleccionado.
         */

        if (tubo) {

            const segmentos =
                tubo.userData.segmentos;


            Object.values(
                segmentos
            ).forEach(
                segmento => {

                    if (!segmento) {

                        return;

                    }


                    segmento.material.color.set(
                        0xff2020
                    );


                    segmento.material.opacity =
                        1;

                }
            );

        }


        /*
         * Activar conector.
         */

        if (conector) {

            conector.material.color.set(
                0xff4444
            );


            conector.material.emissive.set(
                0xcc0000
            );


            conector.material.emissiveIntensity =
                2;

        }

    }


    /* ======================================================
       DESACTIVAR TUBO
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


        /*
         * Restaurar tubo.
         */

        if (tubo) {

            const segmentos =
                tubo.userData.segmentos;


            Object.values(
                segmentos
            ).forEach(
                segmento => {

                    if (!segmento) {

                        return;

                    }


                    segmento.material.color.set(
                        0x4dd9ff
                    );


                    segmento.material.opacity =
                        0.82;

                }
            );

        }


        /*
         * Restaurar conector.
         */

        if (conector) {

            conector.material.color.set(
                0xb91c1c
            );


            conector.material.emissive.set(
                0x330000
            );


            conector.material.emissiveIntensity =
                0.4;

        }

    }

}