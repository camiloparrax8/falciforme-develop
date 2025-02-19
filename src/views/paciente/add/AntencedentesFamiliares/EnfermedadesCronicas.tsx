import { useEffect, useState } from 'react'
import { Table } from '@/components/ui'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { TbLayoutGridAdd } from 'react-icons/tb'
import SectionTitle from '@/views/common/form/SectionTitle'
import { useForm } from 'react-hook-form'
import InputSelect from '@/views/common/form/InputSelect'
import SelectChronicDisease from '@/views/common/form/SelectChronicDisease'
import SelectSpecificDisease from '@/views/common/form/SelectSpecificDisease'
import classNames from 'classnames'
import { useToken } from '@/store/authStore'
import { crearEnfermedadCronica, BuscarEnfermedadCronica } from '@/customService/services/enfermedadesCronicasService'  // Asegúrate de tener la función de obtener enfermedades crónicas
import validationAntecedentesFamiliares from '../../../../validation/validationAntecedentesFamiliares'
import { useSessionUser } from '@/store/authStore'
import { usePatient } from '@/context/PatientContext'


const { Tr, Th, Td, THead, TBody } = Table

function EnfermedadesCronicas() {
    const hc = <TbLayoutGridAdd />

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            enfermedad: '',
            enfermedad_especifica: '',
            parentescos: '',
        },
    })
    const handleDiseaseChange = (disease) => {
        setSelectedDisease(disease)
    }

    const [selectedDisease, setSelectedDisease] = useState(null)
    const [loading, setLoading] = useState(false)
    const [mensajes, setMensajes] = useState<{ status: string; message: string }[]>([])
    const [enfermedades, setEnfermedades] = useState([])
    const { token } = useToken()
    const { user } = useSessionUser()
    const [dialogIsOpen, setIsOpen] = useState(false)
    const { paciente } = usePatient()
    const [actualizar, setActualizar] = useState(false);
    // Cambiar a id de paciente dinámicamente si es necesario

    // Función para obtener enfermedades crónicas del backend
    useEffect(() => {
        const obtenerEnfermedades = async () => {
            const id = paciente.id;
            try {
                const response = await BuscarEnfermedadCronica(token, id);
                if (response.status === 'success') {
                    const datos = response.data.map(enf => ({
                        enfermedad: enf.enfermedad,
                        especifica: enf.especifica,
                        parentescos: enf.portadores.map(p => p.nombre) 
                    }));
                    setEnfermedades(datos);
                } else {
                    setMensajes([{ status: 'error', message: 'Error al obtener las enfermedades' }]);
                }
            } catch (error) {
                setMensajes([{ status: 'error', message: 'Error al obtener las enfermedades' }]);
            }
        };
    
        obtenerEnfermedades();
    }, [paciente.id, token, actualizar]);
    

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setMensajes([]);
    
            if (!paciente.id) {
                setMensajes([{ status: 'error', message: 'Seleccione un paciente' }]);
                setLoading(false);
                return;
            }
    
            const usuarioId = user.id;
            const response = await crearEnfermedadCronica(token, usuarioId, paciente.id, {
                enfermedad: data.enfermedad,
                enfermedad_especifica: data.enfermedad_especifica,
                parentescos: data.parentescos,
            });
    
            if (response.status === 'success') {
                setMensajes([{ status: 'success', message: 'Enfermedad agregada con éxito' }]);
                setActualizar(prev => !prev); 
                setTimeout(() => setIsOpen(false), 500); // 🔹 Cierra el modal después de actualizar
            } else {
                setMensajes([{ status: 'error', message: response.message }]);
            }
        } catch (error) {
            setMensajes([{ status: 'error', message: 'Error al guardar la enfermedad' }]);
        } finally {
            setLoading(false);
        }
    };
    

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: React.MouseEvent | React.KeyboardEvent) => {
        setIsOpen(false)
    }

    const parentescoOptions = [
        { value: 'padre', label: 'Padre' },
        { value: 'madre', label: 'Madre' },
       
    ]

    return (
        <>
            <div className="mx-4">
                <Button
                    variant="default"
                    onClick={() => openDialog()}
                    iconAlignment="end"
                    size="xs"
                    icon={hc}
                >
                    Agregar
                </Button>
                <Table compact>
                    <THead>
                        <Tr>
                            <Th>Enfermedad Cronica</Th>
                            <Th>Enfermedad Especifica</Th>
                            <Th>Parentesco</Th>
                        </Tr>
                    </THead>
                    <TBody>
    {enfermedades.length > 0 ? (
        enfermedades.map((row, index) => (
            <Tr key={index}>
                {/* Enfermedad Crónica */}
                <Td>{row.enfermedad || 'No especificado'}</Td>

                {/* Enfermedad Específica */}
                <Td>{row.especifica || 'No especificado'}</Td>

                {/* Parentesco */}
                <Td>
                    {row.parentescos && row.parentescos.length > 0 ? (
                        row.parentescos.map((parentesco, idx) => (
                            <Tag
                                key={idx}
                                className="border-0 mr-2 mt-2 text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-500/20"
                            >
                                {parentesco}
                            </Tag>
                        ))
                    ) : (
                        <Tag className="border-0 mr-2 mt-2 text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700/20">
                            No registrado
                        </Tag>
                    )}
                </Td>


            </Tr>
        ))
    ) : (
        <Tr>
            <Td colSpan={3} className="text-center text-gray-500">
                No hay enfermedades registradas para este paciente.
            </Td>
        </Tr>
    )}
</TBody>

                </Table>
            </div>
            <Dialog
                isOpen={dialogIsOpen}
                width={600}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <div className="flex flex-col h-full space-y-4">
                    <form
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <SectionTitle
                            text="Enfermedad"
                            className="col-span-1 md:col-span-2 lg:col-span-4"
                        />

                        <SelectChronicDisease
                            className="col-span-2"
                            name="enfermedad"
                            control={control}
                            errors={errors}
                            validation={validationAntecedentesFamiliares.enfermedadesCronicas.enfermedad}
                            onDiseaseChange={handleDiseaseChange}
                        />
                        <SelectSpecificDisease
                            className="col-span-2"
                            name="enfermedad_especifica"
                            control={control}
                            errors={errors}
                            validation={validationAntecedentesFamiliares.enfermedadesCronicas.enfermedad_especifica}
                            selectedDisease={selectedDisease}
                        />

                        <SectionTitle
                            text="Parentesco"
                            className="col-span-1 md:col-span-2 lg:col-span-4"
                        />

                        <InputSelect
                            control={control}
                            className="col-span-2"
                            name="parentescos"
                            options={parentescoOptions}
                            placeholder="Seleccione parentescos"
                            errors={errors}
                            validation={validationAntecedentesFamiliares.enfermedadesCronicas.parentescos}
                            label="Parentescos"
                        />

                        <div className="col-span-4 flex justify-end mt-6">
                            <Button type="submit">Guardar</Button>
                        </div>
                    </form>
                </div>
            </Dialog>
        </>
    )
}

export default EnfermedadesCronicas
