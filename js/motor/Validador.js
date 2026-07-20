/**
 * ==========================================================
 * AI-7
 * Archivo: Validador.js
 * ----------------------------------------------------------
 * Valida la solución obtenida por Inferencia.
 * Compara solución inferida contra solución real.
 * ==========================================================
 */

export default class Validador {

    constructor() {

        this.errores = [];

    }


    validar(solucionInferida, caso) {

        this.limpiar();


        if (!solucionInferida) {

            this.errores.push({

                tipo: "SIN_SOLUCION",

                mensaje:
                "El motor de inferencia no pudo encontrar una solución."

            });

            return false;

        }



        const culpableInferido =
            solucionInferida.culpable;



        const culpableReal =
            caso.culpable;



        if (!culpableInferido || !culpableReal) {

            this.errores.push({

                tipo: "DATOS_INCOMPLETOS",

                mensaje:
                "No existe información suficiente para validar el culpable."

            });

            return false;

        }



        if (
            culpableInferido.id !==
            culpableReal.id
        ) {

            this.errores.push({

                tipo: "CULPABLE_INCORRECTO",

                mensaje:
                `La inferencia determinó ${culpableInferido.nombre} pero la solución real es ${culpableReal.nombre}.`

            });


            return false;

        }



        return true;

    }



    esValido() {

        return this.errores.length === 0;

    }



    obtenerErrores() {

        return this.errores;

    }



    limpiar() {

        this.errores = [];

    }

}