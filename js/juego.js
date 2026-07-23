/**
 * ==========================================================
 * AI-7
 * Archivo: juego.js
 * ----------------------------------------------------------
 * Control principal del flujo del juego.
 *
 * Responsabilidades:
 * - Controlar el capítulo actual.
 * - Controlar el caso actual.
 * - Obtener la narrativa desde HISTORIA.
 * - Generar los casos lógicos.
 * - Seleccionar aleatoriamente los personajes.
 * - Resolver el caso mediante Solucionador.
 * - Mostrar el caso en el tablero.
 * - Mostrar el resultado de la inferencia.
 *
 * Progresión:
 * Capítulo 1 → 3 personajes
 * Capítulo 2 → 4 personajes
 * Capítulo 3 → 5 personajes
 * Capítulo 4 → 6 personajes
 * Capítulo 5 → 7 personajes
 * ==========================================================
 */

import HISTORIA from "./datos/historia.js";

import GeneradorCasos from "./motor/GeneradorCasos.js";

import Solucionador from "./motor/Solucionador.js";

import Tablero from "./ui/Tablero.js";


export default class Juego {


    constructor() {

        // =====================================================
        // Estado del juego
        // =====================================================

        this.capituloActual = 0;

        this.casoActual = 0;

        this.casoLogico = null;

        this.resultado = null;


        // =====================================================
        // Motor de generación de casos
        // =====================================================

        this.generador =
            new GeneradorCasos();


        // =====================================================
        // Interfaz gráfica
        // =====================================================

        this.tablero =
            new Tablero();

    }


    // ==========================================================
    // INICIAR JUEGO
    // ==========================================================

    iniciar() {

        console.log(
            "=========================================="
        );

        console.log(
            "AI-7"
        );

        console.log(
            "Iniciando juego..."
        );

        console.log(
            "=========================================="
        );


        this.iniciarCapitulo();

    }


    // ==========================================================
    // INICIAR CAPÍTULO
    // ==========================================================

    iniciarCapitulo() {

        const capitulo =
            this.obtenerCapituloActual();


        if (!capitulo) {

            console.error(
                "No existe el capítulo actual."
            );

            return;

        }


        console.log(
            "=========================================="
        );

        console.log(
            "CAPÍTULO:",
            capitulo.id
        );

        console.log(
            "TÍTULO:",
            capitulo.titulo
        );

        console.log(
            "=========================================="
        );


        // Reiniciar el caso al comenzar
        // un nuevo capítulo.

        this.casoActual = 0;


        // Iniciar primer caso.

        this.iniciarCaso();

    }


    // ==========================================================
    // INICIAR CASO
    // ==========================================================

    iniciarCaso() {

        const capitulo =
            this.obtenerCapituloActual();


        if (!capitulo) {

            console.error(
                "No existe el capítulo actual."
            );

            return;

        }


        // =====================================================
        // Obtener cantidad de personajes
        // según el capítulo
        // =====================================================

        const cantidadPersonajes =
            this.obtenerCantidadPersonajes();


        // =====================================================
        // Generar caso lógico
        // =====================================================

        this.casoLogico =
            this.generador.crearCaso(
                cantidadPersonajes
            );
            
            this.tablero.mostrarProgreso(
                this.capituloActual + 1,
                this.casoActual + 1
            );


        this.casoLogico.personajes.forEach(
            personaje => {

                console.log(
                    "-",
                    personaje.nombre
                );

            }
        );


        console.log(
            "------------------------------------------"
        );


        console.log(
            "Culpable:",
            this.casoLogico.culpable.nombre
        );


        console.log(
            "=========================================="
        );


        // =====================================================
        // Resolver caso
        // =====================================================

        const solucionador =
            new Solucionador(
                this.casoLogico
            );


        this.resultado =
            solucionador.resolver();


        // =====================================================
        // Mostrar interfaz
        // =====================================================

        this.mostrarCaso();

    }


    // ==========================================================
    // MOSTRAR CASO
    // ==========================================================

    mostrarCaso() {

        if (!this.casoLogico) {

            return;

        }


        // =====================================================
        // Mostrar agentes
        // =====================================================

        this.tablero.mostrarAgentes(

            this.casoLogico.personajes,

            this.casoLogico.declaraciones

        );


        // =====================================================
        // Mostrar información del caso
        // =====================================================

        this.tablero.mostrarCaso(

            this.casoLogico

        );


        // =====================================================
        // Mostrar resultado
        // =====================================================

        this.tablero.mostrarResultado(

            this.resultado

        );


        // =====================================================
        // Mostrar conocimientos
        // =====================================================

        this.tablero.mostrarConocimientos(

            this.resultado.conocimientos

        );


        // =====================================================
        // Mostrar errores
        // =====================================================

        this.tablero.mostrarErrores(

            this.resultado.errores

        );

    }


    // ==========================================================
    // OBTENER CAPÍTULO ACTUAL
    // ==========================================================

    obtenerCapituloActual() {

        return HISTORIA.capitulos[
            this.capituloActual
        ];

    }


    // ==========================================================
    // OBTENER CASO NARRATIVO ACTUAL
    // ==========================================================

    obtenerCasoNarrativoActual() {

        const capitulo =
            this.obtenerCapituloActual();


        if (!capitulo) {

            return null;

        }


        return capitulo.casos[
            this.casoActual
        ];

    }


    // ==========================================================
    // OBTENER CANTIDAD DE PERSONAJES
    // ==========================================================

    obtenerCantidadPersonajes() {

        /*
         * Capítulo 1 → 3 personajes
         * Capítulo 2 → 4 personajes
         * Capítulo 3 → 5 personajes
         * Capítulo 4 → 6 personajes
         * Capítulo 5 → 7 personajes
         */

        return this.capituloActual + 3;

    }


    // ==========================================================
    // SIGUIENTE CASO
    // ==========================================================

    siguienteCaso() {

        const capitulo =
            this.obtenerCapituloActual();


        if (!capitulo) {

            return;

        }


        this.casoActual++;


        // =====================================================
        // ¿Terminó el capítulo?
        // =====================================================

        if (
            this.casoActual >=
            capitulo.casos.length
        ) {

            this.siguienteCapitulo();

            return;

        }


        // =====================================================
        // Iniciar siguiente caso
        // =====================================================

        this.iniciarCaso();

    }


    // ==========================================================
    // SIGUIENTE CAPÍTULO
    // ==========================================================

    siguienteCapitulo() {

        this.capituloActual++;


        // =====================================================
        // ¿Terminó el juego?
        // =====================================================

        if (
            this.capituloActual >=
            HISTORIA.capitulos.length
        ) {

            this.finalizarJuego();

            return;

        }


        // =====================================================
        // Iniciar nuevo capítulo
        // =====================================================

        this.iniciarCapitulo();

    }


    // ==========================================================
    // FINALIZAR JUEGO
    // ==========================================================

    finalizarJuego() {

        console.log(
            "=========================================="
        );

        console.log(
            "AI-7"
        );

        console.log(
            "INVESTIGACIÓN COMPLETADA"
        );

        console.log(
            "Todos los capítulos han sido completados."
        );

        console.log(
            "=========================================="
        );

    }

}