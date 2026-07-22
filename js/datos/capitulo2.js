/**
 * ==========================================================
 * AI-7
 * Archivo: capitulo2.js
 * ----------------------------------------------------------
 * Capítulo 2: LA RED DE MENTIRAS
 *
 * Este capítulo contiene los casos 11 al 20.
 *
 * El capítulo utiliza 4 personajes.
 *
 * IMPORTANTE:
 * La narrativa es fija.
 * El culpable es generado dinámicamente por el motor.
 * Si el jugador pierde un caso, la narrativa permanece igual
 * y el motor puede generar una nueva solución.
 * ==========================================================
 */

const CAPITULO_2 = {

    id: 2,

    titulo: "LA RED DE MENTIRAS",

        background: "assets/img/background-capitulo2.jpg",

    descripcion: `
        Los incidentes de AI-7 ya no parecen hechos aislados.

        Las declaraciones de los agentes presentan
        cada vez más contradicciones.

        Alguien parece estar manipulando la información
        para ocultar lo que realmente está ocurriendo.
    `,

    personajes: 4,

    casos: [

        /**
         * ==================================================
         * CASO 11
         * ==================================================
         */

        {
            id: 11,

            titulo: "LA DECLARACIÓN INCONSISTENTE",

            escena: `
                Después de descubrir que los incidentes
                están relacionados, AI-7 revisa nuevamente
                las declaraciones de los agentes.

                Una de las declaraciones no coincide
                con la información registrada por el sistema.

                Cuatro agentes están relacionados
                con el nuevo incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                Las contradicciones entre las declaraciones
                podrían no ser simples errores.

                Alguien podría estar mintiendo
                deliberadamente.
            `
        },


        /**
         * ==================================================
         * CASO 12
         * ==================================================
         */

        {
            id: 12,

            titulo: "LA INFORMACIÓN FALSA",

            escena: `
                Un nuevo informe aparece dentro
                de los sistemas de AI-7.

                El documento contiene información
                que contradice los registros originales.

                No está claro quién creó el informe
                ni por qué fue introducido en el sistema.

                Cuatro agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación confirma que alguien
                está introduciendo información falsa
                dentro de AI-7.
            `
        },


        /**
         * ==================================================
         * CASO 13
         * ==================================================
         */

        {
            id: 13,

            titulo: "EL TESTIGO QUE NO VIO NADA",

            escena: `
                Un nuevo incidente ocurre
                en una zona vigilada de AI-7.

                Uno de los agentes asegura haber
                presenciado los acontecimientos.

                Sin embargo, la información disponible
                no coincide completamente con su declaración.

                Cuatro agentes están relacionados
                con el incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación revela que una declaración
                puede ser utilizada para desviar
                la atención de los hechos reales.
            `
        },


        /**
         * ==================================================
         * CASO 14
         * ==================================================
         */

        {
            id: 14,

            titulo: "EL REGISTRO CONTRADICTORIO",

            escena: `
                Dos registros de AI-7 describen
                el mismo acontecimiento.

                Sin embargo, ambos presentan
                información diferente.

                Solo uno de ellos puede corresponder
                con lo ocurrido realmente.

                Cuatro agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                Alguien está alterando la información
                de AI-7 de manera sistemática.

                La manipulación parece cada vez
                más organizada.
            `
        },


        /**
         * ==================================================
         * CASO 15
         * ==================================================
         */

        {
            id: 15,

            titulo: "LA VERSIÓN OFICIAL",

            escena: `
                AI-7 genera un informe oficial
                sobre los incidentes ocurridos.

                Poco después, aparece una segunda versión
                con información diferente.

                Ambas versiones parecen haber sido
                generadas dentro del sistema.

                Cuatro agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación revela que alguien
                está intentando controlar qué información
                queda registrada oficialmente.
            `
        },


        /**
         * ==================================================
         * CASO 16
         * ==================================================
         */

        {
            id: 16,

            titulo: "EL MENSAJE FALSO",

            escena: `
                Un mensaje interno aparece
                en los sistemas de comunicación.

                El mensaje parece haber sido enviado
                por uno de los agentes.

                Sin embargo, existen dudas sobre
                su verdadero origen.

                Cuatro agentes están relacionados
                con el incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La manipulación ya no se limita
                a los registros.

                Alguien también parece estar
                utilizando las comunicaciones
                para crear confusión.
            `
        },


        /**
         * ==================================================
         * CASO 17
         * ==================================================
         */

        {
            id: 17,

            titulo: "EL INCIDENTE REPETIDO",

            escena: `
                Un incidente similar a uno ocurrido
                anteriormente vuelve a repetirse.

                Las circunstancias son demasiado parecidas
                para considerarlas una coincidencia.

                Cuatro agentes están relacionados
                con el nuevo caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                Los incidentes parecen seguir
                un patrón repetitivo.

                Alguien podría estar utilizando
                los mismos métodos para avanzar
                dentro de AI-7.
            `
        },


        /**
         * ==================================================
         * CASO 18
         * ==================================================
         */

        {
            id: 18,

            titulo: "LA INFORMACIÓN CRUZADA",

            escena: `
                AI-7 compara los registros
                de varios incidentes.

                Parte de la información coincide.

                Otra parte parece haber sido modificada.

                Cuatro agentes están relacionados
                con el nuevo incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación comienza a revelar
                que las modificaciones realizadas
                en los registros forman parte
                de una misma estrategia.
            `
        },


        /**
         * ==================================================
         * CASO 19
         * ==================================================
         */

        {
            id: 19,

            titulo: "EL CÍRCULO DE SOSPECHOSOS",

            escena: `
                Después de analizar los incidentes
                anteriores, la investigación reduce
                el número de posibles responsables.

                Sin embargo, las declaraciones
                de los agentes continúan siendo
                contradictorias.

                Cuatro agentes están relacionados
                con el nuevo incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                El jugador comienza a comprender
                que las mentiras y las declaraciones
                contradictorias forman parte
                del mismo problema.

                Alguien está intentando mantener
                la investigación en un círculo.
            `
        },


        /**
         * ==================================================
         * CASO 20
         * ==================================================
         */

        {
            id: 20,

            titulo: "LA RED DE MENTIRAS",

            escena: `
                Un nuevo incidente obliga a AI-7
                a revisar toda la información
                recopilada durante la investigación.

                Los registros han sido modificados.

                Las comunicaciones han sido manipuladas.

                Y las declaraciones de los agentes
                presentan contradicciones.

                Cuatro agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación llega a una nueva conclusión.

                Los incidentes están conectados.

                La información está siendo manipulada.

                Y las mentiras no son hechos aislados.

                Alguien está construyendo una red
                para ocultar lo que realmente sucede
                dentro de AI-7.

                La pregunta ahora es:

                ¿Quién está detrás de todo?
            `
        }

    ]

};

export default CAPITULO_2;