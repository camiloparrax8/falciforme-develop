// historiaClinicaData.js
export const historiaClinicaData = {
  id: 1,
  fecha_creacion: "2025-03-03",
  paciente: {
    nombre: "Juan Pérez",
    edad: 45,
    genero: "Masculino",
  },
  
    examenesFisicos: {
      signos_vitales: {
        frecuencia_cardiaca: "72 lpm",
        frecuencia_respiratoria: "16 rpm",
        saturacion_oxigeno: "98%",
        tension_arterial: "120/80 mmHg",
      },
      peso_talla: {
        peso: "70 kg",
        talla: "175 cm",
        percentil: "50",
        imc: "22.9",
      },
      estado_nutricional: {
        deficit_zinc: "Normal",
        deficit_acido_folico: "Normal",
        deficit_vitamina_d: "Normal",
        desnutricion: "No",
        obesidad: "No",
      },
      region_cefalica: {
        perimetro_cefalico: "55 cm",
        agudeza_visual: "20/20",
        examen_orl: "Normal",
        caries: "No",
        cuello: "Sin alteraciones",
      },
      region_toracoabdominal: {
        cardio_pulmonar: "Normal",
        abdominal: "Sin anomalías",
      },
      region_pelvica: {
        tanner: "Etapa 3",
        extremidades: "Sin alteraciones",
      },
    },
  
  complicacionesAgudas: {
    crisis_dolor: {
      fecha: "2025-02-28",
      dias: 3,
      intensidad: 7,
      manejo: "Analgésicos y reposo",
      tratamiento: "Ibuprofeno 400mg cada 8 horas",
      huesos_afectados: "Fémur y Tibia",
    },
    infecciones: {
      germen: "Streptococcus pneumoniae",
      tratamiento: "Amoxicilina 500mg cada 8 horas",
      dias: 7,
    },
    anemia_aguda: {
      crisis_aplastica_infecciosa: "Sí",
      manejo: "Transfusión de glóbulos rojos",
    },
  },
  complicacionesCronicas: {
    region_cefalica: {
      cerebrales: "Infartos cerebrales previos",
      oculares: "Retinopatía en ojo derecho",
    },
    region_toracoabdominal: {
      cardiacas: "Hipertrofia ventricular izquierda",
      pulmonares: "Enfermedad pulmonar obstructiva leve",
      hepaticas: "Hepatomegalia leve",
    },
    region_genitourinaria: {
      genitourinario: "Nefropatía leve",
      oseas: "Osteonecrosis de cadera",
    },
  },
  trasplanteProgenitores: {
    estudios_hla: {
      paciente: "Pendiente",
      padres: "Compatible",
      hermanos: "No compatible"
    },
    indicaciones_trasplante: {
      tipo: "Alogénico"
    }
  },
  laboratorios: {
    hematies: "4.5 millones/mm³",
    hemoglobina: "13.5 g/dL",
    hematocrito: "40%",
    mcv: "85 fL",
    mch: "29 pg",
    mchc: "34 g/dL",
    rdw: "12.5%"
  },
  imagenes_diagnosticas:{
    tipo_imagen: "Radiografía de tórax",
    fecha: "2025-03-03",
    tipo_resultado: "Normal",
    resultado: "Sin alteraciones"
  },
  soportes_transfusionales: {
    inicio_soporte_transfusional: "2025-01-10",
    soporte_transfusional: "Glóbulos Rojos",
    numero_transfusiones: 5,
    frecuencia: "Mensual",
    aloinmunizacion: "No",
    sobrecarga_hierro: {
      fecha: "2025-02-20",
      quelantes: "Deferasirox",
      ferritina: "1200 ng/mL",
      dosis_mg_kg_dia: "20 mg/kg/día"
    },
    sobrecarga_por_organo: {
      fecha: "2025-03-05",
      lic_higado: "5 mg/g",
      pancreatica_r2: "30 Hz",
      evaluacion_cardiaca_t2: "25 ms"
    },
  },
  vacunas: {
    nombre_vacuna: "Astrazeneca",
    fecha_vacunacion: "2025-03-05",
  },
  tratamientos: {
    tratamiento_individual: {
      
        tipo_tratamiento: "Antibiótico",
        numero_dias: 7,
        dosis: "500 mg cada 8 horas"
    },
    manejo_dolor: {
      medicamento: "Paracetamol",
        medicamento: "Paracetamol",
        numero_dias: 5,
        dosis: "500 mg cada 6 horas"
      }
    }
  
  

};
