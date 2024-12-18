import { Table } from '@/components/ui'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { useState } from 'react'
import { TbLayoutGridAdd } from 'react-icons/tb'
import SectionTitle from '@/views/common/form/SectionTitle'
import { useForm } from 'react-hook-form'
import SelectMultiple from '@/views/common/form/SelectMultiple'
import SelectChronicDisease from '@/views/common/form/SelectChronicDisease'
import SelectSpecificDisease from '@/views/common/form/SelectSpecificDisease'
import classNames from 'classnames'
import validationAntecedentesFamiliares from '../../../validation/validationAntecedentesFamiliares';


const { Tr, Th, Td, THead, TBody } = Table

function EnfermedadesCronicas() {
    const hc = <TbLayoutGridAdd />

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            enfermedad: '',
            enfermedad_especifica: '',
            parentescosMultiples: [],
        },
    })

    const [selectedDisease, setSelectedDisease] = useState(null)
    const handleDiseaseChange = (disease) => {
        setSelectedDisease(disease)
    }

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

    const parentescoOptions = [
        // Padres
        { value: 'padre', label: 'Padre' },
        { value: 'madre', label: 'Madre' },

        // Abuelos
        { value: 'abuelo_paterno', label: 'Abuelo Paterno' },
        { value: 'abuelo_materno', label: 'Abuelo Materno' },
        { value: 'abuela_paterna', label: 'Abuela Paterna' },
        { value: 'abuela_materna', label: 'Abuela Materna' },

        // Hermanos
        { value: 'hermano_paterno', label: 'Hermano Paterno' },
        { value: 'hermano_materno', label: 'Hermano Materno' },
        { value: 'hermana_paterna', label: 'Hermana Paterna' },
        { value: 'hermana_materna', label: 'Hermana Materna' },

        // Tíos (de sangre)
        { value: 'tio_paterno', label: 'Tío Paterno' },
        { value: 'tio_materno', label: 'Tío Materno' },
        { value: 'tia_paterna', label: 'Tía Paterna' },
        { value: 'tia_materna', label: 'Tía Materna' },

        // Primos (hijos de tíos biológicos)
        { value: 'primo_paterno', label: 'Primo Paterno' },
        { value: 'primo_materno', label: 'Primo Materno' },
        { value: 'prima_paterna', label: 'Prima Paterna' },
        { value: 'prima_materna', label: 'Prima Materna' },

        // Nietos (hijos biológicos de los hijos)
        { value: 'nieto_paterno', label: 'Nieto Paterno' },
        { value: 'nieto_materno', label: 'Nieto Materno' },
        { value: 'nieta_paterna', label: 'Nieta Paterna' },
        { value: 'nieta_materna', label: 'Nieta Materna' },

        // Hijos
        { value: 'hijo', label: 'Hijo' },
        { value: 'hija', label: 'Hija' },
    ]
    const data = [
        {
            enfermedad: 'Cancer',
            enfemedad_especifica: 'Pulmon',
            enfermedades: [
                { nombre: 'Abuelo Paterno', tipo: 'cronica' },
                { nombre: 'Tio Paterno', tipo: 'cronica' },
                { nombre: 'Tia Materna', tipo: 'especifica' },
                { nombre: 'Abuela Materna', tipo: 'especifica' },
            ],
        },
        {
            enfermedad: 'Asma',
            enfemedad_especifica: 'Asma alergica ',
            enfermedades: [{ nombre: 'Tia Materna', tipo: 'especifica' }],
        },
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
                        {data.map((row, index) => (
                            <Tr key={index}>
                                <Td>{row.enfermedad}</Td>
                                <Td>{row.enfemedad_especifica}</Td>
                                <Td>
                                    {row.enfermedades.map((enfermedad, idx) => (
                                        <Tag
                                            key={idx}
                                            className={classNames(
                                                'border-0 mr-2 mt-2',
                                                enfermedad.tipo === 'cronica'
                                                    ? 'text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20'
                                                    : 'text-emerald-600 bg-emerald-100 dark:text-emerald-100 dark:bg-emerald-500/20',
                                            )}
                                        >
                                            {enfermedad.nombre}
                                        </Tag>
                                    ))}
                                </Td>
                            </Tr>
                        ))}
                    </TBody>
                </Table>
            </div>
            <Dialog
                isOpen={dialogIsOpen}
                width={600} // Ancho en píxeles
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

                        <SelectMultiple
                            control={control}
                            className="col-span-2"
                            name="parentescosMultiples"
                            options={parentescoOptions}
                            placeholder="Seleccione parentescos"
                            defaultValue={[]}
                            errors={errors}
                            validation={ validationAntecedentesFamiliares.enfermedadesCronicas.parentescosMultiples}
                            label="Parentescos"
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

export default EnfermedadesCronicas
