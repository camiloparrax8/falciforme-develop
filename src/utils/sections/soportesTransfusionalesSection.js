/**
 * Genera la sección de soportes transfusionales para el PDF
 * @param {Object} soportesTransfusionales - Datos de soportes transfusionales del paciente
 * @returns {Array} Array de objetos con la configuración de las secciones para pdfMake
 */
export const generarSeccionSoportesTransfusionales = (soportesTransfusionales) => {
    return [
        // Sección de Soportes Transfusionales
        {
            table: {
                widths: ['auto', '*', '*', '*', '*'],
                body: [
                    [
                        {
                            text: 'Soportes Transfusionales',
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
                            text: 'Soporte Transfucional',
                            fillColor: '#E3F2FD',
                            bold: true,
                            fontSize: 10,
                            colSpan: 5
                        },
                        {}, {}, {}, {}
                    ],
                    [
                        { text: 'Registro', style: 'tableHeader' },
                        { text: 'Fecha', style: 'tableHeader' },
                        { text: 'Soporte Transfusional', style: 'tableHeader' },
                        { text: 'Número de Transfusiones', style: 'tableHeader' },
                        { text: 'Frecuencia', style: 'tableHeader' }
                    ],
                    ...(soportesTransfusionales?.data?.length > 0 
                        ? soportesTransfusionales.data.map((soporte, index) => [
                            soportesTransfusionales.data.length - index,
                            soporte.fecha ? soporte.fecha.split('T')[0].split('-').reverse().join('/') : "No registrado",
                            soporte.soporte_transfusional || "No registrado",
                            soporte.numero_transfusiones || "No registrado",
                            soporte.frecuencia || "No registrado"
                        ])
                        : [[{ text: 'No hay registros de soportes transfusionales', colSpan: 5, alignment: 'center' }, {}, {}, {}, {}]]
                    )
                ]
            },
            layout: {
                hLineWidth: function() {
                    return 0.5;
                },
                vLineWidth: function() {
                    return 0.5;
                },
                hLineColor: function() {
                    return '#CCCCCC';
                },
                vLineColor: function() {
                    return '#CCCCCC';
                },
                fillColor: function(rowIndex, node, columnIndex) {
                    return node.table.body[rowIndex][columnIndex].fillColor;
                }
            },
        },
        {
            table: {
                widths: ['auto', '*', '*', '*', '*'],
                body: [
                    [
                        {
                            text: 'Sobrecarga de Hierro',
                            fillColor: '#E3F2FD',
                            bold: true,
                            fontSize: 10,
                            colSpan: 5
                        },
                        {}, {}, {}, {}
                    ],
                    [
                        { text: 'Registro', style: 'tableHeader' },
                        { text: 'Fecha', style: 'tableHeader' },
                        { text: 'Ferritina', style: 'tableHeader' },
                        { text: 'Quelantes', style: 'tableHeader' },
                        { text: 'Dosis (mg/kg/día)', style: 'tableHeader' }
                    ],
                    ...(soportesTransfusionales?.data?.length > 0 
                        ? soportesTransfusionales.data.map((soporte, index) => [
                            soportesTransfusionales.data.length - index,
                            soporte.fecha_sobrecarga_hierro ? soporte.fecha_sobrecarga_hierro.split('T')[0].split('-').reverse().join('/') : "No registrado",
                            soporte.ferritina || "No registrado",
                            soporte.quelentes || "No registrado",
                            soporte.ferritina_dosis || "No registrado"
                        ])
                        : [[{ text: 'No hay registros de sobrecarga de hierro', colSpan: 5, alignment: 'center' }, {}, {}, {}, {}]]
                    )
                ]
            },
            layout: {
                hLineWidth: function() {
                    return 0.5;
                },
                vLineWidth: function() {
                    return 0.5;
                },
                hLineColor: function() {
                    return '#CCCCCC';
                },
                vLineColor: function() {
                    return '#CCCCCC';
                },
                fillColor: function(rowIndex, node, columnIndex) {
                    return node.table.body[rowIndex][columnIndex].fillColor;
                }
            },
        },
        // Sección de Sobrecarga por Órgano
        {
            table: {
                widths: ['auto', '*', '*', '*'],
                body: [
                    
                    [
                        {
                            text: 'Sobrecarga por Órgano',
                            fillColor: '#E3F2FD',
                            bold: true,
                            fontSize: 10,
                            colSpan: 4
                        },
                        {}, {}, {}
                    ],
                    [
                        { text: 'Registro', style: 'tableHeader' },
                        { text: 'Fecha', style: 'tableHeader' },
                        { text: 'Líc. Hígado', style: 'tableHeader' },
                        { text: 'Pancreática R2', style: 'tableHeader' }
                    ],
                    ...(soportesTransfusionales?.data?.length > 0 
                        ? soportesTransfusionales.data.map((soporte, index) => [
                            { text: soportesTransfusionales.data.length - index || '' },
                            { text: soporte.fecha_sobrecarga_organo ? soporte.fecha_sobrecarga_organo.split('T')[0].split('-').reverse().join('/') : "No registrado" },
                            { text: soporte.lic || "No registrado" },
                            { text: soporte.pancreatica || "No registrado" }
                        ])
                        : [[{ text: 'No hay registros de sobrecarga por órgano', colSpan: 4, alignment: 'center' }, {}, {}, {}]]
                    )
                ]
            },
            layout: {
                hLineWidth: function() {
                    return 0.5;
                },
                vLineWidth: function() {
                    return 0.5;
                },
                hLineColor: function() {
                    return '#CCCCCC';
                },
                vLineColor: function() {
                    return '#CCCCCC';
                },
                fillColor: function(rowIndex, node, columnIndex) {
                    return node.table.body[rowIndex][columnIndex].fillColor;
                }
            },
            margin: [0, 0, 0, 40]
        }
        
    ];
};

