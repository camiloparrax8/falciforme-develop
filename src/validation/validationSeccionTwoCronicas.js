const validationSeccionTwoCronicas = {
    retinopatiaDrepanocitica: {
        required: 'Debe seleccionar una opción para Retinopatía drepanocítica',
    },
    hemorragiasVitreas: {
        required: 'Debe seleccionar una opción para Hemorragias vítreas',
    },
    neovascularizacionRetiniana: {
        required: 'Debe seleccionar una opción para Neovascularización retiniana',
    },
    iritisOUveitis: {
        required: 'Debe seleccionar una opción para Iritis o uveítis',
    },
    oclusionVasosRetinianos: {
        required: 'Debe seleccionar una opción para Oclusión de vasos retinianos',
    },
    disfuncionDiastolicaVI: {
        required: 'Debe seleccionar una opción para Disfunción Diastólica del VI',
    },
    sobrecargaFerrica: {
        required: 'Debe seleccionar una opción para Sobrecarga Férrica',
    },
    trombosis: {
        required: 'Debe seleccionar una opción para Trombosis',
    },
    hipertensionPulmonar: {
        required: 'Debe seleccionar una opción para Hipertensión Pulmonar',
    },
    vrt: {
        required: 'El valor de VRT es obligatorio',
        pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: 'Debe ser un número con hasta dos decimales',
        },
    },
    crisisAsma: {
        required: 'El número de crisis por año es obligatorio',
        pattern: {
            value: /^[0-9]+$/,
            message: 'Debe ser un número entero',
        },
    },
    tratamientoAsma: {
        required: 'Debe ingresar un tratamiento para el asma y las sibilancias',
    },
    hipomexiaEPFC: {
        required: 'Debe seleccionar una opción para Hipomexia (EPFC)',
    },
    saosEPFC: {
        required: 'Debe seleccionar una opción para SAOS (EPFC)',
    },
    tratamientoEPFC: {
        required: 'Debe ingresar un tratamiento para la EPFC',
    },
    hepatitisViralCronica: {
        required: 'Seleccione una opción para Hepatitis Viral Crónica.',
    },
    esplenomegalia: {
        required: 'Seleccione una opción para Esplenomegalia.',
    },
    hiperesplenismo: {
        required: 'Seleccione una opción para Hiperesplenismo.',
    },
};

export default validationSeccionTwoCronicas;
