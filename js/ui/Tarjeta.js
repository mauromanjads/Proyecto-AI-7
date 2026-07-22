/**
 * ==========================================================
 * AI-7
 * Archivo: Tarjeta.js
 * ----------------------------------------------------------
 * Fábrica de componentes visuales.
 * ==========================================================
 */

export default class Tarjeta {

    // ======================================================
    // Crear componente base
    // ======================================================

    static crear(clase = "", html = "") {

        const elemento = document.createElement("div");

        if (clase) {

            elemento.className = clase;

        }

        elemento.innerHTML = html;

        return elemento;

    }

   // ======================================================
    // Agente
    // ======================================================


    static agente(agente) {

        const tarjeta = this.crear("agente", `

            <div class="agente-badge" style="background:${agente.color}">
                ${agente.codigo}
            </div>

            <div class="agente-header">

                <div class="agente-icono">
                    ${agente.icono}
                </div>

                <div class="agente-titulo">
                    <h2>${agente.nombre}</h2>
                </div>

            </div>

            <div class="agente-imagen">

                ${
                    agente.avatar
                    ?
                    `<img src="assets/img/${agente.avatar}" alt="${agente.nombre}">`
                    :
                    ""
                }

            </div>

            <button
                class="btn-mensajes"
                type="button">
                💬 Ver declaraciones
            </button>

        `);

        // Guardamos el personaje en la tarjeta
        // para utilizarlo cuando se pulse
        // el botón de declaraciones.
        tarjeta.agente = agente;

        return tarjeta;
    }
    // ======================================================
    // Caso
    // ======================================================

    static caso(caso) {

        return this.crear("", `

            <h3>${caso.nombre}</h3>

            <p>${caso.descripcion}</p>

            <hr>

             <p>

              
                   <strong>📜 Proposiciones:</strong>

                ${caso.proposiciones.length}


            </p>

            <p>

                <strong>👥 Personajes:</strong>

                ${caso.personajes.length}

            </p>

            <p>

             

            </p>

           

        `);

    }

    // ======================================================
    // Declaración
    // ======================================================

    static declaracion(declaracion) {

        return this.crear("declaracion", `

            <h3>

                ${declaracion.personaje.nombre}

            </h3>

            <p>

                <strong>Dice:</strong>

                "${declaracion.obtenerTexto()}"

            </p>

        `);

    }

    // ======================================================
    // Resultado
    // ======================================================

    static resultado(resultado) {

        const culpable =
            resultado.solucion
                ? resultado.solucion.culpable
                : null;

        return this.crear("", `

            <h3>

                ${resultado.valido
                    ? "✅ Caso válido"
                    : "❌ Caso inválido"}

            </h3>

            <hr>

            <p>

                <strong>

                    🧠 Culpable encontrado por Inferencia

                </strong>

            </p>

            <h2 style="color:#22c55e">

                ${culpable
                    ? culpable.nombre
                    : "Sin solución"}

            </h2>

            ${

                culpable

                    ?

                    `

                    <p>

                        <strong>Especialidad:</strong>

                        ${culpable.especialidad}

                    </p>

                    <p>

                        <strong>📏 Altura:</strong>

                        ${culpable.altura} cm

                    </p>

                    `

                    :

                    ""

            }

            <hr>

            <h3>

                🧠 Análisis del Motor

            </h3>

            <p>

                Conocimientos obtenidos:

                <strong>

                    ${resultado.conocimientos.length}

                </strong>

            </p>

        `);

    }

    // ======================================================
    // Conocimiento
    // ======================================================

    static conocimiento(conocimiento) {

        return this.crear("declaracion", `

            <h4>

                ${conocimiento.personaje.nombre}

            </h4>

            <p>

                <strong>Proposición:</strong>

                ${conocimiento.texto}

            </p>

            <p>

                <strong>Evaluación:</strong>

                ${

                    conocimiento.valorDeclaracion

                        ? "✅ Verdadera"

                        : "❌ Falsa"

                }

            </p>

            <p>

                <strong>Estado:</strong>

                ${

                    conocimiento.diceVerdad

                        ? "Dice la verdad"

                        : "Miente"

                }

            </p>

        `);

    }

    // ======================================================
    // Errores
    // ======================================================

    static errores(errores) {

        return this.crear("declaracion", `

            <h3>

                ⚠️ Errores del motor

            </h3>

            ${

                errores.map(error => `

                    <p>

                        <strong>

                            ${error.tipo}

                        </strong>

                        <br>

                        ${error.mensaje}

                    </p>

                `).join("")

            }

        `);

    }

}