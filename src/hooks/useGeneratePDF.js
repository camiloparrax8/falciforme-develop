import pdfMake from 'pdfmake/build/pdfmake';
import { historiaClinicaData } from '../data/historiaClinicaData';
import { consultarExamenFisicoPorPaciente } from '@/customService/services/examenesFisicosService';
import { consultarTransplantesProgenitoresPorPaciente } from '@/customService/services/transplantesProgenitoresService';
import { useToken } from '@/store/authStore';
import { saveAs } from 'file-saver';

pdfMake.fonts = {
    Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-MediumItalic.ttf',
    },
};

export const useGeneratePDF = () => {
    const { token } = useToken();

    const generatePDF = async (data, window) => {
        try {
            const hc = historiaClinicaData;

            if (!data?.paciente?.id) {
                throw new Error('ID de paciente no proporcionado');
            }

            // Obtener exámenes físicos de forma dinámica
            const examenesFisicos = await consultarExamenFisicoPorPaciente(token, data.paciente.id);
            const trasplanteProgenitores = await consultarTransplantesProgenitoresPorPaciente(token, data.paciente.id);

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

            const fecha = new Date();
            const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}${(fecha.getMonth() + 1).toString().padStart(2, '0')}${fecha.getFullYear()}${fecha.getHours().toString().padStart(2, '0')}${fecha.getMinutes().toString().padStart(2, '0')}${fecha.getSeconds().toString().padStart(2, '0')}`;
            const fileName = `HC_${data.paciente.identificacion}_${fechaFormateada}.pdf`;

            const docDefinition = {
                info: {
                    title: fileName,
                    author: 'Sistema de Historia Clínica',
                    subject: 'Historia Clínica del Paciente',
                    keywords: 'historia clínica, paciente, documento médico',
                    creationDate: new Date(),
                    modDate: new Date()
                },
                content: [
                    { text: 'HISTORIA CLÍNICA', style: 'header', alignment: 'center', margin: [0, 0, 0, 10] },

                    { text: 'Paciente', style: 'subheader', margin: [0, 10, 0, 5] },
                    {
                        columns: [
                            {
                                table: {
                                    widths: ['auto', '*'],
                                    body: [
                                        ['Nombre', data.paciente?.nombre || 'N/A'],
                                        ['Edad', `${data.paciente?.edad || 'N/A'} años`],
                                        ['Tipo de Identificación', data.paciente?.tipo_identificacion || 'N/A'],
                                        ['Identificación', data.paciente?.identificacion || 'N/A'],
                                        ['Teléfono', data.paciente?.celular || 'N/A'],
                                        ['Dirección', data.paciente?.direccion || 'N/A'],
                                        ['Correo', data.paciente?.correo || 'N/A']
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
                                        ['Frecuencia Cardiaca (lpm)', examenesFisicos?.frecuencia_cardiaca || "N/A"],
                                        ['Frecuencia Respiratoria (rpm)', examenesFisicos?.frecuencia_respiratoria || "N/A"],
                                        ['Saturación de Oxígeno (%)', examenesFisicos?.saturacion_oxigeno || "N/A"],
                                        ['Tensión Arterial (mmHg)', examenesFisicos?.tension_arterial || "N/A"],
                                    ],
                                },
                                layout: standardTableLayout,
                            },
                            {
                                table: {
                                    widths: ['auto', '*'],
                                    body: [
                                        ['Peso (kg)', examenesFisicos?.peso || "N/A"],
                                        ['Percentil', examenesFisicos?.percentil || "N/A"],
                                        ['Talla (cm)', examenesFisicos?.talla || "N/A"],
                                        ['Índice de Masa Corporal (IMC)', examenesFisicos?.imc ? `${examenesFisicos.imc.toFixed(2)}` : "N/A"],
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
                                        ['Déficit de Zinc', examenesFisicos?.deficit_zinc === true ? 'Sí' : 'No'],
                                        ['Déficit de Ácido Fólico', examenesFisicos?.deficit_acido_folico === true ? 'Sí' : 'No'],
                                        ['Déficit de Vitamina D', examenesFisicos?.deficit_vitamina_d === true ? 'Sí' : 'No']
                                    ]
                                },
                                layout: standardTableLayout,
                                margin: [0, 10]
                            },
                            {
                                table: {
                                    widths: ['auto', '*'],
                                    body: [
                                        ['Desnutrición', examenesFisicos?.desnutricion === true ? 'Sí' : 'No'],
                                        ['Obesidad', examenesFisicos?.obesidad === true ? 'Sí' : 'No']
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
                                        ['Perímetro Cefálico', examenesFisicos?.perimetro_cefalico || "N/A"],
                                        ['Examen de la Boca', examenesFisicos?.examen_boca || "N/A"],
                                        ['Examen de la Nariz', examenesFisicos?.examen_nariz || "N/A"],
                                        ['Examen de los Oídos', examenesFisicos?.examen_oidos || "N/A"],
                                        ['Cuello', examenesFisicos?.cuello || "N/A"]
                                    ]
                                },
                                layout: standardTableLayout,
                                margin: [0, 10]
                            },
                            {
                                table: {
                                    widths: ['auto', '*'],
                                    body: [
                                        ['Agudeza Visual', examenesFisicos?.vision ? `${examenesFisicos.vision}` : "N/A"],
                                        ['Caries', examenesFisicos?.caries === true ? 'Sí' : 'No'],
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
                                ['Cardiopulmonar', examenesFisicos?.cardio_pulmunar || "N/A"],
                                ['Examen Abdominal', examenesFisicos?.condicion_abdominal || "N/A"],
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
                                ['Tanner', examenesFisicos?.tanner || "N/A"],
                                ['Observacion de extremidades', examenesFisicos?.extremidades_observacion || "N/A"],
                                ['Estado de la piel', examenesFisicos?.extremidades_estado_piel || "N/A"],
                                ['Extremidades', examenesFisicos?.extremidades_condicion || "N/A"],
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
                                        ['Paciente', trasplanteProgenitores?.paciente || "N/A"],
                                        ['Padres', trasplanteProgenitores?.padres || "N/A"]
                                    ]
                                },
                                layout: standardTableLayout,
                                margin: [0, 10]
                            },
                            {
                                table: {
                                    widths: ['auto', '*'],
                                    body: [
                                        ['Hermanos', trasplanteProgenitores?.hermanos || "N/A"],
                                        ['Tipo de Trasplante', trasplanteProgenitores?.tipo_indicaciones || "N/A"]
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

            const pdfDoc = pdfMake.createPdf(docDefinition);

            if (window) {
                pdfDoc.open({}, window);
    
            } else {
                pdfDoc.download(fileName);
            }
        } catch (error) {
            console.error('Error al generar PDF:', error);
            console.error('Detalles del error:', error.response ? error.response.data : error.message);
        }
    };

    return { generatePDF };
};

export default useGeneratePDF;