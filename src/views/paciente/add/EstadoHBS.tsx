import { Table } from '@/components/ui'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { useState } from 'react'
import { TbLayoutGridAdd } from 'react-icons/tb'
import SectionTitle from '@/views/common/form/SectionTitle'
import { useForm } from 'react-hook-form'
import SelectParentesco from '@/views/common/form/SelectParentesco'
import SelectLinea from '@/views/common/form/SelectLinea'
import InputSelect from '@/views/common/form/InputSelect'

const { Tr, Th, Td, THead, TBody } = Table

function EstadoHBS() {
    const hc = <TbLayoutGridAdd />

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            parentesco: '',
            linea: '',
            estado: '',
        },
    })

    const selectedParentesco = watch('parentesco')

    const onSubmit = (data) => {
        console.log('Datos enviados:', data)
        setIsOpen(false)
    }
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: React.MouseEvent | React.KeyboardEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const options = [
        { value: 'portador', label: 'Portador' },
        { value: 'no_portador', label: 'No Portador' },
        { value: 'desconocido', label: 'Desconocido' },
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
                            <Th>Parentesco</Th>
                            <Th>Linea</Th>
                            <Th>Estado</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        <Tr>
                            <Td>Abuelo</Td>
                            <Td>Paterno</Td>
                            <Td>
                                <Tag className="text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20 border-0">
                                    Portador
                                </Tag>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>Abuelo</Td>
                            <Td>Materno</Td>
                            <Td>
                                <Tag className="text-emerald-600 bg-emerald-100 dark:text-emerald-100 dark:bg-emerald-500/20 border-0">
                                    No portador
                                </Tag>
                            </Td>
                        </Tr>
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
                            validation={{
                                required: 'Debe seleccionar un parentesco',
                            }}
                            className="col-span-2"
                        />

                        {/* Select de Línea */}
                        <SelectLinea
                            control={control}
                            errors={errors}
                            validation={{
                                required: 'Debe seleccionar una línea',
                            }}
                            selectedParentesco={selectedParentesco}
                            className="col-span-2"
                        />

                        <InputSelect
                            control={control}
                            errors={errors}
                            validation={{
                                required: 'Debe seleccionar un estado',
                            }}
                            options={options}
                            name="estado"
                            placeholder="Seleccione un estado"
                            label="Estado HBS"
                            className="col-span-4"
                        />

                        {/* Botón */}
                        <div className="col-span-4 flex justify-end mt-6">
                            <Button type="submit">Guardar</Button>
                        </div>
                    </form>
                </div>
            </Dialog>
        </>
    )
}

export default EstadoHBS
