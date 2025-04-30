/* eslint-disable @typescript-eslint/no-unused-vars */
import pdfMake from 'pdfmake/build/pdfmake';
import { useToken } from '@/store/authStore';
import { generarSeccionExamenesFisicos } from '@/utils/sections/examenesFisicosSection';
import { generarSeccionComplicacionesAgudas } from '@/utils/sections/complicacionesAgudasSection';
import { generarSeccionComplicacionesCronicas } from '@/utils/sections/complicacionesCronicasSection';
import { generarSeccionTrasplantesProgenitores } from '@/utils/sections/trasplantesProgenitoresSection';
import { generarSeccionLaboratorios } from '@/utils/sections/laboratoriosSection';
import { generarSeccionImagenesDiagnosticas } from '@/utils/sections/imagenesDiagnosticasSection';
import { generarSeccionSoportesTransfusionales } from '@/utils/sections/soportesTransfusionalesSection';
import { generarSeccionVacunas } from '@/utils/sections/vacunasSection';
import { generarSeccionTratamientos } from '@/utils/sections/tratamientosSection';
import { obtenerHistoriasClinicasPorPaciente } from '@/customService/services/historiaClinicaService';
import { obtenerIngresosPorComplicacion } from '@/customService/services/ingresosComplicacionesAgudasService';
import { obtenerLaboratoriosPorPaciente } from '@/customService/services/laboratorioService';
import { obtenerImagenesDiagnosticasPorPaciente } from '@/customService/services/imagenDiagnosticaService';
import { obtenerSoportesTransfusionalesPorPaciente } from '@/customService/services/soportesTransfusionalesService';


pdfMake.fonts = {
    Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-MediumItalic.ttf',
    },
};

