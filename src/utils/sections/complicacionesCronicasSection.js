import { buscarComplicacionesCronicasPorIdPaciente } from '@/customService/services/complicacionesCronicasService';

/**
 * Genera la sección de complicaciones crónicas para el PDF
 * @param {Object} complicacionesCronicas - Datos de las complicaciones crónicas del paciente
 * @returns {Object} Objeto con la configuración de la sección para pdfMake
 */
export const generarSeccionComplicacionesCronicas = (complicacionesCronicas) => {
    return {
        table: {
            widths: ['*', '*'],
            body: [
                [
                    {
                        text: 'Complicaciones Crónicas',
                        fillColor: '#1F2937',
                        color: 'white',
                        bold: true,
                        fontSize: 12,
                        colSpan: 2
                    },
                    {}
                ],
                [
                    {
                        text: 'Región Cefálica - Cerebrales',
                        fillColor: '#E3F2FD',
                        bold: true,
                        fontSize: 10,
                        colSpan: 2
                    },
                    {}
                ],
                [
                    {
                        stack: [
                            { text: 'Vasculopatía Cerebral', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.vasculopatia_cerebral ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Infartos Cerebrales Silentes', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.infartos_cerebrales_silentes ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Epilepsia/Convulsiones', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.epilepsia_convulsiones ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Cefaleas Recurrentes', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.cefaleas_recurrentes ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Déficit Cognitivo', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.deficit_cognitivo ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    { text: '' }
                ],
                [
                    {
                        text: 'Región Cefálica - Oculares',
                        fillColor: '#E3F2FD',
                        bold: true,
                        fontSize: 10,
                        colSpan: 2
                    },
                    {}
                ],
                [
                    {
                        stack: [
                            { text: 'Retinopatía Drepanocítica', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.retinopatia_drepanocitica ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Hemorragias Vítreas', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.hemorragias_vitreas ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Neovascularización Retiniana', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.neovascularizacion_retiniana ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Iritis o Uveítis', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.iritis_uveitis ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Oclusión de Vasos Retinianos', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.oclusion_vasos_retinianos ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    { text: '' }
                ],
                [
                    {
                        text: 'Región Toracoabdominal - Cardiacas',
                        fillColor: '#E3F2FD',
                        bold: true,
                        fontSize: 10,
                        colSpan: 2
                    },
                    {}
                ],
                [
                    {
                        stack: [
                            { text: 'Disfunción Diastólica VI', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.disfuncion_diastolica_vii ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Sobrecarga Férrica', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.sobrecarga_ferrica ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Trombosis', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.trombosis ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    { text: '' }
                ],
                [
                    {
                        text: 'Región Toracoabdominal - Pulmonares',
                        fillColor: '#E3F2FD',
                        bold: true,
                        fontSize: 10,
                        colSpan: 2
                    },
                    {}
                ],
                [
                    {
                        stack: [
                            { text: 'Hipertensión Pulmonar', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.hipertension_pulmonar ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'VRT', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.vrt ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Número de Crisis Anual (Asma)', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.numero_crisis || "N/A", bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Tratamientos (Asma)', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.tratamientos || "N/A", bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Hipomexia (EPFC)', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.hipomexia ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'SAOS (EPFC)', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.saos ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Tratamiento (EPFC)', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.edpfc_tratamiento || "N/A", bold: true }
                        ]
                    },
                    { text: '' }
                ],
                [
                    {
                        text: 'Región Toracoabdominal - Hepático',
                        fillColor: '#E3F2FD',
                        bold: true,
                        fontSize: 10,
                        colSpan: 2
                    },
                    {}
                ],
                [
                    {
                        stack: [
                            { text: 'Hepatitis Viral Crónica', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.hepatitis_viral_cronica ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Esplenomegalia', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.esplenomegalia ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Hiperesplenismo', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.hiperesplenismo ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    { text: '' }
                ],
                [
                    {
                        text: 'Región Genitourinaria',
                        fillColor: '#E3F2FD',
                        bold: true,
                        fontSize: 10,
                        colSpan: 2
                    },
                    {}
                ],
                [
                    {
                        stack: [
                            { text: 'Nefropatía', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.nefropatia ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Hipostenia', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.hipotensia ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Acidosis Tubular', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.acidosis_tubular ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Hematuria y Necrosis Renal', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.hematuria_necrosis_papilar ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Priapismo Recurrente', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.priapismo_recurrente ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Enfermedad Renal Crónica', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.enfermedad_renal_cronica ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Proteinuria', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.proteinuria ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    { text: '' }
                ],
                [
                    {
                        text: 'Óseas',
                        fillColor: '#E3F2FD',
                        bold: true,
                        fontSize: 10,
                        colSpan: 2
                    },
                    {}
                ],
                [
                    {
                        stack: [
                            { text: 'Hueso Comprometido', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.huesos_comprometidos || "N/A", bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Grado de Discapacidad', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.grado_discapacidad || "N/A", bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Osteonecrosis', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.osteonecrosis ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Deformidades Óseas', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.deformidades_osea ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Osteopenia', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.osteopenia ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    { text: '' }
                ]
            ]
        },
        layout: {
            hLineWidth: function(i, node) {
                return (i === 0 || i === 1) ? 1 : 0.5;
            },
            vLineWidth: function(i, node) {
                return 0.5;
            },
            hLineColor: function(i, node) {
                return (i === 0 || i === 1) ? '#1F2937' : '#CCCCCC';
            },
            vLineColor: function(i, node) {
                return '#CCCCCC';
            },
            fillColor: function(rowIndex, node, columnIndex) {
                return node.table.body[rowIndex][columnIndex].fillColor;
            }
        },
        margin: [0, 0, 0, 20]
    };
};

/**
 * Obtiene los datos de las complicaciones crónicas del paciente
 * @param {string} token - Token de autenticación
 * @param {string} idPaciente - ID del paciente
 * @returns {Promise<Object>} Datos de las complicaciones crónicas
 */
export const obtenerDatosComplicacionesCronicas = async (token, idPaciente) => {
    try {
        return await buscarComplicacionesCronicasPorIdPaciente(token, idPaciente);
    } catch (error) {
        console.error('Error al obtener datos de complicaciones crónicas:', error);
        return null;
    }
}; 