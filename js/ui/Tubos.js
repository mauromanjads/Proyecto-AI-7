/**
 * ==========================================================
 * AI-7
 * Archivo: Tubos.js
 * ----------------------------------------------------------
 * RED NEXUS
 *
 * Tubos 3D mediante Three.js.
 *
 * - Tubos cilíndricos reales.
 * - Pegados a los hexágonos.
 * - Tubo madre horizontal.
 * - Conectores 3D.
 * - Torre NEXUS independiente.
 * - Activación por agente.
 * - Responsive escritorio / tablet / móvil.
 * ==========================================================
 */

import * as THREE from "three";

export default class Tubos {

    constructor(tablero, agentes) {

        this.tablero = tablero;
        this.agentes = agentes;

        this.red = null;

        this.scene = null;
        this.camera = null;
        this.renderer = null;

        this.tubos = new Map();
        this.conectores = new Map();

        this.tuboMadre = null;

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

        requestAnimationFrame(() => {

            this.actualizar();

        });

        this.animar();

    }


    /* ======================================================
       ESCENA THREE.JS
       ====================================================== */

    crearEscena() {

        this.red.innerHTML = "";

        this.scene =
            new THREE.Scene();


        /*
         * IMPORTANTE:
         *
         * La cámara mantiene SIEMPRE el mismo
         * sistema lógico de coordenadas:
         *
         * 1200 x 700
         *
         * No hacemos escala de la cámara
         * según el tamaño del celular.
         *
         * El renderer se adapta al tamaño real.
         */

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


        /*
         * El canvas ocupa exactamente
         * el espacio de .nexus-red.
         */

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


        /*
         * Segunda luz suave.
         *
         * Ayuda especialmente en móviles
         * donde el tubo rojo puede perder
         * volumen dependiendo del ángulo.
         */

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

        const lanes = {
            "AI-01": -140,
            "AI-02": -85,
            "AI-03": -20,
            "AI-04": 70,
            "AI-05": -120,
            "AI-06": -45,
            "AI-07": 35
        };

        codigos.forEach(
            (codigo) => {

                const tubo =
                    this.crearTubo(
                        0,
                        0,
                        0,
                        0,
                        6
                    );

                tubo.userData.codigo =
                    codigo;

                tubo.userData.radio =
                    6;

                tubo.userData.lane =
                    lanes[codigo] || 0;

                this.tubos.set(
                    codigo,
                    tubo
                );

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
       CREAR CILINDRO
       ====================================================== */

    crearTubo(
        x1,
        y1,
        x2,
        y2,
        radio
    ) {

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

        tubo.userData.radio =
            radio;

        tubo.userData.material =
            material;

        tubo.userData.segmentos = [];

        tubo.position.z =
            -40;

        this.scene.add(
            tubo
        );

        return tubo;

    }


    /* ======================================================
       CONECTOR
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


        /*
         * El renderer sí se adapta
         * al tamaño real del dispositivo.
         */

        this.renderer.setSize(
            ancho,
            alto,
            false
        );


        /*
         * LA CÁMARA NO SE ESCALA.
         *
         * Esto es lo importante para móvil.
         *
         * Siempre vemos el mismo espacio
         * lógico de 1200 x 700.
         */

        this.camera.left =
            -ancho / 2;

        this.camera.right =
            ancho / 2;

        this.camera.top =
            alto / 2;

        this.camera.bottom =
            -alto / 2;


        this.camera.updateProjectionMatrix();


        /*
         * Volvemos a buscar los hexágonos
         * reales.
         */

        this.ajustarAHexagonos();

    }


    /* ======================================================
       PEGAR TUBOS A HEXÁGONOS
       ====================================================== */

    ajustarAHexagonos() {

        if (!this.tablero) {

            return;

        }

        const rectTablero =
            this.tablero.getBoundingClientRect();

        if (
            rectTablero.width <= 0 ||
            rectTablero.height <= 0
        ) {

            return;

        }

        const rectRed =
            this.red.getBoundingClientRect();

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

                this.reposicionarTubo(
                    tubo,
                    origenX,
                    origenY,
                    destinoX,
                    destinoY,
                    tubo.userData.lane || 0
                );

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
        lane = 0
    ) {

        const inicio =
            this.convertirCoordenada(
                x1,
                y1
            );

        const fin =
            this.convertirCoordenada(
                x2,
                y2
            );

        const radio =
            tubo.userData.radio || 6;

        const corridorX =
            Math.max(
                inicio.x + 140,
                fin.x - 120
            ) +
            lane * 0.35;

        const puntoA =
            new THREE.Vector3(
                corridorX,
                inicio.y,
                0
            );

        const puntoB =
            new THREE.Vector3(
                corridorX,
                fin.y,
                0
            );

        const ruta = [
            inicio,
            puntoA,
            puntoB,
            fin
        ];

        tubo.clear();
        tubo.userData.segmentos = [];

        for (
            let indice = 0;
            indice < ruta.length - 1;
            indice++
        ) {

            const desde =
                ruta[indice];

            const hasta =
                ruta[indice + 1];

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

            const geometria =
                new THREE.CylinderGeometry(
                    radio,
                    radio,
                    longitud,
                    18,
                    1,
                    false
                );

            const segmento =
                new THREE.Mesh(
                    geometria,
                    tubo.userData.material
                );

            segmento.position.z =
                indice * -0.2;

            tubo.userData.segmentos.push(
                segmento
            );

            const centro =
                new THREE.Vector3(
                    (desde.x + hasta.x) / 2,
                    (desde.y + hasta.y) / 2,
                    0
                );

            segmento.position.copy(
                centro
            );

            const direccion =
                delta.clone().normalize();

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

            tubo.add(
                segmento
            );

        }

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


        /*
         * TUBO ACTIVO
         */

        if (tubo) {

            const segmentos =
                tubo.userData.segmentos ||
                tubo.children;

            segmentos.forEach(
                segmento => {

                    segmento.material.color.set(
                        0xff2020
                    );

                    segmento.material.opacity =
                        1;

                }
            );

        }


        /*
         * CONECTOR ACTIVO
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


        /*
         * TUBO MADRE ACTIVO
         */

        if (this.tuboMadre) {

            this.tuboMadre.material.color.set(
                0xff2020
            );

            this.tuboMadre.material.emissive.set(
                0x990000
            );

            this.tuboMadre.material.emissiveIntensity =
                1.6;

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

            const segmentos =
                tubo.userData.segmentos ||
                tubo.children;

            segmentos.forEach(
                segmento => {

                    segmento.material.color.set(
                        0x4dd9ff
                    );

                    segmento.material.opacity =
                        0.82;

                }
            );

        }


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


        const quedanActivos =
            [...this.tubos.values()]
                .some(
                    elemento => {

                        const segmentos =
                            elemento.userData
                                .segmentos ||
                            elemento.children;

                        return segmentos.some(
                            segmento =>
                                segmento.material
                                    .emissiveIntensity > 1
                        );

                    }
                );


        if (
            !quedanActivos &&
            this.tuboMadre
        ) {

            this.tuboMadre.material.color.set(
                0x7f1d1d
            );

            this.tuboMadre.material.emissive.set(
                0x240000
            );

            this.tuboMadre.material.emissiveIntensity =
                0.35;

        }

    }

}