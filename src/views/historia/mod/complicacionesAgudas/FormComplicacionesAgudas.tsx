import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
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
import validationComplicacionesAgudas from '../../.././../validation/validationComplicacionesAgudas'
import { manejoOptions, aplasticaOptions, tratamientoOptions, huesoafectadosOptions, tratamienoInfeccionOptions, intensidadOptions } from './dataSelect'
import InputSelect from '@/views/common/form/InputSelect'
import { crearComplicacionAguda, obtenerComplicacionAgudaPorPaciente } from '@/customService/services/complicacionAgudaService'
import { Table } from '@/components/ui'
import Tr from '@/components/ui/Table/Tr'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import Th from '@/components/ui/Table/Th'
import THead from '@/components/ui/Table/THead'


function FormComplicacionesAgudas() {
    const { token } = useToken()
    const { user } = useSessionUser()
    const { id_paciente } = useParams()
    const [loading, setLoading] = useState(false)
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' })
    const [complicacionExistente, setComplicacionExistente] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [dialogIsOpenHC, setIsOpenAgudas] = useState(false)
    // Estado para controlar si el formulario está deshabilitado
    const [formularioDeshabilitado, setFormularioDeshabilitado] =
        useState(false)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: defaultValues,
    })

    // Verificar si el paciente ya tiene una complicación aguda al cargar el componente
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

                // Verificación más estricta para determinar si hay datos reales
                if (
                    resultado &&
                    resultado.status === 'success' &&
                    resultado.data &&
                    // Verificar que la data tiene propiedades de una complicación real
                    (resultado.data.id ||
                        (Array.isArray(resultado.data) &&
                            resultado.data.length > 0 &&
                            resultado.data[0].id))
                ) {
                    // Determinar si los datos son un array o un objeto
                    const datosComplicacion = Array.isArray(resultado.data)
                        ? resultado.data[0] // Tomar el primer elemento si es un array
                        : resultado.data // Usar directamente si es un objeto

                    // Verificación adicional para asegurarse que es un objeto válido
                    if (
                        datosComplicacion &&
                        Object.keys(datosComplicacion).length > 0
                    ) {
                        setComplicacionExistente(datosComplicacion)
                        // Deshabilitar el formulario cuando ya existe una complicación
                        setFormularioDeshabilitado(true)
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
    }, [id_paciente, token, reset])

    const onSubmit = async (data) => {
        // Si el formulario está deshabilitado, no permitir el envío
        if (formularioDeshabilitado) {
            return
        }

        try {
            setLoading(true)
            setMensaje({ tipo: '', texto: '' })

            // Formatea la fecha antes de enviarla
            let fechaFormateada = data.fecha
            if (data.fecha) {
                const fecha = new Date(data.fecha)
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

            const formDataComplete = {
                ...data,
                fecha: fechaFormateada, // Usar la fecha formateada
                id_paciente,
                id_user_create: user.id,
            }

            const response = await crearComplicacionAguda(
                token,
                formDataComplete,
            )

            if (response.status === 'success') {
                setMensaje({
                    tipo: 'exito',
                    texto: 'Complicación aguda guardada correctamente',
                })

                // Actualizar el estado para reflejar que ahora existe una complicación
                if (response.data) {
                    setComplicacionExistente(response.data)
                    // Deshabilitar el formulario después de guardar
                    setFormularioDeshabilitado(true)
                }
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
                texto: 'Error al guardar los datos de la complicación aguda',
            })
        } finally {
            setLoading(false)
        }
    }

    const openDialogIngresos = () => {
        setIsOpenAgudas(true)
    }

    const onDialogCloseIngresos = () => {
        setIsOpenAgudas(false)
    }

    const onSubmitModal = (dataModal) => {
        console.log('Datos enviados:', dataModal)
        setIsOpenAgudas(false)
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

            {/* Mensaje informativo sobre complicación existente */}
            {complicacionExistente && (
                <div className="mb-6 p-3 rounded-md bg-blue-100 text-blue-800">
                    Este paciente ya tiene registrada una complicación aguda. No
                    es posible agregar otra complicación para esta historia
                    clinica.
                </div>
            )}

            {/* Aplicar una clase de opacidad a todo el formulario cuando está deshabilitado */}
            <div
                className={
                    formularioDeshabilitado
                        ? 'opacity-60 pointer-events-none'
                        : ''
                }
            >
                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Crisis de Dolor */}
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

                    {/* Infecciones */}
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
                        validation={validationComplicacionesAgudas.tratamiento_infecciones}
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

                    {/* Anemia Aguda */}
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

                    {/* Botón de Guardar */}
                    <div className="col-span-1 md:col-span-6 flex justify-end">
                        <Button
                            type="submit"
                            disabled={loading || formularioDeshabilitado}
                        >
                            {loading
                                ? 'Guardando...'
                                : formularioDeshabilitado
                                  ? 'Ya existe una complicación'
                                  : 'Guardar'}
                        </Button>
                    </div>
                </form>
            </div>

            <SectionTitle
                text="Ingresos del paciente"
                className="col-span-1 md:col-span-6 mt-6"
            />
            <Button
                className="mt-4 mb-4"
                icon={<BiAddToQueue />}
                variant="solid"
                title="Añadir ingresos medicos"
                onClick={() => openDialogIngresos()}
            >
                Añadir ingresos
            </Button>

            {/* Tabla con datos existentes */}
            {complicacionExistente && (
                <div className="mt-8">
                    <SectionTitle
                        text="Complicacion aguda del paciente"
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
                                        {complicacionExistente.fecha
                                            ? (() => {
                                                  // Obtener la fecha como YYYY-MM-DD sin ajuste de zona horaria
                                                  const fechaString =
                                                      complicacionExistente.fecha.split(
                                                          'T',
                                                      )[0]
                                                  const [year, month, day] =
                                                      fechaString.split('-')
                                                  // Crear la fecha sin ajustes de zona horaria
                                                  return `${day}/${month}/${year}`
                                              })()
                                            : ''}
                                    </Td>
                                    <Td>{complicacionExistente.dias_crisis}</Td>
                                    <Td>{complicacionExistente.intensidad}</Td>
                                    <Td>{complicacionExistente.manejo}</Td>
                                    <Td>{complicacionExistente.tratamiento}</Td>
                                    <Td>{complicacionExistente.huesos_afectados}</Td>
                                    <Td>{complicacionExistente.germen}</Td>
                                    <Td>{complicacionExistente.tratamiento_infecciones}</Td>
                                    <Td>{complicacionExistente.dias_infeccion}</Td>
                                    <Td>{complicacionExistente.crisis_aplastica_infecciosa? 'Si': 'No'}</Td>
                                </Tr>
                            </TBody>
                        </Table>
                    </div>
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
                    ></FormModalIngresos>
                </div>
            </Dialog>
        </>
    )
}

export default FormComplicacionesAgudas
