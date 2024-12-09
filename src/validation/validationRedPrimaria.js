const validationRedPrimaria = {
    date: {
        required: 'La fecha es obligatoria',
        validate: {
            notFutureDate: (value) =>
                new Date(value) <= new Date() ||
                'No se permite una fecha futura',
        },
    },
    hospital: {
        required: 'El hospital remitido es obligatorio',
        minLength: {
            value: 3,
            message: 'Debe tener al menos 3 caracteres',
        },
        maxLength: {
            value: 100,
            message: 'No puede exceder los 100 caracteres',
        },
    },
    department: {
        required: 'Selecciona un departamento',
    },
    city: {
        required: 'Selecciona un municipio',
    },
    phone: {
        required: 'El número de celular es obligatorio',
        pattern: {
            value: /^[0-9]+$/,
            message: 'Solo se permiten números',
        },
        minLength: {
            value: 10,
            message: 'Debe tener al menos 10 caracteres',
        },
        maxLength: {
            value: 15,
            message: 'No puede exceder los 15 caracteres',
        },
    },
    emergencyPhone: {
        required: 'El número de urgencia es obligatorio',
        pattern: {
            value: /^[0-9]+$/,
            message: 'Solo se permiten números',
        },
        minLength: {
            value: 10,
            message: 'Debe tener al menos 10 caracteres',
        },
        maxLength: {
            value: 15,
            message: 'No puede exceder los 15 caracteres',
        },
    },
    email: {
        required: 'El correo electrónico es obligatorio',
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Formato de correo inválido',
        },
    },
};

export default validationRedPrimaria;
