import { obtenerImagenesDiagnosticasPorPaciente } from '@/customService/services/imagenDiagnosticaService';

/**
 * Genera la sección de imágenes diagnósticas para el PDF
 * @param {Object} imagenesDiagnosticas - Datos de imágenes diagnósticas del paciente
 * @returns {Object} Objeto con la configuración de la sección para pdfMake
 */
export const generarSeccionImagenesDiagnosticas = (imagenesDiagnosticas) => {
    return {
        table: {
            widths: ['auto', '*', '*', '*', '*'],
            body: [
                [
                    {
                        text: 'Imágenes Diagnósticas',
                        fillColor: '#1F2937',
                        color: 'white',
                        bold: true,
                        fontSize: 12,
                        colSpan: 5
                    },
                    {}, {}, {}, {}
                ],
                [
                    {
                        text: 'Información General',
                        fillColor: '#E3F2FD',
                        bold: true,
                        fontSize: 10,
                        colSpan: 5
                    },
                    {}, {}, {}, {}
                ],
                [
                    { text: 'Registro', style: 'tableHeader' },
                    { text: 'Imagen Diagnóstica', style: 'tableHeader' },
                    { text: 'Fecha', style: 'tableHeader' },
                    { text: 'Tipo de Resultado', style: 'tableHeader' },
                    { text: 'Resultado', style: 'tableHeader' }
                ],
                ...(imagenesDiagnosticas?.data?.length > 0 
                    ? imagenesDiagnosticas.data.map((img, index) => [
                        imagenesDiagnosticas.data.length - index,
                        img.imagenes_diagnosticas || "N/A",
                        img.fecha ? img.fecha.split('T')[0].split('-').reverse().join('/') : "N/A",
                        img.tipo_resultado || "N/A",
                        img.resultado || "N/A"
                    ])
                    : [[{ text: 'No hay registros de imágenes diagnósticas', colSpan: 5, alignment: 'center' }, {}, {}, {}, {}]]
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
 * Obtiene los datos de imágenes diagnósticas del paciente
 * @param {string} token - Token de autenticación
 * @param {string} idPaciente - ID del paciente
 * @returns {Promise<Object>} Datos de imágenes diagnósticas
 */
export const obtenerDatosImagenesDiagnosticas = async (token, idPaciente) => {
    try {
        return await obtenerImagenesDiagnosticasPorPaciente(token, idPaciente);
    } catch (error) {
        console.error('Error al obtener datos de imágenes diagnósticas:', error);
        return null;
    }
}; 