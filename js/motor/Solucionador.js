/**
 * ==========================================================
 * AI-7
 * Archivo: Solucionador.js
 * ----------------------------------------------------------
 * Coordina el proceso de resolución del caso.
 * ==========================================================
 */

import Inferencia from "./Inferencia.js";
import Validador from "./Validador.js";


export default class Solucionador {


    constructor(caso) {

        this.caso = caso;

        this.inferencia = new Inferencia();

        this.validador = new Validador();

        this.resultado = null;

    }



    /**
     * Ejecuta la resolución del caso.
     */
    resolver() {


        // =================================================
        // 1. Ejecutar motor de inferencia
        // =================================================

        const conocimientos =
            this.inferencia.analizarCaso(
                this.caso,
                this.caso.estado
            );



        const solucion =
            this.inferencia.obtenerSolucion();



        // =================================================
        // 2. Validar solución encontrada
        // =================================================

        const valido =
            this.validador.validar(

                solucion,

                this.caso

            );



        // =================================================
        // 3. Resultado completo
        // =================================================

        this.resultado = {


            caso:
                this.caso.nombre,


            valido,


            solucion,


            conocimientos,


            errores: [

                ...this.inferencia.obtenerErrores(),

                ...this.validador.obtenerErrores()

            ]


        };



        return this.resultado;

    }



    obtenerResultado() {

        return this.resultado;

    }


}