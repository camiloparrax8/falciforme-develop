import { obtenerVacunasPorPaciente } from '@/customService/services/vacunas_hcService';

/**
 * Genera la sección de vacunas para el PDF
 * @param {Object} vacunas - Datos de vacunas del paciente
 * @returns {Object} Objeto con la configuración de la sección para pdfMake
 */
export const generarSeccionVacunas = (vacunas) => {
    return {
        table: {
            widths: ['auto', '*', '*'],
            body: [
                [
                    {
                        text: 'Vacunas',
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
                        text: 'Información General',
                        fillColor: '#E3F2FD',
                        bold: true,
                        fontSize: 10,
                        colSpan: 3
                    },
                    {}, {}
                ],
                [
                    { text: 'Registro', style: 'tableHeader' },
                    { text: 'Nombre de la Vacuna', style: 'tableHeader' },
                    { text: 'Fecha', style: 'tableHeader' }
                ],
                ...(vacunas?.data?.length > 0 
                    ? vacunas.data.map((vac, index) => [
                        { text: vacunas.data.length - index || '' },
                        { text: vac.nombre_vacuna || '' },
                        { text: vac.fecha ? vac.fecha.split('T')[0].split('-').reverse().join('/') : '' }
                    ])
                    : [[{ text: 'No hay registros de vacunas', colSpan: 3, alignment: 'center' }, {}, {}]]
                )
            ],
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
 * Obtiene los datos de vacunas del paciente
 * @param {string} token - Token de autenticación
 * @param {string} idPaciente - ID del paciente
 * @returns {Promise<Object>} Datos de vacunas
 */
export const obtenerDatosVacunas = async (token, idPaciente) => {
    try {
        return await obtenerVacunasPorPaciente(token, idPaciente);
    } catch (error) {
        console.error('Error al obtener datos de vacunas:', error);
        return null;
    }
}; 