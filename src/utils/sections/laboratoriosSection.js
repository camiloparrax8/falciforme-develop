/**
 * Genera la sección de laboratorios para el PDF
 * @param {Object} laboratorios - Datos de laboratorios del paciente
 * @returns {Object} Objeto con la configuración de la sección para pdfMake
 */
export const generarSeccionLaboratorios = (laboratorios) => {
    // Asegurarnos de que tenemos un array de laboratorios
    const registrosLaboratorio = Array.isArray(laboratorios?.data) ? laboratorios.data : [];

    return {
        table: {
            widths: ['auto', '*', '*', '*', '*', '*', '*', '*'],
            body: [
                [
                    {
                        text: 'LABORATORIOS',
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
                        text: 'HEMATOLOGÍA',
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
                ...(registrosLaboratorio.length > 0 
                    ? registrosLaboratorio.map((lab, index) => {
                        return [
                            registrosLaboratorio.length - index,
                            lab.hematies || "No registrado",
                            lab.hematocritos || "No registrado",
                            lab.mch || "No registrado",
                            lab.rdw || "No registrado",
                            lab.hemoglobina || "No registrado",
                            lab.mcv || "No registrado",
                            lab.mchc || "No registrado"
                        ];
                    })
                    : [[{ text: 'No hay registros de laboratorio', colSpan: 8, alignment: 'center' }, {}, {}, {}, {}, {}, {}, {}]]
                )
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

