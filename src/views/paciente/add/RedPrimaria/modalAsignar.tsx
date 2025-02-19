import { useState } from 'react'
import { Dialog } from '@/components/ui'
import Button from '@/components/ui/Button'
import { usePatient } from '@/context/PatientContext'
import { actualizarRedPrimaraPaciente } from '@/customService/services/redPrimariaService'
import { useToken } from '@/store/authStore'

function ModalAsignar({ isOpen, onClose, onRequestClose, redPrimaria, setMensaje, setRefresh }) {
    const { paciente } = usePatient()
    const { token } = useToken()
    const [loading, setLoading] = useState(false)

    const handleConfirm = async () => {
        if (!paciente.id || !redPrimaria.id) {
            setMensaje({ status: 'error', message: 'Faltan datos para asignar la red primaria.' })
            return
        }

        try {
            setLoading(true)

            const formData = {
                idPaciente: paciente.id,
                idRedPrimaria: redPrimaria.id,
            }

            const response = await actualizarRedPrimaraPaciente(token, formData)

            // ✅ Mostrar mensaje de éxito
            setMensaje({ status: 'success', message: response.message || 'Red primaria asignada con éxito.' })

            // ✅ Refrescar la tabla de la red primaria asignada
            setRefresh((prev) => !prev) // Alternar el estado para que el `useEffect` en `RedPrimariaAsignada` detecte el cambio

            // ✅ Cerrar el modal después de asignar correctamente
            onClose()
        } catch (error) {
            setMensaje({
                status: 'error',
                message: error.response?.data?.message || 'Error al asignar la red primaria.',
            })
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        console.log('Asignación cancelada')
        onClose()
    }

    return (
        <Dialog isOpen={isOpen} onClose={onClose} onRequestClose={onRequestClose}>
            <div className="p-4 text-center">
                <h4 className="text-xl font-semibold mb-4 text-gray-800">
                    ¿Está seguro de asignar esta red primaria?
                </h4>
                <p className="text-gray-600 mb-6">
                    Asignar la red primaria{' '}
                    <strong className="text-blue-600">{redPrimaria?.hospital}</strong>
                    {' '}al paciente{' '}
                    <strong className="text-green-600">{paciente?.nombre} {paciente?.apellido}</strong>.
                </p>

                <div className="flex justify-center space-x-4">
                    <Button variant="plain" onClick={handleCancel} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button variant="solid" onClick={handleConfirm} loading={loading}>
                        Confirmar
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default ModalAsignar
