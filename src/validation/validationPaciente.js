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
}

export default validationPaciente
