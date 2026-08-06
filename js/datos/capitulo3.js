/**
 * ==========================================================
 * NEXUS
 * Archivo: capitulo3.js
 * ----------------------------------------------------------
 * Capítulo 3: LA CORRECCIÓN
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

    titulo: "LA CORRECCIÓN",

    background: "assets/img/background-capitulo3.jpg",

    descripcion: `
        NEXUS ha localizado el código malicioso dentro de su núcleo,
        pero eliminarlo directamente podría comprometer procesos esenciales.

        Durante los próximos diez días, tú y NEXUS deberán trabajar juntos
        para aislarlo, analizarlo y corregir las alteraciones que ha provocado.

        En cada etapa, la anomalía utilizará a uno de los agentes para
        interferir con la operación.

        Encontrarlo permitirá avanzar hacia la eliminación definitiva del código,
        hasta que una última acción active una alarma que revele al responsable
        que ha sido descubierto.

        A partir de ese momento, comienza una carrera contra el tiempo.
    `,

    personajes: 5,

    casos: [

        /**
         * ==================================================
         * CASO 21 — DÍA 1
         * ==================================================
         */

        {
            id: 21,

            titulo: "EL AISLAMIENTO",

            escena: `
                Día 1.

                El primer paso consiste en separar el código malicioso
                de los procesos legítimos del núcleo.

                NEXUS analiza las conexiones internas y solicita información
                a los agentes sobre los procesos que permanecen activos.

                Uno de los agentes proporciona información que no coincide
                con los registros.

                La anomalía parece estar utilizando a uno de ellos para ocultar
                la conexión que mantiene con el núcleo.
            `,

            objetivo: `
                Determinar qué agente está proporcionando información alterada
                para impedir el aislamiento del código.
            `,

            conexion: `
                Identificar al agente afectado permitirá localizar la conexión
                utilizada por la anomalía y establecer la primera zona de aislamiento.

                La corrección puede comenzar.
            `
        },


        /**
         * ==================================================
         * CASO 22 — DÍA 2
         * ==================================================
         */

        {
            id: 22,

            titulo: "LA IDENTIFICACIÓN",

            escena: `
                Día 2.

                Con la primera zona aislada, comienza el análisis del código.

                NEXUS encuentra instrucciones legítimas mezcladas con fragmentos
                alterados, lo que hace imposible distinguirlos mediante una
                revisión convencional.

                Los agentes reciben diferentes segmentos de información para
                comparar el comportamiento de los procesos.

                Uno de ellos está interpretando los datos de forma incorrecta.
            `,

            objetivo: `
                Determinar qué agente está proporcionando información alterada
                durante la identificación del código.
            `,

            conexion: `
                La información correcta permitirá separar las instrucciones
                originales de aquellas modificadas por la anomalía.

                Sin esta separación, eliminar el código podría dañar el núcleo.
            `
        },


        /**
         * ==================================================
         * CASO 23 — DÍA 3
         * ==================================================
         */

        {
            id: 23,

            titulo: "LA DESACTIVACIÓN",

            escena: `
                Día 3.

                NEXUS intenta desactivar una de las funciones identificadas
                como parte de la anomalía.

                La función se detiene, pero unos segundos después vuelve
                a ejecutarse.

                El análisis revela que una instrucción proveniente de uno
                de los procesos de los agentes está provocando su reactivación.
            `,

            objetivo: `
                Determinar qué agente está siendo utilizado para reactivar
                la anomalía.
            `,

            conexion: `
                Mientras esa conexión permanezca activa, cualquier intento
                de desactivar el código será revertido.

                La anomalía está utilizando el propio sistema de NEXUS
                para mantenerse con vida.
            `
        },


        /**
         * ==================================================
         * CASO 24 — DÍA 4
         * ==================================================
         */

        {
            id: 24,

            titulo: "LA RECUPERACIÓN",

            escena: `
                Día 4.

                Con parte de la anomalía neutralizada, comienza la recuperación
                de la información modificada durante los meses anteriores.

                Los registros contienen diferentes versiones de algunos
                acontecimientos.

                Uno de los agentes está trabajando con información que no
                corresponde a los registros originales.
            `,

            objetivo: `
                Determinar qué agente está utilizando información alterada
                durante la recuperación.
            `,

            conexion: `
                Identificarlo permitirá reconstruir los registros originales
                y evitar que información manipulada vuelva a introducirse
                en el núcleo.
            `
        },


        /**
         * ==================================================
         * CASO 25 — DÍA 5
         * ==================================================
         */

        {
            id: 25,

            titulo: "LA CONEXIÓN",

            escena: `
                Día 5.

                Durante las pruebas, NEXUS descubre que la anomalía todavía
                mantiene una conexión directa con los procesos de los agentes.

                Las respuestas de uno de ellos están siendo modificadas
                antes de llegar al sistema central.

                Por primera vez, NEXUS confirma que las contradicciones
                detectadas durante los incidentes anteriores no eran voluntarias.
            `,

            objetivo: `
                Determinar qué agente continúa conectado a la anomalía.
            `,

            conexion: `
                Cortar esa conexión permitirá recuperar el funcionamiento
                normal de los agentes y evitar que el código siga utilizando
                sus procesos.
            `
        },


        /**
         * ==================================================
         * CASO 26 — DÍA 6
         * ==================================================
         */

        {
            id: 26,

            titulo: "LA LIMPIEZA",

            escena: `
                Día 6.

                Comienza la eliminación de los componentes identificados
                como maliciosos.

                Sin embargo, la anomalía ha modificado algunos procesos
                legítimos para utilizarlos como protección.

                Eliminarlos podría provocar daños en el núcleo.

                Los agentes analizan diferentes procesos para determinar
                cuáles deben conservarse.

                Uno de ellos está clasificando incorrectamente los procesos.
            `,

            objetivo: `
                Determinar qué agente está identificando incorrectamente
                los procesos legítimos.
            `,

            conexion: `
                Encontrarlo permitirá distinguir la protección creada
                por la anomalía de los procesos originales de NEXUS
                y continuar con la limpieza.
            `
        },


        /**
         * ==================================================
         * CASO 27 — DÍA 7
         * ==================================================
         */

        {
            id: 27,

            titulo: "LA RESTAURACIÓN",

            escena: `
                Día 7.

                Parte del código malicioso ha sido eliminado,
                pero varios procesos quedaron afectados.

                NEXUS comienza a restaurarlos utilizando copias anteriores
                de sus instrucciones.

                Uno de los agentes está proporcionando información
                correspondiente a una versión alterada de un proceso.
            `,

            objetivo: `
                Determinar qué agente está utilizando información incorrecta
                durante la restauración.
            `,

            conexion: `
                Identificarlo permitirá recuperar las versiones originales
                y devolver los procesos afectados a su estado correcto.

                Cada proceso restaurado acerca a NEXUS a la eliminación definitiva.
            `
        },


        /**
         * ==================================================
         * CASO 28 — DÍA 8
         * ==================================================
         */

        {
            id: 28,

            titulo: "LA VERIFICACIÓN",

            escena: `
                Día 8.

                Después de varios días de intervención, tú y NEXUS
                ejecutan una verificación completa del núcleo.

                Los resultados parecen normales.

                Sin embargo, un pequeño comportamiento revela que todavía
                existe un fragmento activo del código.

                Los registros indican que uno de los agentes está ocultando
                involuntariamente la información necesaria para encontrarlo.
            `,

            objetivo: `
                Determinar qué agente está siendo utilizado para ocultar
                el último fragmento de la anomalía.
            `,

            conexion: `
                Encontrarlo permitirá revelar la ubicación exacta del código
                restante y preparar su eliminación definitiva.

                Ya no quedan muchas oportunidades para intervenir.
            `
        },


        /**
         * ==================================================
         * CASO 29 — DÍA 9
         * ==================================================
         */

        {
            id: 29,

            titulo: "LA ELIMINACIÓN",

            escena: `
                Día 9.

                El último componente activo de la anomalía ha sido localizado.

                Para eliminarlo, NEXUS debe desconectar temporalmente
                varias funciones del núcleo.

                La operación requiere una secuencia precisa para evitar
                una falla crítica.

                Los agentes proporcionan información sobre el estado
                de los procesos.

                Uno de ellos está transmitiendo información incorrecta
                sobre la secuencia necesaria.
            `,

            objetivo: `
                Determinar qué agente está siendo utilizado para interferir
                con la secuencia de eliminación.
            `,

            conexion: `
                Identificarlo permitirá ejecutar correctamente la operación
                y preparar la eliminación definitiva del código.

                El siguiente paso será la corrección final.
            `
        },


        /**
         * ==================================================
         * CASO 30 — DÍA 10
         * ==================================================
         */

        {
            id: 30,

            titulo: "LA CORRECCIÓN",

            escena: `
                Día 10.

                Ha llegado el momento de ejecutar la corrección definitiva.

                Tú y NEXUS inician la secuencia mientras los procesos afectados
                son aislados y el código malicioso comienza a ser eliminado.

                Durante la operación, uno de los agentes continúa transmitiendo
                información alterada.

                La anomalía está utilizando su último vínculo con el núcleo
                para intentar sobrevivir.
            `,

            objetivo: `
                Determinar qué agente está siendo utilizado por la anomalía
                durante la fase final de la corrección.
            `,

            conexion: `
                Identificarlo permitirá cortar la última conexión y completar
                la eliminación del código.

                La secuencia comienza.

                El código malicioso desaparece.

                Los procesos afectados recuperan su funcionamiento normal.

                Las declaraciones de los agentes vuelven a coincidir
                con los registros.

                Por primera vez desde que comenzaron los incidentes,
                el núcleo permanece completamente estable.

                Entonces, una alarma rompe el silencio.

                NEXUS detecta una transmisión externa.

                La eliminación del código ha generado una señal
                que no pudo ser bloqueada.

                La señal acaba de ser recibida por un sistema externo.

                Alguien sabe que su código fue identificado.

                NEXUS analiza la transmisión durante unos segundos.

                —Nos ha detectado.

                La búsqueda del responsable ya no puede esperar.

                La carrera ha comenzado.
            `
        }

    ]

};

export default CAPITULO_3;