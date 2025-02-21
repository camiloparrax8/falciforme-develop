const validationAcompañante = {
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
            message: 'Solo se permiten letras',
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
            message: 'Solo se permiten letras',
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
    municipio: {
        required: 'El municipio es obligatorio',
    },
    departamento: {
        required: 'El departamento es obligatorio',
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
    tipo_vivienda: {
        required: 'El tipo de vivienda es obligatorio',
    },
    nivel_ingreso: {
        required: 'El nivel de ingreso es obligatorio',
    },
    nivel_academico: {
        required: 'El nivel académico es obligatorio',
    },
    tipo_vehiculo: {
        required: 'El tipo de vehículo es obligatorio',
    },
    pesoAlNacer: {
        required: 'El peso al nacer es obligatorio',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: 'Debe ser un número válido',
        },
        min: {
            value: 0.5,
            message: 'El peso debe ser mayor o igual a 0.5 kg',
        },
        max: {
            value: 5,
            message: 'El peso debe ser menor o igual a 5 kg',
        },
    },
    tallaAlNacer: {
        required: 'La talla al nacer es obligatoria',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: 'Debe ser un número válido',
        },
        min: {
            value: 20,
            message: 'La talla debe ser mayor o igual a 20 cm',
        },
        max: {
            value: 60,
            message: 'La talla debe ser menor o igual a 60 cm',
        },
    },
};

export default validationAcompañante;
