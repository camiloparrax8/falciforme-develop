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
                
                { text: 'Paciente', style: 'subheader', margin: [0, 10, 0, 5] },
                {
                    columns: [
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
                    ],
                    columnGap: 10,
                },
        
                { text: 'Exámenes Físicos', style: 'header', margin: [0, 10, 0, 5] },
        
                {
                    columns: [
                        {
                            text: 'Signos Vitales', style: 'subheader', margin: [0, 5]
                        },
                        {
                            text: 'Peso y Talla', style: 'subheader', margin: [0, 5]
                        }
                    ],
                },
        
                {
                    columns: [
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
                        {
                            table: {
                                widths: ['auto', '*'],
                                body: [
                                    ['Peso (kg)', hc.examenesFisicos.peso_talla.peso],
                                    ['Percentil', hc.examenesFisicos.peso_talla.percentil],
                                    ['Talla (cm)', hc.examenesFisicos.peso_talla.talla],
                                    ['Índice de Masa Corporal (IMC)', hc.examenesFisicos.peso_talla.imc],
                                ],
                            },
                            layout: standardTableLayout,
                        }
                    ],
                    columnGap: 10,
                    margin: [0, 10],
                },
        
                { text: 'Estado Nutricional', style: 'subheader', margin: [0, 10] },

                {
                    columns: [
                        {
                            table: {
                                widths: ['auto', '*'],
                                body: [
                                    ['Déficit de Zinc', hc.examenesFisicos.estado_nutricional.deficit_zinc],
                                    ['Déficit de Ácido Fólico', hc.examenesFisicos.estado_nutricional.deficit_acido_folico],
                                    ['Déficit de Vitamina D', hc.examenesFisicos.estado_nutricional.deficit_vitamina_d]
                                ]
                            },
                            layout: standardTableLayout,
                            margin: [0, 10]
                        },
                        {
                            table: {
                                widths: ['auto', '*'],
                                body: [
                                    ['Desnutrición', hc.examenesFisicos.estado_nutricional.desnutricion],
                                    ['Obesidad', hc.examenesFisicos.estado_nutricional.obesidad]
                                ]
                            },
                            layout: standardTableLayout,
                            margin: [0, 10]
                        }
                    ]
                },
                
        
                { text: 'Región Cefálica o Superior (Cabeza y Cuello)', style: 'subheader', margin: [0, 10] },

                    {
                        columns: [
                            {
                                table: {
                                    widths: ['auto', '*'],
                                    body: [
                                        ['Perímetro Cefálico', hc.examenesFisicos.region_cefalica.perimetro_cefalico],
                                        ['Examen de la Boca', hc.examenesFisicos.region_cefalica.examen_orl.examen_boca],
                                        ['Examen de la Nariz', hc.examenesFisicos.region_cefalica.examen_orl.examen_nariz],
                                        ['Examen de los Oídos', hc.examenesFisicos.region_cefalica.examen_orl.examen_oidos],
                                        ['Cuello', hc.examenesFisicos.region_cefalica.cuello]
                                    ]
                                },
                                layout: standardTableLayout,
                                margin: [0, 10]
                            },
                            {
                                table: {
                                    widths: ['auto', '*'],
                                    body: [
                                        ['Agudeza Visual', hc.examenesFisicos.region_cefalica.agudeza_visual],
                                        ['Caries', hc.examenesFisicos.region_cefalica.caries],
                                    ]
                                },
                                layout: standardTableLayout,
                                margin: [0, 10]
                            }
                        ]
                    },

                  { text: 'Región Toracoabdominal o Media (Tórax y Abdomen)', style: 'subheader', margin: [0, 10] },
                  {
                      table: {
                          widths: ['auto', '*'],
                          body: [
                              ['Cardiopulmonar', hc.examenesFisicos.region_toracoabdominal.cardio_pulmonar],
                              ['Examen Abdominal', hc.examenesFisicos.region_toracoabdominal.abdominal],
                          ],
                      },
                      layout: standardTableLayout,
                      margin: [0, 10],
                  },
                  { text: 'Región Pélvica o Inferior (Pelvis y Extremidades Inferiores)', style: 'subheader', margin: [0, 10] },
                  {
                      table: {
                          widths: ['auto', '*'],
                          body: [
                              ['Tanner', hc.examenesFisicos.region_pelvica.tanner],
                              ['Extremidades', hc.examenesFisicos.region_pelvica.extremidades],
                          ],
                      },
                      layout: standardTableLayout,
                      margin: [0, 10],
                  },
        
                { text: 'Complicaciones Agudas', style: 'header', margin: [0, 10, 0, 5] },
        
                {
                    columns: [
                        {
                            text: 'Crisis de Dolor', style: 'subheader', margin: [0, 5]
                        },
                        {
                            text: 'Infecciones', style: 'subheader', margin: [0, 5]
                        }
                    ],
                },
        
                {
                    columns: [
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
                        }
                    ],
                    columnGap: 10,
                    margin: [0, 10],
                },
        
                { text: 'Complicaciones Crónicas', style: 'header', margin: [0, 10] },
                { text: 'Región Cefálica', style: 'subheader', margin: [0, 10] },
                { text: 'Cerebrales', style: 'subheader', margin: [0, 5] },
                
                {
                    columns: [
                        {
                            table: {
                                widths: ['auto', '*'],
                                body: [
                                    ['Vasculopatía Cerebral', hc.complicacionesCronicas.region_cefalica.cerebrales.Vasculopatía_cerebral],
                                    ['Infartos Cerebrales Silentes', hc.complicacionesCronicas.region_cefalica.cerebrales.Infartos_cerebrales_silentes],
                                    ['Epilepsia Convulsiones', hc.complicacionesCronicas.region_cefalica.cerebrales.Epilepsia_convulsiones]
                                ]
                            },
                            layout: standardTableLayout
                        },
                        {
                            table: {
                                widths: ['auto', '*'],
                                body: [
                                    ['Cefaleas Recurrentes', hc.complicacionesCronicas.region_cefalica.cerebrales.Cefaleas_recurrentes],
                                    ['Déficit Cognitivo', hc.complicacionesCronicas.region_cefalica.cerebrales.Déficit_cognitivo]
                                ]
                            },
                            layout: standardTableLayout
                            
                        }
                    ]
                },
                
                { text: 'Oculares', style: 'subheader', margin: [0, 20] },

                {
                    columns: [
                        {
                            table: {
                                widths: ['auto', '*'],
                                body: [
                                    ['Retinopatía Drepanocítica', hc.complicacionesCronicas.region_cefalica.oculares.Retinopatía_drepanocítica],
                                    ['Hemorragias Vítreas', hc.complicacionesCronicas.region_cefalica.oculares.Hemorragias_vítreas],
                                    ['Neovascularización Retiniana', hc.complicacionesCronicas.region_cefalica.oculares.Neovascularización_retiniana]
                                ]
                            },
                            layout: standardTableLayout
                        },
                        {
                            table: {
                                widths: ['auto', '*'],
                                body: [
                                    ['Iritis o Uveítis', hc.complicacionesCronicas.region_cefalica.oculares.Iritis_o_uveítis],
                                    ['Oclusión de Vasos Retinianos', hc.complicacionesCronicas.region_cefalica.oculares.Oclusión_vasos_retinianos]
                                ]
                            },
                            layout: standardTableLayout
                        }
                    ]
                },
                
        { text: 'Región Toracoabdominal', style: 'subheader', margin: [0, 10] },
        { text: 'Cardiacas', style: 'subheader' },
        {
            table: {
                widths: ['auto', '*'],
                body: [
                    ['Disfunción Diastólica VI', hc.complicacionesCronicas.region_toracoabdominal.cardiacas.Disfunción_Diastólica_VI],
                    ['Sobrecarga Férrica', hc.complicacionesCronicas.region_toracoabdominal.cardiacas.Sobrecarga_Férrica],
                    ['Trombosis', hc.complicacionesCronicas.region_toracoabdominal.cardiacas.Trombosis],
                ],
            },
            layout: standardTableLayout,
        },
        { text: 'Pulmonares', style: 'subheader', margin: [0, 10] },

