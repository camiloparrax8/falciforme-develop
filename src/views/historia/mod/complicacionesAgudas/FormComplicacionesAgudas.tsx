import { useForm } from 'react-hook-form'
import { useState, useEffect, useCallback } from 'react'
import { useToken, useSessionUser } from '@/store/authStore'
import { useParams } from 'react-router-dom'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputForm from '@/views/common/form/InputForm'
import Button from '@/components/ui/Button'
import InputDatePickerForm from '@/views/common/form/InputDate'
import SelectMultiple from '@/views/common/form/SelectMultiple'
import { BiAddToQueue } from 'react-icons/bi'
import Dialog from '@/components/ui/Dialog'
import FormModalIngresos from './FormModalIngresos'
import { defaultValues } from './defaultValues'
import validationComplicacionesAgudas from '@/validation/validationComplicacionesAgudas'
import {
    manejoOptions,
    aplasticaOptions,
    tratamientoOptions,
    huesoafectadosOptions,
    tratamienoInfeccionOptions,
    intensidadOptions,
} from './dataSelect'
import InputSelect from '@/views/common/form/InputSelect'
import {
    crearComplicacionAguda,
    obtenerComplicacionAgudaPorPaciente,
} from '@/customService/services/complicacionAgudaService'
import { obtenerIngresosPorComplicacion } from '@/customService/services/ingresosComplicacionesAgudasService'
import { Table } from '@/components/ui'
import Tr from '@/components/ui/Table/Tr'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import Th from '@/components/ui/Table/Th'
import THead from '@/components/ui/Table/THead'
import Alert from '@/components/ui/Alert'

