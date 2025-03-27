import { useState } from 'react'
import Button from '@/components/ui/Button'
import InputDatePickerForm from '@/views/common/form/InputDate'
import InputForm from '@/views/common/form/InputForm'
import SectionTitle from '@/views/common/form/SectionTitle'
import { useForm } from 'react-hook-form'
import { defaultValuesModal } from './defaultValues'
import SelectMultiple from '@/views/common/form/SelectMultiple'
import { TipoOptions, MotivoOptions } from './dataSelect'
import validationIngresoComplicacionAguda from '../../.././../validation/validationComplicacionesAgudas'
import InputSelect from '@/views/common/form/InputSelect'
import { useToken } from '@/store/authStore'
import { crearIngresoComplicacionAguda } from '@/customService/services/ingresosComplicacionesAgudasService'

function FormModalIngresos({ eventoForm, idComplicacion }) {
    const { token } = useToken()
    const [loading, setLoading] = useState(false)
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' })

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: defaultValuesModal,
    })

    const onSubmit = async (data) => {
        if (!idComplicacion) {
            setMensaje({
                tipo: 'error',
                texto: 'No se encontró el ID de la complicación aguda',
            })
            return
        }

        try {
            setLoading(true)
            setMensaje({ tipo: '', texto: '' })

            // Formatea la fecha antes de enviarla
            let fechaFormateada = data.ingresoFecha
            if (data.ingresoFecha) {
                const fecha = new Date(data.ingresoFecha)
                // Formatear como YYYY-MM-DD (formato que espera el backend)
                fechaFormateada = fecha.toISOString().split('T')[0]

                // Verificar que la fecha no sea futura
                const hoy = new Date()
                if (fecha > hoy) {
                    setMensaje({
                        tipo: 'error',
                        texto: 'La fecha no puede ser futura',
                    })
                    setLoading(false)
                    return
                }
            }

            // Prepara los datos para enviar al backend
            const formDataComplete = {
                id_complicacion_aguda: idComplicacion,
                tipo_ingreso: data.ingresoTipo,
                fecha_ingreso: fechaFormateada,
                duracion_ingreso: data.ingresoDuracion,
                motivo_ingreso: data.ingresoMotivo,
            }

            const response = await crearIngresoComplicacionAguda(
                token,
                formDataComplete,
            )

            if (response.status === 'success') {
                setMensaje({
                    tipo: 'exito',
                    texto: 'Ingreso guardado correctamente',
                })
                reset(defaultValuesModal) // Resetear el formulario
                // Cerrar modal y actualizar lista
                setTimeout(() => {
                    eventoForm({
                        ...formDataComplete,
                        success: true,
                    })
                }, 1500)
            } else {
                setMensaje({
                    tipo: 'error',
                    texto:
                        response.message ||
                        'Error al guardar los datos del ingreso',
                })
            }
        } catch (error) {
            console.error('Error:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al guardar los datos del ingreso',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Mensaje de estado */}
            {mensaje.texto && (
                <div
                    className={`mb-4 p-3 rounded-md ${
                        mensaje.tipo === 'exito'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                >
                    {mensaje.texto}
                </div>
            )}

            <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <SectionTitle
                    text="Ingresos del Paciente"
                    className="col-span-1 md:col-span-6"
                />

                <InputSelect
                    control={control}
                    name="ingresoTipo"
                    label="Tipo"
                    options={TipoOptions}
                    validation={validationIngresoComplicacionAguda.tipo_ingreso}
                    placeholder="UCI, Hospitalizado"
                    className="col-span-3"
                    errors={errors}
                />
                <InputDatePickerForm
                    control={control}
                    name="ingresoFecha"
                    label="Fecha"
                    rules={validationIngresoComplicacionAguda.fecha_ingreso}
                    placeholder="Seleccione la fecha"
                    errors={errors}
                    className="col-span-2"
                />
                <InputForm
                    control={control}
                    name="ingresoDuracion"
                    label="Duracion"
                    rules={validationIngresoComplicacionAguda.duracion_ingreso}
                    inputPlaceholder="Ingrese los días"
                    errors={errors}
                    className="col-span-3"
                    value=""
                />

                <SelectMultiple
                    control={control}
                    name="ingresoMotivo"
                    label="Motivo de ingreso"
                    options={MotivoOptions}
                    isCreatable={true}
                    validation={
                        validationIngresoComplicacionAguda.motivo_ingreso
                    }
                    placeholder="Motivo de ingreso"
                    errors={errors}
                    className="col-span-2"
                    defaultValue={[]}
                />
                <div className="col-span-1 md:col-span-6">
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Guardando...' : 'Guardar'}
                    </Button>
                </div>
            </form>
        </>
    )
}

export default FormModalIngresos
