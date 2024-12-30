import { useState } from 'react';
import FormImgDiagnosticos from './FormImgDiagnosticos';
import SectionTitle from '@/views/common/form/SectionTitle';
import TableCustom from '../../../common/TableCustom';

function ImgDiagnosticos() {
    const [imagenes, setImagenes] = useState([
        {
            id: 1,
            imagenDiagnostica: 'Radiografía, Ecografía',
            fecha: '2024-12-01',
            tipoResultado: 'Normal',
            resultado: 'Sin anomalías detectadas',
        },
        {
            id: 2,
            imagenDiagnostica: 'Tomografía',
            fecha: '2024-11-15',
            tipoResultado: 'Anormal',
            resultado: 'Lesión en el lóbulo derecho',
        },
    ]);

    const handleFormSubmit = (data) => {
        const nuevaImagen = {
            id: imagenes.length + 1,
            imagenDiagnostica: data.imagenDiagnostica.join(', '),
            fecha: data.fecha,
            tipoResultado: data.tipoResultado.join(', '),
            resultado: data.resultado,
        };
        setImagenes([...imagenes, nuevaImagen]);
    };

    const headers = ['imagenDiagnostica', 'fecha', 'tipoResultado', 'resultado'];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Formulario */}
            <FormImgDiagnosticos onSubmit={handleFormSubmit} />

            {/* Tabla */}
            <section className="mt-6">
                <SectionTitle
                    text="Imágenes Cargadas"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <TableCustom data={imagenes} header={headers} />
            </section>
        </div>
    );
}

export default ImgDiagnosticos;



