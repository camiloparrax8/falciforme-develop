import { HistoriaClinica } from '@/types/historiaClinica';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts;

export const useGeneratePDF = (historiaClinica: HistoriaClinica) => {
  const generatePDF = () => {
    const docDefinition = {
      content: [
        { text: "HISTORIA CLÍNICA", style: "header", alignment: "center" },
        { text: `Fecha: ${historiaClinica.fecha_creacion}`, margin: [0, 10, 0, 5] },
        { text: "Paciente", style: "subheader" },
        {
          table: {
            widths: ["auto", "*"],
            body: [
              ["Nombre", historiaClinica.paciente.nombre],
              ["Edad", historiaClinica.paciente.edad + " años"],
              ["Género", historiaClinica.paciente.genero],
            ],
          },
        },
        { text: "Exámenes Físicos", style: "subheader", margin: [0, 10, 0, 5] },
        {
          table: {
            body: [
              ["Frecuencia Cardiaca", historiaClinica.examenesFisicos.frecuencia_cardiaca + " bpm"],
              ["Frecuencia Respiratoria", historiaClinica.examenesFisicos.frecuencia_respiratoria + " rpm"],
              ["Saturación de Oxígeno", historiaClinica.examenesFisicos.saturacion_oxigeno + "%"],
              ["Tensión Arterial", historiaClinica.examenesFisicos.tension_arterial],
              ["Peso", historiaClinica.examenesFisicos.peso + " kg"],
              ["Talla", historiaClinica.examenesFisicos.talla + " m"],
              ["IMC", historiaClinica.examenesFisicos.imc],
            ],
          },
        },
        { text: "Laboratorios", style: "subheader", margin: [0, 10, 0, 5] },
        {
          table: {
            body: [
              ["Hemoglobina", historiaClinica.laboratorios.hemoglobina + " g/dL"],
              ["Hematocritos", historiaClinica.laboratorios.hematocritos + "%"],
              ["MCV", historiaClinica.laboratorios.mcv + " fL"],
              ["MCH", historiaClinica.laboratorios.mch + " pg"],
              ["RDW", historiaClinica.laboratorios.rdw + "%"],
            ],
          },
        },
        { text: "Imágenes Diagnósticas", style: "subheader", margin: [0, 10, 0, 5] },
        {
          ul: historiaClinica.imagenesDiagnosticas.map((img) => `${img.tipo_resultado}: ${img.resultado}`),
        },
        { text: "Tratamientos", style: "subheader", margin: [0, 10, 0, 5] },
        {
          ul: historiaClinica.tratamientos.map(
            (trat) => `${trat.titulo} (${trat.tipo}): ${trat.dosis} por ${trat.n_dias} días`
          ),
        },
        { text: "Vacunas", style: "subheader", margin: [0, 10, 0, 5] },
        {
          ul: historiaClinica.vacunas.map((vac) => `${vac.nombre}: ${vac.descripcion}`),
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        subheader: { fontSize: 14, bold: true, margin: [0, 5, 0, 5] },
      },
    };

    pdfMake.createPdf(docDefinition).download("historia_clinica.pdf");
  };

  return { generatePDF };
}; 