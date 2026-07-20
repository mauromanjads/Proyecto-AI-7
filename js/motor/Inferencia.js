/**
 * ==========================================================
 * AI-7
 * Archivo: Inferencia.js
 * ----------------------------------------------------------
 * Motor de inferencia lógica.
 * Deduce la solución usando declaraciones y atributos.
 * ==========================================================
 */

export default class Inferencia {

    constructor() {

        this.conocimientos = [];

        this.errores = [];

        this.solucion = null;

        this.estado = null;

    }


    analizarCaso(caso, estado = null) {

        this.limpiar();

        this.estado = estado;


        const soluciones = [];


        caso.personajes.forEach(culpable => {


            const resultado =
                this.evaluarHipotesis(
                    caso,
                    culpable
                );


            if(resultado.valida) {

                soluciones.push(resultado);

            }

        });



        if(soluciones.length === 1) {


            this.solucion = soluciones[0];


            this.conocimientos =
                soluciones[0].conocimientos;


        }
        else if(soluciones.length > 1) {


            this.errores.push({

                tipo:"AMBIGUEDAD",

                mensaje:
                `Hipótesis válidas encontradas: ${soluciones.length}`,

                candidatos:
                    soluciones.map(
                        s => s.culpable.nombre
                    )

            });
        }

        else {


            this.errores.push({

                tipo:"SIN_SOLUCION",

                mensaje:
                "El motor de inferencia no pudo encontrar una solución."

            });

        }



        // Restaurar estado real del caso
        if(this.estado && caso.culpable) {

            this.estado.establecerCulpable(
                caso.culpable
            );

        }



        return this.conocimientos;

    }



    evaluarHipotesis(caso, culpable) {


        const conocimientos = [];

        let valida = true;



        if(this.estado) {

            this.estado.establecerCulpable(
                culpable
            );

        }



        caso.declaraciones.forEach(declaracion => {


            const valorProposicion =
                this.evaluarProposicion(
                    declaracion.proposicion,
                    culpable,
                    caso
                );



            const coincide =
                valorProposicion === declaracion.diceVerdad;



            if(!coincide) {

                valida = false;

            }



            conocimientos.push({

                personaje:
                    declaracion.personaje,


                proposicion:
                    declaracion.proposicion,


                texto:
                    declaracion.proposicion.obtenerTexto(),


                valorDeclaracion:
                    valorProposicion,


                diceVerdad:
                    declaracion.diceVerdad,


                miente:
                    declaracion.miente,


                correcta:
                    coincide

            });


        });



        return {

            valida,

            culpable,

            conocimientos

        };

    }



    evaluarProposicion(proposicion, culpable, caso) {


        switch(proposicion.tipo) {


            case "culpable":

                return (
                    proposicion.sujeto ===
                    culpable.nombre
                );



            case "inocente":

                return (
                    proposicion.sujeto !==
                    culpable.nombre
                );



            case "miente": {

                const personaje =
                    caso.personajes.find(
                        p =>
                        p.nombre === proposicion.sujeto
                    );


                return this.personajeMiente(
                    personaje,
                    caso
                );

            }



            case "dice_verdad": {

                const personaje =
                    caso.personajes.find(
                        p =>
                        p.nombre === proposicion.sujeto
                    );


                return !this.personajeMiente(
                    personaje,
                    caso
                );

            }



            case "COMPARACION":

            case "ATRIBUTO":

            case "ATRIBUTO_CULPABLE":

                if(!this.estado) {

                    return false;

                }


                return this.estado.evaluar(
                    proposicion
                );



            default:

                return false;

        }

    }



    personajeMiente(personaje, caso) {


        if(!personaje) {

            return false;

        }



        const declaracion =
            caso.declaraciones.find(
                d =>
                d.personaje.nombre ===
                personaje.nombre
            );



        if(!declaracion) {

            return false;

        }



        return declaracion.miente;

    }



    obtenerSolucion() {

        return this.solucion;

    }



    obtenerConocimientos() {

        return this.conocimientos;

    }



    obtenerErrores() {

        return this.errores;

    }



    limpiar() {

        this.conocimientos = [];

        this.errores = [];

        this.solucion = null;

    }

}