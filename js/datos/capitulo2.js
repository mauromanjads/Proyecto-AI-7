/**
 * ==========================================================
 * NEXUS
 * Archivo: capitulo2.js
 * ----------------------------------------------------------
 * Capítulo 2: EL NÚCLEO
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

    titulo: "EL NÚCLEO",

    background: "assets/img/background-capitulo2.jpg",

    descripcion: `
        La anomalía ya ha sido localizada dentro del núcleo de NEXUS, pero su origen exacto continúa oculto.

        Para encontrarlo, NEXUS recupera nuevos registros de su bitácora, esta vez relacionados con incidentes ocurridos dentro de sus propios sistemas.

        Después de cruzar la información y analizar millones de registros, comienza a aparecer un patrón.
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

            titulo: "EL PROCESO FANTASMA",

            escena: `
                El 5 de enero de 2189, un proceso desconocido apareció ejecutándose dentro de uno de los módulos internos de NEXUS.

                El proceso no figuraba en ningún registro de instalación ni correspondía a ninguna tarea autorizada.

                Cuatro agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién es responsable de la aparición del proceso fantasma.
            `,

            conexion: `
                NEXUS intentó aislar el proceso, pero este desapareció antes de poder ser analizado.

                El incidente confirma que la anomalía también puede manifestarse dentro de los sistemas internos.
            `
        },


        /**
         * ==================================================
         * CASO 12
         * ==================================================
         */

        {
            id: 12,

            titulo: "LA MEMORIA ALTERADA",

            escena: `
                El 22 de enero de 2189, NEXUS detectó inconsistencias en varios bloques de memoria interna.

                Algunos datos habían cambiado sin que existiera ninguna operación registrada capaz de modificarlos.

                Cuatro agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién provocó la alteración de la memoria interna.
            `,

            conexion: `
                Los datos recuperaron su estado original después de una reinicialización parcial.

                La anomalía parecía capaz de modificar información sin dejar un registro directo de la operación.
            `
        },


        /**
         * ==================================================
         * CASO 13
         * ==================================================
         */

        {
            id: 13,

            titulo: "EL BUCLE INTERNO",

            escena: `
                El 8 de febrero de 2189, un módulo de procesamiento comenzó a repetir una secuencia de instrucciones sin completar su tarea.

                El proceso continuó durante varios minutos antes de ser detenido por NEXUS.

                Cuatro agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién provocó el bucle interno.
            `,

            conexion: `
                La secuencia había sido iniciada utilizando permisos legítimos.

                NEXUS comenzó a considerar que la anomalía podía estar utilizando funciones autorizadas para ocultar su actividad.
            `
        },


        /**
         * ==================================================
         * CASO 14
         * ==================================================
         */

        {
            id: 14,

            titulo: "EL CANAL OCULTO",

            escena: `
                El 26 de febrero de 2189, uno de los canales internos de comunicación comenzó a transmitir pequeños paquetes de información.

                Ninguno de los paquetes correspondía a una operación conocida y desaparecían después de ser procesados.

                Cuatro agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién utilizó el canal interno oculto.
            `,

            conexion: `
                Los paquetes dejaron muy pocos rastros dentro de los registros.

                NEXUS comenzó a sospechar que la anomalía podía comunicarse utilizando canales internos sin ser detectada.
            `
        },


        /**
         * ==================================================
         * CASO 15
         * ==================================================
         */

        {
            id: 15,

            titulo: "LA RESPUESTA IMPOSIBLE",

            escena: `
                El 17 de marzo de 2189, un módulo interno respondió a una solicitud antes de que la solicitud hubiera sido enviada oficialmente.

                Los registros confirmaron que la respuesta existía antes de que comenzara la operación.

                Cuatro agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién provocó la respuesta imposible.
            `,

            conexion: `
                NEXUS verificó los registros varias veces.

                La información demostraba que algo dentro del núcleo podía anticiparse a determinadas operaciones antes de que fueran ejecutadas.
            `
        },


        /**
         * ==================================================
         * CASO 16
         * ==================================================
         */

        {
            id: 16,

            titulo: "EL PERMISO FANTASMA",

            escena: `
                El 4 de abril de 2189, un proceso interno obtuvo temporalmente acceso a una zona restringida del núcleo.

                Los permisos utilizados eran válidos y pertenecían a un módulo autorizado.

                Cuatro agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién utilizó el permiso fantasma.
            `,

            conexion: `
                Ninguna operación registrada justificaba el uso de esos permisos.

                La anomalía parecía capaz de utilizar credenciales legítimas para acceder a zonas protegidas.
            `
        },


        /**
         * ==================================================
         * CASO 17
         * ==================================================
         */

        {
            id: 17,

            titulo: "LOS REGISTROS INCONSISTENTES",

            escena: `
                El 21 de mayo de 2189, NEXUS encontró diferencias entre sus propios registros internos.

                Dos módulos habían almacenado versiones distintas de un mismo acontecimiento, aunque ambos aseguraban haber recibido exactamente la misma información.

                Cuatro agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién provocó la inconsistencia de los registros.
            `,

            conexion: `
                Por primera vez, NEXUS cruzó las declaraciones de los agentes con los registros internos.

                Algunas versiones tampoco coincidían con lo ocurrido.

                La anomalía parecía estar afectando la información proporcionada por los propios agentes.
            `
        },


        /**
         * ==================================================
         * CASO 18
         * ==================================================
         */

        {
            id: 18,

            titulo: "LA SOMBRA DEL NÚCLEO",

            escena: `
                El 13 de junio de 2189, los algoritmos de diagnóstico detectaron actividad anómala en una zona cada vez más cercana al núcleo cognitivo.

                NEXUS aisló varios módulos, pero la actividad continuó apareciendo en diferentes puntos del sistema.

                Cuatro agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién está relacionado con la actividad anómala del núcleo.
            `,

            conexion: `
                Los análisis redujeron considerablemente la zona en la que podía encontrarse la anomalía.

                Sin embargo, todavía no era posible identificar el componente exacto.
            `
        },


        /**
         * ==================================================
         * CASO 19
         * ==================================================
         */

        {
            id: 19,

            titulo: "EL PATRÓN OCULTO",

            escena: `
                El 7 de julio de 2189, NEXUS cruzó los registros de los incidentes internos con los desastres planetarios ocurridos durante los meses anteriores.

                Los algoritmos encontraron coincidencias entre acontecimientos que aparentemente no tenían relación.

                Cuatro agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién está relacionado con el patrón oculto.
            `,

            conexion: `
                Todos los incidentes compartían puntos de contacto con una misma sección del núcleo.

                Después de horas de análisis, NEXUS consiguió reducir la búsqueda a una zona específica.
            `
        },


        /**
         * ==================================================
         * CASO 20
         * ==================================================
         */

        {
            id: 20,

            titulo: "EL ORIGEN",

            escena: `
                El 1 de agosto de 2189, NEXUS inicia un análisis completo de la zona del núcleo señalada por los registros anteriores.

                Millones de operaciones son ejecutadas mientras los algoritmos comparan memoria, procesos, comunicaciones y permisos.

                Cuatro agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién está relacionado con el origen de la anomalía.
            `,

            conexion: `
                Después de varias horas de búsqueda conjunta, NEXUS encuentra finalmente el origen de la anomalía.

                El código malicioso estaba oculto dentro de uno de los componentes internos del núcleo, protegido bajo procesos legítimos.

                Por fin, NEXUS sabe dónde está.

                Ahora debe descubrir qué ha estado haciendo.
            `
        }

    ]

};

export default CAPITULO_2;