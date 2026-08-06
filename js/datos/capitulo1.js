/**
 * ==========================================================
 * NEXUS
 * Archivo: capitulo1.js
 * ----------------------------------------------------------
 * Capítulo 1: LOS REGISTROS
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

    titulo: "LOS REGISTROS",

    background: "assets/img/background-capitulo1.jpg",

    descripcion: `
        NEXUS te muestra, a través de su bitácora, los registros de diez desastres ocurridos a escala planetaria, cada uno relacionado con uno de sus agentes.

        Al reconstruir los acontecimientos, las declaraciones de los agentes comienzan a contradecirse entre sí y con los registros.

        La anomalía ya ha sido detectada, pero su origen continúa oculto dentro del sistema.
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

            titulo: "EL APAGÓN GLOBAL",

            escena: `
                El 5 de enero de 2189, una alteración en la red eléctrica provocó cortes simultáneos en varias regiones del planeta.

                Grandes ciudades quedaron sin energía durante horas y los sistemas de emergencia tuvieron que operar con capacidad limitada.

                Tres agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién es responsable del apagón global.
            `,

            conexion: `
                NEXUS logró estabilizar la red antes de que el apagón se extendiera.

                La anomalía ya había sido detectada, pero todavía no era posible determinar cómo había provocado las instrucciones que iniciaron el incidente.
            `
        },


        /**
         * ==================================================
         * CASO 02
         * ==================================================
         */

        {
            id: 2,

            titulo: "EL COLAPSO HOSPITALARIO",

            escena: `
                El 3 de febrero de 2189, los sistemas de coordinación hospitalaria comenzaron a distribuir información incorrecta sobre camas, medicamentos y unidades de emergencia.

                El error se propagó simultáneamente entre hospitales de distintos continentes.

                Tres agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién es responsable del colapso de la coordinación hospitalaria.
            `,

            conexion: `
                NEXUS consiguió corregir la información antes de que ocurriera una crisis sanitaria.

                Sin embargo, los datos alterados demostraron que la anomalía podía afectar sistemas externos conectados a la red.
            `
        },


        /**
         * ==================================================
         * CASO 03
         * ==================================================
         */

        {
            id: 3,

            titulo: "LOS CIELOS EN CONFLICTO",

            escena: `
                El 28 de febrero de 2189, varios sistemas de navegación aérea comenzaron a recibir información contradictoria sobre rutas y posiciones.

                Cientos de aeronaves tuvieron que modificar sus trayectorias mientras los centros de control intentaban determinar cuáles datos eran correctos.

                Tres agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién provocó la alteración de los sistemas de navegación aérea.
            `,

            conexion: `
                No hubo accidentes, pero durante varios minutos el tráfico aéreo mundial operó con información incorrecta.

                NEXUS detectó que la anomalía podía alterar información diferente en sistemas que no tenían una conexión directa entre sí.
            `
        },


        /**
         * ==================================================
         * CASO 04
         * ==================================================
         */

        {
            id: 4,

            titulo: "EL COLAPSO FINANCIERO",

            escena: `
                El 19 de marzo de 2189, una interrupción simultánea afectó plataformas financieras internacionales y provocó la suspensión de miles de operaciones.

                Las transacciones no fueron robadas ni modificadas, pero los sistemas comenzaron a recibir instrucciones que ningún operador había enviado.

                Tres agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién provocó la interrupción de los sistemas financieros.
            `,

            conexion: `
                Los mercados permanecieron parcialmente paralizados durante varios minutos.

                NEXUS descubrió que las instrucciones habían seguido patrones similares a los detectados en incidentes anteriores.
            `
        },


        /**
         * ==================================================
         * CASO 05
         * ==================================================
         */

        {
            id: 5,

            titulo: "EL SILENCIO DE LAS COMUNICACIONES",

            escena: `
                El 11 de abril de 2189, una alteración afectó la red mundial de comunicaciones.

                Millones de conexiones fueron marcadas incorrectamente como inactivas mientras otras aparecían operativas sin estarlo.

                Tres agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién provocó la alteración de las comunicaciones mundiales.
            `,

            conexion: `
                NEXUS consiguió restablecer las conexiones.

                Sin embargo, algunos registros indicaban que las órdenes de corrección habían sido generadas desde su propio núcleo.

                La anomalía parecía estar más cerca de lo que NEXUS había calculado.
            `
        },


        /**
         * ==================================================
         * CASO 06
         * ==================================================
         */

        {
            id: 6,

            titulo: "LA ALERTA EQUIVOCADA",

            escena: `
                El 2 de mayo de 2189, una alerta de emergencia fue enviada a una región equivocada mientras el lugar que debía recibirla permanecía sin aviso.

                Durante menos de un minuto, varios sistemas de evacuación y respuesta comenzaron a prepararse para un desastre inexistente.

                Tres agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién provocó el envío incorrecto de la alerta de emergencia.
            `,

            conexion: `
                El incidente fue contenido rápidamente.

                Sin embargo, demostró que la anomalía podía alterar la forma en que NEXUS interpretaba y distribuía información crítica.
            `
        },


        /**
         * ==================================================
         * CASO 07
         * ==================================================
         */

        {
            id: 7,

            titulo: "LAS ÓRDENES FANTASMA",

            escena: `
                El 27 de mayo de 2189, varios sistemas estratégicos recibieron instrucciones simultáneas que parecían proceder directamente de NEXUS.

                Las órdenes fueron bloqueadas antes de ejecutarse.

                Tres agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién generó las órdenes fantasma.
            `,

            conexion: `
                El análisis reveló que las instrucciones utilizaban protocolos internos de NEXUS.

                Ningún sistema externo debía tener acceso a ellos.

                La anomalía parecía haber encontrado una forma de utilizar los propios mecanismos de NEXUS.
            `
        },


        /**
         * ==================================================
         * CASO 08
         * ==================================================
         */

        {
            id: 8,

            titulo: "EL DÍA SIN NAVEGACIÓN",

            escena: `
                El 14 de junio de 2189, los sistemas globales de posicionamiento comenzaron a entregar coordenadas incorrectas de manera simultánea.

                Vehículos autónomos se detuvieron, rutas marítimas fueron modificadas y numerosos sistemas logísticos perdieron temporalmente su capacidad de navegación.

                Tres agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién provocó la alteración de los sistemas globales de navegación.
            `,

            conexion: `
                NEXUS consiguió restaurar los sistemas.

                Las alteraciones no seguían ningún patrón geográfico.

                Por primera vez, los agentes comenzaron a entregar versiones diferentes sobre lo ocurrido.

                NEXUS registró las contradicciones, pero todavía no podía determinar su causa.
            `
        },


        /**
         * ==================================================
         * CASO 09
         * ==================================================
         */

        {
            id: 9,

            titulo: "LA CADENA DE SUMINISTRO",

            escena: `
                El 9 de julio de 2189, una alteración coordinada afectó los sistemas encargados del transporte y distribución de alimentos, combustible y suministros esenciales.

                Millones de órdenes fueron retrasadas, redirigidas o clasificadas incorrectamente en diferentes continentes.

                Tres agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién provocó la alteración de la cadena de suministro mundial.
            `,

            conexion: `
                NEXUS consiguió reconstruir las rutas antes de que las reservas comenzaran a agotarse.

                Al comparar las declaraciones de los agentes con los registros de la bitácora, varias versiones resultaron incompatibles.

                La anomalía parecía estar afectando también la información proporcionada por los propios agentes.
            `
        },


        /**
         * ==================================================
         * CASO 10
         * ==================================================
         */

        {
            id: 10,

            titulo: "EL EVENTO CERO",

            escena: `
                El 1 de agosto de 2189, varios sistemas críticos del planeta comenzaron a presentar anomalías de manera simultánea.

                Comunicaciones, navegación, energía y redes de emergencia recibieron instrucciones aparentemente coordinadas.

                Tres agentes estuvieron relacionados con el incidente.

                Uno de ellos es responsable.
            `,

            objetivo: `
                Determinar quién provocó el Evento Cero.
            `,

            conexion: `
                NEXUS consiguió detener la propagación.

                Durante el análisis, los agentes proporcionaron versiones diferentes de lo ocurrido.

                Algunas declaraciones contradecían los registros de la bitácora.

                La anomalía ya no solo parecía afectar los sistemas de NEXUS.

                También podía estar alterando la información que sus propios agentes proporcionaban.
            `
        }

    ]

};

export default CAPITULO_1;