const validationLaboratorios = {
    hematies: {
        required: 'El número de hematíes es obligatorio',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: 'El valor debe ser un número válido',
        },
        min: {
            value: 0,
            message: 'El número de hematíes no puede ser negativo',
        },
    },
    hemoglobina: {
        required: 'La concentración de hemoglobina es obligatoria',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: 'El valor debe ser un número válido',
        },
        min: {
            value: 0,
            message: 'La concentración de hemoglobina no puede ser negativa',
        },
    },
    hematocritos: {
        required: 'El porcentaje de hematocritos es obligatorio',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: 'El valor debe ser un número válido',
        },
        min: {
            value: 0,
            message: 'El porcentaje de hematocritos no puede ser negativo',
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
            message: 'La anchura de distribución eritrocitaria (RDW) no puede ser negativa',
        },
    },
};

export default validationLaboratorios;
