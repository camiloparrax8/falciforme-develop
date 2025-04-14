import { consultarExamenFisicoPorPaciente } from '@/customService/services/examenesFisicosService';

/**
 * Genera la sección de exámenes físicos para el PDF
 * @param {Object} examenesFisicos - Datos del examen físico del paciente
 * @returns {Object} Objeto con la configuración de la sección para pdfMake
 */
export const generarSeccionExamenesFisicos = (examenesFisicos) => {
    return {
        stack: [
            {
                text: 'EXÁMEN FÍSICO',
                style: 'subheader',
                margin: [0, 0, 0, 10]
            },
            {
                table: {
                    widths: ['*', '*', '*'],
                    body: [
                        [
                            {
                                text: 'Signos Vitales',
                                fillColor: '#1F2937',
                                color: 'white',
                                bold: true,
                                fontSize: 12,
                                colSpan: 3
                            },
                            {}, {}
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Frecuencia Cardiaca', fontSize: 8 },
                                    { text: examenesFisicos?.frecuencia_cardiaca || "N/A", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Frecuencia Respiratoria', fontSize: 8 },
                                    { text: examenesFisicos?.frecuencia_respiratoria || "N/A", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Saturación de Oxígeno', fontSize: 8 },
                                    { text: examenesFisicos?.saturacion_oxigeno || "N/A", bold: true }
                                ]
                            }
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Tensión Arterial', fontSize: 8 },
                                    { text: examenesFisicos?.tension_arterial || "N/A", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Peso', fontSize: 8 },
                                    { text: examenesFisicos?.peso ? `${examenesFisicos.peso} kg` : "N/A", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Talla', fontSize: 8 },
                                    { text: examenesFisicos?.talla ? `${examenesFisicos.talla} cm` : "N/A", bold: true }
                                ]
                            }
                        ],
                        [
                            {
                                stack: [
                                    { text: 'IMC', fontSize: 8 },
                                    { text: examenesFisicos?.imc ? `${examenesFisicos.imc.toFixed(2)}` : "N/A", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Percentil', fontSize: 8 },
                                    { text: examenesFisicos?.percentil || "N/A", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Perímetro Cefálico', fontSize: 8 },
                                    { text: examenesFisicos?.perimetro_cefalico ? `${examenesFisicos.perimetro_cefalico} cm` : "N/A", bold: true }
                                ]
                            }
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
                        return (rowIndex === 0) ? '#1F2937' : null;
                    }
                },
                margin: [0, 0, 0, 20]
            },
            {
                table: {
                    widths: ['*', '*', '*'],
                    body: [
                        [
                            {
                                text: 'Antropometría',
                                fillColor: '#1F2937',
                                color: 'white',
                                bold: true,
                                fontSize: 12,
                                colSpan: 3
                            },
                            {}, {}
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Peso', fontSize: 8 },
                                    { text: examenesFisicos?.peso ? `${examenesFisicos.peso} kg` : "N/A", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Talla', fontSize: 8 },
                                    { text: examenesFisicos?.talla ? `${examenesFisicos.talla} cm` : "N/A", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'IMC', fontSize: 8 },
                                    { text: examenesFisicos?.imc ? `${examenesFisicos.imc.toFixed(2)}` : "N/A", bold: true }
                                ]
                            }
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Percentil', fontSize: 8 },
                                    { text: examenesFisicos?.percentil || "N/A", bold: true }
                                ]
                            },
                            { text: '' },
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
                        return (rowIndex === 0) ? '#1F2937' : null;
                    }
                },
                margin: [0, 0, 0, 20]
            },
            {
                table: {
                    widths: ['*', '*', '*'],
                    body: [
                        [
                            {
                                text: 'Estado Nutricional',
                                fillColor: '#1F2937',
                                color: 'white',
                                bold: true,
                                fontSize: 12,
                                colSpan: 3
                            },
                            {}, {}
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Déficit de Zinc', fontSize: 8 },
                                    { text: examenesFisicos?.deficit_zinc === true ? 'Sí' : 'No', bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Déficit de Ácido Fólico', fontSize: 8 },
                                    { text: examenesFisicos?.deficit_acido_folico === true ? 'Sí' : 'No', bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Déficit de Vitamina D', fontSize: 8 },
                                    { text: examenesFisicos?.deficit_vitamina_d === true ? 'Sí' : 'No', bold: true }
                                ]
                            }
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Desnutrición', fontSize: 8 },
                                    { text: examenesFisicos?.desnutricion === true ? 'Sí' : 'No', bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Obesidad', fontSize: 8 },
                                    { text: examenesFisicos?.obesidad === true ? 'Sí' : 'No', bold: true }
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
                        return (rowIndex === 0) ? '#1F2937' : null;
                    }
                },
                margin: [0, 0, 0, 20]
            },
            {
                table: {
                    widths: ['*', '*', '*'],
                    body: [
                        [
                            {
                                text: 'Región Cefálica',
                                fillColor: '#1F2937',
                                color: 'white',
                                bold: true,
                                fontSize: 12,
                                colSpan: 3
                            },
                            {}, {}
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Perímetro Cefálico', fontSize: 8 },
                                    { text: examenesFisicos?.perimetro_cefalico ? `${examenesFisicos.perimetro_cefalico} cm` : "N/A", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Agudeza Visual', fontSize: 8 },
                                    { text: examenesFisicos?.vision || "N/A", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Caries', fontSize: 8 },
                                    { text: examenesFisicos?.caries === true ? 'Sí' : 'No', bold: true }
                                ]
                            }
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Cuello', fontSize: 8 },
                                    { text: examenesFisicos?.cuello || "N/A", bold: true }
                                ]
                            },
                            { text: '' },
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
                        return (rowIndex === 0) ? '#1F2937' : null;
                    }
                },
                margin: [0, 0, 0, 20]
            },
            {
                table: {
                    widths: ['*', '*'],
                    body: [
                        [
                            {
                                text: 'Región Toracoabdominal',
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
                                stack: [
                                    { text: 'Cardiopulmonar', fontSize: 8 },
                                    { text: examenesFisicos?.cardio_pulmunar || "N/A", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Examen Abdominal', fontSize: 8 },
                                    { text: examenesFisicos?.condicion_abdominal || "N/A", bold: true }
                                ]
                            }
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
                        return (rowIndex === 0) ? '#1F2937' : null;
                    }
                },
                margin: [0, 0, 0, 20]
            },
            {
                table: {
                    widths: ['*', '*'],
                    body: [
                        [
                            {
                                text: 'Región Pélvica',
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
                                stack: [
                                    { text: 'Tanner', fontSize: 8 },
                                    { text: examenesFisicos?.tanner || "N/A", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Estado de Piel', fontSize: 8 },
                                    { text: examenesFisicos?.extremidades_estado_piel || "N/A", bold: true }
                                ]
                            }
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Condición', fontSize: 8 },
                                    { text: examenesFisicos?.extremidades_condicion || "N/A", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Observación', fontSize: 8 },
                                    { text: examenesFisicos?.extremidades_observacion || "N/A", bold: true }
                                ]
                            }
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
                        return (rowIndex === 0) ? '#1F2937' : null;
                    }
                },
                margin: [0, 0, 0, 20]
            }
        ],
        margin: [0, 0, 0, 20]
    };
};

/**
 * Obtiene los datos del examen físico del paciente
 * @param {string} token - Token de autenticación
 * @param {string} idPaciente - ID del paciente
 * @returns {Promise<Object>} Datos del examen físico
 */
export const obtenerDatosExamenFisico = async (token, idPaciente) => {
    try {
        return await consultarExamenFisicoPorPaciente(token, idPaciente);
    } catch (error) {
        console.error('Error al obtener datos del examen físico:', error);
        return null;
    }
}; 