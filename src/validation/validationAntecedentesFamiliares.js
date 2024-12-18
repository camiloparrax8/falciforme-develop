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
                ['portador', 'no_portador', 'desconocido'].includes(value) ||
                'El estado seleccionado no es válido',
        },
    },
    enfermedadesCronicas: {
        enfermedad: {
            required: 'Debe seleccionar una enfermedad crónica',
        },
        enfermedad_especifica: {
            required: 'Debe seleccionar una enfermedad específica',
        },
        parentescosMultiples: {
            validate: (value) =>
                Array.isArray(value) && value.length > 0
                    ? true
                    : 'Debe seleccionar al menos un parentesco',
        },
    },
}

export default validationAntecedentesFamiliares;