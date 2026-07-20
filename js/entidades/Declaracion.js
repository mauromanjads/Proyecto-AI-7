/**
 * ==========================================================
 * AI-7
 * Archivo: Declaracion.js
 * ----------------------------------------------------------
 * Representa una declaración realizada por un personaje.
 * ==========================================================
 */

export default class Declaracion {

    constructor(datos) {

        const {
            id,
            personaje,
            proposicion,
            diceVerdad = false
        } = datos;


        this.id = id;

        this.personaje = personaje;

        this.proposicion = proposicion;

        this.diceVerdad = diceVerdad;

        this.miente = !diceVerdad;

    }


    obtenerTexto() {

        return this.proposicion.obtenerTexto();

    }

}