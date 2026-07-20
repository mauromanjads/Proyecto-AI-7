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


// ==========================================================
// Resolver caso
// ==========================================================

const solucionador = new Solucionador(caso);

const resultado = solucionador.resolver();


// ==========================================================
// INTERFAZ GRÁFICA
// ==========================================================

const divAgentes = document.getElementById("agentes");

agentes.forEach(agente => {

    const tarjeta = document.createElement("div");

    tarjeta.className = "agente";

    tarjeta.innerHTML = `
        <h3>${agente.codigo}</h3>

        <h2>${agente.icono} ${agente.nombre}</h2>

        <p>
            <strong>Especialidad:</strong>
            ${agente.especialidad}
        </p>

        <p>
            ${agente.descripcion}
        </p>

        <p>
            <strong>📏 Altura:</strong>
            ${agente.altura} cm
        </p>
    `;

    divAgentes.appendChild(tarjeta);

});


// ==========================================================
// Caso
// ==========================================================

const divCaso = document.getElementById("caso");

divCaso.innerHTML = `
<h3>${caso.nombre}</h3>

<p>${caso.descripcion}</p>

<hr>

<p>
<strong>👥 Personajes:</strong>
${caso.personajes.length}
</p>

<p>
<strong>📜 Proposiciones:</strong>
${caso.proposiciones.length}
</p>

<p>
<strong>💬 Declaraciones:</strong>
${caso.declaraciones.length}
</p>
`;


// ==========================================================
// Declaraciones
// ==========================================================

const divDeclaraciones =
    document.getElementById("declaraciones");

caso.declaraciones.forEach(declaracion => {

    const tarjeta = document.createElement("div");

    tarjeta.className = "declaracion";

    tarjeta.innerHTML = `
        <h3>
            ${declaracion.personaje.nombre}
        </h3>

        <p>
            <strong>Dice:</strong>
            "${declaracion.obtenerTexto()}"
        </p>
    `;

    divDeclaraciones.appendChild(tarjeta);

});


// ==========================================================
// Resultado del motor
// ==========================================================

const divResultado =
    document.getElementById("resultado");


const culpable =
    resultado.solucion
        ? resultado.solucion.culpable
        : null;


divResultado.innerHTML = `

<h3>
${resultado.valido
    ? "✅ Caso válido"
    : "❌ Caso inválido"}
</h3>

<hr>

<p>
<strong>🧠 Culpable encontrado por Inferencia:</strong>
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
🧠 Análisis del Motor de Inferencia
</h3>

<p>
Conocimientos obtenidos:
<strong>
${resultado.conocimientos.length}
</strong>
</p>

`;


// ==========================================================
// Mostrar conocimientos
// ==========================================================

resultado.conocimientos.forEach(conocimiento => {

    const tarjeta = document.createElement("div");

    tarjeta.className = "declaracion";

    tarjeta.innerHTML = `

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

    `;

    divResultado.appendChild(tarjeta);

});


// ==========================================================
// Mostrar errores
// ==========================================================

if (resultado.errores.length > 0) {

    const errores = document.createElement("div");

    errores.className = "declaracion";

    errores.innerHTML = `

        <h3>
            ⚠️ Errores del motor
        </h3>

        ${
            resultado.errores.map(error => `

                <p>

                    <strong>
                    ${error.tipo}
                    </strong>

                    <br>

                    ${error.mensaje}

                </p>

            `).join("")
        }

    `;

    divResultado.appendChild(errores);

}