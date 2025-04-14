import pdfMake from 'pdfmake/build/pdfmake';
import { useToken } from '@/store/authStore';
import { generarSeccionExamenesFisicos, obtenerDatosExamenFisico } from '@/utils/sections/examenesFisicosSection';
import { generarSeccionComplicacionesAgudas, obtenerDatosComplicacionesAgudas } from '@/utils/sections/complicacionesAgudasSection';
import { generarSeccionComplicacionesCronicas, obtenerDatosComplicacionesCronicas } from '@/utils/sections/complicacionesCronicasSection';
import { generarSeccionTrasplantesProgenitores, obtenerDatosTrasplantesProgenitores } from '@/utils/sections/trasplantesProgenitoresSection';
import { generarSeccionLaboratorios, obtenerDatosLaboratorios } from '@/utils/sections/laboratoriosSection';
import { generarSeccionImagenesDiagnosticas, obtenerDatosImagenesDiagnosticas } from '@/utils/sections/imagenesDiagnosticasSection';
import { generarSeccionSoportesTransfusionales, obtenerDatosSoportesTransfusionales } from '@/utils/sections/soportesTransfusionalesSection';
import { generarSeccionVacunas, obtenerDatosVacunas } from '@/utils/sections/vacunasSection';
import { generarSeccionTratamientos, obtenerDatosTratamientos } from '@/utils/sections/tratamientosSection';


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
            if (!data?.paciente?.id) {
                throw new Error('ID de paciente no proporcionado');
            }

            // Obtener datos de forma dinámica
            const complicacionesCronicas = await obtenerDatosComplicacionesCronicas(token, data.paciente.id);
            const examenesFisicos = await obtenerDatosExamenFisico(token, data.paciente.id);
            const trasplanteProgenitores = await obtenerDatosTrasplantesProgenitores(token, data.paciente.id);
            const datosComplicacionesAgudas = await obtenerDatosComplicacionesAgudas(token, data.paciente.id);
            const laboratorios = await obtenerDatosLaboratorios(token, data.paciente.id);
            const imagenesDiagnosticas = await obtenerDatosImagenesDiagnosticas(token, data.paciente.id);
            const soportesTransfusionales = await obtenerDatosSoportesTransfusionales(token, data.paciente.id);
            const resultadoTratamientos = await obtenerDatosTratamientos(token, data.paciente.id);
            const vacunas = await obtenerDatosVacunas(token, data.paciente.id);
            
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
                                return (rowIndex === 0) ? '#00BCD4' : null;
                            }
                        },
                        margin: [0, 0, 0, 20]
                    },

                    generarSeccionExamenesFisicos(examenesFisicos),
                    generarSeccionComplicacionesAgudas(datosComplicacionesAgudas?.complicacionesAgudas, datosComplicacionesAgudas?.ingresos),
                    generarSeccionComplicacionesCronicas(complicacionesCronicas),
                    generarSeccionTrasplantesProgenitores(trasplanteProgenitores),
                    generarSeccionLaboratorios(laboratorios),
                    generarSeccionImagenesDiagnosticas(imagenesDiagnosticas),
                    generarSeccionSoportesTransfusionales(soportesTransfusionales),
                    generarSeccionVacunas(vacunas),
                    ...generarSeccionTratamientos(resultadoTratamientos),
                    
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