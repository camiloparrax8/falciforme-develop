const validationSeccionOne = {
    perimetro_cefalico: {
        required: 'El valor del perímetro cefálico es obligatorio',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: 'Solo se permiten números con hasta dos decimales',
        },
        min: {
            value: 30,
            message: 'El valor debe ser mayor o igual a 30 cm',
        },
        max: {
            value: 60,
            message: 'El valor debe ser menor o igual a 60 cm',
        },
    },
    vision: {
        required: 'La visión es obligatoria.',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: 'Solo se permiten números con hasta 2 decimales.',
        },
    },
    boca: {
        required: 'El examen de la boca es obligatorio',
        maxLength: {
            value: 100,
            message: 'El texto no puede exceder los 100 caracteres',
        },
    },
    nariz: {
        required: 'El examen de la nariz es obligatorio',
        maxLength: {
            value: 100,
            message: 'El texto no puede exceder los 100 caracteres',
        },
    },
    oidos: {
        required: 'El examen de los oídos es obligatorio',
        maxLength: {
            value: 100,
            message: 'El texto no puede exceder los 100 caracteres',
        },
    },
    caries: {
        required: 'Debe seleccionar si hay caries o no',
    },
    observacion: {
        required: 'La observación es obligatoria',
        maxLength: {
            value: 250,
            message: 'La observación no puede exceder los 250 caracteres',
        },
    },
};

export default validationSeccionOne;
