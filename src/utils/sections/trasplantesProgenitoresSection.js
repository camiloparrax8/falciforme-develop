import { consultarTransplantesProgenitoresPorPaciente } from '@/customService/services/transplantesProgenitoresService';

/**
 * Genera la sección de trasplantes de progenitores para el PDF
 * @param {Object} trasplanteProgenitores - Datos de los trasplantes de progenitores del paciente
 * @returns {Object} Objeto con la configuración de la sección para pdfMake
 */
export const generarSeccionTrasplantesProgenitores = (trasplanteProgenitores) => {
    return {
        table: {
            widths: ['*', '*'],
            body: [
                [
                    {
                        text: 'Trasplantes de Progenitores',
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
                        text: 'Información General',
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
                            { text: 'Paciente', fontSize: 8 },
                            { text: trasplanteProgenitores?.data?.paciente || "N/A", bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Padres', fontSize: 8 },
                            { text: trasplanteProgenitores?.data?.padres || "N/A", bold: true }
                        ]
                    }
                ],
                [
                    {
                        stack: [
                            { text: 'Hermanos', fontSize: 8 },
                            { text: trasplanteProgenitores?.data?.hermanos || "N/A", bold: true }
                        ]
                    },
                    {
                        stack: [
                            { text: 'Tipo de indicacion', fontSize: 8 },
                            { text: trasplanteProgenitores?.data?.tipo_indicaciones || "N/A", bold: true }
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
                return node.table.body[rowIndex][columnIndex].fillColor;
            }
        },
        margin: [0, 0, 0, 20]
    };
};

/**
 * Obtiene los datos de los trasplantes de progenitores del paciente
 * @param {string} token - Token de autenticación
 * @param {string} idPaciente - ID del paciente
 * @returns {Promise<Object>} Datos de los trasplantes de progenitores
 */
export const obtenerDatosTrasplantesProgenitores = async (token, idPaciente) => {
    try {
        return await consultarTransplantesProgenitoresPorPaciente(token, idPaciente);
    } catch (error) {
        console.error('Error al obtener datos de trasplantes de progenitores:', error);
        return null;
    }
}; 