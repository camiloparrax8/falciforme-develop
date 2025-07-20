/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table } from '@/components/ui'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { useEffect, useState } from 'react'
import { TbLayoutGridAdd } from 'react-icons/tb'
import SectionTitle from '@/views/common/form/SectionTitle'
import { useForm } from 'react-hook-form'
import SelectParentesco from '@/views/common/form/SelectParentesco'
import SelectLinea from '@/views/common/form/SelectLinea'
import InputSelect from '@/views/common/form/InputSelect'
import validationAntecedentesFamiliares from '@/validation/validationAntecedentesFamiliares'
import { usePatient } from '@/context/PatientContext'
import { useSessionUser, useToken } from '@/store/authStore'
import {
    BuscarEstadosHBS,
    crearEstadoHBS,
} from '@/customService/services/estadoHbsService'

const { Tr, Th, Td, THead, TBody } = Table

function EstadoHBS({ setMensaje }) {
    const hc = <TbLayoutGridAdd />

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            parentesco: '',
            linea_parentesco: '',
            estado: '',
        },
    })
    const [estadoHBS, setEstadoHBS] = useState([])
    const { token } = useToken()
    const { user } = useSessionUser()
    const { paciente } = usePatient()
    const selectedParentesco = watch('parentesco')
    const [actualizar, setActualizar] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const obtenerHBS = async () => {
            if (!paciente?.id) {
                console.error('No hay paciente seleccionado.')
                return
            }

            try {
                const response = await BuscarEstadosHBS(token, paciente.id)

                // Asegurar que status es correcto
                if (response.status === 200 || response.status === '200') {
                    const datos = response.data.map((estado) => ({
                        parentesco: estado.parentesco,
                        linea_parentesco: estado.linea_parentesco,
                        estado: estado.estado,
                    }))
                    setEstadoHBS(datos)
                } else {
                    console.error('Error en la respuesta:', response)
                    setEstadoHBS([])
                }
            } catch (error) {
                console.error('Error al obtener estados HBS:', error)
                setEstadoHBS([])
            }
        }

        obtenerHBS()
    }, [paciente?.id, token, actualizar])

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            setMensaje([])

            if (!paciente.id) {
                setMensaje([
                    { status: 'error', message: 'Seleccione un paciente' },
                ])
                setLoading(false)
                return
            }

            const datos = {
                parentesco: data.parentesco || '',
                linea_parentesco: data.linea_parentesco || '',
                estado: data.estado?.trim() || '',
                id_paciente: paciente.id,
                id_user_create: user.id,
            }

            const response = await crearEstadoHBS(
                token,
                user.id,
                paciente.id,
                datos,
            )

            setMensaje({
                status: 'success',
                message: response.message || 'Estado HBS creado con éxito.',
            })
            setTimeout(() => setIsOpen(false), 500)
            setActualizar((prev) => !prev)
        } catch (error) {
            setMensaje({
                status: 'error',
                message:
                    error.response?.data?.message ||
                    'Error al asignar el acompañante.',
            })
        } finally {
            setLoading(false)
        }
    }

    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: React.MouseEvent | React.KeyboardEvent) => {
        setIsOpen(false)
    }

    const options = [
        { value: 'portador', label: 'Portador' },
        { value: 'desconocido', label: 'Desconocido' },
    ]
    return (
        <>
            <div className="mx-4">
                <Button
                    variant="default"
                    iconAlignment="end"
                    size="xs"
                    icon={hc}
                    onClick={() => openDialog()}
                >
                    Agregar
                </Button>
                <Table compact>
                    <THead>
                        <Tr>
                            <Th>Parentesco</Th>
                            <Th>Linea</Th>
                            <Th>Estado</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {estadoHBS.length > 0 ? (
                            estadoHBS.map((row, index) => (
                                <Tr key={index}>
                                    <Td>
                                        {row.parentesco || 'No especificado'}
                                    </Td>
                                    <Td>
                                        {row.linea_parentesco ||
                                            'No especificado'}
                                    </Td>
                                    <Td>
                                        <Tag className="border-0 mr-2 mt-2 text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-500/20">
                                            {row.estado}
                                        </Tag>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td
                                    colSpan={3}
                                    className="text-center text-gray-500"
                                >
                                    No hay estados HBS registrados para este
                                    paciente.
                                </Td>
                            </Tr>
                        )}
                    </TBody>
                </Table>
            </div>
            <Dialog
                isOpen={dialogIsOpen}
                width={600} // Ancho en píxeles
                height={400} // Altura en píxeles
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <div className="flex flex-col h-full space-y-4">
                    <form
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* Sección Información Básica */}
                        <SectionTitle
                            text="Añadir un Estado HBS"
                            className="col-span-1 md:col-span-2 lg:col-span-4"
                        />
                        <SelectParentesco
                            control={control}
                            errors={errors}
                            validation={
                                validationAntecedentesFamiliares.estadoHBS
                                    .parentesco
                            }
                            className="col-span-2"
                        />

                        {/* Select de Línea */}
                        <SelectLinea
                            control={control}
                            errors={errors}
                            validation={
                                validationAntecedentesFamiliares.estadoHBS
                                    .linea_parentesco
                            }
                            selectedParentesco={selectedParentesco}
                            className="col-span-2"
                        />

                        <InputSelect
                            control={control}
                            errors={errors}
                            validation={
                                validationAntecedentesFamiliares.estadoHBS
                                    .estado
                            }
                            options={options}
                            name="estado"
                            placeholder="Seleccione un estado"
                            label="Estado HBS"
                            className="col-span-4"
                        />

                        {/* Botón */}
                        <div className="col-span-4 flex justify-end mt-3">
                            <Button type="submit">Guardar</Button>
                        </div>
                    </form>
                </div>
            </Dialog>
        </>
    )
}

export default EstadoHBS
