/**
 * ==========================================================
 * AI-7
 * Archivo: Tablero.js
 * ----------------------------------------------------------
 * Controlador de la interfaz gráfica.
 * ==========================================================
 */

import Tarjeta from "./Tarjeta.js";

export default class Tablero {

    constructor() {

        this.divAgentes =
            document.getElementById("agentes");

        this.divCaso =
            document.getElementById("caso");

        this.divDeclaraciones =
            document.getElementById("declaraciones");

        this.divResultado =
            document.getElementById("resultado");

    }

    // ======================================================
    // Limpiar
    // ======================================================

    limpiar() {

        this.divAgentes.innerHTML = "";

        this.divCaso.innerHTML = "";

        this.divDeclaraciones.innerHTML = "";

        this.divResultado.innerHTML = "";

    }

    // ======================================================
    // Mostrar Agentes
    // ======================================================

    mostrarAgentes(agentes, declaraciones) {

        this.divAgentes.innerHTML = "";

        agentes.forEach(agente => {

            const declaracionesAgente =
                declaraciones.filter(
                    declaracion =>
                        declaracion.personaje.nombre === agente.nombre
                );


            this.divAgentes.appendChild(

                Tarjeta.agente(
                    agente,
                    declaracionesAgente
                )

            );

        });

    }

    // ======================================================
    // Mostrar Caso
    // ======================================================

    mostrarCaso(caso) {

        this.divCaso.innerHTML = "";

        this.divCaso.appendChild(

            Tarjeta.caso(caso)

        );

    }

    // ======================================================
    // Mostrar Declaraciones
    // ======================================================

    mostrarDeclaraciones(declaraciones) {

        this.divDeclaraciones.innerHTML = "";

        declaraciones.forEach(declaracion => {

            this.divDeclaraciones.appendChild(

                Tarjeta.declaracion(declaracion)

            );

        });

    }

    // ======================================================
    // Mostrar Resultado
    // ======================================================

    mostrarResultado(resultado) {

        this.divResultado.innerHTML = "";

        this.divResultado.appendChild(

            Tarjeta.resultado(resultado)

        );

    }

    // ======================================================
    // Mostrar Conocimientos
    // ======================================================

    mostrarConocimientos(conocimientos) {

        conocimientos.forEach(conocimiento => {

            this.divResultado.appendChild(

                Tarjeta.conocimiento(conocimiento)

            );

        });

    }

    // ======================================================
    // Mostrar Errores
    // ======================================================

    mostrarErrores(errores) {

        if (!errores.length)
            return;

        this.divResultado.appendChild(

            Tarjeta.errores(errores)

        );

    }

}