const validationExamenesFisicos = {
  frecuencia_cardiaca: {
    required: 'La frecuencia cardíaca es obligatoria.',
    pattern: {
      value: /^[0-9]+$/,
      message: 'La frecuencia cardíaca debe ser un número.',
    },
  },
  frecuencia_respiratoria: {
    required: 'La frecuencia respiratoria es obligatoria.',
    pattern: {
      value: /^[0-9]+$/,
      message: 'La frecuencia respiratoria debe ser un número.',
    },
  },
  saturacion_oxigeno: {
    required: 'La saturación de oxígeno es obligatoria.',
    pattern: {
      value: /^[0-9]+$/,
      message: 'La saturación de oxígeno debe ser un número.',
    },
  },
  tension_arterial: {
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
    pattern: {
      value: /^[0-9.]+$/,
      message: 'El IMC debe ser un número.',
    },
  },
  deficit_zinc: {
    required: 'Debe seleccionar si hay déficit de zinc.',
  },
  deficit_acido_folico: {
    required: 'Debe seleccionar si hay déficit de ácido fólico.',
  },
  deficit_vitamina_d: {
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
