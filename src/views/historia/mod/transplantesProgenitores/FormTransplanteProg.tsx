import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useToken, useSessionUser } from '@/store/authStore'
import { useParams } from 'react-router-dom'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputForm from '@/views/common/form/InputForm'
import InputSelect from '@/views/common/form/InputSelect'
import Button from '@/components/ui/Button'
import validationTransplanteProgenitores from '../../.././../validation/validationTransplanteProg'
import { crearTransplanteProgenitores } from '@/customService/services/transplantesProgenitoresService'

export default function FormTransplanteProg() {
    const { token } = useToken()
    const { user } = useSessionUser()
    const { id_paciente } = useParams()
    const [loading, setLoading] = useState(false)
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' })

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            paciente: '',
            padres: '',
            hermanos: '',
            tipo: '',
        },
    })

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            setMensaje({ tipo: '', texto: '' })

            const formDataComplete = {
                ...data,
                id_paciente,
                id_user_create: user.id,
            }

            console.log('Datos del transplante:', formDataComplete)

            const response = await crearTransplanteProgenitores(
                token,
                formDataComplete,
            )

            if (response.status === 'success') {
                setMensaje({
                    tipo: 'exito',
                    texto: 'Transplante de progenitores guardado correctamente',
                })
                reset()
            } else {
                setMensaje({
                    tipo: 'error',
                    texto: response.message || 'Error al guardar los datos',
                })
            }
        } catch (error) {
            console.error('Error:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al guardar los datos del transplante',
            })
        } finally {
            setLoading(false)
        }
    }

    const options = [
        { value: 'Realizado', label: 'Realizado' },
        { value: 'No Realizado', label: 'No realizado' },
    ]

    return (
        <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Mensaje de estado */}
            {mensaje.texto && (
                <div
                    className={`col-span-1 md:col-span-2 lg:col-span-4 p-3 rounded-md ${
                        mensaje.tipo === 'exito'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                >
                    {mensaje.texto}
                </div>
            )}

            {/* Sección Transplane de progenitores */}
            <SectionTitle
                text="Transplante de progenitores"
                className="col-span-1 md:col-span-2 lg:col-span-4"
            />

            <div className="col-span-1 md:col-span-2 lg:col-span-2">
                <SectionTitle
                    text="Estudios HLA"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <InputSelect
                        control={control}
                        name="paciente"
                        validation={validationTransplanteProgenitores.paciente}
                        errors={errors}
                        label="Paciente"
                        options={options}
                        placeholder="Seleccione"
                        className="col-span-1"
                    />
                    <InputSelect
                        control={control}
                        name="padres"
                        label="Padres"
                        validation={validationTransplanteProgenitores.padres}
                        errors={errors}
                        options={options}
                        placeholder="Seleccione"
                        className="col-span-1"
                    />
                    <InputSelect
                        control={control}
                        name="hermanos"
                        label="Hermanos"
                        validation={validationTransplanteProgenitores.hermanos}
                        errors={errors}
                        options={options}
                        placeholder="Seleccione"
                        className="col-span-1"
                    />
                </div>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-2">
                <SectionTitle
                    text="Indicaciones para transplante"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />
                <InputForm
                    control={control}
                    name="tipo"
                    label="Tipo"
                    inputPlaceholder="Escriba el tipo"
                    className="col-span-1"
                    errors={errors}
                    rules={validationTransplanteProgenitores.tipo_indicaciones}
                    value=""
                />
            </div>
            {/* Botón */}
            <div className="col-span-4 flex justify-end mt-6">
                <Button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>
        </form>
    )
}
