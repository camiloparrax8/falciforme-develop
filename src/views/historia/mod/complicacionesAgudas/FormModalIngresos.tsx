import Button from '@/components/ui/Button'
import InputDatePickerForm from '@/views/common/form/InputDate'
import InputForm from '@/views/common/form/InputForm'
import SectionTitle from '@/views/common/form/SectionTitle'
import { useForm } from 'react-hook-form'
import {defaultValuesModal} from './defaultValues'
import SelectMultiple from '@/views/common/form/SelectMultiple'
import {TipoOptions, MotivoOptions} from './dataSelect';
import validationComplicacionesAgudas from '../../.././../validation/validationComplicacionesAgudas';
function FormModalIngresos({eventoForm}) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: defaultValuesModal
    })

   

    return (
        <>
            <form
                onSubmit={handleSubmit(eventoForm)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <SectionTitle
                    text="Ingresos del Paciente"
                    className="col-span-1 md:col-span-6"
                />

                <SelectMultiple
                    control={control}
                    name="ingresoTipo"
                    label="Tipo"
                    options = {TipoOptions}
                    validation={validationComplicacionesAgudas.ingresoTipo}
                    placeholder="UCI, Hospitalizado"
                    className="col-span-3"
                    defaultValue={[]}
                    errors={errors}
                    
                />
                <InputDatePickerForm
                    control={control}
                    name="ingresoFecha"
                    label="Fecha"
                    rules={validationComplicacionesAgudas.ingresoFecha}
                    placeholder="Seleccione la fecha"
                    errors={errors}
                    className="col-span-2"
                />
                <InputForm
                    control={control}
                    name="ingresoDuracion"
                    label="Duracion"
                    rules={validationComplicacionesAgudas.ingresoDuracion}
                    inputPlaceholder="Ingrese los días"
                    errors={errors}
                    className="col-span-3"
                    value=""
                />

                <SelectMultiple
                    control={control}
                    name="ingresoMotivo"
                    label="Motivo de ingreso"
                    options={MotivoOptions}
                    validation={validationComplicacionesAgudas.ingresoMotivo}
                    placeholder="Motivo de ingreso"
                    errors={errors}
                    className="col-span-2"
                    defaultValue={[]}
                />
                <div className="col-span-1 md:col-span-6">
                    <Button type="submit">Guardar</Button>
                </div>
            </form>
        </>
    )
}

export default FormModalIngresos
