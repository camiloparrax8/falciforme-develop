/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputSelect from '@/views/common/form/InputSelect'
import SelectChronicDisease from '@/views/common/form/SelectChronicDisease'
import SelectSpecificDisease from '@/views/common/form/SelectSpecificDisease'
import SelectMultiple from '@/views/common/form/SelectMultiple'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'
import {
    BuscarEnfermedadCronica,
    actualizarEnfermedadCronica,
    crearEnfermedadCronica,
} from '@/customService/services/enfermedadesCronicasService'
import { useSessionUser, useToken } from '@/store/authStore'
import { useEffect, useState } from 'react'
import validationAntecedentesFamiliares from '@/validation/validationAntecedentesFamiliares'

const { Tr, Th, Td, THead, TBody } = Table

interface EditEnfermedadesCronicasProps {
    idPaciente: number
    onClose?: () => void
}

const EditEnfermedadesCronicas = ({
    idPaciente,
    onClose,
}: EditEnfermedadesCronicasProps) => {
    const { token } = useToken()
    const { user } = useSessionUser()
    const [loading, setLoading] = useState(false)
    const [existeEnfermedadCronica, setExisteEnfermedadCronica] =
        useState(false)
    const [enfermedadCronicaData, setEnfermedadCronicaData] = useState(null)
    const [selectedDisease, setSelectedDisease] = useState(null)
    const [enfermedadesCronicas, setEnfermedadesCronicas] = useState([])
    const [editandoEnfermedad, setEditandoEnfermedad] = useState(null)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            enfermedad: '',
            enfermedad_especifica: '',
            parentescos: [],
            portador: 'Sí',
        },
    })

    // Cargar todas las enfermedades crónicas
    const cargarEnfermedadesCronicas = async () => {
        try {
            setLoading(true)
            const response = await BuscarEnfermedadCronica(token, idPaciente)

            if (response && response.status === 'success' && response.data) {
                setEnfermedadesCronicas(response.data)
            }
        } catch (error) {
            console.error('Error al cargar enfermedades crónicas:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (idPaciente) {
            cargarEnfermedadesCronicas()
        }
    }, [idPaciente])

    const handleDiseaseChange = (disease) => {
        setSelectedDisease(disease)

        if (!editandoEnfermedad) {
            reset({
                ...control._formValues,
                enfermedad_especifica: '',
            })
        }
    }

    const editarEnfermedad = (enfermedad) => {
        setEditandoEnfermedad(enfermedad)
        setExisteEnfermedadCronica(true)
        setEnfermedadCronicaData(enfermedad)
        setSelectedDisease(enfermedad.enfermedad)

        // Procesar parentescos
        let parentescos = []
        if (enfermedad.linea_parentesco_portador) {
            parentescos = enfermedad.linea_parentesco_portador
                .split(',')
                .map((p) => p.trim())
        }

        reset({
            enfermedad: enfermedad.enfermedad || '',
            enfermedad_especifica: enfermedad.enfermedad_especifica || '',
            parentescos: parentescos,
            portador: enfermedad.portador || 'No',
        })
    }

    const cancelarEdicion = () => {
        setEditandoEnfermedad(null)
        setExisteEnfermedadCronica(false)
        setEnfermedadCronicaData(null)
        setSelectedDisease(null)
        reset({
            enfermedad: '',
            enfermedad_especifica: '',
            parentescos: [],
            portador: 'Sí',
        })
    }

    const onSubmit = async (data) => {
        try {
            setLoading(true)

            if (!idPaciente) {
                return
            }

            // Convertir los parentescos a string para el backend
            const parentescosString = Array.isArray(data.parentescos)
                ? data.parentescos.join(', ')
                : data.parentescos

            let response

            if (editandoEnfermedad) {
                // Actualizar enfermedad crónica existente
                response = await actualizarEnfermedadCronica(token, {
                    id: editandoEnfermedad.id,
                    id_paciente: idPaciente,
                    enfermedad: data.enfermedad?.trim(),
                    enfermedad_especifica: data.enfermedad_especifica?.trim(),
                    portador: data.portador,
                    linea_parentesco_portador: parentescosString,
                    id_user_update: user.id,
                })
            } else {
                // Crear nueva enfermedad crónica
                response = await crearEnfermedadCronica(
                    token,
                    user.id,
                    idPaciente,
                    {
                        enfermedad: data.enfermedad?.trim(),
                        enfermedad_especifica:
                            data.enfermedad_especifica?.trim(),
                        portador: data.portador,
                        linea_parentesco_portador: parentescosString,
                    },
                )
            }

            if (response.status === 'success') {
                await cargarEnfermedadesCronicas()
                cancelarEdicion()
            }
        } catch (error) {
            console.error('Error al procesar la enfermedad crónica:', error)
        } finally {
            setLoading(false)
        }
    }

    const parentescoOptions = [
        { value: 'Padre', label: 'Padre' },
        { value: 'Madre', label: 'Madre' },
        { value: 'Hermano/a', label: 'Hermano/a' },
        { value: 'Abuelo/a Paterno', label: 'Abuelo/a Paterno' },
        { value: 'Abuelo/a Materno', label: 'Abuelo/a Materno' },
        { value: 'Tío/a Paterno', label: 'Tío/a Paterno' },
        { value: 'Tío/a Materno', label: 'Tío/a Materno' },
        { value: 'Primo/a', label: 'Primo/a' },
    ]

    const portadorOptions = [
        { value: 'Sí', label: 'Sí' },
        { value: 'No', label: 'No' },
    ]

    return (
        <div className="space-y-4">
            {/* Lista de Enfermedades Crónicas */}
            <div className="mb-4 overflow-hidden">
                <div className="max-h-[400px] overflow-y-auto">
                    <Table compact>
                        <THead className="sticky top-0 bg-white dark:bg-gray-800 z-10">
                            <Tr>
                                <Th>Enfermedad</Th>
                                <Th>Específica</Th>
                                <Th>Portador</Th>
                                <Th>Parentesco</Th>
                                <Th>Acciones</Th>
                            </Tr>
                        </THead>
                        <TBody>
                            {loading ? (
                                <Tr>
                                    <Td
                                        colSpan={5}
                                        className="text-center text-gray-400"
                                    >
                                        Cargando...
                                    </Td>
                                </Tr>
                            ) : enfermedadesCronicas.length === 0 ? (
                                <Tr>
                                    <Td
                                        colSpan={5}
                                        className="text-center text-gray-400"
                                    >
                                        No hay enfermedades crónicas
                                        registradas.
                                    </Td>
                                </Tr>
                            ) : (
                                enfermedadesCronicas.map(
                                    (enfermedad, index) => (
                                        <Tr key={index}>
                                            <Td className="whitespace-normal">
                                                {enfermedad.enfermedad}
                                            </Td>
                                            <Td className="whitespace-normal">
                                                {
                                                    enfermedad.enfermedad_especifica
                                                }
                                            </Td>
                                            <Td>
                                                <Tag
                                                    className={`text-${enfermedad.portador === 'Sí' ? 'red' : 'emerald'}-600 
                                                    bg-${enfermedad.portador === 'Sí' ? 'red' : 'emerald'}-100 
                                                    dark:text-${enfermedad.portador === 'Sí' ? 'red' : 'emerald'}-100 
                                                    dark:bg-${enfermedad.portador === 'Sí' ? 'red' : 'emerald'}-500/20 
                                                    border-0`}
                                                >
                                                    {enfermedad.portador}
                                                </Tag>
                                            </Td>
                                            <Td className="whitespace-normal">
                                                {enfermedad.linea_parentesco_portador && (
                                                    <Tag className="text-emerald-600 bg-emerald-100 dark:text-emerald-100 dark:bg-emerald-500/20 border-0">
                                                        {
                                                            enfermedad.linea_parentesco_portador
                                                        }
                                                    </Tag>
                                                )}
                                            </Td>
                                            <Td>
                                                <div className="flex gap-2">
                                                    {editandoEnfermedad &&
                                                    editandoEnfermedad.id ===
                                                        enfermedad.id ? (
                                                        <>
                                                            <Button
                                                                size="sm"
                                                                variant="solid"
                                                                onClick={handleSubmit(
                                                                    onSubmit,
                                                                )}
                                                                disabled={
                                                                    loading
                                                                }
                                                            >
                                                                {loading
                                                                    ? 'Procesando...'
                                                                    : 'Actualizar'}
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="plain"
                                                                onClick={
                                                                    cancelarEdicion
                                                                }
                                                                disabled={
                                                                    loading
                                                                }
                                                            >
                                                                Cancelar
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <Button
                                                            size="sm"
                                                            variant="solid"
                                                            onClick={() =>
                                                                editarEnfermedad(
                                                                    enfermedad,
                                                                )
                                                            }
                                                        >
                                                            Editar
                                                        </Button>
                                                    )}
                                                </div>
                                            </Td>
                                        </Tr>
                                    ),
                                )
                            )}
                            {/* Fila para guardar nueva enfermedad cuando no se está editando */}
                            {!editandoEnfermedad && (
                                <Tr className="bg-gray-50 dark:bg-gray-700/50">
                                    <Td
                                        colSpan={4}
                                        className="text-center text-gray-600 dark:text-gray-400"
                                    >
                                        Nueva enfermedad crónica
                                    </Td>
                                    <Td>
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            onClick={handleSubmit(onSubmit)}
                                            disabled={loading}
                                        >
                                            {loading
                                                ? 'Procesando...'
                                                : 'Guardar'}
                                        </Button>
                                    </Td>
                                </Tr>
                            )}
                        </TBody>
                    </Table>
                </div>
            </div>

            {/* Formulario */}
            <form
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <SectionTitle
                    text={
                        editandoEnfermedad
                            ? 'Actualizar Enfermedad Crónica'
                            : 'Registrar Nueva Enfermedad Crónica'
                    }
                    className="col-span-1 md:col-span-2 lg:col-span-3"
                />

                <SelectChronicDisease
                    className="col-span-1"
                    name="enfermedad"
                    control={control}
                    errors={errors}
                    validation={
                        validationAntecedentesFamiliares.enfermedadesCronicas
                            .enfermedad
                    }
                    onDiseaseChange={handleDiseaseChange}
                />

                <SelectSpecificDisease
                    className="col-span-1"
                    name="enfermedad_especifica"
                    control={control}
                    errors={errors}
                    validation={
                        validationAntecedentesFamiliares.enfermedadesCronicas
                            .enfermedad_especifica
                    }
                    selectedDisease={selectedDisease}
                />

                <InputSelect
                    control={control}
                    name="portador"
                    validation={
                        validationAntecedentesFamiliares.enfermedadesCronicas
                            .portador
                    }
                    errors={errors}
                    label="¿Es portador?"
                    placeholder="Seleccione si es portador"
                    className="col-span-1"
                    options={portadorOptions}
                />

                <SelectMultiple
                    control={control}
                    name="parentescos"
                    validation={
                        validationAntecedentesFamiliares.enfermedadesCronicas
                            .linea_parentesco_portador
                    }
                    errors={errors}
                    label="Parentescos"
                    placeholder="Seleccione parentescos"
                    className="col-span-1"
                    options={parentescoOptions}
                    defaultValue={[]}
                />
            </form>
        </div>
    )
}

export default EditEnfermedadesCronicas
