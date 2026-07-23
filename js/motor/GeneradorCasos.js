/**
 * ==========================================================
 * AI-7
 * Archivo: GeneradorCasos.js
 * ----------------------------------------------------------
 * Genera un caso lógico para el juego.
 * Garantiza que el caso tenga una solución única.
 * Delegación de atributos a GeneradorAtributos.
 * ==========================================================
 */

import { PERSONAJES } from "../datos/personajes.js";

import Caso from "../entidades/Caso.js";
import Declaracion from "../entidades/Declaracion.js";
import Proposicion from "../entidades/Proposicion.js";

import EstadoMundo from "./EstadoMundo.js";
import Inferencia from "./Inferencia.js";
import GeneradorAtributos from "./GeneradorAtributos.js";

import { TIPOS_PROPOSICION } from "../datos/proposiciones.js";


export default class GeneradorCasos {

    constructor() {

        this.estado = new EstadoMundo();

        this.inferencia = new Inferencia();

        this.generadorAtributos =
            new GeneradorAtributos();

    }


    crearCaso(cantidadPersonajes = 7) {

        if (
            cantidadPersonajes < 3 ||
            cantidadPersonajes > PERSONAJES.length
        ) {

            throw new Error(
                "La cantidad de personajes debe estar entre 3 y 7."
            );

        }


        let intentos = 0;


        while (intentos < 100) {

            const caso =
                this.crearCasoInterno(
                    cantidadPersonajes
                );


            this.inferencia.analizarCaso(
                caso,
                this.estado
            );


            const solucion =
                this.inferencia.obtenerSolucion();


            const errores =
                this.inferencia.obtenerErrores();


            if (
                solucion &&
                errores.length === 0 &&
                solucion.culpable &&
                caso.culpable &&
                solucion.culpable.nombre ===
                caso.culpable.nombre
            ) {

                return caso;

            }


            intentos++;

        }


        throw new Error(
            "No se pudo generar un caso con solución única."
        );

    }


    crearCasoInterno(cantidadPersonajes) {

        this.estado =
            new EstadoMundo();


        this.inferencia.estado =
            this.estado;


        const caso =
            this.crearCasoBase();


        this.agregarPersonajes(
            caso,
            cantidadPersonajes
        );


        this.estado.establecerPersonajes(
            caso.personajes
        );


        this.elegirCulpable(
            caso
        );


        this.generarEstadoMundo(
            caso
        );


        this.generarProposiciones(
            caso
        );


        this.generarProposicionesAtributos(
            caso
        );


        this.generarDeclaraciones(
            caso
        );


        caso.estado =
            this.estado;


        return caso;

    }


    crearCasoBase() {

        return new Caso({

            id: Date.now(),

            nombre: "Caso generado",

            descripcion:
                "Caso lógico generado automáticamente"

        });

    }


    agregarPersonajes(
        caso,
        cantidadPersonajes
    ) {

        const personajesDisponibles =
            [...PERSONAJES];


        // Mezclamos los 7 personajes
        // para obtener una selección aleatoria.

        for (
            let i = personajesDisponibles.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );


            [
                personajesDisponibles[i],
                personajesDisponibles[j]
            ] = [
                personajesDisponibles[j],
                personajesDisponibles[i]
            ];

        }


        const personajesSeleccionados =
            personajesDisponibles.slice(
                0,
                cantidadPersonajes
            );


        personajesSeleccionados.forEach(
            personaje => {

                caso.agregarPersonaje(
                    personaje
                );

            }
        );

    }


    elegirCulpable(caso) {

        const indice =
            Math.floor(
                Math.random() *
                caso.personajes.length
            );


        const culpable =
            caso.personajes[indice];


        caso.culpable =
            culpable;


        this.estado.establecerCulpable(
            culpable
        );

    }


    generarEstadoMundo(caso) {

        caso.personajes.forEach(
            personaje => {

                const diceVerdad =
                    Math.random() < 0.5;


                this.estado.establecerEstado(
                    personaje,
                    diceVerdad
                );

            }
        );

    }


    // =====================================================
    // Proposiciones lógicas
    // =====================================================

    generarProposiciones(caso) {

        caso.personajes.forEach(
            (personaje, indice) => {

                this.crearProposicionCulpable(
                    caso,
                    personaje,
                    indice
                );


                this.crearProposicionInocente(
                    caso,
                    personaje,
                    indice
                );


                this.crearProposicionMiente(
                    caso,
                    personaje,
                    indice
                );


                this.crearProposicionDiceVerdad(
                    caso,
                    personaje,
                    indice
                );

            }
        );

    }


    // =====================================================
    // Proposiciones de atributos
    // =====================================================

    generarProposicionesAtributos(caso) {

        this.generadorAtributos.generar(
            caso
        );

    }


    crearProposicionCulpable(
        caso,
        personaje,
        indice
    ) {

        caso.agregarProposicion(

            new Proposicion({

                id: indice + 1,

                tipo:
                    TIPOS_PROPOSICION.CULPABLE,

                sujeto:
                    personaje.nombre,

                verbo: "es",

                objeto: "culpable"

            })

        );

    }


    crearProposicionInocente(
        caso,
        personaje,
        indice
    ) {

        caso.agregarProposicion(

            new Proposicion({

                id: indice + 100,

                tipo:
                    TIPOS_PROPOSICION.INOCENTE,

                sujeto:
                    personaje.nombre,

                verbo: "es",

                objeto: "inocente"

            })

        );

    }


    crearProposicionMiente(
        caso,
        personaje,
        indice
    ) {

        caso.agregarProposicion(

            new Proposicion({

                id: indice + 200,

                tipo:
                    TIPOS_PROPOSICION.MIENTE,

                sujeto:
                    personaje.nombre,

                verbo: "miente",

                objeto: ""

            })

        );

    }


    crearProposicionDiceVerdad(
        caso,
        personaje,
        indice
    ) {

        caso.agregarProposicion(

            new Proposicion({

                id: indice + 300,

                tipo:
                    TIPOS_PROPOSICION.DICE_VERDAD,

                sujeto:
                    personaje.nombre,

                verbo: "dice",

                objeto: "la verdad"

            })

        );

    }


    // =====================================================
    // Declaraciones
    // =====================================================

    generarDeclaraciones(caso) {

        const disponibles =
            [
                ...caso.proposiciones
            ];


        caso.personajes.forEach(
            (personaje, indice) => {

                const estado =
                    this.estado.obtenerEstado(
                        personaje
                    );


                const diceVerdad =
                    estado.diceVerdad;


                const posibles =
                    disponibles.filter(
                        proposicion => {

                            if (
                                proposicion.sujeto ===
                                personaje.nombre
                            ) {

                                return false;

                            }


                            if (
                                proposicion.tipo ===
                                TIPOS_PROPOSICION.CULPABLE &&
                                proposicion.sujeto ===
                                caso.culpable.nombre
                            ) {

                                return false;

                            }


                            return (
                                this.estado.evaluar(
                                    proposicion
                                ) ===
                                diceVerdad
                            );

                        }
                    );


                if (
                    posibles.length === 0
                ) {

                    return;

                }


                const indiceProposicion =
                    Math.floor(
                        Math.random() *
                        posibles.length
                    );


                const proposicion =
                    posibles[
                        indiceProposicion
                    ];


                disponibles.splice(
                    disponibles.indexOf(
                        proposicion
                    ),
                    1
                );


                caso.agregarDeclaracion(

                    new Declaracion({

                        id:
                            indice + 1,

                        personaje,

                        proposicion,

                        diceVerdad

                    })

                );

            }
        );

    }

}