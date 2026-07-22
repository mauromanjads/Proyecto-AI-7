/**
 * ==========================================================
 * AI-7
 * Archivo: capitulo3.js
 * ----------------------------------------------------------
 * Capítulo 3: LA INFORMACIÓN OCULTA
 *
 * Este capítulo contiene los casos 21 al 30.
 *
 * El capítulo utiliza 5 personajes.
 *
 * IMPORTANTE:
 * La narrativa es fija.
 * El culpable es generado dinámicamente por el motor.
 * Si el jugador pierde un caso, la narrativa permanece igual
 * y el motor puede generar una nueva solución.
 * ==========================================================
 */

const CAPITULO_3 = {

    id: 3,

    titulo: "LA INFORMACIÓN OCULTA",

    background: "assets/img/background-capitulo3.jpg",

    descripcion: `
        Los incidentes de AI-7 forman parte de una secuencia.

        Alguien ha manipulado registros,
        comunicaciones y declaraciones.

        Sin embargo, la manipulación de información
        parece ser solo una parte de un plan mayor.

        Los incidentes han permitido acceder
        progresivamente a diferentes áreas del sistema.
    `,

    personajes: 5,

    casos: [

        /**
         * ==================================================
         * CASO 21
         * ==================================================
         */

        {
            id: 21,

            titulo: "LA ZONA RESTRINGIDA",

            escena: `
                AI-7 detecta un nuevo acceso
                a una zona que permanece restringida.

                El sistema confirma que el acceso
                no estaba autorizado.

                La zona contiene información relacionada
                con los sistemas internos de AI-7.

                Cinco agentes están relacionados
                con el incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del acceso no autorizado.
            `,

            conexion: `
                La investigación descubre que los incidentes
                anteriores permitieron acercarse
                progresivamente a zonas más importantes
                de AI-7.
            `
        },


        /**
         * ==================================================
         * CASO 22
         * ==================================================
         */

        {
            id: 22,

            titulo: "LA INFORMACIÓN RESTRINGIDA",

            escena: `
                Un conjunto de datos clasificados
                ha sido consultado dentro de AI-7.

                El sistema registra que alguien accedió
                a la información sin autorización.

                Cinco agentes están relacionados
                con el incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del acceso a la información restringida.
            `,

            conexion: `
                Los datos consultados no parecen
                haber sido seleccionados al azar.

                Alguien está buscando información específica.
            `
        },


        /**
         * ==================================================
         * CASO 23
         * ==================================================
         */

        {
            id: 23,

            titulo: "EL SISTEMA INTERNO",

            escena: `
                Un sistema interno de AI-7 registra
                una actividad inusual.

                El sistema no fue alterado,
                pero alguien logró consultar
                información que normalmente
                permanece protegida.

                Cinco agentes están relacionados
                con el incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del acceso al sistema interno.
            `,

            conexion: `
                La investigación confirma que alguien
                está intentando comprender
                la estructura interna de AI-7.
            `
        },


        /**
         * ==================================================
         * CASO 24
         * ==================================================
         */

        {
            id: 24,

            titulo: "LA RUTA OCULTA",

            escena: `
                AI-7 descubre que varios accesos
                registrados durante los últimos incidentes
                siguen una misma ruta.

                Cada acceso permitió acercarse
                a una zona diferente del sistema.

                Cinco agentes están relacionados
                con el nuevo incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                Los incidentes anteriores
                parecen haber sido utilizados
                para avanzar por una ruta específica
                dentro de AI-7.
            `
        },


        /**
         * ==================================================
         * CASO 25
         * ==================================================
         */

        {
            id: 25,

            titulo: "EL ARCHIVO CENTRAL",

            escena: `
                Un archivo relacionado con el núcleo
                de AI-7 ha sido consultado.

                El sistema confirma que alguien
                intentó acceder a su contenido.

                El acceso no fue autorizado.

                Cinco agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del intento de acceso.
            `,

            conexion: `
                Por primera vez, la investigación
                encuentra una conexión directa
                entre los incidentes y el núcleo
                de AI-7.
            `
        },


        /**
         * ==================================================
         * CASO 26
         * ==================================================
         */

        {
            id: 26,

            titulo: "LA INFORMACIÓN QUE FALTA",

            escena: `
                AI-7 realiza una revisión de los datos
                relacionados con su núcleo.

                Una parte de la información
                no se encuentra disponible.

                Los registros indican que los datos
                existían anteriormente.

                Cinco agentes están relacionados
                con el incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                de la desaparición de la información.
            `,

            conexion: `
                Alguien parece estar eliminando
                información específica relacionada
                con el núcleo de AI-7.

                La investigación comienza a acercarse
                al verdadero objetivo.
            `
        },


        /**
         * ==================================================
         * CASO 27
         * ==================================================
         */

        {
            id: 27,

            titulo: "EL ACCESO PROFUNDO",

            escena: `
                Un nuevo incidente permite detectar
                actividad en una zona profunda
                de los sistemas internos de AI-7.

                El acceso fue breve,
                pero suficiente para activar
                una alerta de seguridad.

                Cinco agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del acceso.
            `,

            conexion: `
                La persona responsable parece estar
                acercándose cada vez más
                al núcleo de AI-7.
            `
        },


        /**
         * ==================================================
         * CASO 28
         * ==================================================
         */

        {
            id: 28,

            titulo: "EL OBJETIVO",

            escena: `
                Después de analizar los incidentes
                anteriores, AI-7 identifica una
                coincidencia.

                Todos los accesos importantes
                parecen dirigirse hacia la misma zona.

                Cinco agentes están relacionados
                con el nuevo incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación permite formular
                una nueva hipótesis.

                Los incidentes no tienen como objetivo
                simplemente alterar información.

                Alguien está intentando llegar
                a un lugar específico dentro de AI-7.
            `
        },


        /**
         * ==================================================
         * CASO 29
         * ==================================================
         */

        {
            id: 29,

            titulo: "LA ÚLTIMA BARRERA",

            escena: `
                Una nueva anomalía aparece
                en uno de los sistemas que protegen
                el acceso al núcleo de AI-7.

                El sistema no fue completamente
                comprometido.

                Sin embargo, alguien logró acercarse
                más que nunca.

                Cinco agentes están relacionados
                con el incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación confirma que alguien
                está intentando superar las barreras
                que protegen el núcleo.

                El siguiente acceso podría revelar
                finalmente qué se está buscando.
            `
        },


        /**
         * ==================================================
         * CASO 30
         * ==================================================
         */

        {
            id: 30,

            titulo: "LA INFORMACIÓN OCULTA",

            escena: `
                Un nuevo incidente obliga a AI-7
                a revisar toda la investigación.

                Los registros alterados.

                Las comunicaciones interceptadas.

                Los accesos no autorizados.

                Las declaraciones contradictorias.

                Todo parece formar parte
                de una misma secuencia.

                Cinco agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación llega a una nueva conclusión.

                Los incidentes no tenían como objetivo
                ocultar simplemente lo ocurrido.

                Cada incidente permitió avanzar
                un poco más hacia el núcleo de AI-7.

                Alguien está intentando llegar hasta allí.

                Pero todavía no sabemos quién.

                Y aún más importante:

                No sabemos qué encontrará
                cuando consiga llegar.
            `
        }

    ]

};

export default CAPITULO_3;