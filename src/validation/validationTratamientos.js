const validationTratamientos = {
    tipo: {
        required: 'Selecciona un tipo de tratamiento',
    },
    medicamento: {
        required: 'Selecciona un medicamento',
    },
    dias: {
        required: 'El número de dias es obligatorio',
        pattern: {
            value: /^[0-9]+$/,
            message: 'Solo se permiten números',
        },
        maxLength: {
            value: 15,
            message: 'No puede exceder los 15 caracteres',
        },
    },
    dosis: {
        required: 'El número de dosis es obligatorio',
        pattern: {
            value: /^[0-9]+$/,
            message: 'Solo se permiten números',
        },
        maxLength: {
            value: 15,
            message: 'No puede exceder los 15 caracteres',
        },
    },
    diasMed: {
        required: 'El número de dias es obligatorio',
        pattern: {
            value: /^[0-9]+$/,
            message: 'Solo se permiten números',
        },
        maxLength: {
            value: 15,
            message: 'No puede exceder los 15 caracteres',
        },
    },
    dosisMed: {
        required: 'El número de dosis es obligatorio',
        pattern: {
            value: /^[0-9]+$/,
            message: 'Solo se permiten números',
        },
        maxLength: {
            value: 15,
            message: 'No puede exceder los 15 caracteres',
        },
    },
}

export default validationTratamientos;