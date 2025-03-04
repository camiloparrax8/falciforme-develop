import { HistoriaClinica } from '@/types/historiaClinica';

export const historiaClinicaData: HistoriaClinica = {
  id: 1,
  fecha_creacion: "2025-03-03",
  paciente: {
    nombre: "Juan Pérez",
    edad: 45,
    genero: "Masculino",
  },
  examenesFisicos: {
    frecuencia_cardiaca: 72,
    frecuencia_respiratoria: 16,
    saturacion_oxigeno: 98,
    tension_arterial: "120/80",
    peso: 70,
    talla: 1.75,
    imc: 22.9,
  },
  laboratorios: {
    hemoglobina: 13.5,
    hematocritos: 40,
    mcv: 85,
    mch: 28,
    rdw: 12.5,
  },
  imagenesDiagnosticas: [
    {
      tipo_resultado: "Radiografía de tórax",
      resultado: "Sin alteraciones",
    },
  ],
  soportesTransfusionales: {
    numero_transfusiones: 3,
    frecuencia: "Mensual",
    aloinmunizacion: false,
  },
  trasplantesProgenitores: {
    paciente: "Juan Pérez",
    tipo_indicaciones: "No aplica",
  },
  tratamientos: [
    {
      titulo: "Hidroxicloroquina",
      n_dias: 30,
      dosis: "200 mg/día",
      tipo: "Oral",
    },
  ],
  vacunas: [
    {
      nombre: "Influenza",
      descripcion: "Vacuna anual contra la gripe",
    },
  ],
}; 