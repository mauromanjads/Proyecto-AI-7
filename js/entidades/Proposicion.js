/**
 * ==========================================================
 * AI-7
 * Archivo: Proposicion.js
 * ----------------------------------------------------------
 * Representa una proposición lógica del juego.
 *
 * Soporta:
 *
 * - Proposiciones lógicas
 * - Proposiciones basadas en atributos
 * - Comparaciones
 * - Restricciones sobre el culpable
 *
 * La proposición NO conoce si es verdadera o falsa.
 * Esa responsabilidad pertenece al motor de inferencia.
 *
 * ==========================================================
 */

export default class Proposicion {

    constructor(datos) {

        const {
            id,
            tipo,
            sujeto,
            verbo,
            objeto,
            atributo,
            condicion,
            operador,
            valor,
            referencia
        } = datos;


        this.id = id;

        this.tipo = tipo;

        // Proposiciones clásicas

        this.sujeto = sujeto;

        this.verbo = verbo;

        this.objeto = objeto;


        // Proposiciones avanzadas

        this.atributo = atributo;

        this.condicion = condicion;

        this.operador = operador;

        this.valor = valor;

        this.referencia = referencia;

    }


    obtenerTexto() {

        switch(this.tipo) {


            case "ATRIBUTO":

                if(this.condicion === "MIENTE") {

                    return `El especialista en ${this.valor} miente`;

                }


                if(this.condicion === "DICE_VERDAD") {

                    return `El especialista en ${this.valor} dice la verdad`;

                }


                break;



            case "COMPARACION":

                if(
                    this.atributo === "altura"
                ) {


                    if(this.operador === "MAYOR_QUE") {

                        return `${this.sujeto} mide más de ${this.valor} cm`;

                    }


                    if(this.operador === "MENOR_QUE") {

                        return `${this.sujeto} mide menos de ${this.valor} cm`;

                    }


                    if(this.operador === "MAYOR_QUE_PERSONA") {

                        return `${this.sujeto} es más alto que ${this.referencia}`;

                    }


                    if(this.operador === "MENOR_QUE_PERSONA") {

                        return `${this.sujeto} es más bajo que ${this.referencia}`;

                    }

                }


                break;



            case "ATRIBUTO_CULPABLE":


                if(this.atributo === "altura") {


                    if(this.operador === "MAYOR_QUE") {

                        return `El culpable mide más de ${this.valor} cm`;

                    }


                    if(this.operador === "MENOR_QUE") {

                        return `El culpable mide menos de ${this.valor} cm`;

                    }


                    if(this.operador === "MAYOR_QUE_PERSONA") {

                        return `El culpable es más alto que ${this.referencia}`;

                    }


                    if(this.operador === "MENOR_QUE_PERSONA") {

                        return `El culpable es más bajo que ${this.referencia}`;

                    }

                }



                if(this.atributo === "especialidad") {


                    if(this.operador === "IGUAL") {

                        return `El culpable es especialista en ${this.valor}`;

                    }


                    if(this.operador === "DIFERENTE") {

                        return `El culpable no es especialista en ${this.valor}`;

                    }

                }


                break;



            default:

                return `${this.sujeto} ${this.verbo} ${this.objeto}`;

        }


        return `${this.sujeto} ${this.verbo} ${this.objeto}`;

    }

}