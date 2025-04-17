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
                            { text: complicacionesCronicas?.data?.vasculopatia_cerebral === true ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Infartos Cerebrales Silentes', fontSize: 8 },
                            { text:  complicacionesCronicas?.data?.infartos_cerebrales_silentes === true ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Epilepsia/Convulsiones', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.epilepsia_convulsiones === true ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Cefaleas Recurrentes', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.cefaleas_recurrentes === true ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Déficit Cognitivo', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.deficit_cognitivo === true ? 'Sí' : 'No', bold: true }
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
                            { text: complicacionesCronicas?.data?.retinopatia_drepanocitica === null ? 'No registrado' : complicacionesCronicas?.data?.retinopatia_drepanocitica === true ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Hemorragias Vítreas', fontSize: 8 },
                            { text:  complicacionesCronicas?.data?.retinopatia_drepanocitica === null ? 'No registrado' : complicacionesCronicas?.data?.hemorragias_vitreas === true ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Neovascularización Retiniana', fontSize: 8 },
                            { text:  complicacionesCronicas?.data?.neovascularizacion_retiniana === null ? 'No registrado' : complicacionesCronicas?.data?.neovascularizacion_retiniana === true ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Iritis o Uveítis', fontSize: 8 },
                            { text:  complicacionesCronicas?.data?.iritis_uveitis === null ? 'No registrado' : complicacionesCronicas?.data?.iritis_uveitis === true ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Oclusión de Vasos Retinianos', fontSize: 8 },
                            { text:  complicacionesCronicas?.data?.oclusion_vasos_retinianos === null ? 'No registrado' : complicacionesCronicas?.data?.oclusion_vasos_retinianos === true ? 'Sí' : 'No', bold: true }
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
                            { text:  complicacionesCronicas?.data?.disfuncion_diastolica_vii === null ? 'No registrado' : complicacionesCronicas?.data?.disfuncion_diastolica_vii === true ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Sobrecarga Férrica', fontSize: 8 },
                            { text:  complicacionesCronicas?.data?.sobrecarga_ferrica === null ? 'No registrado' : complicacionesCronicas?.data?.sobrecarga_ferrica === true ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Trombosis', fontSize: 8 },
                            { text:  complicacionesCronicas?.data?.trombosis === null ? 'No registrado' : complicacionesCronicas?.data?.trombosis === true ? 'Sí' : 'No', bold: true }
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
                            { text:  complicacionesCronicas?.data?.hipertension_pulmonar === null ? 'No registrado' : complicacionesCronicas?.data?.hipertension_pulmonar === true ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'VRT', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.vrt || "No registrado", bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Número de Crisis Anual (Asma)', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.numero_crisis || "No registrado", bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Tratamientos (Asma)', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.tratamientos || "No registrado", bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Hipomexia (EPFC)', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.hipomexia === null ? 'No registrado' : complicacionesCronicas?.data?.hipomexia === true ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'SAOS (EPFC)', fontSize: 8 },
                            { text:  complicacionesCronicas?.data?.saos === null ? 'No registrado' : complicacionesCronicas?.data?.saos === true ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Tratamiento (EPFC)', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.edpfc_tratamiento || "No registrado", bold: true }
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
                            { text:  complicacionesCronicas?.data?.hepatitis_viral_cronica === null ? 'No registrado' : complicacionesCronicas?.data?.hepatitis_viral_cronica === true ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Esplenomegalia', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.esplenomegalia === null ? 'No registrado' : complicacionesCronicas?.data?.esplenomegalia === true ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Hiperesplenismo', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.hiperesplenismo === null ? 'No registrado' : complicacionesCronicas?.data?.hiperesplenismo === true ? 'Sí' : 'No', bold: true }
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
                            { text: complicacionesCronicas?.data?.nefropatia === null ? 'No registrado' : complicacionesCronicas?.data?.nefropatia === true ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Hipostenia', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.hipotensia === null ? 'No registrado' : complicacionesCronicas?.data?.hipotensia === true ? 'Sí' : 'No', bold: true }
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
                            { text: complicacionesCronicas?.data?.hematuria_necrosis_papilar === null ? 'No registrado' : complicacionesCronicas?.data?.hematuria_necrosis_papilar === true ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Priapismo Recurrente', fontSize: 8 },
                            { text:  complicacionesCronicas?.data?.priapismo_recurrente === null ? 'No registrado' : complicacionesCronicas?.data?.priapismo_recurrente === true ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Enfermedad Renal Crónica', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.enfermedad_renal_cronica === null ? 'No registrado' : complicacionesCronicas?.data?.enfermedad_renal_cronica === true ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Proteinuria', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.proteinuria === null ? 'No registrado' : complicacionesCronicas?.data?.proteinuria === true ? 'Sí' : 'No', bold: true }
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
                            { text: complicacionesCronicas?.data?.huesos_comprometidos || "No registrado", bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Grado de Discapacidad', fontSize: 8 },
                            { text: complicacionesCronicas?.data?.grado_discapacidad || "No registrado", bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Osteonecrosis', fontSize: 8 },
                            { text:  complicacionesCronicas?.data?.osteonecrosis === null ? 'No registrado' : complicacionesCronicas?.data?.osteonecrosis === true ? 'Sí' : 'No', bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Deformidades Óseas', fontSize: 8 },
                            { text:  complicacionesCronicas?.data?.deformidades_osea === null ? 'No registrado' : complicacionesCronicas?.data?.deformidades_osea === true ? 'Sí' : 'No', bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Osteopenia', fontSize: 8 },
                            { text:  complicacionesCronicas?.data?.osteopenia === null ? 'No registrado' : complicacionesCronicas?.data?.osteopenia === true ? 'Sí' : 'No', bold: true }
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
            fillColor: function(rowIndex, node, columnIndex) {
                return node.table.body[rowIndex][columnIndex].fillColor;
            }
        },
        margin: [0, 0, 0, 20]
    };
};

