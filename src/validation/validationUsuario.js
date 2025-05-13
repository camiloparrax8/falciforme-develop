const validationUsuario = {
    nombres: {
        required: "El nombre es requerido",
        minLength: {
            value: 3,
            message: "El nombre debe tener al menos 3 caracteres",
        },
    },
    apellidos: {
        required: "El apellido es requerido",
        minLength: {
            value: 3,
            message: "El apellido debe tener al menos 3 caracteres",
        },
    },
    user: {
        required: "El nick de usuario es requerido",
        minLength: {
            value: 3,
            message: "El nick de usuario debe tener al menos 3 caracteres",
        },
    },
    cedula: {
        required: "La cedula es requerida",
        pattern: {
            value: /^[0-9]+$/,
            message: "La cedula no es válida",
        },
        minLength: {
            value: 7,
            message: "La cedula debe tener al menos 7 caracteres",
        },
        maxLength: {
            value: 10,
            message: "La cedula no puede tener más de 10 caracteres",
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
    id_rol: {
        required: "El rol es requerido",
    },  
}

export default validationUsuario;
