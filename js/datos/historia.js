/**
 * ==========================================================
 * AI-7
 * Archivo: historia.js
 * ----------------------------------------------------------
 * Punto central de la narrativa del juego.
 * ==========================================================
 */

import PROLOGO from "./prologo.js";

import CAPITULO_1 from "./capitulo1.js";
import CAPITULO_2 from "./capitulo2.js";
import CAPITULO_3 from "./capitulo3.js";
import CAPITULO_4 from "./capitulo4.js";
import CAPITULO_5 from "./capitulo5.js";


const HISTORIA = {

    prologo: PROLOGO,

    capitulos: [

        CAPITULO_1,
        CAPITULO_2,
        CAPITULO_3,
        CAPITULO_4,
        CAPITULO_5

    ]

};


export default HISTORIA;