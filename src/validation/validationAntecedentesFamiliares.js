const validationAntecedentesFamiliares = {
    estadoHBS: {
        parentesco: {
            required: 'Debe seleccionar un parentesco',
        },
        linea: {
            required: 'Debe seleccionar una línea',
        },
        estado: {
            required: 'Debe seleccionar un estado',
            validate: (value) =>
                ['Portador', 'No portador', 'Desconocido'].includes(value) ||
                'El estado seleccionado no es válido',
        },
    },
    enfermedadesCronicas: {
        enfermedad: {
            required: 'La enfermedad es obligatoria',
            maxLength: {
                value: 150,
                message: 'La enfermedad debe tener como máximo 150 caracteres'
            }
        },
        enfermedad_especifica: {
            required: 'La enfermedad específica es obligatoria',
            maxLength: {
                value: 255,
                message: 'La enfermedad específica debe tener como máximo 255 caracteres'
            }
        },
        portador: {
            required: 'El campo portador es obligatorio',
            validate: (value) =>
                ['Sí', 'No'].includes(value) ||
                'El valor de portador debe ser "Sí" o "No"'
        },
        linea_parentesco_portador: {
            required: 'La línea de parentesco del portador es obligatoria',
            validate: (value) => {
                if (!Array.isArray(value) || value.length === 0) {
                    return 'Debe seleccionar al menos un parentesco';
                }
                const parentescosString = value.join(', ');
                if (parentescosString.length > 100) {
                    return 'La línea de parentesco no debe exceder los 100 caracteres';
                }
                return true;
            }
        }
    },
}

export default validationAntecedentesFamiliares;