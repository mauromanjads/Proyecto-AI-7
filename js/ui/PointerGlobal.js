/**
 * ==========================================================
 * AI-7
 * Archivo: PointerGlobal.js
 * ----------------------------------------------------------
 * Pointer visual global del juego.
 *
 * Responsabilidades:
 * - Ocultar el cursor nativo sobre elementos interactivos.
 * - Mostrar una mano holográfica personalizada.
 * - Seguir el movimiento del mouse.
 * - Detectar elementos con [data-pointer].
 * - Cambiar de estado al pasar sobre elementos interactivos.
 * - Animar la mano al presionar.
 * - Funcionar con mouse, touch y stylus.
 *
 * Uso:
 *
 * <button data-pointer>
 *     Nuevo caso
 * </button>
 *
 * <div data-pointer>
 *     ATLAS
 * </div>
 * ==========================================================
 */

export default class PointerGlobal {

    constructor() {

        this.pointer = null;

        this.icono = null;

        this.activo = false;

        this.presionando = false;

        this.elementoActivo = null;

    }


    iniciar() {

        this.crearPointer();

        this.configurarEventos();

    }


    /* ======================================================
       CREAR POINTER GLOBAL
       ====================================================== */

    crearPointer() {

        if (
            document.getElementById(
                "pointer-global"
            )
        ) {

            this.pointer =
                document.getElementById(
                    "pointer-global"
                );

            this.icono =
                this.pointer.querySelector(
                    ".pointer-global-icono"
                );

            return;

        }


        this.pointer =
            document.createElement(
                "div"
            );


        this.pointer.id =
            "pointer-global";


        this.pointer.innerHTML = `

            <span
                class="pointer-global-aura"
            ></span>

            <span
                class="pointer-global-icono"
            >
                🖐
            </span>

        `;


        document.body.appendChild(
            this.pointer
        );


        this.icono =
            this.pointer.querySelector(
                ".pointer-global-icono"
            );

    }


    /* ======================================================
       CONFIGURAR EVENTOS
       ====================================================== */

    configurarEventos() {


        /* ==================================================
           MOVIMIENTO DEL POINTER
           ================================================== */

        document.addEventListener(
            "pointermove",
            (evento) => {

                this.mover(
                    evento
                );

                this.detectarElemento(
                    evento
                );

            },
            {
                passive: true
            }
        );


        /* ==================================================
           ENTRADA DEL POINTER
           ================================================== */

        document.addEventListener(
            "pointerover",
            (evento) => {

                this.mover(
                    evento
                );

                this.detectarElemento(
                    evento
                );

            },
            {
                passive: true
            }
        );


        /* ==================================================
           PRESIONAR
           ================================================== */

        document.addEventListener(
            "pointerdown",
            (evento) => {

                this.presionar(
                    evento
                );

            }
        );


        /* ==================================================
           SOLTAR
           ================================================== */

        document.addEventListener(
            "pointerup",
            () => {

                this.soltar();

            }
        );


        /* ==================================================
           CANCELAR
           ================================================== */

        document.addEventListener(
            "pointercancel",
            () => {

                this.soltar();

            }
        );


        /* ==================================================
           SALIR DE LA VENTANA
           ================================================== */

        document.addEventListener(
            "pointerout",
            (evento) => {

                if (
                    !evento.relatedTarget
                ) {

                    this.ocultar();

                }

            },
            {
                passive: true
            }
        );

    }


    /* ======================================================
       MOVER POINTER
       ====================================================== */

    mover(evento) {

        if (!this.pointer) {
            return;
        }


        this.pointer.style.left =
            `${evento.clientX}px`;


        this.pointer.style.top =
            `${evento.clientY}px`;


        this.mostrar();

    }


    /* ======================================================
       DETECTAR ELEMENTO INTERACTIVO
       ====================================================== */

    detectarElemento(evento) {

        const elemento =
            evento.target.closest(
                "[data-pointer]"
            );


        if (
            elemento ===
            this.elementoActivo
        ) {

            return;

        }


        if (
            this.elementoActivo
        ) {

            this.elementoActivo.classList.remove(
                "pointer-hover"
            );

        }


        this.elementoActivo =
            elemento;


        if (
            this.elementoActivo
        ) {

            this.elementoActivo.classList.add(
                "pointer-hover"
            );


            this.pointer.classList.add(
                "pointer-sobre-elemento"
            );

        }
        else {

            this.pointer.classList.remove(
                "pointer-sobre-elemento"
            );

        }

    }


    /* ======================================================
       PRESIONAR
       ====================================================== */

    presionar(evento) {

        this.presionando =
            true;


        this.mover(
            evento
        );


        this.pointer.classList.add(
            "pointer-presionado"
        );


        if (
            this.elementoActivo
        ) {

            this.elementoActivo.classList.add(
                "pointer-pressed"
            );

        }

    }


    /* ======================================================
       SOLTAR
       ====================================================== */

    soltar() {

        this.presionando =
            false;


        this.pointer.classList.remove(
            "pointer-presionado"
        );


        if (
            this.elementoActivo
        ) {

            this.elementoActivo.classList.remove(
                "pointer-pressed"
            );

        }

    }


    /* ======================================================
       MOSTRAR
       ====================================================== */

    mostrar() {

        if (
            this.activo
        ) {

            return;

        }


        this.activo =
            true;


        this.pointer.classList.add(
            "pointer-visible"
        );

    }


    /* ======================================================
       OCULTAR
       ====================================================== */

    ocultar() {

        this.activo =
            false;


        this.pointer.classList.remove(
            "pointer-visible"
        );

    }

}