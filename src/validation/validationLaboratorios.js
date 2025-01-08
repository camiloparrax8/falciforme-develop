const validationLaboratorios = {
    hematies: {
        required: 'El número de hematíes es obligatorio',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/, // Para valores numéricos, con hasta 2 decimales
            message: 'El valor debe ser un número válido',
        },
        min: {
            value: 0,
            message: 'El número de hematíes no puede ser negativo',
        },
    },
    hemoglobina: {
        required: 'La hemoglobina es obligatoria',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: 'El valor debe ser un número válido',
        },
        min: {
            value: 0,
            message: 'La hemoglobina no puede ser negativa',
        },
    },
    hematocrito: {
        required: 'El hematocrito es obligatorio',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: 'El valor debe ser un número válido',
        },
        min: {
            value: 0,
            message: 'El hematocrito no puede ser negativo',
        },
    },
    mcv: {
        required: 'El volumen corpuscular medio (MCV) es obligatorio',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: 'El valor debe ser un número válido',
        },
        min: {
            value: 0,
            message: 'El MCV no puede ser negativo',
        },
    },
    mch: {
        required: 'La hemoglobina corpuscular media (MCH) es obligatoria',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: 'El valor debe ser un número válido',
        },
        min: {
            value: 0,
            message: 'El MCH no puede ser negativo',
        },
    },
    mchc: {
        required: 'La concentración de hemoglobina corpuscular media (MCHC) es obligatoria',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: 'El valor debe ser un número válido',
        },
        min: {
            value: 0,
            message: 'El MCHC no puede ser negativo',
        },
    },
    rdw: {
        required: 'La anchura de distribución eritrocitaria (RDW) es obligatoria',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: 'El valor debe ser un número válido',
        },
        min: {
            value: 0,
            message: 'El RDW no puede ser negativo',
        },
    },
};

export default validationLaboratorios;
