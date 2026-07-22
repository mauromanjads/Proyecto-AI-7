/**
 * ==========================================================
 * AI-7
 * Archivo: capitulo4.js
 * ----------------------------------------------------------
 * Capítulo 4: LA CONSPIRACIÓN
 *
 * Este capítulo contiene los casos 31 al 40.
 *
 * El capítulo utiliza 6 personajes.
 *
 * IMPORTANTE:
 * La narrativa es fija.
 * El culpable es generado dinámicamente por el motor.
 * Si el jugador pierde un caso, la narrativa permanece igual
 * y el motor puede generar una nueva solución.
 * ==========================================================
 */

const CAPITULO_4 = {

    id: 4,

    titulo: "LA CONSPIRACIÓN",

    background: "assets/img/background-capitulo4.jpg",

    descripcion: `
        La investigación ha demostrado que los incidentes
        forman parte de una secuencia.

        Alguien intenta llegar al núcleo de AI-7.

        Sin embargo, las evidencias comienzan a indicar
        que el responsable podría no estar actuando solo.

        La investigación debe descubrir quién está
        detrás de la operación.
    `,

    personajes: 6,

    casos: [

        /**
         * ==================================================
         * CASO 31
         * ==================================================
         */

        {
            id: 31,

            titulo: "LAS CONEXIONES",

            escena: `
                AI-7 revisa nuevamente los incidentes
                ocurridos durante la investigación.

                Algunos de los agentes aparecen relacionados
                con más de un acontecimiento.

                Las conexiones entre ellos comienzan
                a llamar la atención.

                Seis agentes están relacionados
                con el nuevo incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación comienza a analizar
                no solo los incidentes,
                sino también las posibles relaciones
                entre los agentes.
            `
        },


        /**
         * ==================================================
         * CASO 32
         * ==================================================
         */

        {
            id: 32,

            titulo: "LAS VERSIONES",

            escena: `
                Varios agentes son interrogados
                nuevamente sobre acontecimientos anteriores.

                Sus declaraciones presentan diferencias
                importantes.

                Algunas versiones coinciden.

                Otras se contradicen.

                Seis agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                Las contradicciones ya no parecen
                estar limitadas a un solo incidente.

                Diferentes agentes parecen conocer
                información que no deberían tener.
            `
        },


        /**
         * ==================================================
         * CASO 33
         * ==================================================
         */

        {
            id: 33,

            titulo: "EL CONOCIMIENTO COMPARTIDO",

            escena: `
                AI-7 detecta que varios agentes
                poseen información relacionada
                con los accesos al núcleo.

                Sin embargo, ninguno reconoce
                haber participado en los incidentes.

                Seis agentes están relacionados
                con el nuevo caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación descubre que más
                de un agente podría conocer detalles
                sobre lo que está ocurriendo.
            `
        },


        /**
         * ==================================================
         * CASO 34
         * ==================================================
         */

        {
            id: 34,

            titulo: "LA INFORMACIÓN COMPARTIDA",

            escena: `
                Un nuevo incidente revela que
                información restringida ha circulado
                entre diferentes sistemas de AI-7.

                La información solo podía obtenerse
                mediante accesos específicos.

                Seis agentes están relacionados
                con el incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                Alguien está compartiendo información
                que debería permanecer protegida.

                La investigación comienza a sospechar
                que existe una coordinación entre
                diferentes acontecimientos.
            `
        },


        /**
         * ==================================================
         * CASO 35
         * ==================================================
         */

        {
            id: 35,

            titulo: "EL PLAN",

            escena: `
                AI-7 analiza la secuencia completa
                de los incidentes.

                Cada acontecimiento parece haber ocurrido
                en un momento específico.

                Cada acceso permitió avanzar
                hacia una nueva zona.

                Seis agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación llega a una conclusión
                inquietante.

                Los acontecimientos parecen seguir
                un plan previamente establecido.
            `
        },


        /**
         * ==================================================
         * CASO 36
         * ==================================================
         */

        {
            id: 36,

            titulo: "LA OPERACIÓN",

            escena: `
                Un nuevo incidente ocurre
                mientras AI-7 intenta reforzar
                la seguridad del núcleo.

                El responsable parece conocer
                las medidas de protección
                implementadas por el sistema.

                Seis agentes están relacionados
                con el incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                Alguien parece anticiparse
                a las acciones de seguridad de AI-7.

                La posibilidad de una operación
                coordinada comienza a tomar fuerza.
            `
        },


        /**
         * ==================================================
         * CASO 37
         * ==================================================
         */

        {
            id: 37,

            titulo: "LA SEÑAL",

            escena: `
                AI-7 detecta una señal irregular
                dentro de sus sistemas.

                La señal aparece durante un breve periodo
                y desaparece antes de poder ser rastreada.

                Seis agentes están relacionados
                con el nuevo incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La señal parece estar relacionada
                con los accesos anteriores.

                Alguien podría estar preparando
                el siguiente movimiento.
            `
        },


        /**
         * ==================================================
         * CASO 38
         * ==================================================
         */

        {
            id: 38,

            titulo: "EL CÍRCULO SE CIERRA",

            escena: `
                La investigación reúne información
                de todos los incidentes anteriores.

                Las conexiones entre los acontecimientos
                comienzan a formar una imagen completa.

                Sin embargo, todavía existen
                contradicciones entre las declaraciones.

                Seis agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación comienza a acercarse
                a quienes podrían estar detrás
                de la operación.

                Pero la información disponible
                todavía no permite identificar
                al responsable.
            `
        },


        /**
         * ==================================================
         * CASO 39
         * ==================================================
         */

        {
            id: 39,

            titulo: "EL ÚLTIMO OBSTÁCULO",

            escena: `
                El sistema de protección del núcleo
                registra un nuevo intento de acceso.

                Esta vez, el incidente ocurre
                justo antes de que AI-7 complete
                una revisión de seguridad.

                Seis agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación confirma que
                la operación está llegando
                a su etapa final.

                El siguiente movimiento podría
                revelar quién está detrás de todo.
            `
        },


        /**
         * ==================================================
         * CASO 40
         * ==================================================
         */

        {
            id: 40,

            titulo: "LA CONSPIRACIÓN",

            escena: `
                AI-7 reconstruye la secuencia
                completa de los acontecimientos.

                Los accesos.

                Los registros alterados.

                Las comunicaciones interceptadas.

                La información desaparecida.

                Las declaraciones contradictorias.

                Todo forma parte de una misma operación.

                Seis agentes están relacionados
                con el nuevo incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación llega a una conclusión
                que cambia completamente el caso.

                Los incidentes no fueron obra
                de acontecimientos aislados.

                Alguien diseñó una operación
                para llegar al núcleo de AI-7.

                Y existe evidencia de que
                la operación podría involucrar
                a más de una persona.

                Sin embargo, todavía falta descubrir
                quién inició todo.

                La respuesta se encuentra
                dentro del núcleo.
            `
        }

    ]

};

export default CAPITULO_4;