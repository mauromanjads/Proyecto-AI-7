/**
 * ==========================================================
 * AI-7
 * Archivo: app.js
 * ----------------------------------------------------------
 * Punto de entrada de la aplicación.
 * ==========================================================
 */

import { PERSONAJES } from "./datos/personajes.js";
import Personaje from "./entidades/Personaje.js";
import GeneradorCasos from "./motor/GeneradorCasos.js";
import Solucionador from "./motor/Solucionador.js";
import Tablero from "./ui/Tablero.js";


// ==========================================================
// Cargar agentes
// ==========================================================

const agentes = PERSONAJES.map(
    datos => new Personaje(datos)
);


// ==========================================================
// Crear caso
// ==========================================================

const generador = new GeneradorCasos();

const caso = generador.crearCaso();

const tablero = new Tablero();

// ==========================================================
// Resolver caso
// ==========================================================

const solucionador = new Solucionador(caso);

const resultado = solucionador.resolver();

// ==========================================================
// Interfaz Grafica
// ==========================================================


tablero.mostrarAgentes(agentes,caso.declaraciones);

tablero.mostrarCaso(caso);

tablero.mostrarResultado(resultado);

tablero.mostrarConocimientos(resultado.conocimientos);

tablero.mostrarErrores(resultado.errores);
