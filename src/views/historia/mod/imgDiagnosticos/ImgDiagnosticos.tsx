import { useParams } from 'react-router-dom'
import FormImgDiagnosticos from './FormImgDiagnosticos'
import SectionTitle from '@/views/common/form/SectionTitle'
import TableCustom from '@/views/common/TableCustom'
import Alert from '@/components/ui/Alert'
import { useImagenesDiagnosticas } from '@/hooks/useImagenesDiagnosticas'

/**
 * Componente principal para la gestión de imágenes diagnósticas.
 * Maneja la visualización, creación y eliminación de registros de imágenes diagnósticas.
 */
function ImgDiagnosticos() {
    const { id_paciente } = useParams()
    const {
        loading,
        imagenes,
        mensaje,
        mostrarMensaje,
        headers,
        handleFormSubmit,
        handleEliminarImagen,
        handleCloseAlert
    } = useImagenesDiagnosticas({ id_paciente })

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {mensaje && mostrarMensaje && (
                <div className="mb-4">
                    <Alert
                        showIcon
                        closable
                        title={mensaje.tipo === 'success' ? 'Correcto' : 'Atención'}
                        type={mensaje.tipo === 'success' ? 'success' : 'danger'}
                        duration={5000}
                        onClose={handleCloseAlert}
                    >
                        {mensaje.texto}
                    </Alert>
                </div>
            )}

            {/* Formulario */}
            <FormImgDiagnosticos
                loading={loading}
                onSubmit={handleFormSubmit}
            />

            {/* Tabla */}
            <section className="mt-6">
                <SectionTitle
                    text="Imágenes Cargadas"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />

                {loading ? (
                    <div className="p-4 text-center">
                        Cargando imágenes diagnósticas...
                    </div>
                ) : imagenes.length > 0 ? (
                    <TableCustom
                        className={'mt-4'}
                        data={imagenes}
                        header={headers}
                        showDeleteOption={true}
                        onDelete={handleEliminarImagen}
                    />
                ) : (
                    <div className="p-4 text-center text-gray-500">
                        No hay imágenes diagnósticas registradas
                    </div>
                )}
            </section>
        </div>
    )
}

export default ImgDiagnosticos
