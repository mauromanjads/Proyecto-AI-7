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
        this.borde = null;
        this.material = null;

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
                32,
                ancho / alto,
                0.1,
                100
            );

        this.camera.position.set(
            0,
            3.2,
            6
        );

        this.camera.lookAt(
            0,
            0,
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
                0xffead0,
                2
            );

        this.scene.add(
            ambiente
        );

        const principal =
            new THREE.DirectionalLight(
                0xffc078,
                4
            );

        principal.position.set(
            3,
            6,
            5
        );

        this.scene.add(
            principal
        );

        const relleno =
            new THREE.DirectionalLight(
                0xff8a3d,
                2
            );

        relleno.position.set(
            -4,
            2,
            -3
        );

        this.scene.add(
            relleno
        );

    }

    crearBase() {

        const geometria =
            new THREE.CylinderGeometry(
                1.75,
                1.85,
                0.42,
                6,
                1,
                false
            );

        this.material =
            new THREE.MeshStandardMaterial({

                color: 0x8b451f,

                metalness: 0.82,

                roughness: 0.24

            });

        this.base =
            new THREE.Mesh(
                geometria,
                this.material
            );

        this.base.rotation.y =
            Math.PI / 6;

        this.scene.add(
            this.base
        );

        const geometriaBorde =
            new THREE.CylinderGeometry(
                1.82,
                1.92,
                0.14,
                6,
                1,
                false
            );

        const materialBorde =
            new THREE.MeshStandardMaterial({

                color: 0xd97732,

                metalness: 0.9,

                roughness: 0.2

            });

        this.borde =
            new THREE.Mesh(
                geometriaBorde,
                materialBorde
            );

        this.borde.position.y =
            0.22;

        this.borde.rotation.y =
            Math.PI / 6;

        this.scene.add(
            this.borde
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

        if (this.base) {

            this.base.geometry.dispose();

            if (this.base.material) {
                this.base.material.dispose();
            }

            this.scene?.remove(
                this.base
            );

        }

        if (this.borde) {

            this.borde.geometry.dispose();

            if (this.borde.material) {
                this.borde.material.dispose();
            }

            this.scene?.remove(
                this.borde
            );

        }

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
        this.borde = null;

    }

}