const validationVacunas = {
    tipoVacuna: {
        required: 'Debe seleccionar al menos un tipo de vacuna',
        validate: {
            notEmpty: (value) =>
                value && value.length > 0 || 'Debe seleccionar al menos una opción',
        },
    },
    dosis: {
        required: 'La cantidad de dosis es obligatoria',
        pattern: {
            value: /^[0-9]+$/,
            message: 'Solo se permiten números',
        },
        min: {
            value: 1,
            message: 'Debe ser al menos 1 dosis',
        },
        max: {
            value: 10,
            message: 'No puede exceder las 10 dosis',
        },
    },
    fechaVacuna: {
        required: 'La fecha de vacunación es obligatoria',
        pattern: {
            value: /^\d{4}-\d{2}-\d{2}$/, // Formato YYYY-MM-DD
            message: 'La fecha debe estar en formato YYYY-MM-DD',
        },
        validate: {
            validDate: (value) => {
                const date = new Date(value);
                return (
                    !isNaN(date.getTime()) || 'La fecha ingresada no es válida'
                );
            },
            notFuture: (value) => {
                const today = new Date();
                const inputDate = new Date(value);
                return (
                    inputDate <= today || 'La fecha no puede ser en el futuro'
                );
            },
        },
    },
};

export default validationVacunas;
