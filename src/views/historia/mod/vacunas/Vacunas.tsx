import { useParams } from 'react-router-dom'
import FormVacunas from './FormVacunas'
import SectionTitle from '@/views/common/form/SectionTitle'
import TableCustom from '@/views/common/TableCustom'
import Alert from '@/components/ui/Alert'
import { useVacunas_hc } from '@/hooks/useVacunas_hc'
import Spinner from '@/components/ui/Spinner'

/**
 * Componente principal para la gestión de vacunas.
 * Maneja la visualización, creación y eliminación de registros de vacunas.
 */
function Vacunas() {
    const { id_paciente } = useParams()
    const {
        loading,
        vacunas,
        mensaje,
        mostrarMensaje,
        headers,
        handleFormSubmit,
        handleEliminarVacuna,
        handleCloseAlert
    } = useVacunas_hc({ id_paciente })

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
            <FormVacunas
                loading={loading}
                onSubmit={handleFormSubmit}
            />

            {/* Tabla */}
            <section className="mt-6">
                <SectionTitle
                    text="Vacunas Registradas"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />

                {loading ? (
                    <div className="p-4 text-center">
                        <Spinner />
                    </div>
                ) : vacunas.length > 0 ? (
                    <TableCustom
                        className={'mt-4'}
                        data={vacunas}
                        header={headers}
                        showDeleteOption={true}
                        onDelete={handleEliminarVacuna}
                    />
                ) : (
                    <div className="p-4 text-center text-gray-500">
                        No hay vacunas registradas
                    </div>
                )}
            </section>
        </div>
    )
}

export default Vacunas
