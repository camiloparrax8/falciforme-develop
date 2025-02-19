const validationAntecedentesPerinatologicos = {
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
    nota: {
        required: 'La nota es obligatoria',
        minLength: {
            value: 10,
            message: 'Debe tener al menos 10 caracteres',
        },
        maxLength: {
            value: 500,
            message: 'No puede exceder los 500 caracteres',
        },
    },
    condicionAlNacer: {
        required: 'La condición al nacer es obligatoria',
        minLength: {
            value: 3,
            message: 'Debe tener al menos 3 caracteres',
        },
        maxLength: {
            value: 100,
            message: 'No puede exceder los 100 caracteres',
        },
        pattern: {
            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, // Solo letras y espacios
            message: 'Solo se permiten letras del alfabeto español',
        },
    },
    cuidadoNeonatal: {
        required: 'El cuidado neonatal es obligatorio',
        minLength: {
            value: 3,
            message: 'Debe tener al menos 3 caracteres',
        },
        maxLength: {
            value: 100,
            message: 'No puede exceder los 100 caracteres',
        },
        pattern: {
            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, // Solo letras y espacios
            message: 'Solo se permiten letras del alfabeto español',
        },
    },
    etiricoNeonatal: {
        required: 'El criterio neonatal es obligatorio',
        pattern: {
            value: /^(Sí|No)$/,
            message: 'Solo se permite "Sí" o "No"',
        },
    },
    
};

export default validationAntecedentesPerinatologicos;
