import { useState } from 'react'
import { Dialog } from '@/components/ui'
import Button from '@/components/ui/Button'
import { usePatient } from '@/context/PatientContext'
import { actualizarAcompañante } from '@/customService/services/acompañanteService'
import { useToken } from '@/store/authStore'

function ModalAsignar({
    isOpen,
    onClose,
    onRequestClose,
    acompañante,
    setMensaje,
    setRefresh
}) {
    const { paciente } = usePatient()
    const { token } = useToken()
    const [loading, setLoading] = useState(false)

    const handleConfirm = async () => {
        if (!paciente.id || !acompañante.id) {
            setMensaje({ status: 'error', message: 'Faltan datos para asignar el acompañante.' })
            return
        }
    
        try {
            setLoading(true)
    
            const formData = {
                idPaciente: paciente.id,
                idAcompanante: acompañante.id,
            }
    
            const response = await actualizarAcompañante(token, formData)
    
            setMensaje({ status: 'success', message: response.message || 'Acompañante asignado con éxito.' })
            setRefresh((prev) => !prev) // Cambia el estado para refrescar la tabla
            onClose() // Cierra el modal
        } catch (error) {
            setMensaje({
                status: 'error',
                message: error.response?.data?.message || 'Error al asignar el acompañante.',
            })
        } finally {
            setLoading(false)
        }
    }
    

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="p-4 text-center">
                <h4 className="text-xl font-semibold mb-4 text-gray-800">
                    ¿Está seguro de asignar este acompañante?
                </h4>
                <p className="text-gray-600 mb-6">
                    Asignar a <strong>{acompañante?.nombre}</strong> al paciente{' '}
                    <strong>{paciente?.nombre}</strong>.
                </p>
                <Button
                    variant="solid"
                    onClick={handleConfirm}
                    loading={loading}
                >
                    {' '}
                    Confirmar{' '}
                </Button>
            </div>
        </Dialog>
    )
}

export default ModalAsignar
