/**
 * ==========================================================
 * AI-7
 * Archivo: Tablero.js
 * ----------------------------------------------------------
 * Controlador de la interfaz gráfica.
 * ==========================================================
 */

import Tarjeta from "./Tarjeta.js";
import Modal from "./Modal.js";
import Mensajes from "./Mensajes.js";

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

        this.cerrarModal();

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

            const tarjeta =
                Tarjeta.agente(agente);

            // ==================================================
            // Botón de declaraciones
            // ==================================================

            const botonMensajes =
                tarjeta.querySelector(".btn-mensajes");

            if (botonMensajes) {

                botonMensajes.addEventListener(
                    "click",
                    (evento) => {

                        // Evita que el clic llegue
                        // al evento de la tarjeta
                        evento.stopPropagation();                         

                        const mensajes =
                            new Mensajes();                             

                        mensajes.mostrar(
                            agente,
                            declaracionesAgente
                        );
                       

                    }
                );

            }

            // ==================================================
            // Clic sobre la tarjeta
            // ==================================================

            tarjeta.addEventListener(
                "click",
                () => {

                    this.abrirModal(
                        agente,
                        declaracionesAgente
                    );

                }
            );

            this.divAgentes.appendChild(tarjeta);

        });

    }
    // ======================================================
    // Abrir Modal
    // ======================================================

    abrirModal(agente, declaraciones) {

        // Si ya existe un modal, lo eliminamos
        this.cerrarModal();

        // Crear el HTML del modal
        document.body.insertAdjacentHTML(
            "beforeend",
            Modal.agente(
                agente,
                declaraciones
            )
        );

        // Obtener el modal recién creado
        const modal =
            document.querySelector(".modal-overlay");

        if (!modal)
            return;

        // Botón X
        const botonCerrar =
            modal.querySelector(".modal-cerrar");

        // Botón CERRAR
        const botonCerrarGrande =
            modal.querySelector(".modal-cerrar-grande");

        // Cerrar con X
        botonCerrar.addEventListener(
            "click",
            () => {

                this.cerrarModal();

            }
        );

        // Cerrar con botón grande
        botonCerrarGrande.addEventListener(
            "click",
            () => {

                this.cerrarModal();

            }
        );

    }

    // ======================================================
    // Cerrar Modal
    // ======================================================

    cerrarModal() {

        const modal =
            document.querySelector(".modal-overlay");

        if (modal) {

            modal.remove();

        }

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