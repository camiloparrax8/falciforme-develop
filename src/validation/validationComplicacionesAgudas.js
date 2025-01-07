const validationComplicacionesAgudas = {
    ingresoTipo: {
        required: 'El tipo de ingreso es requerido.',
    },
    ingresoFecha: {
        required: 'La fecha de ingreso es requerida.',
    },
    ingresoDuracion: {
        required: 'La duración del ingreso es requerida.',
        validate: value => value > 0 || 'La duración debe ser mayor a 0 días.',
    },
    ingresoMotivo: {
        required: 'El motivo de ingreso es requerido.',
    },
    crisisDolorFecha: {
        required: 'La fecha de la crisis de dolor es requerida.',
    },
    crisisDolorDias: {
        required: 'La cantidad de días es requerida.',
        validate: value => value > 0 || 'La cantidad de días debe ser mayor a 0.',
    },
    crisisDolorIntensidad: {
        required: 'La intensidad de la crisis de dolor es requerida.',
        validate: value =>
            value >= 1 && value <= 10 || 'La intensidad debe estar entre 1 y 10.',
    },
    crisisDolorManejo: {
        required: 'El manejo de la crisis de dolor es requerido.',
    },
    crisisDolorTratamiento: {
        required: 'El tratamiento de la crisis de dolor es requerido.',
    },
    crisisDolorHuesos: {
        required: 'Los huesos afectados son requeridos.',
    },
    infeccionesGermen: {
        required: 'El germen de la infección es requerido.',
    },
    infeccionesTratamiento: {
        required: 'El tratamiento de la infección es requerido.',
    },
    infeccionesDias: {
        required: 'La cantidad de días de tratamiento es requerida.',
        validate: value => value > 0 || 'La cantidad de días debe ser mayor a 0.',
    },
    anemiaCrisisAplastica: {
        required: 'La crisis aplástica infecciosa es requerida.',
    },
};
export default validationComplicacionesAgudas;