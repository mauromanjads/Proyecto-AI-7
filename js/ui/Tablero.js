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

    constructor(juego) {

        this.juego = juego;

        this.divProgreso =
            document.getElementById("progreso");

        this.tituloCapitulo =
            document.getElementById("titulo-capitulo");

        this.divAgentes =
            document.getElementById("agentes");

        this.divCaso =
            document.getElementById("caso");

        this.divDeclaraciones =
            document.getElementById("declaraciones");

        this.divResultado =
            document.getElementById("resultado");

        this.agenteSeleccionado = null;
    }


    // ======================================================
    // LIMPIAR
    // ======================================================

    limpiar() {

        this.divAgentes.innerHTML = "";
        this.divCaso.innerHTML = "";

        if (this.divDeclaraciones) {
            this.divDeclaraciones.innerHTML = "";
        }

        this.divResultado.innerHTML = "";

        this.agenteSeleccionado = null;

        this.cerrarModal();
        this.cerrarModalConfirmacion();
    }


    // ======================================================
    // MOSTRAR AGENTES
    // ======================================================

    mostrarAgentes(agentes, declaraciones) {

        this.divAgentes.innerHTML = "";

        agentes.forEach(agente => {

            const declaracionesAgente =
                declaraciones.filter(
                    declaracion =>
                        declaracion.personaje.nombre ===
                        agente.nombre
                );

            const tarjeta =
                Tarjeta.agente(agente);


            // Botón de declaraciones

            const botonMensajes =
                tarjeta.querySelector(".btn-mensajes");

            if (botonMensajes) {

                botonMensajes.addEventListener(
                    "click",
                    evento => {

                        evento.stopPropagation();

                        new Mensajes().mostrar(
                            agente,
                            declaracionesAgente
                        );

                    }
                );

            }


            // Botón de información

            const botonInformacion =
                tarjeta.querySelector(".btn-informacion");

            if (botonInformacion) {

                botonInformacion.addEventListener(
                    "click",
                    evento => {

                        evento.stopPropagation();

                        this.abrirModal(
                            agente,
                            declaracionesAgente
                        );

                    }
                );

            }


            // Seleccionar posible culpable

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
    // MODAL DE INFORMACIÓN
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
            document.querySelector(".modal-overlay");

        if (!modal)
            return;

        const botonCerrar =
            modal.querySelector(".modal-cerrar");

        const botonCerrarGrande =
            modal.querySelector(".modal-cerrar-grande");

        if (botonCerrar) {

            botonCerrar.addEventListener(
                "click",
                () => this.cerrarModal()
            );

        }

        if (botonCerrarGrande) {

            botonCerrarGrande.addEventListener(
                "click",
                () => this.cerrarModal()
            );

        }

    }


    cerrarModal() {

        const modal =
            document.querySelector(".modal-overlay");

        if (modal) {
            modal.remove();
        }

    }


    // ======================================================
    // MODAL DE CONFIRMACIÓN
    // ======================================================

    abrirModalConfirmacion(agente) {

        this.cerrarModalConfirmacion();

        this.agenteSeleccionado =
            agente;

        const modal =
            ModalConfirmacion.mostrar(
                agente
            );

        const botonCerrar =
            modal.querySelector(
                ".modal-confirmacion-cerrar"
            );

        const botonCancelar =
            modal.querySelector(
                ".btn-cancelar-culpable"
            );

        const botonConfirmar =
            modal.querySelector(
                ".btn-confirmar-culpable"
            );


        if (botonCerrar) {

            botonCerrar.addEventListener(
                "click",
                () => this.cancelarSeleccionCulpable()
            );

        }


        if (botonCancelar) {

            botonCancelar.addEventListener(
                "click",
                () => this.cancelarSeleccionCulpable()
            );

        }


        if (botonConfirmar) {

            botonConfirmar.addEventListener(
                "click",
                () => this.confirmarSeleccionCulpable()
            );

        }

    }


    cancelarSeleccionCulpable() {

        this.agenteSeleccionado =
            null;

        this.cerrarModalConfirmacion();

    }


    confirmarSeleccionCulpable() {

        if (!this.agenteSeleccionado)
            return;

        const agente =
            this.agenteSeleccionado;

        this.agenteSeleccionado =
            null;

        this.cerrarModalConfirmacion();

        this.juego.verificarCulpable(
            agente
        );

    }


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
    // CASO
    // ======================================================

    mostrarCaso(caso) {

        this.divCaso.innerHTML = "";

        this.divCaso.appendChild(
            Tarjeta.caso(caso)
        );

    }


    // ======================================================
    // DECLARACIONES
    // ======================================================

    mostrarDeclaraciones(declaraciones) {

        if (!this.divDeclaraciones)
            return;

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
    // RESULTADO TEMPORAL
    // ======================================================

    mostrarResultado(resultado) {

        this.divResultado.innerHTML = "";

        this.divResultado.appendChild(
            Tarjeta.resultado(resultado)
        );

    }


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


    // ======================================================
    // PROGRESO
    // ======================================================

    mostrarProgreso(capitulo, caso) {

        let nodos = "";

        for (let i = 1; i <= 10; i++) {

            let estado = "";

            if (i < caso) {
                estado = "completado";
            }
            else if (i === caso) {
                estado = "activo";
            }

            nodos += `

                <div class="progreso-nodo-contenedor ${estado}">

                    <div class="progreso-nodo ${estado}"></div>

                    <span class="progreso-nodo-numero">
                        ${i}
                    </span>

                </div>

            `;

        }

        this.divProgreso.innerHTML = `

            <div class="progreso-nodos">
                ${nodos}
            </div>

        `;

    }


    // ======================================================
    // NARRATIVA
    // ======================================================

    mostrarNarrativa(capitulo, caso) {

        if (!capitulo || !caso)
            return;


        // El título del capítulo se muestra únicamente
        // en #titulo-capitulo.

        if (this.tituloCapitulo) {

            this.tituloCapitulo.textContent =
                capitulo.titulo;

        }


        // Dentro de #caso solamente aparece
        // la información del caso actual.

        this.divCaso.innerHTML = `

            <div class="narrativa-caso">

                <h2>
                    ${caso.titulo}
                </h2>

                <div class="narrativa-bloque">

                    <h3>ESCENA</h3>

                    <p>
                        ${caso.escena}
                    </p>

                </div>

                <div class="narrativa-bloque">

                    <h3>OBJETIVO</h3>

                    <p>
                        ${caso.objetivo}
                    </p>

                </div>

                <div class="narrativa-bloque">

                    <h3>CONEXIÓN</h3>

                    <p>
                        ${caso.conexion}
                    </p>

                </div>

            </div>

        `;

    }


    // ======================================================
    // ERRORES
    // ======================================================

    mostrarErrores(errores) {

        if (!errores.length)
            return;

        this.divResultado.appendChild(
            Tarjeta.errores(errores)
        );

    }

        aplicarFondoCapitulo(capitulo) {

        if (!capitulo?.background)
            return;

        document.body.style.backgroundImage =
            `url("${capitulo.background}")`;

    }

}