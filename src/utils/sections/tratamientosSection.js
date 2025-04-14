import { obtenerTratamientosPorPaciente } from '@/customService/services/tratamientosService';

export const generarSeccionTratamientos = (tratamientos) => {
    if (!tratamientos || tratamientos.status !== 'success' || !tratamientos.data) {
        return {
            table: {
                widths: ['*'],
                body: [
                    [{ text: 'No hay datos de tratamientos disponibles', alignment: 'center' }]
                ]
            }
        };
    }

    // Formatear los tratamientos por categoría
    const tratamientosIndividuales = tratamientos.data
        .filter(trat => trat.titulo === 'Tratamiento individual')
        .map((trat, index) => ({
            Registro: tratamientos.data.filter(t => t.titulo === 'Tratamiento individual').length - index,
            tipo: trat.tipo || '',
            n_dias: trat.n_dias || '',
            dosis: trat.dosis || ''
        }));

    const tratamientosManejoDolor = tratamientos.data
        .filter(trat => trat.titulo === 'Manejo de dolor')
        .map((trat, index) => ({
            Registro: tratamientos.data.filter(t => t.titulo === 'Manejo de dolor').length - index,
            medicamento: trat.tipo || '',
            n_dias: trat.n_dias || '',
            dosis: trat.dosis || ''
        }));

    // Preparar el cuerpo de la tabla
    const tableBody = [
        [
            {
                text: 'Tratamientos',
                fillColor: '#1F2937',
                color: 'white',
                bold: true,
                fontSize: 12,
                colSpan: 4
            },
            {}, {}, {}
        ]
    ];

    // Agregar tratamientos individuales si existen
    if (tratamientosIndividuales.length > 0) {
        // Agregar subtítulo para tratamientos individuales
        tableBody.push([
            {
                text: 'Tratamientos Individuales',
                fillColor: '#E3F2FD',
                bold: true,
                fontSize: 10,
                colSpan: 4
            },
            {}, {}, {}
        ]);

        // Agregar encabezados de columna
        tableBody.push([
            { text: 'Registro', style: 'tableHeader' },
            { text: 'Tipo', style: 'tableHeader' },
            { text: 'Número de Días', style: 'tableHeader' },
            { text: 'Dosis', style: 'tableHeader' }
        ]);

        // Agregar registros de tratamientos individuales
        tratamientosIndividuales.forEach(tratamiento => {
            tableBody.push([
                { text: tratamiento.Registro || '' },
                { text: tratamiento.tipo || '' },
                { text: tratamiento.n_dias || '' },
                { text: tratamiento.dosis || '' }
            ]);
        });
    }

    // Agregar tratamientos de manejo de dolor si existen
    if (tratamientosManejoDolor.length > 0) {
        // Agregar subtítulo para manejo de dolor
        tableBody.push([
            {
                text: 'Manejo de Dolor',
                fillColor: '#E3F2FD',
                bold: true,
                fontSize: 10,
                colSpan: 4
            },
            {}, {}, {}
        ]);

        // Agregar encabezados de columna
        tableBody.push([
            { text: 'Registro', style: 'tableHeader' },
            { text: 'Tipo', style: 'tableHeader' },
            { text: 'Número de Días', style: 'tableHeader' },
            { text: 'Dosis', style: 'tableHeader' }
        ]);

        // Agregar registros de manejo de dolor
        tratamientosManejoDolor.forEach(tratamiento => {
            tableBody.push([
                { text: tratamiento.Registro || '' },
                { text: tratamiento.medicamento || '' },
                { text: tratamiento.n_dias || '' },
                { text: tratamiento.dosis || '' }
            ]);
        });
    }

    // Si no hay ningún tipo de tratamiento, mostrar mensaje
    if (tratamientosIndividuales.length === 0 && tratamientosManejoDolor.length === 0) {
        tableBody.push([
            { text: 'No hay registros de tratamientos', colSpan: 4, alignment: 'center' },
            {}, {}, {}
        ]);
    }

    return [
        {
            table: {
                widths: ['auto', '*', '*', '*'],
                body: tableBody
            },
            layout: {
                hLineWidth: function(i, node) {
                    return (i === 0 || i === 1) ? 1 : 0.5;
                },
                vLineWidth: function(i, node) {
                    return 0.5;
                },
                hLineColor: function(i, node) {
                    return (i === 0 || i === 1) ? '#006064' : '#CCCCCC';
                },
                vLineColor: function(i, node) {
                    return '#CCCCCC';
                },
                fillColor: function(rowIndex, node, columnIndex) {
                    return node.table.body[rowIndex][columnIndex].fillColor;
                }
            },
            margin: [0, 0, 0, 20]
        }
    ];
};

export const obtenerDatosTratamientos = async (token, pacienteId) => {
    try {
        const resultado = await obtenerTratamientosPorPaciente(token, pacienteId);
        return resultado;
    } catch (error) {
        console.error('Error al obtener datos de tratamientos:', error);
        return { status: 'error', data: null };
    }
}; 