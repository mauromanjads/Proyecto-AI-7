/**
 * ==========================================================
 * AI-7
 * Archivo: capitulo1.js
 * ----------------------------------------------------------
 * Capítulo 1: EL PRIMER INCIDENTE
 *
 * Este capítulo contiene los casos 1 al 10.
 *
 * El capítulo utiliza 3 personajes.
 *
 * IMPORTANTE:
 * La narrativa es fija.
 * El culpable es generado dinámicamente por el motor.
 * Si el jugador pierde un caso, la narrativa permanece igual
 * y el motor puede generar una nueva solución.
 * ==========================================================
 */

const CAPITULO_1 = {

    id: 1,

    titulo: "EL PRIMER INCIDENTE",

    background: "assets/img/background-capitulo1.jpg",

    descripcion: `
        Los primeros incidentes parecen ser hechos aislados
        dentro de AI-7.

        Sin embargo, a medida que avanza la investigación,
        comienza a aparecer un patrón.

        Algo está ocurriendo dentro de la instalación.
    `,

    personajes: 3,

    casos: [

        /**
         * ==================================================
         * CASO 01
         * ==================================================
         */

        {
            id: 1,

            titulo: "ACCESO NO AUTORIZADO",

            escena: `
                A las 22:30, el sistema de seguridad
                de AI-7 detectó un acceso no autorizado
                al laboratorio de investigación.

                Tres agentes estaban relacionados
                con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién es el responsable
                del acceso no autorizado.
            `,

            conexion: `
                El incidente no parece ser un simple
                error de seguridad.

                Alguien logró acceder a una zona
                restringida de AI-7.
            `
        },


        /**
         * ==================================================
         * CASO 02
         * ==================================================
         */

        {
            id: 2,

            titulo: "EL REGISTRO ALTERADO",

            escena: `
                Poco después del primer incidente,
                AI-7 detecta una nueva anomalía.

                El registro de seguridad que documentaba
                el acceso al laboratorio ha sido modificado.

                La información original ya no coincide
                con los registros actuales.

                Tres agentes están relacionados
                con el incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                de alterar el registro de seguridad.
            `,

            conexion: `
                Alguien parece estar intentando
                modificar la información relacionada
                con los acontecimientos ocurridos
                dentro de AI-7.
            `
        },


        /**
         * ==================================================
         * CASO 03
         * ==================================================
         */

        {
            id: 3,

            titulo: "LA INTERRUPCIÓN",

            escena: `
                El sistema de seguridad vuelve
                a presentar una anomalía.

                Durante varios minutos,
                las cámaras de una zona de AI-7
                dejaron de funcionar.

                Mientras el sistema estaba fuera
                de servicio, ocurrió un nuevo incidente.

                Tres agentes estaban relacionados
                con lo ocurrido.
            `,

            objetivo: `
                Determinar quién es responsable
                de la interrupción del sistema.
            `,

            conexion: `
                La interrupción parece haber sido
                provocada deliberadamente.

                Alguien necesitaba que una parte
                de AI-7 quedara temporalmente
                fuera de vigilancia.
            `
        },


        /**
         * ==================================================
         * CASO 04
         * ==================================================
         */

        {
            id: 4,

            titulo: "EL ARCHIVO DESAPARECIDO",

            escena: `
                Un archivo relacionado con los
                primeros incidentes desapareció
                de los sistemas de AI-7.

                El sistema confirma que el archivo
                existía poco antes de desaparecer.

                Ninguno de los agentes relacionados
                admite haberlo eliminado.

                Tres agentes están vinculados
                con el incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                de la desaparición del archivo.
            `,

            conexion: `
                Por primera vez, la investigación
                apunta directamente a la posibilidad
                de que alguien esté eliminando
                evidencias.
            `
        },


        /**
         * ==================================================
         * CASO 05
         * ==================================================
         */

        {
            id: 5,

            titulo: "EL MENSAJE INTERCEPTADO",

            escena: `
                Una comunicación interna debía llegar
                a uno de los agentes.

                El mensaje fue enviado correctamente,
                pero nunca llegó a su destino.

                AI-7 confirma que la comunicación
                fue interceptada antes de ser recibida.

                Tres agentes están relacionados
                con el incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                de interceptar la comunicación.
            `,

            conexion: `
                Alguien parece estar controlando
                la información que circula dentro
                de AI-7.

                Los incidentes anteriores podrían
                estar relacionados con este nuevo hecho.
            `
        },


        /**
         * ==================================================
         * CASO 06
         * ==================================================
         */

        {
            id: 6,

            titulo: "LA PUERTA ABIERTA",

            escena: `
                Una puerta de acceso restringido
                fue encontrada abierta.

                El sistema indica que el acceso
                no estaba autorizado.

                Los registros de seguridad no permiten
                determinar quién abrió la puerta.

                Tres agentes estaban relacionados
                con el incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                de abrir la zona restringida.
            `,

            conexion: `
                Las declaraciones de los agentes
                presentan versiones diferentes
                sobre lo ocurrido.

                Las contradicciones comienzan
                a convertirse en una pieza fundamental
                de la investigación.
            `
        },


        /**
         * ==================================================
         * CASO 07
         * ==================================================
         */

        {
            id: 7,

            titulo: "EL ACCESO AL LABORATORIO",

            escena: `
                El sistema de seguridad registra
                un nuevo acceso al laboratorio.

                El incidente ocurre poco después
                de los acontecimientos anteriores.

                Esta vez, el acceso parece haber sido
                realizado utilizando información interna
                de AI-7.

                Tres agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del nuevo acceso no autorizado.
            `,

            conexion: `
                El responsable parece conocer
                el funcionamiento interno de AI-7.

                Los incidentes comienzan a mostrar
                características similares.
            `
        },


        /**
         * ==================================================
         * CASO 08
         * ==================================================
         */

        {
            id: 8,

            titulo: "EL ARCHIVO MODIFICADO",

            escena: `
                El archivo que había desaparecido
                vuelve a aparecer dentro del sistema.

                Sin embargo, su contenido ha cambiado.

                Parte de la información original
                ha sido modificada.

                Tres agentes están relacionados
                con el incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                de modificar el archivo.
            `,

            conexion: `
                Alguien no solo está ocultando
                información.

                También parece estar manipulándola.

                La investigación comienza a revelar
                una intención detrás de los incidentes.
            `
        },


        /**
         * ==================================================
         * CASO 09
         * ==================================================
         */

        {
            id: 9,

            titulo: "EL PATRÓN",

            escena: `
                Después de revisar los incidentes
                anteriores, AI-7 detecta una coincidencia.

                Cada incidente permitió acceder,
                modificar o eliminar información
                dentro de diferentes áreas del sistema.

                Lo que parecía una serie de hechos
                aislados comienza a revelar un patrón.

                Tres agentes están relacionados
                con el nuevo incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del nuevo incidente.
            `,

            conexion: `
                Los incidentes no parecen ser
                independientes.

                Alguien podría estar siguiendo
                una secuencia deliberada.

                Pero todavía no se conoce
                el objetivo final.
            `
        },


        /**
         * ==================================================
         * CASO 10
         * ==================================================
         */

        {
            id: 10,

            titulo: "NO FUE UN ACCIDENTE",

            escena: `
                Un nuevo incidente ocurre dentro
                de AI-7.

                Esta vez, la evidencia acumulada
                permite relacionarlo con los hechos
                anteriores.

                Los incidentes no fueron accidentes.

                Alguien está provocando deliberadamente
                estos acontecimientos.

                Tres agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación llega a una primera
                conclusión.

                Los incidentes están conectados.

                Alguien está actuando dentro de AI-7.

                La identidad de esa persona
                todavía es desconocida.

                La investigación continuará.
            `
        }

    ]

};

export default CAPITULO_1;