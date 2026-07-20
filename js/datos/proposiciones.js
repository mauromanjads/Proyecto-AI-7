/**
 * ==========================================================
 * AI-7
 * Archivo: proposiciones.js
 * ----------------------------------------------------------
 * Catálogo de tipos de proposiciones que puede generar
 * el motor lógico.
 * ==========================================================
 */

export const TIPOS_PROPOSICION = {

    CULPABLE: "culpable",

    INOCENTE: "inocente",

    MIENTE: "miente",

    DICE_VERDAD: "dice_verdad",

    ATRIBUTO: "ATRIBUTO",

    COMPARACION: "COMPARACION"

};


export default [

    {
        id:1,
        tipo:TIPOS_PROPOSICION.CULPABLE,
        texto:"{sujeto} es culpable"
    },

    {
        id:2,
        tipo:TIPOS_PROPOSICION.INOCENTE,
        texto:"{sujeto} es inocente"
    },

    {
        id:3,
        tipo:TIPOS_PROPOSICION.MIENTE,
        texto:"{sujeto} miente"
    },

    {
        id:4,
        tipo:TIPOS_PROPOSICION.DICE_VERDAD,
        texto:"{sujeto} dice la verdad"
    },

    {
        id:5,
        tipo:TIPOS_PROPOSICION.ATRIBUTO,
        texto:"El especialista en {valor} {condicion}"
    },

    {
        id:6,
        tipo:TIPOS_PROPOSICION.COMPARACION,
        texto:"El culpable no es el más alto"
    }

];