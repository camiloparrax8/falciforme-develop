import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import validationTransfuncionales from '@/validation/validationTransfuncionales'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputDate from '@/views/common/form/InputDate'
import InputSelect from '@/views/common/form/InputSelect'
import InputForm from '@/views/common/form/InputForm'
import defaultValues from '@/views/historia/mod/soportesTransfucionales/defaultValues'
import { useEffect, useState } from 'react'

import {
    soporteT,
    numeroTranfu,
    frecuencia,
    aloinmunizacion,
    quelentes,
    ferritina,
    lic,
    pancratica,
    evaluacionCardiaca,
} from '@/views/historia/mod/soportesTransfucionales/dataSelect'

interface FormTrasnfucionalesProps {
    loading: boolean
    onSubmit: (data: {
        fecha: string
        soporte_transfusional: string
        numero_transfusiones: string
        frecuencia: string
        aloinmunizacion: string
        fecha_sobrecarga_hierro: string
        quelentes: string
        ferritina: string
        ferritina_dosis: string
        fecha_sobrecarga_organo: string
        lic: string
        pancreatica: string
        evaluacion_cardiaca: string
    }) => void
}

function FormTrasnfucionales({ loading, onSubmit }: FormTrasnfucionalesProps) {
    // Estado para forzar el reinicio del formulario
    const [resetKey, setResetKey] = useState(0)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        defaultValues: defaultValues,
    })

    /**
     * Efecto que reinicia el formulario cuando se envía exitosamente.
     * Incrementa resetKey para forzar la recreación del formulario.
     */
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(defaultValues)
            setResetKey((prev) => prev + 1)
        }
    }, [isSubmitSuccessful, reset])

    const handleFormSubmit = (data) => {
        onSubmit(data)
    }

    return (
        <form
            key={resetKey}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <SectionTitle
                text="Soporte Transfucional"
                className="col-span-1 md:col-span-2 lg:col-span-4"
            />
            <InputDate
                control={control}
                name="fecha"
                rules={validationTransfuncionales.fecha}
                errors={errors}
                label="Inicio de Soporte Transfusional"
                placeholder="Ingrese la Fecha"
                className="col-span-1"
            />
            <InputSelect
                control={control}
                errors={errors}
                validation={validationTransfuncionales.soporte_transfusional}
                options={soporteT}
                name="soporte_transfusional"
                placeholder="Seleccione un soporte"
                label="Soporte Transfusional"
                className="col-span-1"
            />
            <InputSelect
                control={control}
                errors={errors}
                validation={validationTransfuncionales.numero_transfusiones}
                options={numeroTranfu}
                name="numero_transfusiones"
                placeholder="Seleccione un Numero"
                label="Numero de Transfusiones"
                className="col-span-1"
            />
            <InputSelect
                control={control}
                errors={errors}
                validation={validationTransfuncionales.frecuencia}
                options={frecuencia}
                name="frecuencia"
                placeholder="Seleccione la frecuencia"
                label="Frecuencia"
                className="col-span-1"
            />
            <InputSelect
                control={control}
                errors={errors}
                validation={validationTransfuncionales.aloinmunizacion}
                options={aloinmunizacion}
                name="aloinmunizacion"
                placeholder="Seleccione"
                label="Aloinmunización"
                className="col-span-1"
            />
            <SectionTitle
                text="Sobrecarga de Hierro"
                className="col-span-1 md:col-span-2 lg:col-span-4"
            />
            <InputDate
                control={control}
                name="fecha_sobrecarga_hierro"
                rules={validationTransfuncionales.fecha_sobrecarga_hierro}
                errors={errors}
                label="Fecha de Sobrecarga de Hierro"
                placeholder="Ingrese la Fecha"
                className="col-span-1"
            />
            <InputSelect
                control={control}
                errors={errors}
                validation={validationTransfuncionales.quelentes}
                options={quelentes}
                name="quelentes"
                placeholder="Selección tipo de quelante"
                label="Quelantes"
                className="col-span-1"
            />
            <InputSelect
                control={control}
                errors={errors}
                validation={validationTransfuncionales.ferritina}
                options={ferritina}
                name="ferritina"
                placeholder="Selección de nivel de ferritina"
                label="Ferritina"
                className="col-span-1"
            />
            <InputForm
                control={control}
                errors={errors}
                rules={validationTransfuncionales.ferritina_dosis}
                name="ferritina_dosis"
                inputPlaceholder="Ingrese la Dosis"
                label="Dosis mg/kg/día"
                className="col-span-1"
                value={''}
            />
            <SectionTitle
                text="Sobrecarga por Órgano"
                className="col-span-1 md:col-span-2 lg:col-span-4"
            />
            <InputDate
                control={control}
                name="fecha_sobrecarga_organo"
                rules={validationTransfuncionales.fecha_sobrecarga_organo}
                errors={errors}
                label="Fecha de Sobrecarga de Órgano"
                placeholder="Ingrese la Fecha"
                className="col-span-1"
            />
            <InputSelect
                control={control}
                errors={errors}
                validation={validationTransfuncionales.lic}
                options={lic}
                name="lic"
                placeholder="Selección LIC (Hígado, mg/g)"
                label="LIC (Hígado, mg/g)"
                className="col-span-1"
            />
            <InputSelect
                control={control}
                errors={errors}
                validation={validationTransfuncionales.pancreatica}
                options={pancratica}
                name="pancreatica"
                placeholder="Selección Pancreática (R2, Herzios)"
                label="Pancreática (R2, Herzios)"
                className="col-span-1"
            />
            <InputSelect
                control={control}
                errors={errors}
                validation={validationTransfuncionales.evaluacion_cardiaca}
                options={evaluacionCardiaca}
                name="evaluacion_cardiaca"
                placeholder="Selección Evaluación Cardíaca (T2, milisegundos)"
                label="Evaluación Cardíaca (T2, milisegundos)"
                className="col-span-1"
            />

            {/* Botón */}
            <div className="col-span-4 flex justify-end mt-6">
                <Button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>
        </form>
    )
}

export default FormTrasnfucionales
