const validationTransfuncionales = {
    fechaInicio: {
        required: 'La fecha de inicio es obligatoria',
    },
    documensoportetType: {
        required: 'El soporte transfusional es obligatorio',
    },
    numeroTranfu: {
        required: 'La identificación es obligatoria',
    },
    frecuencia: {
        required: 'La frecuencia es obligatoria',
    },
    aloinmunizacion: {
        required: 'La aloinmunizacion es obligatoria',
    },
    reacciones: {
        required: 'Las reacciones son obligatorias',
    },
    ferritina: {
        required: 'El valor de ferritina es obligatorio',
    },
    quelante: {
        required: 'El quelante es obligatorio',
    },
   dosis: {
    required: 'La dosis es obligatoria',
    pattern: {
        value: /^[0-9]{1,4}$/,
        message: 'La dosis debe ser un valor numérico entre 1 y 4 dígitos',
    },
},
    fechaHierro: {
        required: 'La fecha de medición de hierro es obligatoria',
    },
    FechaOrgano: {
        required: 'La fecha de evaluación de órgano es obligatoria',
    },
    lic: {
        required: 'El valor de LIC es obligatorio',
    },
    pancratica: {
        required: 'El valor de páncreas es obligatorio',
    },
    evaluacionCardiaca: {
        required: 'La evaluación cardíaca es obligatoria',
    },
};

export default validationTransfuncionales;
