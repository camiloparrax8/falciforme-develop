import { obtenerComplicacionAgudaPorPaciente } from '@/customService/services/complicacionAgudaService';
import { obtenerIngresosPorComplicacion } from '@/customService/services/ingresosComplicacionesAgudasService';

/**
 * Genera la sección de complicaciones agudas para el PDF
 * @param {Object} complicacionesAgudas - Datos de las complicaciones agudas del paciente
 * @param {Object} ingresos - Datos de los ingresos por complicaciones agudas
 * @returns {Object} Objeto con la configuración de la sección para pdfMake
 */
export const generarSeccionComplicacionesAgudas = (complicacionesAgudas, ingresos) => {
    // Función para formatear la fecha
    const formatearFecha = (fechaStr) => {
        if (!fechaStr) return "N/A";
        try {
            const fecha = new Date(fechaStr);
            const dia = fecha.getDate().toString().padStart(2, '0');
            const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
            const anio = fecha.getFullYear();
            return `${dia}/${mes}/${anio}`;
        } catch {
            return fechaStr;
        }
    };

    return {
        table: {
            widths: ['*', '*', '*', '*'],
            body: [
                [
                    {
                        text: 'Complicaciones Agudas',
                        fillColor: '#1F2937',
                        color: 'white',
                        bold: true,
                        fontSize: 12,
                        colSpan: 4
                    },
                    {}, {}, {}
                ],
                [
                    {
                        text: 'Crisis de Dolor',
                        fillColor: '#E3F2FD',
                        bold: true,
                        fontSize: 10,
                        colSpan: 4
                    },
                    {}, {}, {}
                ],
                [
                    {
                        stack: [
                            { text: 'Fecha', fontSize: 8 },
                            { text: formatearFecha(complicacionesAgudas?.data?.fecha), bold: true }
                        ],
                        colSpan: 2
                    },
                    {},
                    {
                        stack: [
                            { text: 'Días', fontSize: 8 },
                            { text: complicacionesAgudas?.data?.dias_crisis || "N/A", bold: true }
                        ],
                        colSpan: 2
                    },
                    {}
                ],
                [
                    {
                        stack: [
                            { text: 'Intensidad (1-10)', fontSize: 8 },
                            { text: complicacionesAgudas?.data?.intensidad || "N/A", bold: true }
                        ],
                        colSpan: 2
                    },
                    {},
                    {
                        stack: [
                            { text: 'Manejo', fontSize: 8 },
                            { text: complicacionesAgudas?.data?.manejo || "N/A", bold: true }
                        ],
                        colSpan: 2
                    },
                    {}
                ],
                [
                    {
                        stack: [
                            { text: 'Tratamiento', fontSize: 8 },
                            { text: complicacionesAgudas?.data?.tratamiento || "N/A", bold: true }
                        ],
                        colSpan: 2
                    },
                    {},
                    {
                        stack: [
                            { text: 'Huesos Afectados', fontSize: 8 },
                            { text: complicacionesAgudas?.data?.huesos_afectados || "N/A", bold: true }
                        ],
                        colSpan: 2
                    },
                    {}
                ],
                [
                    {
                        text: 'Infecciones',
                        fillColor: '#E3F2FD',
                        bold: true,
                        fontSize: 10,
                        colSpan: 4
                    },
                    {}, {}, {}
                ],
                [
                    {
                        stack: [
                            { text: 'Germen', fontSize: 8 },
                            { text: complicacionesAgudas?.data?.germen || "N/A", bold: true }
                        ],
                        colSpan: 2
                    },
                    {},
                    {
                        stack: [
                            { text: 'Tratamiento', fontSize: 8 },
                            { text: complicacionesAgudas?.data?.tratamiento || "N/A", bold: true }
                        ],
                        colSpan: 2
                    },
                    {}
                ],
                [
                    {
                        stack: [
                            { text: 'Días', fontSize: 8 },
                            { text: complicacionesAgudas?.data?.dias_infeccion || "N/A", bold: true }
                        ],
                        colSpan: 2
                    },
                    {},
                    {
                        stack: [
                            { text: 'Crisis Aplástica Infecciosa', fontSize: 8 },
                            { text: complicacionesAgudas?.data?.crisis_aplastica_infecciosa ? 'Sí' : 'No', bold: true }
                        ],
                        colSpan: 2
                    },
                    {}
                ],
                [
                    {
                        text: 'Ingresos por complicaciones agudas',
                        fillColor: '#E3F2FD',
                        bold: true,
                        fontSize: 10,
                        colSpan: 4
                    },
                    {}, {}, {}
                ],
                [
                    { text: 'Registro', style: 'tableHeader' },
                    { text: 'Tipo de Ingreso', style: 'tableHeader' },
                    { text: 'Fecha de Ingreso', style: 'tableHeader' },
                    { text: 'Duración (días)', style: 'tableHeader' }
                ],
                ...(ingresos?.data?.length > 0 
                    ? ingresos.data.map((ingreso, index) => [
                        ingresos.data.length - index,
                        ingreso.tipo_ingreso || "N/A",
                        formatearFecha(ingreso.fecha_ingreso),
                        ingreso.duracion_ingreso || "N/A"
                    ])
                    : [[{ text: 'No hay registros de ingresos hospitalarios', colSpan: 4, alignment: 'center' }, {}, {}, {}]]
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
 * Obtiene los datos de las complicaciones agudas del paciente
 * @param {string} token - Token de autenticación
 * @param {string} idPaciente - ID del paciente
 * @returns {Promise<Object>} Datos de las complicaciones agudas
 */
export const obtenerDatosComplicacionesAgudas = async (token, idPaciente) => {
    try {
        const complicacionesAgudas = await obtenerComplicacionAgudaPorPaciente(token, idPaciente);
        let ingresos = null;
        
        if (complicacionesAgudas?.data?.id) {
            ingresos = await obtenerIngresosPorComplicacion(token, complicacionesAgudas.data.id);
        }
        
        return {
            complicacionesAgudas,
            ingresos
        };
    } catch (error) {
        console.error('Error al obtener datos de complicaciones agudas:', error);
        return null;
    }
}; 