const validationSeccionTwo = {
    observacion: {
        required: 'La observación es obligatoria',
        maxLength: {
            value: 250,
            message: 'La observación no puede exceder los 250 caracteres',
        },
        
    },
    condicionesAbdominales: {
        required: 'Selecciona al menos una condición',
    },
};

export default validationSeccionTwo;
