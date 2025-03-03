const validationUsuario = {
    nombre: {
        required: "El nombre es requerido",
        minLength: {
            value: 3,
            message: "El nombre debe tener al menos 3 caracteres",
        },
    },
    cedula: {
        required: "La cedula es requerida",
        minLength: {
            value: 10,
            message: "La cedula debe tener al menos 10 caracteres",
        },
    },
    correo: {
        required: "El correo es requerido",
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "El correo no es válido",
        },
    },
    celular: {
        required: "El celular es requerido",
        pattern: {
            value: /^[0-9]+$/,
            message: "El celular no es válido",
        },
        maxLength: {
            value: 10,
            message: "El celular no puede tener más de 10 caracteres",
        },
    },
    rol: {
        required: "El rol es requerido",
    },  
}

export default validationUsuario;
