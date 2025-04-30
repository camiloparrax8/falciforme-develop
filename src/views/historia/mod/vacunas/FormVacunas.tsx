import { Button } from '@/components/ui'
import { useForm } from 'react-hook-form'
import SectionTitle from '@/views/common/form/SectionTitle'
import validationTratamientos from '../../../../validation/validationTratamientos'
import InputDatePickerForm from '@/views/common/form/InputDate'
import InputForm from '@/views/common/form/InputForm'
import defaultValuesVacunas_hc from './defaultValuesVacunas_hc'
import { useEffect, useState } from 'react'

interface FormVacunasProps {
    loading: boolean
    onSubmit: (data: FormData) => Promise<void>
}

interface FormData {
    nombre_vacuna: string
    fecha: string
}

function FormVacunas({ onSubmit, loading }: FormVacunasProps) {
    const [resetKey, setResetKey] = useState(0)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        defaultValues: defaultValuesVacunas_hc,
    })

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(defaultValuesVacunas_hc)
            setResetKey((prev) => prev + 1)
        }
    }, [isSubmitSuccessful, reset])

    const handleFormSubmit = (data: FormData) => {
        onSubmit(data)
    }

    return (
        <form
            key={resetKey}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <SectionTitle
                text="Vacunas aplicadas"
                className="col-span-1 md:col-span-2 lg:col-span-4"
            />
            <InputForm
                control={control}
                name="nombre_vacuna"
                rules={validationTratamientos.tipo}
                label="Nombre de la vacuna"
                errors={errors}
                className="col-span-1"
                inputPlaceholder="Seleccione la vacuna"
            />
            <InputDatePickerForm
                control={control}
                name="fecha"
                rules={validationTratamientos.tipo}
                errors={errors}
                label="Fecha de vacunacion"
                placeholder="Seleccione una fecha"
                className="col-span-1"
            />

            <div className="flex items-center justify-end col-span-4 md:col-span-1 mt-7">
                <Button
                    type="submit"
                    loading={loading}
                    className="w-full md:w-auto"
                >
                    Guardar
                </Button>
            </div>
        </form>
    )
}

export default FormVacunas