function FormComplicacionesAgudas() {
    const { token } = useToken()
    const { user } = useSessionUser()
    const { id_paciente } = useParams()
    const [loading, setLoading] = useState(false)
    const [mensaje, setMensaje] = useState<{
        tipo: 'success' | 'error'
        texto: string
    } | null>(null)
    const [complicacionExistente, setComplicacionExistente] = useState(null)
    const [ingresos, setIngresos] = useState([])
    const [cargandoIngresos, setCargandoIngresos] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [dialogIsOpenHC, setIsOpenAgudas] = useState(false)
    const [formularioDeshabilitado, setFormularioDeshabilitado] =
        useState(false)
    const [mostrarMensaje, setMostrarMensaje] = useState(true)
    const [mostrarMensajeInfo, setMostrarMensajeInfo] = useState(true)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: defaultValues,
    })

    const cargarIngresos = useCallback(
        async (idComplicacion) => {
            if (!idComplicacion) return

            try {
                setCargandoIngresos(true)
                const resultado = await obtenerIngresosPorComplicacion(
                    token,
                    idComplicacion,
                )

                if (resultado.status === 'success' && resultado.data) {
                    setIngresos(
                        Array.isArray(resultado.data)
                            ? resultado.data
                            : [resultado.data],
                    )
                } else {
                    setIngresos([])
                }
            } catch (error) {
                console.error('Error al cargar ingresos:', error)
                setIngresos([])
            } finally {
                setCargandoIngresos(false)
            }
        },
        [token],
    )

    useEffect(() => {
        const verificarComplicacionExistente = async () => {
            if (!id_paciente) {
                console.log('No hay ID de paciente disponible')
                setCargando(false)
                return
            }

            try {
                setCargando(true)
                const resultado = await obtenerComplicacionAgudaPorPaciente(
                    token,
                    id_paciente,
                )

                if (
                    resultado &&
                    resultado.status === 'success' &&
                    resultado.data &&
                    (resultado.data.id ||
                        (Array.isArray(resultado.data) &&
                            resultado.data.length > 0 &&
                            resultado.data[0].id))
                ) {
                    const datosComplicacion = Array.isArray(resultado.data)
                        ? resultado.data[0]
                        : resultado.data

                    if (
                        datosComplicacion &&
                        Object.keys(datosComplicacion).length > 0
                    ) {
                        setComplicacionExistente(datosComplicacion)
                        setFormularioDeshabilitado(true)

                        await cargarIngresos(datosComplicacion.id)
                    } else {
                        console.log('Datos de complicación vacíos o inválidos')
                        setFormularioDeshabilitado(false)
                    }
                } else {
                    console.log(
                        'No se encontraron complicaciones agudas para este paciente',
                    )
                    setComplicacionExistente(null)
                    setFormularioDeshabilitado(false)
                }
            } catch (error) {
                console.error(
                    'Error al verificar complicación existente:',
                    error,
                )
                setMensaje({
                    tipo: 'error',
                    texto: 'Error al verificar si existe una complicación aguda previa',
                })
                setFormularioDeshabilitado(false)
            } finally {
                setCargando(false)
            }
        }

        verificarComplicacionExistente()
    }, [id_paciente, token, reset, cargarIngresos])

    const onSubmit = async (data) => {
        if (formularioDeshabilitado) {
            return
        }

        try {
            setLoading(true)
            setMensaje(null)
            setMostrarMensaje(true)

            let fechaFormateada = data.fecha
            if (data.fecha) {
                const fecha = new Date(data.fecha)
                fechaFormateada = fecha.toISOString().split('T')[0]

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

            const formDataComplete = {
                ...data,
                fecha: fechaFormateada,
                id_paciente,
                id_user_create: user.id,
            }

            const response = await crearComplicacionAguda(
                token,
                formDataComplete,
            )

            if (response.status === 'success') {
                setMensaje({
                    tipo: 'success',
                    texto: 'Complicación aguda guardada correctamente',
                })

                if (response.data) {
                    setComplicacionExistente(response.data)
                    setFormularioDeshabilitado(true)
                }
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                setMensaje({
                    tipo: 'error',
                    texto: response.message || 'Error al guardar los datos',
                })
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        } catch (error) {
            console.error('Error:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al guardar los datos de la complicación aguda',
            })
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } finally {
            setLoading(false)
        }
    }

    const openDialogIngresos = () => {
        if (!complicacionExistente || !complicacionExistente.id) {
            setMensaje({
                tipo: 'error',
                texto: 'Debe guardar la complicación aguda antes de agregar ingresos',
            })
            setMostrarMensaje(true)
            return
        }
        setIsOpenAgudas(true)
    }

    const onDialogCloseIngresos = () => {
        setIsOpenAgudas(false)
    }

    const onSubmitModal = async (dataModal) => {
        if (
            dataModal.success &&
            complicacionExistente &&
            complicacionExistente.id
        ) {
            await cargarIngresos(complicacionExistente.id)
        }

        setIsOpenAgudas(false)
    }

    const formatearFecha = (fechaStr) => {
        if (!fechaStr) return ''

        try {
            const fechaString = fechaStr.split('T')[0]
            const [year, month, day] = fechaString.split('-')
            return `${day}/${month}/${year}`
        } catch {
            return fechaStr
        }
    }

    const handleCloseAlert = () => {
        setMostrarMensaje(false)
        if (mensaje?.tipo === 'success') {
            // Cualquier acción adicional necesaria al cerrar una alerta de éxito
        }
    }

    const handleCloseAlertInfo = () => {
        setMostrarMensajeInfo(false)
    }

    if (cargando) {
        return (
            <div className="p-4 text-center">
                Cargando información de complicaciones agudas...
            </div>
        )
    }

    return (
        <>
            {mensaje && mensaje.texto && mostrarMensaje && (
                <div className="mb-4">
                    <Alert
                        showIcon
                        closable
                        title={
                            mensaje.tipo === 'success' ? 'Correcto' : 'Atención'
                        }
                        type={mensaje.tipo === 'success' ? 'success' : 'danger'}
                        duration={10000}
                        onClose={handleCloseAlert}
                    >
                        {mensaje.texto}
                    </Alert>
                </div>
            )}

            {complicacionExistente && mostrarMensajeInfo && (
                <div className="mb-4">
                    <Alert
                        showIcon
                        closable
                        title="Información"
                        type="info"
                        duration={10000}
                        onClose={handleCloseAlertInfo}
                    >
                        Este paciente ya tiene registrada una complicación
                        aguda. No es posible agregar otra complicación para esta
                        historia clinica.
                    </Alert>
                </div>
            )}

            {!formularioDeshabilitado && (
                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <SectionTitle
                        text="Crisis de Dolor"
                        className="col-span-1 md:col-span-6"
                    />
                    <InputDatePickerForm
                        control={control}
                        name="fecha"
                        label="Fecha"
                        rules={validationComplicacionesAgudas.fecha}
                        placeholder="Ingrese la fecha"
                        errors={errors}
                        className="col-span-1"
                    />
                    <InputForm
                        control={control}
                        name="dias_crisis"
                        label="Días"
                        rules={validationComplicacionesAgudas.dias_crisis}
                        inputPlaceholder="Ingrese los días"
                        errors={errors}
                        className="col-span-1"
                        value=""
                    />
                    <InputSelect
                        control={control}
                        name="intensidad"
                        validation={validationComplicacionesAgudas.intensidad}
                        label="Intensidad"
                        placeholder="Seleccione la intensidad"
                        options={intensidadOptions}
                        errors={errors}
                        className="col-span-4"
                    />
                    <InputSelect
                        control={control}
                        name="manejo"
                        validation={validationComplicacionesAgudas.manejo}
                        label="Manejo"
                        options={manejoOptions}
                        errors={errors}
                        placeholder="Manejo"
                        className="col-span-1"
                    />
                    <SelectMultiple
                        control={control}
                        isCreatable={true}
                        name="tratamiento"
                        label="Tratamiento"
                        options={tratamientoOptions}
                        validation={validationComplicacionesAgudas.tratamiento}
                        placeholder="Seleccione el tratamiento"
                        errors={errors}
                        className="col-span-1"
                        defaultValue={[]}
                    />
                    <SelectMultiple
                        control={control}
                        name="huesos_afectados"
                        label="Huesos Afectados"
                        options={huesoafectadosOptions}
                        validation={
                            validationComplicacionesAgudas.huesos_afectados
                        }
                        placeholder="Ingrese los huesos afectados"
                        errors={errors}
                        className="col-span-4"
                        defaultValue={[]}
                    />

                    <SectionTitle
                        text="Infecciones"
                        className="col-span-1 md:col-span-6"
                    />
                    <InputForm
                        control={control}
                        name="germen"
                        label="Germen"
                        rules={validationComplicacionesAgudas.germen}
                        inputPlaceholder="Ingrese el germen"
                        errors={errors}
                        className="col-span-1"
                        value=""
                    />
                    <SelectMultiple
                        control={control}
                        isCreatable={true}
                        name="tratamiento_infecciones"
                        label="Tratamiento"
                        options={tratamienoInfeccionOptions}
                        validation={
                            validationComplicacionesAgudas.tratamiento_infecciones
                        }
                        placeholder="Ingrese el tratamiento"
                        errors={errors}
                        className="col-span-1"
                        defaultValue={[]}
                    />
                    <InputForm
                        control={control}
                        name="dias_infeccion"
                        label="Días"
                        rules={validationComplicacionesAgudas.dias_infeccion}
                        inputPlaceholder="Ingrese los días"
                        errors={errors}
                        className="col-span-4"
                        value=""
                    />

                    <SectionTitle
                        text="Anemia Aguda"
                        className="col-span-1 md:col-span-6"
                    />
                    <InputSelect
                        control={control}
                        name="crisis_aplastica_infecciosa"
                        label="Crisis Aplástica Infecciosa"
                        options={aplasticaOptions}
                        validation={
                            validationComplicacionesAgudas.crisis_aplastica_infecciosa
                        }
                        errors={errors}
                        placeholder="Manejo"
                        className="col-span-1"
                    />

                    <div className="col-span-1 md:col-span-6 flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </div>
                </form>
            )}

            {complicacionExistente && (
                <div className="mt-8 mb-8 p-4 border border-gray-200 rounded-lg">
                    <SectionTitle
                        text="Complicación aguda registrada"
                        className="mb-4"
                    />
                    <div>
                        <Table>
                            <THead>
                                <Tr>
                                    <Th>Fecha</Th>
                                    <Th>Días</Th>
                                    <Th>Intensidad</Th>
                                    <Th>Manejo</Th>
                                    <Th>Tratamiento</Th>
                                    <Th>Huesos Afectados</Th>
                                    <Th>Germen</Th>
                                    <Th>Tratamiento Infecciones</Th>
                                    <Th>Días Infecciones</Th>
                                    <Th>Crisis Aplástica Infecciosa</Th>
                                </Tr>
                            </THead>
                            <TBody>
                                <Tr>
                                    <Td>
                                        {formatearFecha(
                                            complicacionExistente.fecha,
                                        )}
                                    </Td>
                                    <Td>{complicacionExistente.dias_crisis}</Td>
                                    <Td>{complicacionExistente.intensidad}</Td>
                                    <Td>{complicacionExistente.manejo}</Td>
                                    <Td>{complicacionExistente.tratamiento}</Td>
                                    <Td>
                                        {complicacionExistente.huesos_afectados}
                                    </Td>
                                    <Td>{complicacionExistente.germen}</Td>
                                    <Td>
                                        {
                                            complicacionExistente.tratamiento_infecciones
                                        }
                                    </Td>
                                    <Td>
                                        {complicacionExistente.dias_infeccion}
                                    </Td>
                                    <Td>
                                        {complicacionExistente.crisis_aplastica_infecciosa
                                            ? 'Si'
                                            : 'No'}
                                    </Td>
                                </Tr>
                            </TBody>
                        </Table>
                    </div>
                </div>
            )}

            {complicacionExistente && (
                <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                    <SectionTitle
                        text="Ingresos del paciente"
                        className="mb-4"
                    />
                    <Button
                        className="mb-4"
                        icon={<BiAddToQueue />}
                        variant="solid"
                        title="Añadir ingresos medicos"
                        disabled={!complicacionExistente}
                        onClick={openDialogIngresos}
                    >
                        Añadir ingresos
                    </Button>

                    {ingresos.length > 0 ? (
                        <div className="mt-4">
                            <Table>
                                <THead>
                                    <Tr>
                                        <Th>Tipo</Th>
                                        <Th>Fecha</Th>
                                        <Th>Duración (días)</Th>
                                        <Th>Motivo</Th>
                                    </Tr>
                                </THead>
                                <TBody>
                                    {ingresos.map((ingreso, index) => (
                                        <Tr key={ingreso.id || index}>
                                            <Td>{ingreso.tipo_ingreso}</Td>
                                            <Td>
                                                {formatearFecha(
                                                    ingreso.fecha_ingreso,
                                                )}
                                            </Td>
                                            <Td>{ingreso.duracion_ingreso}</Td>
                                            <Td>{ingreso.motivo_ingreso}</Td>
                                        </Tr>
                                    ))}
                                </TBody>
                            </Table>
                        </div>
                    ) : !cargandoIngresos ? (
                        <div className="mt-4 p-3 rounded-md bg-gray-100 text-gray-800">
                            No hay ingresos registrados para esta complicación
                            aguda.
                        </div>
                    ) : (
                        <div className="mt-4 p-3 rounded-md bg-gray-100 text-gray-600">
                            Cargando ingresos...
                        </div>
                    )}
                </div>
            )}

            <Dialog
                isOpen={dialogIsOpenHC}
                onClose={onDialogCloseIngresos}
                onRequestClose={onDialogCloseIngresos}
            >
                <div className="flex flex-col h-full space-y-4">
                    <FormModalIngresos
                        eventoForm={onSubmitModal}
                        idComplicacion={complicacionExistente?.id}
                    ></FormModalIngresos>
                </div>
            </Dialog>
        </>
    )
}

export default FormComplicacionesAgudas
