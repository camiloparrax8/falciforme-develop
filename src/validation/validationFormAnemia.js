const validationFormAnemia = {
    edad: {
        required: 'La edad es obligatoria',
        pattern: {
            value: /^[0-9]+$/,
            message: 'Solo se permiten números',
        },
        maxLength: {
            value: 2,
            message: 'No puede exceder los 2 caracteres',
        },
    },
    decimales: {
        required: 'Este campo es requerido',
        pattern: {
            value: /^\d+(\.\d+)?$/,
            message: 'Solo se permiten números decimales con punto como separador',
        },
        minLength: {
            value: 1,
            message: 'Debe tener al menos 1 caracteres',
        },
        maxLength: {
            value: 6,
            message: 'No puede exceder los 6 caracteres',
        },
    },
    plaquetas: {
        required: 'Este campo es requerido',
        pattern: {
            value: /^[0-9]+$/,
            message: 'Solo se permiten números',
        },
        maxLength: {
            value: 3,
            message: 'No puede exceder los 3 caracteres',
        },
    },



}

export default validationFormAnemia