const toBase64 = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const useGeneratePDF = () => {
    const { token } = useToken();

    const generatePDF = async (data, window) => {
        try {
            const logoBase64 = await toBase64('/img/logo/logo-light-full.png');

            // Verificar si solo tenemos el ID de la historia clínica
            if (typeof data === 'number' || (data && !data.paciente)) {
                const historiaId = typeof data === 'number' ? data : data.id;
                const pacienteId = typeof data === 'object' ? data.paciente?.id : null;

                // Buscar la historia clínica por ID en todas las historias del paciente
                const historias = await obtenerHistoriasClinicasPorPaciente(token, pacienteId);
                const historiaCompleta = historias.find(h => h.id === historiaId);

                if (historiaCompleta) {
                    // Actualizar data con la historia completa
                    data = historiaCompleta;
                } else {
                    console.error('No se pudo encontrar la historia clínica con ID:', historiaId);
                    throw new Error('Historia clínica no encontrada');
                }
            }

            if (!data?.paciente?.id) {
                throw new Error('ID de paciente no proporcionado');
            }

            // Preparar los datos directamente desde el objeto proporcionado
            const examenesFisicos = data.examenes_fisicos || null;
            const complicacionesCronicas = data.complicaciones_cronicas || null;
            const trasplanteProgenitores = data.transplante_progenitores || null;

            // Preparamos los datos para complicaciones agudas
            const datosComplicacionesAgudas = {
                complicacionesAgudas: { data: data.complicaciones_agudas?.length > 0 ? data.complicaciones_agudas[0] : null },
                ingresos: { data: [] }
            };

            // Si existe una complicación aguda, obtenemos sus ingresos
            if (datosComplicacionesAgudas.complicacionesAgudas.data?.id) {
                try {
                    const resultadoIngresos = await obtenerIngresosPorComplicacion(
                        token,
                        datosComplicacionesAgudas.complicacionesAgudas.data.id
                    );
                    if (resultadoIngresos.status === 'success' && resultadoIngresos.data) {
                        datosComplicacionesAgudas.ingresos.data = Array.isArray(resultadoIngresos.data) 
                            ? resultadoIngresos.data 
                            : [resultadoIngresos.data];
                    }
                } catch (error) {
                    console.error('Error al obtener ingresos:', error);
                }
            }

            // Datos de laboratorios e imágenes
            const resultadoLaboratorios = await obtenerLaboratoriosPorPaciente(token, data.paciente.id);
            const laboratorios = { 
                data: resultadoLaboratorios?.status === 'success' 
                    ? resultadoLaboratorios.data 
                    : (data.laboratorios || data.laboratorio || [])
            };

            const resultadoImagenes = await obtenerImagenesDiagnosticasPorPaciente(token, data.paciente.id);
            const imagenesDiagnosticas = { 
                data: resultadoImagenes?.status === 'success' 
                    ? resultadoImagenes.data 
                    : (data.imagenes_diagnosticas ? [data.imagenes_diagnosticas] : [])
            };

            // Datos de soportes transfusionales
            const resultadoSoportes = await obtenerSoportesTransfusionalesPorPaciente(token, data.paciente.id);
            const soportesTransfusionales = { 
                data: resultadoSoportes?.status === 'success' 
                    ? resultadoSoportes.data 
                    : (data.soportes_transfusionales || [])
            };

            // Preparamos los datos para vacunas y tratamientos
            const vacunas = { data: data.vacuna || [] };
            const resultadoTratamientos = { status: 'success', data: data.tratamiento || [] };

            const formatearFecha = (fechaStr) => {
                if (!fechaStr) return '';
                try {
                    const fecha = new Date(fechaStr);
                    const dia = fecha.getDate().toString().padStart(2, '0');
                    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
                    const anio = fecha.getFullYear();
                    const hora = fecha.getHours().toString().padStart(2, '0');
                    const minutos = fecha.getMinutes().toString().padStart(2, '0');
                    const segundos = fecha.getSeconds().toString().padStart(2, '0');
                    return `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;
                } catch {
                    return fechaStr;
                }
            }

            const fecha = new Date();
            const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}${(fecha.getMonth() + 1).toString().padStart(2, '0')}${fecha.getFullYear()}${fecha.getHours().toString().padStart(2, '0')}${fecha.getMinutes().toString().padStart(2, '0')}${fecha.getSeconds().toString().padStart(2, '0')}`;

            const docDefinition = {
                pageSize: 'A4',
                pageMargins: [40, 80, 40, 40],
                defaultStyle: {
                    font: 'Roboto',
                    fontSize: 10,
                },
                info: {
                    title: `HC_${data.paciente.identificacion}_${fechaFormateada}.pdf`,
                    author: 'Falciforme',
                    subject: 'Historia Clínica del Paciente',
                    keywords: 'historia clínica, paciente, falciforme',
                    creator: 'Falciforme App',
                    producer: 'Falciforme',
                    creationDate: new Date(),
                    modificationDate: new Date()
                },
                styles: {
                    header: {
                        fontSize: 16,
                        bold: true,
                        color: '#000',
                        margin: [0, 0, 0, 10]
                    },
                    subheader: {
                        fontSize: 12,
                        bold: true,
                        color: '#000',
                        margin: [0, 10, 0, 5]
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 10,
                        color: '#000',
                        fillColor: '#f5f5f5'
                    },
                    headerText: {
                        fontSize: 12,
                        bold: true,
                        color: '#000'
                    },
                    headerSubText: {
                        fontSize: 11,
                        color: '#000'
                    },
                    headerDate: {
                        fontSize: 10,
                        color: '#0066cc'
                    },
                },
                header: (currentPage) => ({
                    columns: [
                        {
                            stack: [
                                { text: 'Falciforme', style: 'headerText' },
                                { text: 'Consulta Medico General', style: 'headerSubText' },
                                { text: `Fecha de la atención ${formatearFecha(new Date())}`, style: 'headerDate' }
                            ],
                            margin: [40, 30, 20, 0],
                            width: 'auto',
                            background: '#f5f5f5',
                            padding: [10, 10, 10, 10]
                        },
                        {
                            stack: [
                                {
                                    image: logoBase64,
                                    width: 150,
                                    alignment: 'right'
                                }
                            ],
                            margin: [0, 30, 40, 0],
                            width: '*'
                        }
                    ]
                }),
                content: [
                    {
                        text: 'DATOS DEL PACIENTE',
                        style: 'subheader',
                        margin: [0, 30, 0, 10]
                    },
                    {
                        table: {
                            widths: ['*', '*', '*'],
                            body: [
                                [
                                    {
                                        text: 'Información básica del paciente y la atención',
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
                                            { text: 'Nombres y Apellidos', fontSize: 8 },
                                            { text: data.paciente?.nombre || 'N/A', bold: true }
                                        ]
                                    },
                                    {
                                        stack: [
                                            { text: 'Edad', fontSize: 8 },
                                            { text: `${data.paciente?.edad || 'N/A'} años`, bold: true }
                                        ]
                                    },
                                    {
                                        stack: [
                                            { text: 'Identificación', fontSize: 8 },
                                            { text: `${data.paciente?.tipo_identificacion || 'N/A'} - ${data.paciente?.identificacion || 'N/A'}`, bold: true }
                                        ]
                                    }
                                ],
                                [
                                    {
                                        stack: [
                                            { text: 'Teléfono', fontSize: 8 },
                                            { text: data.paciente?.celular || 'N/A', bold: true }
                                        ]
                                    },
                                    {
                                        stack: [
                                            { text: 'Correo Electrónico', fontSize: 8 },
                                            { text: data.paciente?.correo || 'N/A', bold: true }
                                        ]
                                    },
                                    {
                                        stack: [
                                            { text: 'Dirección', fontSize: 8 },
                                            { text: data.paciente?.direccion || 'SIN INFORMACION REPORTADA EN SAT', bold: true }
                                        ]
                                    }
                                ]
                            ]
                        },
                        layout: {
                            hLineWidth: function (i) {
                                return (i === 0 || i === 1) ? 1 : 0.5;
                            },
                            vLineWidth: function () {
                                return 0.5;
                            },
                            hLineColor: function (i) {
                                return (i === 0 || i === 1) ? '#1F2937' : '#CCCCCC';
                            },
                            vLineColor: function () {
                                return '#CCCCCC';
                            },
                            fillColor: function (rowIndex) {
                                return (rowIndex === 0) ? '#00BCD4' : null;
                            }
                        },
                        margin: [0, 0, 0, 20]
                    },

                    // Usamos directamente los datos ya preparados en cada sección
                    examenesFisicos ? generarSeccionExamenesFisicos(examenesFisicos) : { text: 'No hay datos de examen físico', margin: [0, 0, 0, 20] },
                    datosComplicacionesAgudas.complicacionesAgudas.data 
                        ? generarSeccionComplicacionesAgudas(datosComplicacionesAgudas.complicacionesAgudas, datosComplicacionesAgudas.ingresos)
                        : { text: 'No hay datos de complicaciones agudas registrados', margin: [0, 0, 0, 20] },
                    complicacionesCronicas ? generarSeccionComplicacionesCronicas({ data: complicacionesCronicas }) : { text: 'No hay datos de complicaciones crónicas', margin: [0, 0, 0, 20] },
                    trasplanteProgenitores ? generarSeccionTrasplantesProgenitores({ data: trasplanteProgenitores }) : { text: 'No hay datos de trasplantes de progenitores', margin: [0, 0, 0, 20] },
                    laboratorios.data.length > 0 ? generarSeccionLaboratorios(laboratorios) : { text: 'No hay datos de laboratorios', margin: [0, 0, 0, 20] },
                    imagenesDiagnosticas.data.length > 0 ? generarSeccionImagenesDiagnosticas(imagenesDiagnosticas) : { text: 'No hay datos de imágenes diagnósticas', margin: [0, 0, 0, 20] },
                    soportesTransfusionales.data.length > 0 ? generarSeccionSoportesTransfusionales(soportesTransfusionales) : { text: 'No hay datos de soportes transfusionales', margin: [0, 0, 0, 20] },
                    vacunas.data.length > 0 ? generarSeccionVacunas(vacunas) : { text: 'No hay datos de vacunas', margin: [0, 0, 0, 20] },
                    resultadoTratamientos.data.length > 0 ? generarSeccionTratamientos(resultadoTratamientos) : { text: 'No hay datos de tratamientos', margin: [0, 0, 0, 20] },

                ],
                footer: (currentPage, pageCount) => ({
                    columns: [
                        {
                            text: `Página ${currentPage} de ${pageCount}`,
                            alignment: 'center',
                            margin: [0, 0, 0, 20]
                        }
                    ]
                })
            };

            const pdfDoc = pdfMake.createPdf(docDefinition);

            if (window) {
                pdfDoc.open({}, window);
            } else {
                pdfDoc.open();
            }
        } catch (error) {
            console.error('Error al generar PDF:', error);
            console.error('Detalles del error:', error.response ? error.response.data : error.message);
        }
    };

    return { generatePDF };
};

export default useGeneratePDF;