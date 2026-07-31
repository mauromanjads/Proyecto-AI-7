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
            ancho === 0 ||
            alto === 0
        ) {
            return;
        }

        this.scene =
            new THREE.Scene();

        this.camera =
            new THREE.PerspectiveCamera(
                35,
                ancho / alto,
                0.1,
                100
            );

        this.camera.position.set(
            0,
            2.8,
            5
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
                0xffffff,
                1.5
            );

        this.scene.add(
            ambiente
        );

        const luzPrincipal =
            new THREE.DirectionalLight(
                0xffffff,
                3
            );

        luzPrincipal.position.set(
            2,
            5,
            4
        );

        this.scene.add(
            luzPrincipal
        );

    }

    crearBase() {

        const geometria =
            new THREE.CylinderGeometry(
                1.65,
                1.65,
                0.35,
                6
            );

        const material =
            new THREE.MeshStandardMaterial({
                color: 0x475569,
                metalness: 0.85,
                roughness: 0.28
            });

        this.base =
            new THREE.Mesh(
                geometria,
                material
            );

        this.base.rotation.y =
            Math.PI / 6;

        this.scene.add(
            this.base
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

}