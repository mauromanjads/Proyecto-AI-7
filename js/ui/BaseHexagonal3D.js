/**
 * ==========================================================
 * AI-7
 * Archivo: BaseHexagonal3D.js
 * ----------------------------------------------------------
 * BASE HEXAGONAL 3D
 * ==========================================================
 */

import * as THREE from "three";

export default class BaseHexagonal3D {

    constructor(contenedor) {

        this.contenedor = contenedor;

        this.scene = null;
        this.camera = null;
        this.renderer = null;

        this.base = null;
        this.superficie = null;
        this.borde = null;

    }

    iniciar() {

        if (!this.contenedor) {
            return;
        }

        const ancho =
            this.contenedor.clientWidth;

        const alto =
            this.contenedor.clientHeight;

        if (
            ancho <= 0 ||
            alto <= 0
        ) {
            return;
        }

        this.scene =
            new THREE.Scene();

        this.camera =
            new THREE.PerspectiveCamera(
                30,
                ancho / alto,
                0.1,
                100
            );

        this.camera.position.set(
            0,
            3.8,
            6.5
        );

        this.camera.lookAt(
            0,
            0.25,
            0
        );

        this.renderer =
            new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });

        this.renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );

        this.renderer.setSize(
            ancho,
            alto
        );

        this.renderer.setClearColor(
            0x000000,
            0
        );

        this.renderer.outputColorSpace =
            THREE.SRGBColorSpace;

        this.renderer.toneMapping =
            THREE.ACESFilmicToneMapping;

        this.renderer.toneMappingExposure =
            1.15;

        this.contenedor.appendChild(
            this.renderer.domElement
        );

        this.crearLuces();
        this.crearBase();

        this.renderizar();

    }

    crearLuces() {

        const ambiente =
            new THREE.AmbientLight(
                0x9ccfff,
                2.2
            );

        this.scene.add(
            ambiente
        );

        const principal =
            new THREE.DirectionalLight(
                0xffffff,
                4.5
            );

        principal.position.set(
            3,
            7,
            5
        );

        this.scene.add(
            principal
        );

        const azul =
            new THREE.PointLight(
                0x20aaff,
                5,
                8
            );

        azul.position.set(
            0,
            1,
            1
        );

        this.scene.add(
            azul
        );

        const naranja =
            new THREE.PointLight(
                0xff8a32,
                3,
                7
            );

        naranja.position.set(
            -3,
            2,
            2
        );

        this.scene.add(
            naranja
        );

    }

    crearBase() {

        const geometriaBase =
            new THREE.CylinderGeometry(
                2.15,
                2.35,
                0.48,
                6,
                1,
                false
            );

        const materialBase =
            new THREE.MeshStandardMaterial({

                color: 0x151d25,

                metalness: 0.88,

                roughness: 0.25

            });

        this.base =
            new THREE.Mesh(
                geometriaBase,
                materialBase
            );

        this.base.rotation.y =
            Math.PI / 6;

        this.base.position.y =
            -0.05;

        this.scene.add(
            this.base
        );

        const geometriaSuperficie =
            new THREE.CylinderGeometry(
                1.82,
                1.95,
                0.16,
                6,
                1,
                false
            );

        const materialSuperficie =
            new THREE.MeshStandardMaterial({

                color: 0x12415d,

                metalness: 0.8,

                roughness: 0.22,

                emissive: 0x063653,

                emissiveIntensity: 0.65

            });

        this.superficie =
            new THREE.Mesh(
                geometriaSuperficie,
                materialSuperficie
            );

        this.superficie.rotation.y =
            Math.PI / 6;

        this.superficie.position.y =
            0.25;

        this.scene.add(
            this.superficie
        );

        const geometriaBorde =
            new THREE.CylinderGeometry(
                2.02,
                2.16,
                0.13,
                6,
                1,
                false
            );

        const materialBorde =
            new THREE.MeshStandardMaterial({

                color: 0xd98532,

                metalness: 0.92,

                roughness: 0.18,

                emissive: 0x542000,

                emissiveIntensity: 0.35

            });

        this.borde =
            new THREE.Mesh(
                geometriaBorde,
                materialBorde
            );

        this.borde.rotation.y =
            Math.PI / 6;

        this.borde.position.y =
            0.34;

        this.scene.add(
            this.borde
        );

        const geometriaAnillo =
            new THREE.CylinderGeometry(
                1.72,
                1.78,
                0.04,
                6,
                1,
                false
            );

        const materialAnillo =
            new THREE.MeshStandardMaterial({

                color: 0x20bfff,

                metalness: 0.75,

                roughness: 0.2,

                emissive: 0x008fd0,

                emissiveIntensity: 1.2

            });

        const anillo =
            new THREE.Mesh(
                geometriaAnillo,
                materialAnillo
            );

        anillo.rotation.y =
            Math.PI / 6;

        anillo.position.y =
            0.43;

        this.scene.add(
            anillo
        );

        const geometriaCentro =
            new THREE.CylinderGeometry(
                0.95,
                1.05,
                0.035,
                6
            );

        const materialCentro =
            new THREE.MeshStandardMaterial({

                color: 0x1b83ad,

                metalness: 0.7,

                roughness: 0.2,

                emissive: 0x0876a8,

                emissiveIntensity: 0.9

            });

        const centro =
            new THREE.Mesh(
                geometriaCentro,
                materialCentro
            );

        centro.rotation.y =
            Math.PI / 6;

        centro.position.y =
            0.47;

        this.scene.add(
            centro
        );

    }

    renderizar() {

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

    destruir() {

        if (!this.scene) {
            return;
        }

        this.scene.traverse(
            objeto => {

                if (objeto.geometry) {
                    objeto.geometry.dispose();
                }

                if (objeto.material) {

                    if (
                        Array.isArray(
                            objeto.material
                        )
                    ) {

                        objeto.material.forEach(
                            material =>
                                material.dispose()
                        );

                    } else {

                        objeto.material.dispose();

                    }

                }

            }
        );

        if (this.renderer) {

            this.renderer.dispose();

            if (
                this.renderer.domElement &&
                this.renderer.domElement.parentNode
            ) {

                this.renderer.domElement.parentNode.removeChild(
                    this.renderer.domElement
                );

            }

        }

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.base = null;
        this.superficie = null;
        this.borde = null;

    }

}