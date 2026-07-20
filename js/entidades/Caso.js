/**
 * ==========================================================
 * AI-7
 * Archivo: Caso.js
 * ----------------------------------------------------------
 * Representa un caso lógico del juego.
 * Un caso agrupa personajes, proposiciones y declaraciones.
 * ==========================================================
 */

export default class Caso {

    constructor(datos = {}) {

        const {
            id,
            nombre,
            descripcion
        } = datos;

        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;

        this.personajes = [];
        this.proposiciones = [];
        this.declaraciones = [];

    }


    agregarPersonaje(personaje) {

        this.personajes.push(personaje);

    }


    agregarProposicion(proposicion) {

        this.proposiciones.push(proposicion);

    }


    agregarDeclaracion(declaracion) {

        this.declaraciones.push(declaracion);

    }


    obtenerPersonajes() {

        return this.personajes;

    }


    obtenerProposiciones() {

        return this.proposiciones;

    }


    obtenerDeclaraciones() {

        return this.declaraciones;

    }


    tieneElementos() {

        return (
            this.personajes.length > 0 &&
            this.proposiciones.length > 0 &&
            this.declaraciones.length > 0
        );

    }


    resumen() {

        return {
            id: this.id,
            nombre: this.nombre,
            personajes: this.personajes.length,
            proposiciones: this.proposiciones.length,
            declaraciones: this.declaraciones.length
        };

    }

}