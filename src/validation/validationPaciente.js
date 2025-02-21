const validationPaciente = {
    nombre: {
        required: 'El nombre es obligatorio',
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

    apellido: {
        required: 'El apellido es obligatorio',
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
    tipo_identificacion: {
        required: 'Selecciona un tipo de documento',
    },
    identificacion: {
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
    departamento: {
        required: 'Selecciona un departamento',
    },
    municipio: {
        required: 'Selecciona un municipio',
    },
    direccion: {
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
    celular: {
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
    correo: {
        required: 'El correo electrónico es obligatorio',
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Formato de correo inválido',
        },
    },
    fecha_nacimiento: {
        required: 'La fecha de nacimiento es obligatoria',
        validate: {
            notFutureDate: (value) =>
                new Date(value) <= new Date() ||
                'No se permite una fecha futura',
        },
    },

    residente: {
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

    procedente: {
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

    estrato: {
        required: 'El estrato es obligatorio',
        pattern: {
            value: /^[0-6]$/,
            message: 'El estrato debe ser un número entre 0 y 6',
        },
    },

    ocupacion: {
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

    regimen: {
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
    sexo: {
        required: 'El sexo es obligatorio',
        message: 'Selecciona una opción válida para el sexo',
    },
    identidad_genero: {
        required: 'La identidad de género es obligatoria',
        message: 'Selecciona una opción válida para la identidad de género',
    },
    identidad_sexual: {
        required: 'La identidad sexual es obligatoria',
        message: 'Selecciona una opción válida para la identidad sexual',
    },
}

export default validationPaciente
