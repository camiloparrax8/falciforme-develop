import { useForm } from 'react-hook-form'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputSelect from '@/views/common/form/InputSelect'
import Button from '@/components/ui/Button'
import validationTratamientos from '../../../../validation/validationTratamientos'
import InputDatePickerForm from '@/views/common/form/InputDate'

function FormVacunas() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            tipo: '',
            vacuna: '',
          
        },
    })

    const onSubmit = (data) => {
        console.log('Datos enviados del tratamiento:', data)
    }

    const options = [
        {
            value: 'vacuna_neumococica',
            label: 'Vacuna neumocócica (PCV13 y PPSV23)',
        },
        {
            value: 'vacuna_meningococica',
            label: 'Vacuna meningocócica conjugada (MenACWY y MenB)',
        },
        {
            value: 'vacuna_haemophilus_influenzae',
            label: 'Vacuna contra Haemophilus influenzae tipo b (Hib)',
        },
        {
            value: 'vacuna_influenza',
            label: 'Vacuna contra la influenza (anual)',
        },
        {
            value: 'vacuna_hepatitis_b',
            label: 'Vacuna contra la hepatitis B',
        },
        {
            value: 'vacuna_varicela',
            label: 'Vacuna contra la varicela (si no está inmunizado)',
        },
        {
            value: 'vacuna_tdap',
            label: 'Vacuna contra el tétanos, difteria y tos ferina (Tdap)',
        },
        {
            value: 'vacuna_covid19',
            label: 'Vacuna contra COVID-19',
        },
    ]

    return (
        <>
            <form
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Sección Tratamiento individual */}
                <SectionTitle
                    text="Vacunas aplicadas"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />
                <InputSelect
                    control={control}
                    name="vacuna"
                    validation={validationTratamientos.tipo}
                    label="Nombre de la vacuna"
                    options={options}
                    errors={errors}
                    className="col-span-1"
                    placeholder="Seleccione la vacuna"
                />
                <InputDatePickerForm
                    control={control}
                    name="date"
                    rules={validationTratamientos.tipo}
                    errors={errors}
                    label="Fecha de vacunacion"
                    placeholder="Seleccione una fecha"
                    className="col-span-1"
                />

                <div className="flex items-center justify-end col-span-4 md:col-span-1 mt-7">
                    <Button type="submit" className="w-full md:w-auto">
                        Guardar
                    </Button>
                </div>
            </form>
        </>
    )
}

export default FormVacunas
