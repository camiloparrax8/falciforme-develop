const validationExamenesFisicos = {
    frecuenciaCardiaca: {
      required: 'La frecuencia cardíaca es obligatoria.',
      pattern: {
        value: /^[0-9]+$/,
        message: 'La frecuencia cardíaca debe ser un número.',
      },
    },
    frecuenciaRespiratoria: {
      required: 'La frecuencia respiratoria es obligatoria.',
      pattern: {
        value: /^[0-9]+$/,
        message: 'La frecuencia respiratoria debe ser un número.',
      },
    },
    saturacionOxigeno: {
      required: 'La saturación de oxígeno es obligatoria.',
      pattern: {
        value: /^[0-9]+$/,
        message: 'La saturación de oxígeno debe ser un número.',
      },
    },
    tensionArterial: {
      required: 'La tensión arterial es obligatoria.',
      pattern: {
        value: /^[0-9/]+$/,
        message: 'La tensión arterial debe ser en formato válido (ej: 120/80).',
      },
    },
    peso: {
      required: 'El peso es obligatorio.',
      pattern: {
        value: /^[0-9.]+$/,
        message: 'El peso debe ser un número.',
      },
    },
    talla: {
      required: 'La talla es obligatoria.',
      pattern: {
        value: /^[0-9.]+$/,
        message: 'La talla debe ser un número.',
      },
    },
    percentil: {
      required: 'El percentil es obligatorio.',
      pattern: {
        value: /^[0-9]+$/,
        message: 'El percentil debe ser un número.',
      },
    },
    imc: {
      required: 'El IMC es obligatorio.',
      pattern: {
        value: /^[0-9.]+$/,
        message: 'El IMC debe ser un número.',
      },
    },
    deficitZinc: {
      required: 'Debe seleccionar si hay déficit de zinc.',
    },
    deficitAcidoFolico: {
      required: 'Debe seleccionar si hay déficit de ácido fólico.',
    },
    deficitVitaminaD: {
      required: 'Debe seleccionar si hay déficit de vitamina D.',
    },
    desnutricion: {
      required: 'Debe seleccionar si hay desnutrición.',
    },
    obesidad: {
      required: 'Debe seleccionar si hay obesidad.',
    },
  };
  
  export default validationExamenesFisicos;
  