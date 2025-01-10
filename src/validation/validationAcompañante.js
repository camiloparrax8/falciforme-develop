const validationAcompañante = {
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
    relationship: {
        required: 'La relación con el paciente es obligatoria',
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
    pesoAlNacer: {
        required: 'El peso al nacer es obligatorio',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/, // Permite números con hasta dos decimales
            message: 'Debe ser un número válido',
        },
        min: {
            value: 0.5, // 500 gramos es aproximadamente 0.5 kg
            message: 'El peso al nacer debe ser mayor o igual a 0.5 kg',
        },
        max: {
            value: 5, // 5000 gramos es 5 kg
            message: 'El peso al nacer debe ser menor o igual a 5 kg',
        },
    },
    tallaAlNacer: {
        required: 'La talla al nacer es obligatoria',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/, // Permite números con hasta dos decimales
            message: 'Debe ser un número válido',
        },
        min: {
            value: 20,
            message: 'La talla al nacer debe ser mayor o igual a 20 cm',
        },
        max: {
            value: 60,
            message: 'La talla al nacer debe ser menor o igual a 60 cm',
        },
    },
};

export default validationAcompañante;
