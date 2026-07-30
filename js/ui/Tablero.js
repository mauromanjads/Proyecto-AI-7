import Tarjeta from "./Tarjeta.js";
import Modal from "./Modal.js";
import ModalConfirmacion from "./ModalConfirmacion.js";
import Mensajes from "./Mensajes.js";

export default class Tablero {
    constructor(juego) {
        this.juego = juego;
        this.tableroAgentes = null;
        this.divProgreso = document.getElementById("progreso");
        this.tituloCapitulo = document.getElementById("titulo-capitulo");
        this.divAgentes = document.getElementById("agentes");
        this.divCaso = document.getElementById("caso");
        this.divDeclaraciones = document.getElementById("declaraciones");
        this.divResultado = document.getElementById("resultado");
        this.agenteSeleccionado = null;
    }

    limpiar() {
        this.divAgentes.innerHTML = "";
        this.divCaso.innerHTML = "";
        if (this.divDeclaraciones) this.divDeclaraciones.innerHTML = "";
        this.divResultado.innerHTML = "";
        this.agenteSeleccionado = null;
        this.cerrarMenusNarrativos();
        this.cerrarModal();
        this.cerrarModalConfirmacion();
        this.cerrarModalNarrativo();
    }

    mostrarAgentes(agentes, declaraciones) {

        if (this.tableroAgentes) {
            this.tableroAgentes.cargarAgentes(agentes);
        }

        this.divAgentes.innerHTML = "";

        agentes.forEach(agente => {
            const declaracionesAgente = declaraciones.filter(
                declaracion => declaracion.personaje.nombre === agente.nombre
            );

            const tarjeta = Tarjeta.agente(agente);
            const botonMensajes = tarjeta.querySelector(".btn-mensajes");
            const botonInformacion = tarjeta.querySelector(".btn-informacion");

            if (botonMensajes) {
                botonMensajes.addEventListener("click", evento => {
                    evento.stopPropagation();
                    new Mensajes().mostrar(agente, declaracionesAgente);
                });
            }

            if (botonInformacion) {
                botonInformacion.addEventListener("click", evento => {
                    evento.stopPropagation();
                    this.abrirModal(agente, declaracionesAgente);
                });
            }

            tarjeta.addEventListener("click", () => {
                this.abrirModalConfirmacion(agente);
            });

            this.divAgentes.appendChild(tarjeta);
        });
    }

    abrirModal(agente, declaraciones) {
        this.cerrarModal();

        document.body.insertAdjacentHTML(
            "beforeend",
            Modal.agente(agente, declaraciones)
        );

        const modal = document.querySelector(".modal-overlay");

        if (!modal) return;

        const cerrar = () => this.cerrarModal();
        const botonCerrar = modal.querySelector(".modal-cerrar");
        const botonCerrarGrande = modal.querySelector(".modal-cerrar-grande");

        if (botonCerrar) {
            botonCerrar.addEventListener("click", cerrar);
        }

        if (botonCerrarGrande) {
            botonCerrarGrande.addEventListener("click", cerrar);
        }
    }

    cerrarModal() {
        document.querySelector(".modal-overlay")?.remove();
    }

    abrirModalConfirmacion(agente) {
        this.cerrarModalConfirmacion();

        this.agenteSeleccionado = agente;

        const modal = ModalConfirmacion.mostrar(agente);
        const cancelar = () => this.cancelarSeleccionCulpable();
        const botonCerrar = modal.querySelector(".modal-confirmacion-cerrar");
        const botonCancelar = modal.querySelector(".btn-cancelar-culpable");
        const botonConfirmar = modal.querySelector(".btn-confirmar-culpable");

        if (botonCerrar) {
            botonCerrar.addEventListener("click", cancelar);
        }

        if (botonCancelar) {
            botonCancelar.addEventListener("click", cancelar);
        }

        if (botonConfirmar) {
            botonConfirmar.addEventListener(
                "click",
                () => this.confirmarSeleccionCulpable()
            );
        }
    }

    cancelarSeleccionCulpable() {
        this.agenteSeleccionado = null;
        this.cerrarModalConfirmacion();
    }

    confirmarSeleccionCulpable() {
        if (!this.agenteSeleccionado) return;

        const agente = this.agenteSeleccionado;

        this.agenteSeleccionado = null;
        this.cerrarModalConfirmacion();

        this.juego.verificarCulpable(agente);
    }

    cerrarModalConfirmacion() {
        document.querySelector(".modal-confirmacion")?.remove();
    }

    mostrarCaso(caso) {
        this.divCaso.innerHTML = "";
        this.divCaso.appendChild(Tarjeta.caso(caso));
    }

    mostrarDeclaraciones(declaraciones) {
        if (!this.divDeclaraciones) return;

        this.divDeclaraciones.innerHTML = "";

        declaraciones.forEach(declaracion => {
            this.divDeclaraciones.appendChild(
                Tarjeta.declaracion(declaracion)
            );
        });
    }

    mostrarResultado(resultado) {
        this.divResultado.innerHTML = "";
        this.divResultado.appendChild(
            Tarjeta.resultado(resultado)
        );
    }

    mostrarConocimientos(conocimientos) {
        conocimientos.forEach(conocimiento => {
            this.divResultado.appendChild(
                Tarjeta.conocimiento(conocimiento)
            );
        });
    }