{
    columns: [
        {
            table: {
                widths: ['auto', '*'],
                body: [
                    ['Hipertensión Pulmonar', hc.complicacionesCronicas.region_toracoabdominal.pulmonares.hipertension_pulmonar],
                    ['VRT', hc.complicacionesCronicas.region_toracoabdominal.pulmonares.VRT],
                    ['Número de Crisis Anual (Asma)', hc.complicacionesCronicas.region_toracoabdominal.pulmonares.asma_sibilancias.numero_crisis_anual],
                    ['Tratamientos (Asma)', hc.complicacionesCronicas.region_toracoabdominal.pulmonares.asma_sibilancias.tratamientos]
                ]
            },
            layout: standardTableLayout
        },
        {
            table: {
                widths: ['auto', '*'],
                body: [
                    ['Hipomexia (EPFC)', hc.complicacionesCronicas.region_toracoabdominal.pulmonares.EPFC.hipomexia],
                    ['SAOS (EPFC)', hc.complicacionesCronicas.region_toracoabdominal.pulmonares.EPFC.SAOS],
                    ['Tratamiento (EPFC)', hc.complicacionesCronicas.region_toracoabdominal.pulmonares.EPFC.tratamiento]
                ]
            },
            layout: standardTableLayout
                    }
                ]
                  },
                  { text: 'Hepatico', style: 'subheader', margin: [0, 10] },
                  {
                      table: {
                          widths: ['auto', '*'],
                          body: [
                              ['Hepatitis Viral Crónica', hc.complicacionesCronicas.region_toracoabdominal.hepatico.hepatitis_viral_cronica],
                            ['Esplenomegalia', hc.complicacionesCronicas.region_toracoabdominal.hepatico.esplenomegalia],
                            ['Hiperesplenismo', hc.complicacionesCronicas.region_toracoabdominal.hepatico.hiperesplenismo]
                        ]
                    },
                    layout: standardTableLayout,
                    margin: [0, 10]
                },                
            
            { text: 'Región Genitourinaria', style: 'subheader', margin: [0, 10] },
            { text: 'Genitourinario', style: 'subheader' },
            
            {
                columns: [
                    {
                        table: {
                            widths: ['auto', '*'],
                            body: [
                                ['Nefropatía', hc.complicacionesCronicas.region_genitourinaria.genitourinario.nefropatia],
                                ['Hipostenia', hc.complicacionesCronicas.region_genitourinaria.genitourinario.hipostenia],
                                ['Acidosis Tubular', hc.complicacionesCronicas.region_genitourinaria.genitourinario.acidosis_tubular],
                                ['Hematuria y Necrosis Renal', hc.complicacionesCronicas.region_genitourinaria.genitourinario.hematuria_necrosis_renal]
                            ]
                        },
                        layout: standardTableLayout
                    },
                    {
                        table: {
                            widths: ['auto', '*'],
                            body: [
                                ['Priapismo Recurrente', hc.complicacionesCronicas.region_genitourinaria.genitourinario.priapismo_recurrente],
                                ['Enfermedad Renal Crónica', hc.complicacionesCronicas.region_genitourinaria.genitourinario.enfermedad_renal_cronica],
                                ['Proteinuria', hc.complicacionesCronicas.region_genitourinaria.genitourinario.proteinuria]
                            ]
                        },
                        layout: standardTableLayout
                    }
                ]
            },
            
            { text: 'Óseas', style: 'subheader', margin: [0, 10] },

            {
                columns: [
                    {
                        table: {
                            widths: ['auto', '*'],
                            body: [
                                ['Hueso Comprometido', hc.complicacionesCronicas.region_genitourinaria.oseas.hueso_comprometido],
                                ['Grado de Discapacidad', hc.complicacionesCronicas.region_genitourinaria.oseas.grado_discapacidad],
                                ['Osteonecrosis', hc.complicacionesCronicas.region_genitourinaria.oseas.osteonecrosis]
                            ]
                        },
                        layout: standardTableLayout
                    },
                    {
                        table: {
                            widths: ['auto', '*'],
                            body: [
                                ['Deformidades Óseas', hc.complicacionesCronicas.region_genitourinaria.oseas.deformidades_oseas],
                                ['Osteopenia', hc.complicacionesCronicas.region_genitourinaria.oseas.osteopenia]
                            ]
                        },
                        layout: standardTableLayout
                    }
                ]
                  },

            { text: 'Trasplantes de Progenitores', style: 'header', margin: [0, 10, 0, 5] },
            {
                columns: [
                    {
                        table: {
                            widths: ['auto', '*'],
                            body: [
                                ['Paciente', hc.trasplanteProgenitores.estudios_hla.paciente],
                                ['Padres', hc.trasplanteProgenitores.estudios_hla.padres]
                            ]
                        },
                        layout: standardTableLayout,
                        margin: [0, 10]
                    },
                    {
                        table: {
                            widths: ['auto', '*'],
                            body: [
                                ['Hermanos', hc.trasplanteProgenitores.estudios_hla.hermanos],
                                ['Tipo de Trasplante', hc.trasplanteProgenitores.indicaciones_trasplante.tipo]
                            ]
                        },
                        layout: standardTableLayout,
                        margin: [0, 10]
                    }
                ]
            },
            
        
            { text: 'Laboratorios', style: 'header', margin: [0, 10, 0, 5] },

            {
                columns: [
                    {
                        table: {
                            widths: ['auto', '*'],
                            body: [
                                ['Hematíes', hc.laboratorios.hematies],
                                ['Hemoglobina', hc.laboratorios.hemoglobina],
                                ['Hematocrito', hc.laboratorios.hematocrito]
                            ]
                        },
                        layout: standardTableLayout,
                        margin: [0, 10]
                    },
                    {
                        table: {
                            widths: ['auto', '*'],
                            body: [
                                ['MCV', hc.laboratorios.mcv],
                                ['MCH', hc.laboratorios.mch],
                                ['MCHC', hc.laboratorios.mchc],
                                ['RDW', hc.laboratorios.rdw]
                            ]
                        },
                        layout: standardTableLayout,
                        margin: [0, 10]
                    }
                ]
            },
            
            { text: 'Imágenes Diagnósticas', style: 'header', margin: [0, 10, 0, 5] },

            {
                columns: [
                    {
                        table: {
                            widths: ['auto', '*'],
                            body: [
                                ['Tipo', hc.imagenes_diagnosticas.tipo_imagen],
                                ['Fecha', hc.imagenes_diagnosticas.fecha]
                            ]
                        },
                        layout: standardTableLayout,
                        margin: [0, 10]
                    },
                    {
                        table: {
                            widths: ['auto', '*'],
                            body: [
                                ['Tipo de Resultado', hc.imagenes_diagnosticas.tipo_resultado],
                                ['Resultado', hc.imagenes_diagnosticas.resultado]
                            ]
                        },
                        layout: standardTableLayout,
                        margin: [0, 10]
                            }
                        ]
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
                
                  { 
                    text: 'Sobrecarga de Hierro', 
                    style: 'subheader', 
                    margin: [0, 10] 
                },
                {
                    table: {
                        widths: ['auto', '*', 'auto', '*'], 
                        body: [
                            ['Fecha', hc.soportes_transfusionales.sobrecarga_hierro.fecha, 'Quelantes', hc.soportes_transfusionales.sobrecarga_hierro.quelantes],
                            ['Ferritina', hc.soportes_transfusionales.sobrecarga_hierro.ferritina, 'Dosis (mg/kg/día)', hc.soportes_transfusionales.sobrecarga_hierro.dosis_mg_kg_dia],
                        ],
                    },
                    layout: standardTableLayout,
                    margin: [0, 10, 0, 5] 
                },
                

                { text: 'Sobrecarga por Órgano', style: 'subheader', margin: [0, 10] },

                {
                    columns: [
                        {
                            table: {
                                widths: ['auto', '*'],
                                body: [
                                    ['Fecha', hc.soportes_transfusionales.sobrecarga_por_organo.fecha],
                                    ['Líc. Hígado', hc.soportes_transfusionales.sobrecarga_por_organo.lic_higado]
                                ]
                            },
                            layout: standardTableLayout,
                            margin: [0, 10]
                        },
                        {
                            table: {
                                widths: ['auto', '*'],
                                body: [
                                    ['Pancreática R2', hc.soportes_transfusionales.sobrecarga_por_organo.pancreatica_r2],
                                    ['Evaluación Cardíaca T2', hc.soportes_transfusionales.sobrecarga_por_organo.evaluacion_cardiaca_t2]
                                ]
                            },
                            layout: standardTableLayout,
                            margin: [0, 10]
                        }
                    ]
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