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
import ModalConfirmacion from "./ModalConfirmacion.js";
import Mensajes from "./Mensajes.js";

export default class Tablero {

    constructor() {

        this.divProgreso =
              document.getElementById("progreso");

        this.divAgentes =
            document.getElementById("agentes");

        this.divCaso =
            document.getElementById("caso");

        this.divDeclaraciones =
            document.getElementById("declaraciones");

        this.divResultado =
            document.getElementById("resultado");


        // ==================================================
        // Agente seleccionado por el jugador
        // ==================================================

        this.agenteSeleccionado = null;

    }


    // ======================================================
    // Limpiar
    // ======================================================

    limpiar() {

        this.divAgentes.innerHTML = "";

        this.divCaso.innerHTML = "";

        this.divDeclaraciones.innerHTML = "";

        this.divResultado.innerHTML = "";

        this.agenteSeleccionado = null;

        this.cerrarModal();

        this.cerrarModalConfirmacion();

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
            // Botón de información
            // ==================================================

            const botonInformacion =
                tarjeta.querySelector(".btn-informacion");


            if (botonInformacion) {

                botonInformacion.addEventListener(
                    "click",
                    (evento) => {

                        // Evita que el clic llegue
                        // a la tarjeta
                        evento.stopPropagation();


                        this.abrirModal(
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

                    this.abrirModalConfirmacion(
                        agente
                    );

                }
            );


            this.divAgentes.appendChild(
                tarjeta
            );

        });

    }


    // ======================================================
    // Abrir Modal de Información del Agente
    // ======================================================

    abrirModal(agente, declaraciones) {

        this.cerrarModal();

        document.body.insertAdjacentHTML(
            "beforeend",
            Modal.agente(
                agente,
                declaraciones
            )
        );


        const modal =
            document.querySelector(
                ".modal-overlay"
            );


        if (!modal)
            return;


        const botonCerrar =
            modal.querySelector(
                ".modal-cerrar"
            );


        const botonCerrarGrande =
            modal.querySelector(
                ".modal-cerrar-grande"
            );


        if (botonCerrar) {

            botonCerrar.addEventListener(
                "click",
                () => {

                    this.cerrarModal();

                }
            );

        }


        if (botonCerrarGrande) {

            botonCerrarGrande.addEventListener(
                "click",
                () => {

                    this.cerrarModal();

                }
            );

        }

    }


    // ======================================================
    // Cerrar Modal de Información
    // ======================================================

    cerrarModal() {

        const modal =
            document.querySelector(
                ".modal-overlay"
            );


        if (modal) {

            modal.remove();

        }

    }


    // ======================================================
    // Abrir Modal de Confirmación
    // ======================================================

    abrirModalConfirmacion(agente) {

        this.cerrarModalConfirmacion();


        // Guardamos temporalmente la selección
        this.agenteSeleccionado =
            agente;


        const modal =
            ModalConfirmacion.mostrar(
                agente
            );


        // ==================================================
        // Botón X
        // ==================================================

        const botonCerrar =
            modal.querySelector(
                ".modal-confirmacion-cerrar"
            );


        // ==================================================
        // Botón Cancelar
        // ==================================================

        const botonCancelar =
            modal.querySelector(
                ".btn-cancelar-culpable"
            );


        // ==================================================
        // Botón Confirmar
        // ==================================================

        const botonConfirmar =
            modal.querySelector(
                ".btn-confirmar-culpable"
            );


        // ==================================================
        // Cerrar con X
        // ==================================================

        botonCerrar.addEventListener(
            "click",
            () => {

                this.cancelarSeleccionCulpable();

            }
        );


        // ==================================================
        // Cancelar
        // ==================================================

        botonCancelar.addEventListener(
            "click",
            () => {

                this.cancelarSeleccionCulpable();

            }
        );


        // ==================================================
        // Confirmar
        // ==================================================

        botonConfirmar.addEventListener(
            "click",
            () => {

                this.confirmarSeleccionCulpable();

            }
        );

    }


    // ======================================================
    // Cancelar Selección de Culpable
    // ======================================================

    cancelarSeleccionCulpable() {

        this.agenteSeleccionado =
            null;


        this.cerrarModalConfirmacion();

    }


    // ======================================================
    // Confirmar Selección de Culpable
    // ======================================================

    confirmarSeleccionCulpable() {

        if (!this.agenteSeleccionado)
            return;


        const agente =
            this.agenteSeleccionado;


        this.cerrarModalConfirmacion();


        // ==================================================
        // POR AHORA
        // Solo registramos la selección.
        //
        // Aquí conectaremos posteriormente
        // la validación con Solucionador.
        // ==================================================

        console.log(
            "Culpable seleccionado:",
            agente.nombre
        );

    }


    // ======================================================
    // Cerrar Modal de Confirmación
    // ======================================================

    cerrarModalConfirmacion() {

        const modal =
            document.querySelector(
                ".modal-confirmacion"
            );


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


        declaraciones.forEach(
            declaracion => {

                this.divDeclaraciones.appendChild(

                    Tarjeta.declaracion(
                        declaracion
                    )

                );

            }
        );

    }


    // ======================================================
    // Mostrar Resultado
    // ======================================================

    mostrarResultado(resultado) {

        this.divResultado.innerHTML = "";


        this.divResultado.appendChild(

            Tarjeta.resultado(
                resultado
            )

        );

    }


    // ======================================================
    // Mostrar Conocimientos
    // ======================================================

    mostrarConocimientos(conocimientos) {

        conocimientos.forEach(
            conocimiento => {

                this.divResultado.appendChild(

                    Tarjeta.conocimiento(
                        conocimiento
                    )

                );

            }
        );

    }

    mostrarProgreso(capitulo, caso) {

        this.divProgreso.innerHTML = `

            <div class="progreso-capitulo">
                CAPÍTULO ${capitulo}
            </div>

            <div class="progreso-caso">
                CASO ${caso}
            </div>

            <div class="progreso-numerico">
                ${caso} / 10
            </div>

        `;

    }


    // ======================================================
    // Mostrar Errores
    // ======================================================

    mostrarErrores(errores) {

        if (!errores.length)
            return;


        this.divResultado.appendChild(

            Tarjeta.errores(
                errores
            )

        );

    }

}