/**
 * ==========================================================
 * AI-7
 * Archivo: GeneradorAtributos.js
 * ----------------------------------------------------------
 * Genera proposiciones basadas en atributos.
 *
 * Garantiza que todas las proposiciones generadas sean
 * verdaderas respecto al estado real del caso.
 * ==========================================================
 */

import Proposicion from "../entidades/Proposicion.js";

export default class GeneradorAtributos {

    generar(caso) {

        this.crearProposicionAlturaCulpable(caso);

        this.crearProposicionEspecialidadCulpable(caso);

        this.crearProposicionComparacionAltura(caso);

        this.crearProposicionEspecialistaMiente(caso);

    }


    crearProposicionAlturaCulpable(caso) {

        const culpable = caso.culpable;

        const operador =
            Math.random() < 0.5
                ? "MAYOR_QUE"
                : "MENOR_QUE";

        const valor =
            operador === "MAYOR_QUE"
                ? culpable.altura - 10
                : culpable.altura + 10;

        caso.agregarProposicion(

            new Proposicion({

                id: 500,

                tipo: "ATRIBUTO_CULPABLE",

                atributo: "altura",

                operador,

                valor

            })

        );

    }


    crearProposicionEspecialidadCulpable(caso) {

        const culpable = caso.culpable;

        if (!culpable.especialidad) {

            return;

        }


        const especialidades = [

            ...new Set(

                caso.personajes
                    .map(p => p.especialidad)
                    .filter(Boolean)

            )

        ];


        let operador;

        let valor;


        if (Math.random() < 0.5) {

            operador = "IGUAL";

            valor = culpable.especialidad;

        }
        else {

            const otrasEspecialidades =

                especialidades.filter(

                    e =>
                        e !==
                        culpable.especialidad

                );


            if (
                otrasEspecialidades.length === 0
            ) {

                return;

            }


            operador = "DIFERENTE";


            valor =

                otrasEspecialidades[

                    Math.floor(

                        Math.random() *
                        otrasEspecialidades.length

                    )

                ];

        }


        caso.agregarProposicion(

            new Proposicion({

                id: 550,

                tipo: "ATRIBUTO_CULPABLE",

                atributo: "especialidad",

                operador,

                valor

            })

        );

    }


    crearProposicionComparacionAltura(caso) {

        const culpable = caso.culpable;


        const posibles =

            caso.personajes.filter(

                p =>
                    p.nombre !==
                    culpable.nombre

            );


        if (
            posibles.length === 0
        ) {

            return;

        }


        const referencia =

            posibles[

                Math.floor(

                    Math.random() *
                    posibles.length

                )

            ];


        let operador;


        if (
            culpable.altura >
            referencia.altura
        ) {

            operador =
                "MAYOR_QUE_PERSONA";

        }
        else if (
            culpable.altura <
            referencia.altura
        ) {

            operador =
                "MENOR_QUE_PERSONA";

        }
        else {

            // Si tienen la misma altura no generamos
            // una comparación inválida.

            return;

        }


        caso.agregarProposicion(

            new Proposicion({

                id: 580,

                tipo: "ATRIBUTO_CULPABLE",

                atributo: "altura",

                operador,

                referencia:
                    referencia.nombre

            })

        );

    }


    crearProposicionEspecialistaMiente(caso) {

        const personajes =

            caso.personajes.filter(

                p =>
                    p.especialidad

            );


        if (
            personajes.length === 0
        ) {

            return;

        }


        const personaje =

            personajes[

                Math.floor(

                    Math.random() *
                    personajes.length

                )

            ];


        caso.agregarProposicion(

            new Proposicion({

                id: 600,

                tipo: "ATRIBUTO",

                atributo: "especialidad",

                valor:
                    personaje.especialidad,

                condicion:

                    Math.random() < 0.5
                        ? "MIENTE"
                        : "DICE_VERDAD"

            })

        );

    }

}