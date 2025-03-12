import pdfMake from 'pdfmake/build/pdfmake';
import { historiaClinicaData } from '../data/historiaClinicaData';

pdfMake.fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-MediumItalic.ttf',
  },
};

export const useGeneratePDF = () => {
  const generatePDF = async () => {
      try {
          const hc = historiaClinicaData;

          const standardTableLayout = {
              hLineWidth: () => 0.5,
              vLineWidth: () => 0.5,
              hLineColor: () => '#aaa',
              vLineColor: () => '#aaa',
              paddingLeft: () => 8,
              paddingRight: () => 8,
              paddingTop: () => 8,
              paddingBottom: () => 8,
          };

          const keyFormatter = (key) => {
              return key
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, (char) => char.toUpperCase());
          };

          const docDefinition = {
              content: [
                  { text: 'HISTORIA CLÍNICA', style: 'header', alignment: 'center', margin: [0, 0, 0, 10] },
                  {
                      text: 'Paciente', style: 'subheader', margin: [0, 10, 0, 5]
                  },
                  {
                      table: {
                          widths: ['auto', '*'],
                          body: [
                              ['Nombre', hc.paciente.nombre],
                              ['Edad', `${hc.paciente.edad} años`],
                              ['Género', hc.paciente.genero],
                          ],
                      },
                      layout: standardTableLayout,
                  },
                  { text: '', margin: [0, 10] },
                  { text: 'Exámenes Físicos', style: 'header', margin: [0, 10, 0, 5] },
                  { text: 'Signos Vitales', style: 'subheader', margin: [0, 5] },
                  {
                      table: {
                          widths: ['auto', '*'],
                          body: [
                              ['Frecuencia Cardiaca (lpm)', hc.examenesFisicos.signos_vitales.frecuencia_cardiaca],
                              ['Frecuencia Respiratoria (rpm)', hc.examenesFisicos.signos_vitales.frecuencia_respiratoria],
                              ['Saturación de Oxígeno (%)', hc.examenesFisicos.signos_vitales.saturacion_oxigeno],
                              ['Tensión Arterial (mmHg)', hc.examenesFisicos.signos_vitales.tension_arterial],
                          ],
                      },
                      layout: standardTableLayout,
                  },
                  { text: 'Peso y Talla', style: 'subheader', margin: [0, 10] },
                  {
                      table: {
                          widths: ['auto', '*'],
                          body: [
                              ['Peso (kg)', hc.examenesFisicos.peso_talla.peso],
                              ['Talla (cm)', hc.examenesFisicos.peso_talla.talla],
                              ['Índice de Masa Corporal (IMC)', hc.examenesFisicos.peso_talla.imc],
                          ],
                      },
                      layout: standardTableLayout,
                  },
                  { text: 'Estado Nutricional', style: 'subheader', margin: [0, 10] },
                  {
                      table: {
                          widths: ['auto', '*'],
                          body: [
                              ['Déficit de Zinc', hc.examenesFisicos.estado_nutricional.deficit_zinc],
                              ['Déficit de Ácido Fólico', hc.examenesFisicos.estado_nutricional.deficit_acido_folico],
                              ['Déficit de Vitamina D', hc.examenesFisicos.estado_nutricional.deficit_vitamina_d],
                              ['Desnutrición', hc.examenesFisicos.estado_nutricional.desnutricion],
                              ['Obesidad', hc.examenesFisicos.estado_nutricional.obesidad],
                          ],
                      },
                      layout: standardTableLayout,
                  },
                  { text: 'Región Cefálica o Superior (Cabeza y Cuello)', style: 'subheader', margin: [0, 10] },
                  {
                      table: {
                          widths: ['auto', '*'],
                          body: [
                              ['Perímetro Cefálico', hc.examenesFisicos.region_cefalica.perimetro_cefalico],
                              ['Agudeza Visual', hc.examenesFisicos.region_cefalica.agudeza_visual],
                              ['Examen ORL', hc.examenesFisicos.region_cefalica.examen_orl],
                              ['Caries', hc.examenesFisicos.region_cefalica.caries],
                              ['Cuello', hc.examenesFisicos.region_cefalica.cuello],
                          ],
                      },
                      layout: standardTableLayout,
                  },

                  { text: 'Región Toracoabdominal o Media (Tórax y Abdomen)', style: 'subheader', margin: [0, 10] },
                  {
                      table: {
                          widths: ['auto', '*'],
                          body: [
                              ['Cardio Pulmonar', hc.examenesFisicos.region_toracoabdominal.cardio_pulmonar],
                              ['Abdominal', hc.examenesFisicos.region_toracoabdominal.abdominal],
                          ],
                      },
                      layout: standardTableLayout,
                  },

                  { text: 'Región Pélvica o Inferior (Pelvis y Extremidades Inferiores)', style: 'subheader', margin: [0, 10] },
                  {
                      table: {
                          widths: ['auto', '*'],
                          body: [
                              ['Tanner (Desarrollo)', hc.examenesFisicos.region_pelvica.tanner],
                              ['Extremidades', hc.examenesFisicos.region_pelvica.extremidades],
                          ],
                      },
                      layout: standardTableLayout,
                  },
                  { text: '', margin: [0, 10] },
                  { text: 'Complicaciones Agudas', style: 'header', margin: [0, 10, 0, 5] },

                  { text: 'Crisis de Dolor', style: 'subheader', margin: [0, 5] },
                  {
                      table: {
                          widths: ['auto', '*'],
                          body: [
                              ['Fecha', hc.complicacionesAgudas.crisis_dolor.fecha],
                              ['Días', hc.complicacionesAgudas.crisis_dolor.dias],
                              ['Intensidad (1-10)', hc.complicacionesAgudas.crisis_dolor.intensidad],
                              ['Manejo', hc.complicacionesAgudas.crisis_dolor.manejo],
                              ['Tratamiento', hc.complicacionesAgudas.crisis_dolor.tratamiento],
                              ['Huesos Afectados', hc.complicacionesAgudas.crisis_dolor.huesos_afectados],
                          ],
                      },
                      layout: standardTableLayout,
                  },

                  { text: 'Infecciones', style: 'subheader', margin: [0, 10] },
                  {
                      table: {
                          widths: ['auto', '*'],
                          body: [
                              ['Germen', hc.complicacionesAgudas.infecciones.germen],
                              ['Tratamiento', hc.complicacionesAgudas.infecciones.tratamiento],
                              ['Días', hc.complicacionesAgudas.infecciones.dias],
                          ],
                      },
                      layout: standardTableLayout,
                  },

                  { text: 'Anemia Aguda', style: 'subheader', margin: [0, 10] },
                  {
                    table: {
                        widths: ['auto', '*'],
                        body: [
                          ['Crisis Aplástica Infecciosa',hc.complicacionesAgudas.anemia_aguda.crisis_aplastica_infecciosa], 
                          ['Manejo',hc.complicacionesAgudas.anemia_aguda.manejo],
                        ],
                    },
                    layout: standardTableLayout,
                },
                { text: '', margin: [0, 10] },
                { text: 'Complicaciones Crónicas', style: 'header', margin: [0, 10, 0, 5] },
                { text: 'Región Cefálica o Superior (Cabeza y Cuello)', style: 'subheader', margin: [0, 5] },
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [
                            ['Cerebrales', hc.complicacionesCronicas.region_cefalica.cerebrales],
                            ['Oculares', hc.complicacionesCronicas.region_cefalica.oculares],
                        ],
                    },
                    layout: standardTableLayout,
                },
                { text: 'Región Toracoabdominal o Media (Tórax y Abdomen)', style: 'subheader', margin: [0, 10] },
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [
                            ['Cardíacas', hc.complicacionesCronicas.region_toracoabdominal.cardiacas],
                            ['Pulmonares', hc.complicacionesCronicas.region_toracoabdominal.pulmonares],
                            ['Hepáticas', hc.complicacionesCronicas.region_toracoabdominal.hepaticas],
                        ],
                    },
                    layout: standardTableLayout,
                },
                { text: 'Región Genital y Urinaria', style: 'subheader', margin: [0, 10] },
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [
                            ['Genitourinario', hc.complicacionesCronicas.region_genitourinaria.genitourinario],
                            ['Óseas', hc.complicacionesCronicas.region_genitourinaria.oseas],
                        ],
                    },
                    layout: standardTableLayout,
                },
                { text: '', margin: [0, 10] },
                { text: 'Trasplante de Progenitores', style: 'header', margin: [0, 10, 0, 5] },
                { text: 'Estudios HLA', style: 'subheader', margin: [0, 5] },
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [
                          ['Paciente', hc.trasplanteProgenitores.estudios_hla.paciente],
                          ['Padres', hc.trasplanteProgenitores.estudios_hla.padres],
                          ['Hermanos', hc.trasplanteProgenitores.estudios_hla.hermanos],
                        ],
                    },
                    layout: standardTableLayout,
                },
                { text: 'Indicaciones para Trasplante', style: 'subheader', margin: [0, 10] },
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [
                          ['Tipo', hc.trasplanteProgenitores.indicaciones_trasplante.tipo],
                        ],
                    },
                    layout: standardTableLayout,
                },

                { text: 'Laboratorios', style: 'header', margin: [0, 10, 0, 5] },
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [ 
                          ['Hematíes', hc.laboratorios.hematies],
                          ['Hemoglobina', hc.laboratorios.hemoglobina],
                          ['Hematocrito', hc.laboratorios.hematocrito],
                          ['MCV', hc.laboratorios.mcv],
                          ['MCH', hc.laboratorios.mch],
                          ['MCHC', hc.laboratorios.mchc],
                          ['RDW', hc.laboratorios.rdw],
                        ],
                    },
                    layout: standardTableLayout,
                },
                { text: 'Imágenes Diagnósticas', style: 'header', margin: [0, 10, 0, 5] },
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [
                            ['Tipo', hc.imagenes_diagnosticas.tipo_imagen],
                            ['Fecha', hc.imagenes_diagnosticas.fecha],
                            ['Tipo de Resultado', hc.imagenes_diagnosticas.tipo_resultado],
                            ['Resultado', hc.imagenes_diagnosticas.resultado],
                        ],
                    },
                    layout: standardTableLayout,
                },
                { text: 'Soportes Transfusionales', style: 'header', margin: [0, 10, 0, 5] },
                { text: 'Inicio de Soporte Transfusional', style: 'subheader', margin: [0, 5] },
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [ 
                          ['Fecha', hc.soportes_transfusionales.inicio_soporte_transfusional],
                          ['Soporte Transfusional', hc.soportes_transfusionales.soporte_transfusional],
                          ['Número de Transfusiones', hc.soportes_transfusionales.numero_transfusiones],
                          ['Frecuencia', hc.soportes_transfusionales.frecuencia],
                          ['Aloinmunización', hc.soportes_transfusionales.aloinmunizacion],
                        ],
                    },
                    layout: standardTableLayout,
                },
                { text: 'Sobrecarga de Hierro', style: 'subheader', margin: [0, 10] },
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [
                            ['Fecha', hc.soportes_transfusionales.sobrecarga_hierro.fecha],
                            ['Quelantes', hc.soportes_transfusionales.sobrecarga_hierro.quelantes],
                            ['Ferritina', hc.soportes_transfusionales.sobrecarga_hierro.ferritina],
                            ['Dosis (mg/kg/día)', hc.soportes_transfusionales.sobrecarga_hierro.dosis_mg_kg_dia],
                        ],
                    },
                    layout: standardTableLayout,
                },

                { text: 'Sobrecarga por Organo', style: 'subheader', margin: [0, 10] },
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [
                            ['Fecha', hc.soportes_transfusionales.sobrecarga_por_organo.fecha],
                            ['Líc. Higado', hc.soportes_transfusionales.sobrecarga_por_organo.lic_higado],
                            ['Pancreática R2', hc.soportes_transfusionales.sobrecarga_por_organo.pancreatica_r2],
                            ['Evaluación Cardíaca T2', hc.soportes_transfusionales.sobrecarga_por_organo.evaluacion_cardiaca_t2],
                        ],
                    },
                    layout: standardTableLayout,
                },
                { text: 'Vacunas', style: 'header', margin: [0, 10, 0, 5] },
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [
                            ['Nombre', hc.vacunas.nombre_vacuna],
                            ['Fecha', hc.vacunas.fecha_vacunacion],
                        ],
                    },
                    layout: standardTableLayout,
                },
                { text: 'Tratamientos', style: 'header', margin: [0, 10, 0, 5] },
                { text: 'Tratamiento Individual', style: 'subheader', margin: [0, 5] },
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [ 
                          ['Tipo', hc.tratamientos.tratamiento_individual.tipo_tratamiento],
                          ['Número de Días', hc.tratamientos.tratamiento_individual.numero_dias],
                          ['Dosis', hc.tratamientos.tratamiento_individual.dosis],
                        ],
                    },
                    layout: standardTableLayout,
                },
                { text: 'Manejo de Dolor', style: 'subheader', margin: [0, 10] },
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [ 
                          ['Medicamento', hc.tratamientos.manejo_dolor.medicamento],
                          ['Número de Días', hc.tratamientos.manejo_dolor.numero_dias],
                          ['Dosis', hc.tratamientos.manejo_dolor.dosis],
                        ],
                    },
                    layout: standardTableLayout,
                }   
              ],
              styles: {
                  header: { fontSize: 18, bold: true },
                  subheader: { fontSize: 14, bold: true },
                  subsubheader: { fontSize: 13, bold: true },
              },
              pageMargins: [40, 40, 40, 40],
          };

          const fileName = `historia_clinica_${hc.paciente.nombre.replace(/\s+/g, "_")}.pdf`;
          pdfMake.createPdf(docDefinition).download(fileName);
      } catch (error) {
          console.error('Error al generar PDF:', error);
      }
  };

  return { generatePDF };
};

export default useGeneratePDF;