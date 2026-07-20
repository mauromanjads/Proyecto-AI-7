/**
 * ==========================================================
 * AI-7
 * Archivo: Personaje.js
 * ----------------------------------------------------------
 * Clase base de todos los agentes del juego.
 * ==========================================================
 */

export default class Personaje {

    constructor(datos) {

        // ==========================
        // Información del personaje
        // ==========================

        const {
            id,
            codigo,
            nombre,
            especialidad,
            descripcion,
            color,
            icono,
            avatar,
            altura
        } = datos;

        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.especialidad = especialidad;
        this.descripcion = descripcion;

        this.color = color;
        this.icono = icono;
        this.avatar = avatar;

        this.altura = altura;

        // ==========================
        // Estado durante la partida
        // ==========================

        this.activo = true;
        this.seleccionado = false;

        // Casilla actual del tablero
        this.posicion = null;

        // Información conocida por el personaje
        this.proposiciones = [];

        // Declaraciones realizadas
        this.declaraciones = [];

        // Historial de acciones
        this.historial = [];
    }

    /**
     * Selecciona el personaje.
     */
    seleccionar() {
        this.seleccionado = true;
    }

    /**
     * Deselecciona el personaje.
     */
    deseleccionar() {
        this.seleccionado = false;
    }

    /**
     * Agrega una proposición conocida.
     * @param {Proposicion} proposicion
     */
    agregarProposicion(proposicion) {
        this.proposiciones.push(proposicion);
    }

    /**
     * Agrega una declaración.
     * @param {Declaracion} declaracion
     */
    agregarDeclaracion(declaracion) {
        this.declaraciones.push(declaracion);
    }

    /**
     * Registra una acción realizada por el personaje.
     * @param {string} accion
     */
    registrarAccion(accion) {
        this.historial.push({
            fecha: new Date(),
            accion
        });
    }

}