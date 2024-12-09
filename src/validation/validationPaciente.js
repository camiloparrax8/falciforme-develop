const validationPaciente = {
    fullName: {
        required: 'El nombre completo es obligatorio',
        minLength: {
            value: 3,
            message: 'Debe tener al menos 3 caracteres',
        },
        maxLength: {
            value: 50,
            message: 'No puede exceder los 50 caracteres',
        },
        pattern: {
            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            message: 'Solo se permiten letras del alfabeto español',
        },
    },
    documentType: {
        required: 'Selecciona un tipo de documento',
    },
    identification: {
        required: 'La identificación es obligatoria',
        pattern: {
            value: /^[0-9]+$/,
            message: 'Solo se permiten números',
        },
        minLength: {
            value: 7,
            message: 'Debe tener al menos 7 caracteres',
        },
        maxLength: {
            value: 11,
            message: 'No puede exceder los 11 caracteres',
        },
    },
    department: {
        required: 'Selecciona un departamento',
    },
    city: {
        required: 'Selecciona un municipio',
    },
    address: {
        required: 'La dirección es obligatoria',
        minLength: {
            value: 5,
            message: 'Debe tener al menos 5 caracteres',
        },
        maxLength: {
            value: 100,
            message: 'No puede exceder los 100 caracteres',
        },
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
    email: {
        required: 'El correo electrónico es obligatorio',
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Formato de correo inválido',
        },
    },
    birthDate: {
        required: 'La fecha de nacimiento es obligatoria',
        validate: {
            notFutureDate: (value) =>
                new Date(value) <= new Date() ||
                'No se permite una fecha futura',
        },
    },

    residency: {
        required: 'El lugar de residencia es obligatorio',
        minLength: {
            value: 3,
            message: 'Debe tener al menos 3 caracteres',
        },
        maxLength: {
            value: 50,
            message: 'No puede exceder los 50 caracteres',
        },
    },

    provenance: {
        required: 'El lugar de procedencia es obligatorio',
        minLength: {
            value: 3,
            message: 'Debe tener al menos 3 caracteres',
        },
        maxLength: {
            value: 50,
            message: 'No puede exceder los 50 caracteres',
        },
    },

    stratum: {
        required: 'El estrato es obligatorio',
        pattern: {
            value: /^[1-6]$/,
            message: 'El estrato debe ser un número entre 1 y 6',
        },
    },

    occupation: {
        required: 'La ocupación es obligatoria',
        minLength: {
            value: 3,
            message: 'Debe tener al menos 3 caracteres',
        },
        maxLength: {
            value: 50,
            message: 'No puede exceder los 50 caracteres',
        },
    },

    regime: {
        required: 'El régimen es obligatorio',
        minLength: {
            value: 3,
            message: 'Debe tener al menos 3 caracteres',
        },
        maxLength: {
            value: 50,
            message: 'No puede exceder los 50 caracteres',
        },
    },
}

export default validationPaciente
