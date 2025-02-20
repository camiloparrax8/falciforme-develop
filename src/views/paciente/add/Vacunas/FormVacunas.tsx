import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import validationVacunas from '../../../../validation/validationVacunas'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputDatePickerForm from '@/views/common/form/InputDate'
import InputForm from '@/views/common/form/InputForm'
import {
    inputVacunas,
    crearEsquemaVacunas,
} from '@/customService/services/vacunasService' // ✅ Importar el servicio
import { useToken, useSessionUser } from '@/store/authStore'
import InputSelect from '@/views/common/form/InputSelect'
import { usePatient } from '@/context/PatientContext'
import { Alert } from '@/components/ui'
import TablaVacunas from './TablaVacunas'

function FormVacunas() {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            tipo_vacuna: [],
            dosis: '',
            fecha: '',
        },
    })
    const { paciente } = usePatient()
    const { user } = useSessionUser()

    const { token } = useToken()
    const [vacunasOptions, setVacunasOptions] = useState([])
    const [mensaje, setMensaje] = useState(null)
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    //  Obtener las vacunas desde la API
    useEffect(() => {
        const fetchVacunas = async () => {
            const data = await inputVacunas(token) // Llamamos al servicio
            setVacunasOptions(data.data) // Guardamos las vacunas en el estado
        }

        fetchVacunas()
    }, [token]) // Solo se ejecuta cuando el token cambia

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            setMensaje(null)

            const response = await crearEsquemaVacunas(token, user.id, {
                id_paciente: paciente.id,
                id_vacunacion: data.tipo_vacuna,
                estado: 'completado',
                fecha_vacunacion: data.fecha,
                dosis: data.dosis,
                id_user_create: user.id,
            })

            if (response.status === 'success') {
                setMensaje({
                    status: 'success',
                    message: 'Vacuna registrada correctamente.',
                })

                // ✅ Limpiar el formulario después de guardar
                reset({
                    tipo_vacuna: [],
                    dosis: '',
                    fecha: null,
                })

                // ✅ Forzar la actualización de la tabla
                setRefresh((prev) => !prev)
            } else {
                setMensaje({ status: 'error', message: response.message })
            }
        } catch (error) {
            setMensaje({
                status: 'error',
                message: 'Error al registrar la vacuna.',
            })
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full">
            {mensaje && (
                <Alert
                    title={mensaje.status === 'error' ? 'Atención' : 'Correcto'}
                    showIcon
                    type={mensaje.status === 'error' ? 'danger' : 'success'}
                    closable
                    duration={5000}
                    onClose={() => setMensaje(null)}
                >
                    {mensaje.message}
                </Alert>
            )}
            <form
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <SectionTitle
                    text="Datos de ingreso"
                    className="col-span-3 mb-4"
                />

                <InputSelect
                    control={control}
                    name="tipo_vacuna"
                    options={vacunasOptions}
                    placeholder="Seleccione el tipo de vacuna"
                    errors={errors}
                    validation={{
                        required: validationVacunas.tipoVacuna.required,
                        validate: validationVacunas.tipoVacuna.validate,
                    }}
                    label="Tipo de Vacuna"
                    className="col-span-2"
                />

                <InputForm
                    control={control}
                    name="dosis"
                    rules={validationVacunas.dosis}
                    errors={errors}
                    label="Dosis"
                    inputPlaceholder="Número de dosis"
                    className="col-span-1"
                    value={''}
                />

                <InputDatePickerForm
                    control={control}
                    name="fecha"
                    rules={validationVacunas.fechaVacuna}
                    errors={errors}
                    label="Fecha"
                    placeholder="Fecha de la vacuna"
                    className="col-span-1"
                />

                <div className="col-span-3 flex justify-end mt-6">
                    <Button type="submit">Guardar</Button>
                </div>
            </form>
            <TablaVacunas refresh={refresh} />
        </div>
    )
}

export default FormVacunas
