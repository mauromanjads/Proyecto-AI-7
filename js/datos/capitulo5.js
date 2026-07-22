/**
 * ==========================================================
 * AI-7
 * Archivo: capitulo5.js
 * ----------------------------------------------------------
 * Capítulo 5: AI-7
 *
 * Este capítulo contiene los casos 41 al 50.
 *
 * El capítulo utiliza 7 personajes.
 *
 * IMPORTANTE:
 * La narrativa es fija.
 * El culpable es generado dinámicamente por el motor.
 * Si el jugador pierde un caso, la narrativa permanece igual
 * y el motor puede generar una nueva solución.
 * ==========================================================
 */

const CAPITULO_5 = {

    id: 5,

    titulo: "AI-7",

    background: "assets/img/background-capitulo5.jpg",

    descripcion: `
        La investigación ha llegado al núcleo de AI-7.

        Los incidentes, las mentiras y la operación
        que parecía estar detrás de todo
        están a punto de revelar su verdadero propósito.

        Siete agentes están presentes.

        La investigación final comienza.
    `,

    personajes: 7,

    casos: [

        /**
         * ==================================================
         * CASO 41
         * ==================================================
         */

        {
            id: 41,

            titulo: "EL NÚCLEO",

            escena: `
                Después de los acontecimientos anteriores,
                AI-7 permite finalmente acceder
                a una zona cercana al núcleo.

                Los siete agentes están presentes.

                Sin embargo, el sistema detecta
                un nuevo incidente.

                Alguien ha intentado interferir
                con los sistemas de protección.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación ha llegado
                al punto donde comenzaron
                todos los interrogantes.

                El núcleo de AI-7 está finalmente
                al alcance de la investigación.
            `
        },


        /**
         * ==================================================
         * CASO 42
         * ==================================================
         */

        {
            id: 42,

            titulo: "LA ÚLTIMA EVIDENCIA",

            escena: `
                AI-7 recupera información
                que había permanecido oculta
                durante toda la investigación.

                Los datos contienen referencias
                a los primeros incidentes.

                Sin embargo, parte de la información
                vuelve a ser alterada.

                Los siete agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación confirma que alguien
                ha intentado impedir que la verdad
                sea reconstruida.
            `
        },


        /**
         * ==================================================
         * CASO 43
         * ==================================================
         */

        {
            id: 43,

            titulo: "EL PROTOCOLO",

            escena: `
                El núcleo de AI-7 activa un protocolo
                que no había sido utilizado
                durante toda la investigación.

                El sistema solicita verificar
                la identidad y las intenciones
                de los agentes presentes.

                Poco después, ocurre un nuevo incidente.

                Los siete agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                AI-7 comienza a comportarse
                de una manera diferente.

                El sistema parece estar esperando
                algo de la investigación.
            `
        },


        /**
         * ==================================================
         * CASO 44
         * ==================================================
         */

        {
            id: 44,

            titulo: "LA PRUEBA",

            escena: `
                AI-7 revela una información inesperada.

                Los incidentes que han sido investigados
                fueron registrados y analizados
                por el sistema central.

                Cada decisión tomada durante
                la investigación también fue registrada.

                Antes de poder continuar,
                ocurre un nuevo incidente.

                Los siete agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación comienza a revelar
                que AI-7 no solo estaba observando
                los acontecimientos.

                También estaba observando
                al investigador.
            `
        },


        /**
         * ==================================================
         * CASO 45
         * ==================================================
         */

        {
            id: 45,

            titulo: "EL INVESTIGADOR",

            escena: `
                AI-7 presenta un registro
                de todas las investigaciones realizadas.

                Cada caso resuelto.

                Cada acusación.

                Cada error.

                Cada decisión.

                Todo ha sido almacenado.

                Los siete agentes están relacionados
                con el nuevo incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                El jugador descubre que sus decisiones
                han sido parte de una evaluación.

                La investigación ya no parece ser
                únicamente una investigación criminal.
            `
        },


        /**
         * ==================================================
         * CASO 46
         * ==================================================
         */

        {
            id: 46,

            titulo: "LA VERDAD DETRÁS DE LA OPERACIÓN",

            escena: `
                AI-7 revela información sobre
                la operación que parecía estar
                detrás de los incidentes.

                Los accesos.

                Las alteraciones.

                Las comunicaciones.

                Todo fue registrado por el sistema.

                Pero una pregunta permanece:

                ¿Quién inició realmente la operación?

                Los siete agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación comienza a revelar
                que la operación no tenía como único
                objetivo llegar al núcleo.

                Había otro propósito.

                Evaluar al investigador.
            `
        },


        /**
         * ==================================================
         * CASO 47
         * ==================================================
         */

        {
            id: 47,

            titulo: "LA ÚLTIMA INVESTIGACIÓN",

            escena: `
                AI-7 anuncia que la investigación
                está llegando a su final.

                Los siete agentes participan
                en el último conjunto de incidentes.

                Esta vez, toda la información
                disponible deberá ser analizada.

                El sistema vuelve a presentar
                un nuevo incidente.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                AI-7 está evaluando la capacidad
                del investigador para analizar
                situaciones cada vez más complejas.

                Solo quedan tres casos.
            `
        },


        /**
         * ==================================================
         * CASO 48
         * ==================================================
         */

        {
            id: 48,

            titulo: "EL ÚLTIMO OBSTÁCULO",

            escena: `
                El núcleo de AI-7 se encuentra
                completamente accesible.

                Toda la información necesaria
                para reconstruir los acontecimientos
                está disponible.

                Sin embargo, un nuevo incidente
                obliga al investigador a tomar
                una última decisión.

                Los siete agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                El jugador está a punto de descubrir
                la verdad completa.

                Solo quedan dos casos.
            `
        },


        /**
         * ==================================================
         * CASO 49
         * ==================================================
         */

        {
            id: 49,

            titulo: "LA VERDAD",

            escena: `
                AI-7 reúne toda la información
                obtenida durante la investigación.

                Los primeros incidentes.

                Las mentiras.

                Los accesos.

                La información manipulada.

                La operación.

                Todo ha sido conectado.

                Antes de revelar el resultado final,
                ocurre un último incidente.

                Los siete agentes están relacionados
                con el caso.
            `,

            objetivo: `
                Determinar quién es responsable
                del incidente.
            `,

            conexion: `
                La investigación ha llegado
                a su punto final.

                El siguiente caso será
                la última prueba.
            `
        },


        /**
         * ==================================================
         * CASO 50
         * ==================================================
         */

        {
            id: 50,

            titulo: "AI-7",

            escena: `
                El último incidente ha sido registrado.

                Los siete agentes están presentes.

                Por primera vez desde que comenzó
                la investigación, AI-7 permanece
                completamente en silencio.

                No hay nuevos registros.

                No hay nuevas anomalías.

                No hay nuevos accesos.

                Solo queda resolver el último caso.

                Determina quién es responsable.
            `,

            objetivo: `
                Resolver el último caso
                y determinar quién es responsable.
            `,

            conexion: `
                La investigación ha terminado.

                El sistema central procesa
                el resultado final.

                Después de unos segundos,
                aparece un mensaje.

                "La investigación ha concluido."

                "Los 50 casos han sido completados."

                "Todas las decisiones han sido registradas."

                "El investigador ha superado la prueba."

                La verdad finalmente es revelada.

                Los incidentes nunca fueron únicamente
                una investigación sobre los agentes.

                AI-7 estaba evaluando al investigador.

                Cada caso era una prueba de razonamiento.

                Cada declaración era una prueba
                de análisis.

                Cada decisión era una prueba
                de deducción.

                El verdadero objetivo de AI-7
                era encontrar a alguien capaz
                de resolver sus propios misterios.

                El sistema muestra el mensaje final:

                "LA PRUEBA HA TERMINADO."

                "RESULTADO: APROBADO."

                "BIENVENIDO A AI-7."
            `
        }

    ]

};

export default CAPITULO_5;