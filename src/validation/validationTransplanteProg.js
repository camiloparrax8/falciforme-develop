const validationTransplanteProgenitores = {
    tipo_indicaciones: {
        required: '',
        pattern: {
            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            message: 'Solo se permiten letras del alfabeto español',
        },
        validate: {
        notEmpty: (value) =>
            value.trim() !== '' || 'El campo no puede estar vacío',
        },
    },
    hermanos: {
        required: 'Selecciona una opción',
    },
    padres: {
        required: 'Selecciona una opción',
    },
    paciente: {
        required: 'Selecciona una opción',
    }
};

export default validationTransplanteProgenitores;