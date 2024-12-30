const validationImgDiagnosticos = {
    imagenDiagnostica: {
        required: 'Seleccione una opción para imagen diagnóstica.',
    },
    fecha: {
        required: 'Seleccione una fecha.',
        validate: (value) =>
            new Date(value) <= new Date() || 'La fecha no puede ser futura.',
    },
    tipoResultado: {
        required: 'Seleccione tipo de resultado.',
    },
    resultado: {
        required: 'Ingrese un resultado.',
        maxLength: {
            value: 255,
            message: 'El resultado no puede tener más de 255 caracteres.',
        },
    },
};

export default validationImgDiagnosticos;
