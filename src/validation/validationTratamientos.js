const validationTratamientos = {
    titulo: {
        required: 'Selecciona un tipo de tratamiento',
        validate: (value) => {
            if (value !== "Tratamiento individual" && value !== "Manejo de dolor") {
                return "El título debe ser Tratamiento individual o Manejo de dolor";
            }
            return true;
        }
    },
    tipo: {
        required: 'Selecciona un tipo de tratamiento o de medicamento',
    },
    n_dias: {
        required: 'El número de días es obligatorio',
        pattern: {
            value: /^[0-9]+$/,
            message: 'Solo se permiten números',
        },
        validate: (value) => {
            const num = parseInt(value);
            if (num < 0) {
                return "El número de días debe ser un número entero positivo";
            }
            return true;
        },
        maxLength: {
            value: 15,
            message: 'No puede exceder los 15 caracteres',
        },
    },
    dosis: {
        required: 'La dosis es obligatoria',
        maxLength: {
            value: 100,
            message: 'No puede exceder los 100 caracteres',
        },
    },
    id_paciente: {
        required: 'El ID del paciente es requerido',
    },
    id_user_create: {
        required: 'El ID del usuario creador es requerido',
    }
}

export default validationTratamientos;