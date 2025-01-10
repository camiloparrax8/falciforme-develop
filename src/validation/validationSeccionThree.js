const validationSeccionThree = {
    estadioTanner: {
        required: 'El estadio de Tanner es obligatorio',
    },
    observacion: {
        required: 'La observación es obligatoria',
        maxLength: {
            value: 200,
            message: 'La observación no puede exceder los 200 caracteres',
        },
    },
    piel: {
        required: 'El estado de la piel es obligatorio',
        maxLength: {
            value: 100,
            message: 'El estado de la piel no puede exceder los 100 caracteres',
        },
    },
    edemasUlceras: {
        required: 'Debe seleccionar si tiene edemas, úlceras, o ambos',
    },
};

export default  validationSeccionThree;
