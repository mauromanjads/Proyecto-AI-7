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
            new Tablero(this);

    }


    // ==========================================================
    // INICIAR JUEGO
    // ==========================================================

    iniciar() {

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


        // =====================================================
        // Aplicar fondo del capítulo
        // =====================================================

        this.tablero.aplicarFondoCapitulo(
            capitulo
        );


        // =====================================================
        // Reiniciar el caso al comenzar
        // un nuevo capítulo
        // =====================================================

        this.casoActual = 0;


        // =====================================================
        // Iniciar primer caso
        // =====================================================

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


        // =====================================================
        // Obtener narrativa del caso actual
        // =====================================================

        const casoNarrativo =
            this.obtenerCasoNarrativoActual();


        // =====================================================
        // Mostrar progreso
        // =====================================================

        this.tablero.mostrarProgreso(
            this.capituloActual + 1,
            this.casoActual + 1
        );


        // =====================================================
        // Mostrar narrativa
        // =====================================================

        this.tablero.mostrarNarrativa(
            capitulo,
            casoNarrativo
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

    }


    // ==========================================================
    // VERIFICAR CULPABLE
    // ==========================================================

    verificarCulpable(agenteSeleccionado) {

        if (!this.casoLogico)
            return;


        const culpable =
            this.casoLogico.culpable;


        // =====================================================
        // RESPUESTA CORRECTA
        // =====================================================

        if (
            agenteSeleccionado.id ===
            culpable.id
        ) {

            // Avanzar al siguiente caso

            this.siguienteCaso();

            return;

        }


        // =====================================================
        // RESPUESTA INCORRECTA
        // =====================================================
        //
        // No aumentamos casoActual.
        //
        // El caso narrativo sigue siendo el mismo.
        //
        // Se genera un nuevo caso lógico con:
        // - Nuevas declaraciones
        // - Nuevo culpable
        //
        // =====================================================

        this.iniciarCaso();

    }

}