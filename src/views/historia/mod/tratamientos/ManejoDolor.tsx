import { useForm } from 'react-hook-form'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputForm from '@/views/common/form/InputForm'
import InputSelect from '@/views/common/form/InputSelect'
import Button from '@/components/ui/Button'
import validationTratamientos from '@/validation/validationTratamientos'
import TableMD from '@/views/historia/mod/tratamientos/tablas/ManejoDolor'
import { useTratamientos, defaultFormValues } from '@/hooks/useTratamientos'
import AlertCustom from '@/components/ui/AlertCustom'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

export default function ManejoDolor() {
    const { id_paciente } = useParams<{ id_paciente: string }>()

    const {
        loading,
        tratamientosManejoDolor,
        mensaje,
        mostrarMensaje,
        handleManejoDolor,
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

    useEffect(() => {
        if (shouldResetForm) {
            reset(defaultFormValues)
            resetFormCompleted()
        }
    }, [shouldResetForm, reset, resetFormCompleted])

    const onSubmit = async (data) => {
        await handleManejoDolor(data)
    }

    const medicamentos = [
        {
            value: 'antiinflamatorios no esteroideos',
            label: 'Antiinflamatorios no esteroideos',
        },
        { value: 'opioides', label: 'Opioides' },
        { value: 'acetaminofen', label: 'Acetaminofén' },
        { value: 'dipirona', label: 'Dipirona' },
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
                {/* Formulario de Manejo de dolor */}
                <form
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Sección de Manejo de dolor */}
                    <SectionTitle
                        text="Manejo de dolor"
                        className="col-span-1 md:col-span-2 lg:col-span-4"
                    />
                    <InputSelect
                        key={`tipo-${shouldResetForm}`}
                        control={control}
                        name="tipo"
                        label="Medicamento"
                        validation={validationTratamientos.tipo}
                        errors={errors}
                        options={medicamentos}
                        className="col-span-1"
                        placeholder="Seleccione el medicamento"
                    />
                    <InputForm
                        control={control}
                        name="n_dias"
                        rules={validationTratamientos.n_dias}
                        errors={errors}
                        label="Número de días"
                        inputPlaceholder="días"
                        className="col-span-1"
                        value=""
                    />
                    <InputForm
                        control={control}
                        name="dosis"
                        rules={validationTratamientos.dosis}
                        errors={errors}
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
            <TableMD
                tratamientos={tratamientosManejoDolor}
                onDelete={handleEliminarTratamiento}
            />
        </>
    )
}