    mostrarProgreso(capitulo, caso) {
        let nodos = "";

        for (let i = 1; i <= 10; i++) {
            const estado =
                i < caso
                    ? "completado"
                    : i === caso
                        ? "activo"
                        : "";

            nodos += `<div class="progreso-nodo-contenedor ${estado}"><div class="progreso-nodo ${estado}"></div><span class="progreso-nodo-numero">${i}</span></div>`;
        }

        this.divProgreso.innerHTML = `<div class="progreso-nodos">${nodos}</div>`;
    }

    mostrarNarrativa(capitulo, caso, numeroCaso) {
        if (!capitulo || !caso) return;

        this.cerrarMenusNarrativos();

        if (this.tituloCapitulo) {
            this.tituloCapitulo.textContent = capitulo.titulo;
        }

        this.divCaso.innerHTML = "";

        const menusNarrativos = document.createElement("div");
        menusNarrativos.id = "menus-narrativos";

        const contenedorCapitulo = document.createElement("div");
        contenedorCapitulo.id = "capitulo-narrativo";
        contenedorCapitulo.className = "registro-eventos";

        const botonCapitulo = document.createElement("button");
        botonCapitulo.type = "button";
        botonCapitulo.dataset.pointer = "";
        botonCapitulo.className = "registro-eventos-toggle";
        botonCapitulo.innerHTML = `<div class="registro-eventos-icono">◈</div><h3>CAPÍTULO ${this.juego.capituloActual + 1}</h3><span class="registro-eventos-flecha">▾</span>`;

        botonCapitulo.addEventListener("click", evento => {
            evento.stopPropagation();

            this.abrirModalNarrativo(
                `CAPÍTULO ${this.juego.capituloActual + 1}`,
                capitulo.titulo,
                capitulo.descripcion
            );
        });

        contenedorCapitulo.appendChild(botonCapitulo);

        const contenedorEvento = document.createElement("div");
        contenedorEvento.id = "registro-eventos";
        contenedorEvento.className = "registro-eventos";

        const botonEvento = document.createElement("button");
        botonEvento.type = "button";
        botonEvento.dataset.pointer = "";
        botonEvento.className = "registro-eventos-toggle";
        botonEvento.innerHTML = `<div class="registro-eventos-icono">◈</div><h3>EVENTO #${numeroCaso}</h3><span class="registro-eventos-flecha">▾</span>`;

        botonEvento.addEventListener("click", evento => {
            evento.stopPropagation();

            this.abrirModalNarrativo(
                `EVENTO #${numeroCaso}`,
                caso.titulo,
                caso.escena
            );
        });

        contenedorEvento.appendChild(botonEvento);

        const contenedorNexus = document.createElement("div");
        contenedorNexus.id = "analisis-nexus";
        contenedorNexus.className = "analisis-nexus";

        const botonNexus = document.createElement("button");
        botonNexus.type = "button";
        botonNexus.dataset.pointer = "";
        botonNexus.className = "registro-eventos-toggle";
        botonNexus.innerHTML = `<div class="registro-eventos-icono">⌬</div><h3>ANÁLISIS NEXUS</h3><span class="registro-eventos-flecha">▾</span>`;

        botonNexus.addEventListener("click", evento => {
            evento.stopPropagation();

            this.abrirModalNarrativo(
                "ANÁLISIS NEXUS...",
                "Algoritmo procesado",
                caso.conexion
            );
        });

        contenedorNexus.appendChild(botonNexus);

        const contenedorProgreso = document.createElement("div");
        contenedorProgreso.id = "contenedor-progreso";

        contenedorProgreso.append(
            this.tituloCapitulo,
            this.divProgreso
        );

        menusNarrativos.append(
            contenedorCapitulo,
            contenedorEvento,
            contenedorNexus,
            contenedorProgreso
        );

        this.divCaso.parentElement.insertBefore(
            menusNarrativos,
            this.divCaso
        );
    }

    abrirModalNarrativo(titulo, contenidoTitulo, contenido) {
        this.cerrarModalNarrativo();

        document.body.insertAdjacentHTML(
            "beforeend",
            Modal.narrativo(
                titulo,
                contenidoTitulo,
                contenido
            )
        );

        const modal = document.querySelector(".modal-narrativo");

        if (!modal) return;

        const cerrar = () => this.cerrarModalNarrativo();

        const botonCerrar = modal.querySelector(
            ".modal-narrativo-cerrar"
        );

        const botonCerrarGrande = modal.querySelector(
            ".modal-narrativo-cerrar-grande"
        );

        if (botonCerrar) {
            botonCerrar.addEventListener("click", cerrar);
        }

        if (botonCerrarGrande) {
            botonCerrarGrande.addEventListener("click", cerrar);
        }
    }

    cerrarModalNarrativo() {
        document.querySelector(".modal-narrativo")?.closest(".modal-overlay")?.remove();
    }

    cerrarMenusNarrativos() {
        document.getElementById("menus-narrativos")?.remove();
    }

    mostrarErrores(errores) {
        if (!errores.length) return;

        this.divResultado.appendChild(
            Tarjeta.errores(errores)
        );
    }

    aplicarFondoCapitulo(capitulo) {
        if (!capitulo?.background) return;

        this.divAgentes.style.backgroundImage =
            `url("${capitulo.background}")`;

        document.body.style.backgroundImage =
            `url("assets/img/fondo.jpg")`;
    }
}