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
                    widths: ['*', '*'],
                    body: [
                        [
                            {
                                text: 'Signos Vitales',
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
                                    { text: 'Frecuencia Cardiaca', fontSize: 8 },
                                    { text: examenesFisicos?.frecuencia_cardiaca || "No Registrado", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Frecuencia Respiratoria', fontSize: 8 },
                                    { text: examenesFisicos?.frecuencia_respiratoria || "No Registrado", bold: true }
                                ]
                            }
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Saturación de Oxígeno', fontSize: 8 },
                                    { text: examenesFisicos?.saturacion_oxigeno || "No registrado", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Tensión Arterial', fontSize: 8 },
                                    { text: examenesFisicos?.tension_arterial || "No registrado", bold: true }
                                ]
                            }
                        ]
                    ]
                },
                layout: {
                    hLineWidth: function(i) {
                        return (i === 0 || i === 1) ? 1 : 0.5;
                    },
                    vLineWidth: function() {
                        return 0.5;
                    },
                    hLineColor: function(i) {
                        return (i === 0 || i === 1) ? '#1F2937' : '#CCCCCC';
                    },
                    vLineColor: function() {
                        return '#CCCCCC';
                    },
                    fillColor: function(rowIndex) {
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
                                text: 'Antropometría',
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
                                    { text: 'Peso', fontSize: 8 },
                                    { text: examenesFisicos?.peso ? `${examenesFisicos.peso} kg` : "No registrado", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Talla', fontSize: 8 },
                                    { text: examenesFisicos?.talla ? `${examenesFisicos.talla} cm` : "No registrado", bold: true }
                                ]
                            }
                        ],
                        [
                            {
                                stack: [
                                    { text: 'IMC', fontSize: 8 },
                                    { text: examenesFisicos?.imc ? `${examenesFisicos.imc.toFixed(2)}` : "No registrado", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Percentil', fontSize: 8 },
                                    { text: examenesFisicos?.percentil || "No registrado", bold: true }
                                ]
                            }
                        ]
                    ]
                },
                layout: {
                    hLineWidth: function(i) {
                        return (i === 0 || i === 1) ? 1 : 0.5;
                    },
                    vLineWidth: function() {
                        return 0.5;
                    },
                    hLineColor: function(i) {
                        return (i === 0 || i === 1) ? '#1F2937' : '#CCCCCC';
                    },
                    vLineColor: function() {
                        return '#CCCCCC';
                    },
                    fillColor: function(rowIndex) {
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
                                    { text:  examenesFisicos?.deficit_vitamina_d === true ? 'Sí' : 'No', bold: true }
                                ]
                            }
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Desnutrición', fontSize: 8 },
                                    { text:  examenesFisicos?.desnutricion === true ? 'Sí' : 'No', bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Obesidad', fontSize: 8 },
                                    { text:  examenesFisicos?.obesidad === true ? 'Sí' : 'No', bold: true }
                                ]
                            },
                            { text: '' }
                        ]
                    ]
                },
                layout: {
                    hLineWidth: function(i) {
                        return (i === 0 || i === 1) ? 1 : 0.5;
                    },
                    vLineWidth: function() {
                        return 0.5;
                    },
                    hLineColor: function(i) {
                        return (i === 0 || i === 1) ? '#1F2937' : '#CCCCCC';
                    },
                    vLineColor: function() {
                        return '#CCCCCC';
                    },
                    fillColor: function(rowIndex) {
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
                                    { text: examenesFisicos?.perimetro_cefalico ? `${examenesFisicos.perimetro_cefalico} cm` : "No registrado", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Agudeza Visual', fontSize: 8 },
                                    { text: examenesFisicos?.vision || "No registrado", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Examen Boca', fontSize: 8 },
                                    { text: examenesFisicos?.examen_boca || "No registrado", bold: true }
                                ]
                            }
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Examen Nariz', fontSize: 8 },
                                    { text: examenesFisicos?.examen_nariz || "No registrado", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Examen Oídos', fontSize: 8 },
                                    { text: examenesFisicos?.examen_oidos || "No registrado", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Caries', fontSize: 8 },
                                    { text: examenesFisicos?.caries === null ? 'No registrado' : examenesFisicos?.caries === true ? 'Sí' : 'No', bold: true }
                                ]
                            }
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Cuello', fontSize: 8 },
                                    { text: examenesFisicos?.cuello || "No registrado", bold: true }
                                ]
                            },
                            { text: '' },
                            { text: '' }
                        ]
                    ]
                },
                layout: {
                    hLineWidth: function(i) {
                        return (i === 0 || i === 1) ? 1 : 0.5;
                    },
                    vLineWidth: function() {
                        return 0.5;
                    },
                    hLineColor: function(i) {
                        return (i === 0 || i === 1) ? '#1F2937' : '#CCCCCC';
                    },
                    vLineColor: function() {
                        return '#CCCCCC';
                    },
                    fillColor: function(rowIndex) {
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
                                    { text: examenesFisicos?.cardio_pulmunar || "No registrado", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Examen Abdominal', fontSize: 8 },
                                    { text: examenesFisicos?.condicion_abdominal || "No registrado", bold: true }
                                ]
                            }
                        ]
                    ]
                },
                layout: {
                    hLineWidth: function(i) {
                        return (i === 0 || i === 1) ? 1 : 0.5;
                    },
                    vLineWidth: function() {
                        return 0.5;
                    },
                    hLineColor: function(i) {
                        return (i === 0 || i === 1) ? '#1F2937' : '#CCCCCC';
                    },
                    vLineColor: function() {
                        return '#CCCCCC';
                    },
                    fillColor: function(rowIndex) {
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
                                    { text: examenesFisicos?.tanner || "No registrado", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Estado de Piel', fontSize: 8 },
                                    { text: examenesFisicos?.extremidades_estado_piel || "No registrado", bold: true }
                                ]
                            }
                        ],
                        [
                            {
                                stack: [
                                    { text: 'Condición', fontSize: 8 },
                                    { text: examenesFisicos?.extremidades_condicion || "No registrado", bold: true }
                                ]
                            },
                            {
                                stack: [
                                    { text: 'Observación', fontSize: 8 },
                                    { text: examenesFisicos?.extremidades_observacion || "No registrado", bold: true }
                                ]
                            }
                        ]
                    ]
                },
                layout: {
                    hLineWidth: function(i) {
                        return (i === 0 || i === 1) ? 1 : 0.5;
                    },
                    vLineWidth: function() {
                        return 0.5;
                    },
                    hLineColor: function(i) {
                        return (i === 0 || i === 1) ? '#1F2937' : '#CCCCCC';
                    },
                    vLineColor: function() {
                        return '#CCCCCC';
                    },
                    fillColor: function(rowIndex) {
                        return (rowIndex === 0) ? '#1F2937' : null;
                    }
                },
                margin: [0, 0, 0, 20]
            }
        ],
        margin: [0, 0, 0, 20]
    };
};

