import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputForm from '@/views/common/form/InputForm'
import InputDatePickerForm from '@/views/common/form/InputDate'
import validationImgDiagnosticos from '@/validation/validationImgDiagnosticos'
import InputSelect from '@/views/common/form/InputSelect'
import defaultValuesImgDiagnosticas from '@/views/historia/mod/imgDiagnosticos/defaultValuesImgDiagnosticas'
import { useEffect, useState } from 'react'

/**
 * Componente de formulario para la creación de imágenes diagnósticas.
 * Implementa validación de campos y manejo de estado del formulario.
 *
 * @param {Object} props
 * @param {Function} props.onSubmit - Función que se ejecuta al enviar el formulario
 * @param {boolean} props.loading - Estado de carga del formulario
 */
function FormImgDiagnosticos({ onSubmit, loading }) {
    // Estado para forzar el reinicio del formulario
    const [resetKey, setResetKey] = useState(0)

    // Configuración del formulario usando react-hook-form
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        defaultValues: defaultValuesImgDiagnosticas,
    })

    /**
     * Efecto que reinicia el formulario cuando se envía exitosamente.
     * Incrementa resetKey para forzar la recreación del formulario.
     */
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(defaultValuesImgDiagnosticas)
            setResetKey((prev) => prev + 1)
        }
    }, [isSubmitSuccessful, reset])

    const opcionesImagenDiagnostica = [
        { value: 'Radiografía', label: 'Radiografía' },
        { value: 'Tomografía', label: 'Tomografía' },
        { value: 'Ecografía', label: 'Ecografía' },
        { value: 'Resonancia Magnética', label: 'Resonancia Magnética' },
    ]

    const opcionesTipoResultado = [
        { value: 'Normal', label: 'Normal' },
        { value: 'Anormal', label: 'Anormal' },
        { value: 'Pendiente de Evaluación', label: 'Pendiente de Evaluación' },
    ]

    /**
     * Maneja el envío del formulario.
     * @param {Object} data - Datos del formulario validados
     */
    const handleFormSubmit = (data) => {
        onSubmit(data)
    }

    return (
        <form
            key={resetKey}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            {/* Sección Tipo de Imagen Diagnóstica */}
            <SectionTitle
                text="Tipo de Imagen Diagnóstica"
                className="col-span-1 md:col-span-2 lg:col-span-4"
            />
            <InputSelect
                control={control}
                name="imagenDiagnostica"
                validation={validationImgDiagnosticos.imagenDiagnostica}
                errors={errors}
                label="Imagen Diagnóstica"
                options={opcionesImagenDiagnostica}
                placeholder="Imágenes diagnósticas"
                className="col-span-1"
            />
            <InputDatePickerForm
                control={control}
                name="fecha"
                rules={validationImgDiagnosticos.fecha}
                errors={errors}
                label="Fecha"
                placeholder="Seleccione la fecha"
                className="col-span-1"
            />
            <InputSelect
                control={control}
                name="tipoResultado"
                validation={validationImgDiagnosticos.tipoResultado}
                errors={errors}
                label="Tipo de Resultado"
                options={opcionesTipoResultado}
                placeholder="Tipos de resultado"
                className="col-span-1"
            />
            <InputForm
                control={control}
                name="resultado"
                rules={validationImgDiagnosticos.resultado}
                errors={errors}
                label="Resultado"
                inputPlaceholder="Ingrese el resultado"
                className="col-span-4"
                value=""
            />

            {/* Botón */}
            <div className="col-span-4 flex justify-end mt-2">
                <Button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>
        </form>
    )
}

export default FormImgDiagnosticos
