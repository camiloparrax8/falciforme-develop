const validationIngreso = {
    fechaPrimeraConsulta: {
        required: 'La fecha de la primera consulta es obligatoria',
        pattern: {
            value: /^\d{4}-\d{2}-\d{2}$/,
            message: 'La fecha debe tener el formato YYYY-MM-DD',
        },
        
        validate: (value) => {
            const fechaIngresada = new Date(value);
            const fechaActual = new Date();
            return (
                fechaIngresada <= fechaActual || 'La fecha no puede ser futura'
            );
        },
    },
    edadConsulta: {
        required: 'La edad en la consulta es obligatoria',
        pattern: {
            value: /^[0-9]+$/,
            message: 'Solo se permiten números',
        },
        min: {
            value: 0,
            message: 'La edad no puede ser negativa',
        },
        max: {
            value: 120,
            message: 'La edad no puede superar los 120 años',
        },
    },
    fechaInicioSintomas: {
        required: 'La fecha de inicio de síntomas es obligatoria',
        pattern: {
            value: /^\d{4}-\d{2}-\d{2}$/,
            message: 'La fecha debe tener el formato YYYY-MM-DD',
        },
        validate: (value) => {
            const fechaIngresada = new Date(value);
            const fechaActual = new Date();
            return (
                fechaIngresada <= fechaActual || 'La fecha no puede ser futura'
            );
        },
    },
    sintomas: {
        required: 'Debe seleccionar al menos un síntoma',
        validate: (value) => value.length > 0 || 'Debe elegir al menos un síntoma',
    },
    observacion: {
        required: 'La observación es obligatoria',
        minLength: {
            value: 10,
            message: 'La observación debe tener al menos 10 caracteres',
        },
        maxLength: {
            value: 500,
            message: 'La observación no puede exceder los 500 caracteres',
        },
    },
};

export default validationIngreso;