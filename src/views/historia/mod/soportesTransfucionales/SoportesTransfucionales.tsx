import { useParams } from 'react-router-dom'
import { Card } from '@/components/ui'
import FormTrasnfucionales from '@/views/historia/mod/soportesTransfucionales/FormTrasnfucionales'
import SectionTitle from '@/views/common/form/SectionTitle'
import TableCustom from '@/views/common/TableCustom'
import Alert from '@/components/ui/Alert'
import { useSoportesTransfusionales } from '@/hooks/useSoportesTransfusionales'
import Spinner from '@/components/ui/Spinner'
/**
 * Componente principal para la gestión de soportes transfusionales.
 * Maneja la visualización, creación y eliminación de registros de soportes transfusionales.
 */
function SoportesTransfucionales() {
    const { id_paciente } = useParams()
    const {
        loading,
        soportes,
        mensaje,
        mostrarMensaje,
        headers,
        handleFormSubmit,
        handleEliminarSoporte,
        handleCloseAlert,
    } = useSoportesTransfusionales({ id_paciente })

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {mensaje && mostrarMensaje && (
                <div className="mb-4">
                    <Alert
                        showIcon
                        closable
                        title={
                            mensaje.tipo === 'success' ? 'Correcto' : 'Atención'
                        }
                        type={mensaje.tipo === 'success' ? 'success' : 'danger'}
                        duration={5000}
                        onClose={handleCloseAlert}
                    >
                        {mensaje.texto}
                    </Alert>
                </div>
            )}

            {/* Formulario */}
            <Card>
                <FormTrasnfucionales
                    loading={loading}
                    onSubmit={handleFormSubmit}
                />
            </Card>

            {/* Tabla */}
            <section className="mt-6">
                <SectionTitle
                    text="Soportes Transfusionales Registrados"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />

                {loading ? (
                    <div className="p-4 text-center">
                        <Spinner size={40} />
                    </div>
                ) : soportes.length > 0 ? (
                    <TableCustom
                        className={'mt-4'}
                        data={soportes}
                        header={headers}
                        showDeleteOption={true}
                        onDelete={handleEliminarSoporte}
                    />
                ) : (
                    <div className="p-4 text-center text-gray-500">
                        No hay soportes transfusionales registrados
                    </div>
                )}
            </section>
        </div>
    )
}

export default SoportesTransfucionales
