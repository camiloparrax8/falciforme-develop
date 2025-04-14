import { obtenerLaboratoriosPorPaciente } from '@/customService/services/laboratorioService';

/**
 * Genera la sección de laboratorios para el PDF
 * @param {Object} laboratorios - Datos de laboratorios del paciente
 * @returns {Object} Objeto con la configuración de la sección para pdfMake
 */
export const generarSeccionLaboratorios = (laboratorios) => {
    return {
        table: {
            widths: ['auto', '*', '*', '*', '*', '*', '*', '*'],
            body: [
                [
                    {
                        text: 'Laboratorios',
                        fillColor: '#1F2937',
                        color: 'white',
                        bold: true,
                        fontSize: 12,
                        colSpan: 8
                    },
                    {}, {}, {}, {}, {}, {}, {}
                ],
                [
                    {
                        text: 'Hematología',
                        fillColor: '#E3F2FD',
                        bold: true,
                        fontSize: 10,
                        colSpan: 8
                    },
                    {}, {}, {}, {}, {}, {}, {}
                ],
                [
                    { text: 'Registro', style: 'tableHeader' },
                    { text: 'Hematíes', style: 'tableHeader' },
                    { text: 'Hematocritos', style: 'tableHeader' },
                    { text: 'MCH', style: 'tableHeader' },
                    { text: 'RDW', style: 'tableHeader' },
                    { text: 'Hemoglobina', style: 'tableHeader' },
                    { text: 'MCV', style: 'tableHeader' },
                    { text: 'MCHC', style: 'tableHeader' }
                ],
                ...(laboratorios?.data?.length > 0 
                    ? laboratorios.data.map((lab, index) => [
                        laboratorios.data.length - index,
                        lab.hematies || "N/A",
                        lab.hematocritos || "N/A",
                        lab.mch || "N/A",
                        lab.rdw || "N/A",
                        lab.hemoglobina || "N/A",
                        lab.mcv || "N/A",
                        lab.mchc || "N/A"
                    ])
                    : [[{ text: 'No hay registros de laboratorio', colSpan: 8, alignment: 'center' }, {}, {}, {}, {}, {}, {}, {}]]
                )
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
 * Obtiene los datos de laboratorios del paciente
 * @param {string} token - Token de autenticación
 * @param {string} idPaciente - ID del paciente
 * @returns {Promise<Object>} Datos de laboratorios
 */
export const obtenerDatosLaboratorios = async (token, idPaciente) => {
    try {
        return await obtenerLaboratoriosPorPaciente(token, idPaciente);
    } catch (error) {
        console.error('Error al obtener datos de laboratorios:', error);
        return null;
    }
}; 