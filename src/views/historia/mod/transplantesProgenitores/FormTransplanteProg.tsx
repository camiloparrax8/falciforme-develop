import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useToken, useSessionUser } from '@/store/authStore'
import { useParams } from 'react-router-dom'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputForm from '@/views/common/form/InputForm'
import InputSelect from '@/views/common/form/InputSelect'
import Button from '@/components/ui/Button'
import validationTransplanteProgenitores from '@/validation/validationTransplanteProg'
import {
    crearTransplanteProgenitores,
    consultarTransplantesProgenitoresPorPaciente,
} from '@/customService/services/transplantesProgenitoresService'
import { Table } from '@/components/ui'
import Tr from '@/components/ui/Table/Tr'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import Th from '@/components/ui/Table/Th'
import THead from '@/components/ui/Table/THead'

export default function FormTransplanteProg() {
    const { token } = useToken()
    const { user } = useSessionUser()
    const { id_paciente } = useParams()
    const [loading, setLoading] = useState(false)
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' })
    const [trasplanteExistente, setTrasplanteExistente] = useState(null)
    const [cargando, setCargando] = useState(true)

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

    // Verificar si el paciente ya tiene un trasplante al cargar el componente
    useEffect(() => {
        const verificarTrasplanteExistente = async () => {
            if (!id_paciente) {
                console.log('No hay ID de paciente disponible')
                setCargando(false)
                return
            }

            try {
                setCargando(true)
                const resultado =
                    await consultarTransplantesProgenitoresPorPaciente(
                        token,
                        id_paciente,
                    )

                if (
                    resultado &&
                    resultado.status === 'success' &&
                    resultado.data
                ) {
                    // Determinar si los datos son un array o un objeto
                    const datosTransplante = Array.isArray(resultado.data)
                        ? resultado.data[0] // Tomar el primer elemento si es un array
                        : resultado.data // Usar directamente si es un objeto

                    setTrasplanteExistente(datosTransplante)

                    // Actualizar el formulario con los datos existentes
                    reset({
                        paciente: datosTransplante.paciente || '',
                        padres: datosTransplante.padres || '',
                        hermanos: datosTransplante.hermanos || '',
                        tipo: datosTransplante.tipo_indicaciones || '',
                    })
                } else {
                    console.log(
                        'No se encontraron trasplantes para este paciente',
                    )
                }
            } catch (error) {
                console.error('Error al verificar trasplante existente:', error)
                setMensaje({
                    tipo: 'error',
                    texto: 'Error al verificar si existe un trasplante previo',
                })
            } finally {
                setCargando(false)
            }
        }

        verificarTrasplanteExistente()
    }, [id_paciente, token, reset])

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            setMensaje({ tipo: '', texto: '' })

            // Si ya existe un trasplante, mostrar mensaje y no continuar
            if (trasplanteExistente) {
                setMensaje({
                    tipo: 'error',
                    texto: 'Ya existe un trasplante de progenitores para este paciente',
                })
                setLoading(false)
                return
            }

            const formDataComplete = {
                ...data,
                id_paciente,
                id_user_create: user.id,
            }

            const response = await crearTransplanteProgenitores(
                token,
                formDataComplete,
            )

            if (response.status === 'success') {
                setMensaje({
                    tipo: 'exito',
                    texto: 'Transplante de progenitores guardado correctamente',
                })

                // Actualizar el estado para reflejar que ahora existe un trasplante
                if (response.data) {
                    setTrasplanteExistente(response.data)
                }

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

    // Determinar si los campos deben estar deshabilitados
    const isDisabled = trasplanteExistente !== null

    if (cargando) {
        return (
            <div className="p-4 text-center">
                Cargando información de trasplante...
            </div>
        )
    }

    return (
        <div>
            {trasplanteExistente && (
                <div className="mb-6 p-3 rounded-md bg-blue-100 text-blue-800">
                    Ya existe un registro de trasplante de progenitores para
                    este paciente. Se muestran los datos actuales.
                </div>
            )}

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
                    text="Trasplante de progenitores"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />

                <div
                    className={`col-span-1 md:col-span-2 lg:col-span-2 ${isDisabled ? 'opacity-70' : ''}`}
                >
                    <SectionTitle
                        text="Estudios HLA"
                        className="col-span-1 md:col-span-2 lg:col-span-4"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        <InputSelect
                            control={control}
                            name="paciente"
                            validation={
                                validationTransplanteProgenitores.paciente
                            }
                            errors={errors}
                            label="Paciente"
                            options={options}
                            placeholder="Seleccione"
                            className="col-span-1"
                            disabled={isDisabled}
                        />
                        <InputSelect
                            control={control}
                            name="padres"
                            label="Padres"
                            validation={
                                validationTransplanteProgenitores.padres
                            }
                            errors={errors}
                            options={options}
                            placeholder="Seleccione"
                            className="col-span-1"
                            disabled={isDisabled}
                        />
                        <InputSelect
                            control={control}
                            name="hermanos"
                            label="Hermanos"
                            validation={
                                validationTransplanteProgenitores.hermanos
                            }
                            errors={errors}
                            options={options}
                            placeholder="Seleccione"
                            className="col-span-1"
                            disabled={isDisabled}
                        />
                    </div>
                </div>

                <div
                    className={`col-span-1 md:col-span-2 lg:col-span-2 ${isDisabled ? 'opacity-70' : ''}`}
                >
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
                        rules={
                            validationTransplanteProgenitores.tipo_indicaciones
                        }
                        value=""
                        disabled={isDisabled}
                    />
                </div>
                {/* Botón */}
                <div className="col-span-4 flex justify-end mt-6">
                    <Button type="submit" disabled={loading || isDisabled}>
                        {loading
                            ? 'Guardando...'
                            : isDisabled
                              ? 'Datos existentes'
                              : 'Guardar'}
                    </Button>
                </div>
            </form>

            {/* Tabla con datos existentes */}
            {trasplanteExistente && (
                <div className="mt-8">
                    <SectionTitle
                        text="Estado de los estudios HLA"
                        className="mb-4"
                    />
                    <div>
                        <Table>
                            <THead>
                                <Tr>
                                    <Th>Paciente (HLA)</Th>
                                    <Th>Padres (HLA)</Th>
                                    <Th>Hermanos (HLA)</Th>
                                    <Th>Tipo de Indicación</Th>
                                </Tr>
                            </THead>
                            <TBody>
                                <Tr>
                                    <Td>
                                        {trasplanteExistente?.paciente || 'N/A'}
                                    </Td>
                                    <Td>
                                        {trasplanteExistente?.padres || 'N/A'}
                                    </Td>
                                    <Td>
                                        {trasplanteExistente?.hermanos || 'N/A'}
                                    </Td>
                                    <Td>
                                        {trasplanteExistente?.tipo_indicaciones ||
                                            'N/A'}
                                    </Td>
                                </Tr>
                            </TBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    )
}
