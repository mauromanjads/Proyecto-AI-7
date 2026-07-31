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

        this.actualizar();

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


        /* ==================================================
           TUBO MADRE
           ================================================== */

        this.tuboMadre =
            this.crearTubo(
                125,
                350,
                980,
                350,
                18
            );


        this.tuboMadre.userData.radio =
            18;


        /* ==================================================
           POSICIONES LÓGICAS
           ================================================== */

        const posiciones = {

            "AI-01": {
                x: 125,
                y: 125
            },

            "AI-02": {
                x: 329,
                y: 125
            },

            "AI-03": {
                x: 533,
                y: 125
            },

            "AI-04": {
                x: 737,
                y: 125
            },

            "AI-05": {
                x: 329,
                y: 575
            },

            "AI-06": {
                x: 533,
                y: 575
            },

            "AI-07": {
                x: 737,
                y: 575
            }

        };


        Object.entries(
            posiciones
        ).forEach(
            ([codigo, posicion]) => {

                const arriba =
                    posicion.y < 350;


                const tubo =
                    this.crearTubo(
                        posicion.x,
                        posicion.y,
                        posicion.x,
                        350,
                        14
                    );


                tubo.userData.codigo =
                    codigo;

                tubo.userData.radio =
                    14;


                tubo.userData.arriba =
                    arriba;


                this.tubos.set(
                    codigo,
                    tubo
                );


                const conector =
                    this.crearConector(
                        posicion.x,
                        350
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


        const direccion =
            new THREE.Vector3()
                .subVectors(
                    fin,
                    inicio
                );


        const longitud =
            direccion.length();


        const geometria =
            new THREE.CylinderGeometry(
                radio,
                radio,
                longitud,
                24,
                1,
                false
            );


        const material =
            new THREE.MeshStandardMaterial({

                color:
                    0x7f1d1d,

                metalness:
                    0.82,

                roughness:
                    0.30,

                emissive:
                    0x240000,

                emissiveIntensity:
                    0.35

            });


        const tubo =
            new THREE.Mesh(
                geometria,
                material
            );


        const centro =
            new THREE.Vector3()
                .addVectors(
                    inicio,
                    fin
                )
                .multiplyScalar(
                    0.5
                );


        tubo.position.copy(
            centro
        );


        tubo.quaternion.setFromUnitVectors(
            new THREE.Vector3(
                0,
                1,
                0
            ),
            direccion.normalize()
        );


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
                    0xb91c1c,

                metalness:
                    0.9,

                roughness:
                    0.22,

                emissive:
                    0x330000,

                emissiveIntensity:
                    0.4

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

        return new THREE.Vector3(
            x - 600,
            350 - y,
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
            -600;

        this.camera.right =
            600;

        this.camera.top =
            350;

        this.camera.bottom =
            -350;


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


        /*
         * El tablero lógico siempre representa
         * 1200 x 700.
         */

        const escalaX =
            1200 /
            rectTablero.width;


        const escalaY =
            700 /
            rectTablero.height;


        this.tubos.forEach(
            (tubo, codigo) => {

                const agente =
                    this.tablero.querySelector(
                        `.tablero-agente[data-agente="${codigo}"]`
                    );


                if (!agente) {

                    return;

                }


                const base =
                    agente.querySelector(
                        ".tablero-agente-base"
                    );


                if (!base) {

                    return;

                }


                const rect =
                    base.getBoundingClientRect();


                /*
                 * Centro real del hexágono.
                 */

                const x =
                    (
                        rect.left -
                        rectTablero.left +
                        rect.width / 2
                    ) *
                    escalaX;


                const y =
                    (
                        rect.top -
                        rectTablero.top +
                        rect.height / 2
                    ) *
                    escalaY;


                /*
                 * Todos los tubos llegan
                 * exactamente al tubo madre.
                 */

                const extremoY =
                    350;


                this.reposicionarTubo(
                    tubo,
                    x,
                    y,
                    x,
                    extremoY
                );


                const conector =
                    this.conectores.get(
                        codigo
                    );


                if (conector) {

                    const posicion =
                        this.convertirCoordenada(
                            x,
                            extremoY
                        );


                    conector.position.copy(
                        posicion
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
        y2
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


        const direccion =
            new THREE.Vector3()
                .subVectors(
                    fin,
                    inicio
                );


        const longitud =
            direccion.length();


        const radio =
            tubo.userData.radio ||
            14;


        /*
         * Guardamos el material.
         */

        const material =
            tubo.material;


        /*
         * Eliminamos la geometría anterior.
         */

        tubo.geometry.dispose();


        /*
         * Creamos la nueva geometría.
         */

        tubo.geometry =
            new THREE.CylinderGeometry(
                radio,
                radio,
                longitud,
                24,
                1,
                false
            );


        tubo.material =
            material;


        /*
         * Centro del tubo.
         */

        tubo.position
            .copy(
                inicio
            )
            .add(
                fin
            )
            .multiplyScalar(
                0.5
            );


        /*
         * Orientación.
         */

        tubo.quaternion.setFromUnitVectors(
            new THREE.Vector3(
                0,
                1,
                0
            ),
            direccion.normalize()
        );

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

            tubo.material.color.set(
                0xff2020
            );

            tubo.material.emissive.set(
                0x990000
            );

            tubo.material.emissiveIntensity =
                1.8;

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

            tubo.material.color.set(
                0x7f1d1d
            );

            tubo.material.emissive.set(
                0x240000
            );

            tubo.material.emissiveIntensity =
                0.35;

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
                    elemento =>
                        elemento.material
                            .emissiveIntensity > 1
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