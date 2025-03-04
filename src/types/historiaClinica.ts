export interface HistoriaClinica {
  id: number;
  fecha_creacion: string;
  paciente: {
    nombre: string;
    edad: number;
    genero: string;
  };
  examenesFisicos: {
    frecuencia_cardiaca: number;
    frecuencia_respiratoria: number;
    saturacion_oxigeno: number;
    tension_arterial: string;
    peso: number;
    talla: number;
    imc: number;
  };
  laboratorios: {
    hemoglobina: number;
    hematocritos: number;
    mcv: number;
    mch: number;
    rdw: number;
  };
  imagenesDiagnosticas: Array<{
    tipo_resultado: string;
    resultado: string;
  }>;
  soportesTransfusionales: {
    numero_transfusiones: number;
    frecuencia: string;
    aloinmunizacion: boolean;
  };
  trasplantesProgenitores: {
    paciente: string;
    tipo_indicaciones: string;
  };
  tratamientos: Array<{
    titulo: string;
    n_dias: number;
    dosis: string;
    tipo: string;
  }>;
  vacunas: Array<{
    nombre: string;
    descripcion: string;
  }>;
} 