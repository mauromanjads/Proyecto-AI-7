/**
 * ==========================================================
 * AI-7
 * Archivo: EstadoMundo.js
 * ----------------------------------------------------------
 * Representa el estado real del mundo.
 * Es la única fuente de verdad del motor.
 * ==========================================================
 */

import { TIPOS_PROPOSICION } from "../datos/proposiciones.js";

export default class EstadoMundo {

    constructor() {

        this.culpable = null;
        this.estados = new Map();
        this.personajes = [];

    }

    establecerPersonajes(personajes) {

        this.personajes = personajes;

    }

    establecerCulpable(personaje) {

        this.culpable = personaje;

    }

    obtenerCulpable() {

        return this.culpable;

    }

    establecerEstado(personaje, diceVerdad) {

        this.estados.set(personaje.nombre, {

            diceVerdad,

            miente: !diceVerdad

        });

    }

    obtenerEstado(personaje) {

        return this.estados.get(
            personaje.nombre
        );

    }

    diceVerdad(personaje) {

        return this.obtenerEstado(personaje)
            .diceVerdad;

    }

    miente(personaje) {

        return this.obtenerEstado(personaje)
            .miente;

    }

    evaluar(proposicion) {

        switch(proposicion.tipo) {


            case TIPOS_PROPOSICION.CULPABLE:

                return (
                    proposicion.sujeto ===
                    this.culpable.nombre
                );


            case TIPOS_PROPOSICION.INOCENTE:

                return (
                    proposicion.sujeto !==
                    this.culpable.nombre
                );


            case TIPOS_PROPOSICION.MIENTE:

                return this.miente({
                    nombre: proposicion.sujeto
                });


            case TIPOS_PROPOSICION.DICE_VERDAD:

                return this.diceVerdad({
                    nombre: proposicion.sujeto
                });


            case "COMPARACION":

                return this.evaluarComparacion(
                    proposicion
                );


            case "ATRIBUTO":

                return this.evaluarAtributo(
                    proposicion
                );


            case "ATRIBUTO_CULPABLE":

                return this.evaluarAtributoCulpable(
                    proposicion
                );


            default:

                return false;

        }

    }


    evaluarComparacion(proposicion) {

        const sujeto =
            this.personajes.find(
                p =>
                p.nombre === proposicion.sujeto
            );


        if(!sujeto) {

            return false;

        }


        if(
            proposicion.atributo === "altura"
        ) {

            switch(proposicion.operador) {


                case "MAYOR_QUE":

                    return (
                        sujeto.altura >
                        proposicion.valor
                    );


                case "MENOR_QUE":

                    return (
                        sujeto.altura <
                        proposicion.valor
                    );


                case "MAYOR_QUE_PERSONA": {

                    const referencia =
                        this.personajes.find(
                            p =>
                            p.nombre ===
                            proposicion.referencia
                        );


                    return referencia
                    ?
                    sujeto.altura >
                    referencia.altura
                    :
                    false;

                }


                case "MENOR_QUE_PERSONA": {

                    const referencia =
                        this.personajes.find(
                            p =>
                            p.nombre ===
                            proposicion.referencia
                        );


                    return referencia
                    ?
                    sujeto.altura <
                    referencia.altura
                    :
                    false;

                }

            }

        }


        return false;

    }


    evaluarAtributo(proposicion) {

        if(
            proposicion.atributo === "especialidad"
        ) {

            const personaje =
                this.personajes.find(
                    p =>
                    p.especialidad ===
                    proposicion.valor
                );


            if(!personaje) {

                return false;

            }


            if(
                proposicion.condicion === "MIENTE"
            ) {

                return this.miente(
                    personaje
                );

            }


            if(
                proposicion.condicion === "DICE_VERDAD"
            ) {

                return this.diceVerdad(
                    personaje
                );

            }

        }


        return false;

    }


    evaluarAtributoCulpable(proposicion) {

        if(!this.culpable) {

            return false;

        }


        if(
            proposicion.atributo === "altura"
        ) {

            switch(proposicion.operador) {


                case "MAYOR_QUE":

                    return (
                        this.culpable.altura >
                        proposicion.valor
                    );


                case "MENOR_QUE":

                    return (
                        this.culpable.altura <
                        proposicion.valor
                    );


                case "MAYOR_QUE_PERSONA": {

                    const personaje =
                        this.personajes.find(
                            p =>
                            p.nombre ===
                            proposicion.referencia
                        );


                    return personaje
                    ?
                    this.culpable.altura >
                    personaje.altura
                    :
                    false;

                }


                case "MENOR_QUE_PERSONA": {

                    const personaje =
                        this.personajes.find(
                            p =>
                            p.nombre ===
                            proposicion.referencia
                        );


                    return personaje
                    ?
                    this.culpable.altura <
                    personaje.altura
                    :
                    false;

                }


                default:

                    return false;

            }

        }


        if(
            proposicion.atributo === "especialidad"
        ) {

         
            switch(proposicion.operador) {


                case "IGUAL":

                    return (
                        this.culpable.especialidad ===
                        proposicion.valor
                    );


                case "DIFERENTE":

                    return (
                        this.culpable.especialidad !==
                        proposicion.valor
                    );


                default:

                    return false;

            }

        }


        return false;

    }

}