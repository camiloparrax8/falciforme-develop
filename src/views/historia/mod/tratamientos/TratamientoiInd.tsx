import { useForm } from 'react-hook-form'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputForm from '@/views/common/form/InputForm'
import InputSelect from '@/views/common/form/InputSelect'
import Button from '@/components/ui/Button'
import validationTratamientos from '@/validation/validationTratamientos'
import TableTi from '@/views/historia/mod/tratamientos/tablas/TratamientoInd'
import { useTratamientos, defaultFormValues } from '@/hooks/useTratamientos'
import AlertCustom from '@/components/ui/AlertCustom'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

export default function TratamientoInd() {
    const { id_paciente } = useParams<{ id_paciente: string }>()

    const {
        loading,
        tratamientosIndividuales,
        mensaje,
        mostrarMensaje,
        handleTratamientoIndividual,
        handleCloseAlert,
        handleEliminarTratamiento,
        shouldResetForm,
        resetFormCompleted,
    } = useTratamientos({
        id_paciente: id_paciente || '',
    })

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: defaultFormValues,
    })

    // Efecto para resetear el formulario cuando se completa una inserción exitosa
    useEffect(() => {
        if (shouldResetForm) {
            reset(defaultFormValues)
            resetFormCompleted()
        }
    }, [shouldResetForm, reset, resetFormCompleted])

    const onSubmit = async (data) => {
        await handleTratamientoIndividual(data)
    }

    const options = [
        {
            value: 'profilaxis anbiotica con penicilina',
            label: 'Profilaxis antibiótica con penicilina',
        },
        {
            value: 'profilaxis para anemia megaloblastica con acido folico',
            label: 'Profilaxis para anemia megaloblastica con ácido fólico',
        },
        { value: 'manejo del dolor', label: 'Manejo del dolor' },
    ]

    return (
        <>
            {mostrarMensaje && mensaje && (
                <AlertCustom
                    type={mensaje.tipo}
                    message={mensaje.texto}
                    onClose={handleCloseAlert}
                />
            )}
            <div className="bg-white p-6 rounded-lg">
                {/* Formulario de Tratamiento individual */}
                <form
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Sección Tratamiento individual */}
                    <SectionTitle
                        text="Tratamiento individual"
                        className="col-span-1 md:col-span-2 lg:col-span-4"
                    />
                    <InputSelect
                        key={`tipo-${shouldResetForm}`}
                        control={control}
                        name="tipo"
                        validation={validationTratamientos.tipo}
                        label="Tipo de tratamiento"
                        options={options}
                        errors={errors}
                        className="col-span-1"
                        placeholder="Seleccione el tratamiento"
                    />
                    <InputForm
                        control={control}
                        name="n_dias"
                        errors={errors}
                        rules={validationTratamientos.n_dias}
                        label="Número de días"
                        inputPlaceholder="días"
                        className="col-span-1"
                        value=""
                    />
                    <InputForm
                        control={control}
                        name="dosis"
                        errors={errors}
                        rules={validationTratamientos.dosis}
                        label="Dosis"
                        inputPlaceholder="Dosis"
                        className="col-span-1"
                        value=""
                    />

                    <div className="flex items-center justify-end col-span-4 md:col-span-1 pt-7">
                        <Button
                            type="submit"
                            className="w-full md:w-auto"
                            loading={loading}
                        >
                            Guardar
                        </Button>
                    </div>
                </form>
            </div>
            <div>
                <TableTi
                    tratamientos={tratamientosIndividuales}
                    onDelete={handleEliminarTratamiento}
                />
            </div>
        </>
    )
}
