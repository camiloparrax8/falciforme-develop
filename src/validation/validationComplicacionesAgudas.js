const validationComplicacionesAgudas = {
    fecha: {
        required: 'La fecha es requerida.',
        validate: value => {
            const date = new Date(value);
            return !isNaN(date.getTime()) || 'La fecha debe ser una fecha válida.';
        },
    },
    dias_crisis: {
        required: 'Los días de crisis son requeridos.',
        validate: value => value > 0 || 'Los días de crisis deben ser mayor a 0.',
    },
    intensidad: {
        required: 'La intensidad es requerida.',
        validate: value => value.length > 0 || 'La intensidad no puede estar vacía.',
    },
    manejo: {
        required: 'El manejo es requerido.',
        validate: value => {
            if (value !== "Casa" && value !== "Hospitalario") {
                return 'El manejo debe ser "Casa" u "Hospitalario".';
            }
            return true;
        },
    },
    tratamiento: {
        required: 'El tratamiento es requerido.',
        validate: value => value.length > 0 || 'El tratamiento no puede estar vacío.',
    },
    huesos_afectados: {
        required: 'Los huesos afectados son requeridos.',
        validate: value => value.length > 0 || 'Los huesos afectados no pueden estar vacíos.',
    },
    germen: {
        required: 'El germen es requerido.',
        validate: value => value.length > 0 || 'El germen no puede estar vacío.',
    },
    tratamiento_infecciones: {
        required: 'El tratamiento de infección es requerido.',
        validate: value => value.length > 0 || 'El tratamiento de infección no puede estar vacío.',
    },
    dias_infeccion: {
        required: 'Los días de infección son requeridos.',
        validate: value => value >= 0 || 'Los días de infección deben ser un número entero positivo.',
    },
    crisis_aplastica_infecciosa: {
        required: 'La crisis aplástica infecciosa es requerida.',
    },
};
export default validationComplicacionesAgudas;