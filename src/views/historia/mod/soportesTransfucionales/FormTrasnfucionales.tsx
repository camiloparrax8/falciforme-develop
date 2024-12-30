import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import validationTransfuncionales from '../../../../validation/validationTransfuncionales'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputDate from '@/views/common/form/InputDate'
import InputSelect from '@/views/common/form/InputSelect'
import InputForm from '@/views/common/form/InputForm'
import defaultValues from './defaultValues' // Importa los valores predeterminados

import {
    soporteT,
    numeroTranfu,
    frecuencia,
    aloinmunización,
    quelantes,
    ferritina,
    lic,
    pancratica,
    evaluacionCardiaca,
} from './dataSelect';
function FormTrasnfucionales() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: defaultValues,
    })
    const onSubmit = (data) => {
        console.log('Datos enviados:', data)
    }
    

    return (
        <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            <SectionTitle
                text="Soporte Transfucional"
                className="col-span-1 md:col-span-2 lg:col-span-4"
            />
            <InputDate
                control={control}
                name="fechaInicio"
                rules={validationTransfuncionales.fechaInicio}
                errors={errors}
                label="Inicio de Soporte Transfusional"
                placeholder="Ingrese la Fecha"
                className="col-span-1"
            />
            <InputSelect
                control={control}
                errors={errors}
                validation={validationTransfuncionales.documensoportetType}
                options={soporteT}
                name="soporte"
                placeholder="Seleccione un soporte"
                label="Soporte Transfusional"
                className="col-span-1"
            />
            <InputSelect
                control={control}
                errors={errors}
                validation={validationTransfuncionales.numeroTranfu}
                options={numeroTranfu}
                name="numeroTranfu"
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
                options={aloinmunización}
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
                name="fechaHierro"
                rules={validationTransfuncionales.fechaHierro}
                errors={errors}
                label="Fecha de Sobrecarga de Hierro"
                placeholder="Ingrese la Fecha"
                className="col-span-1"
            />
            <InputSelect
                control={control}
                errors={errors}
                validation={validationTransfuncionales.quelante}
                options={quelantes}
                name="quelantes"
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
                rules={validationTransfuncionales.dosis}
                name="dosis"
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
                name="FechaOrgano"
                rules={validationTransfuncionales.FechaOrgano}
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
                validation={validationTransfuncionales.pancratica}
                options={pancratica}
                name="pancratica"
                placeholder="Selección Pancreática (R2, Herzios)"
                label="Pancreática (R2, Herzios)"
                className="col-span-1"
            />
            <InputSelect
                control={control}
                errors={errors}
                validation={validationTransfuncionales.evaluacionCardiaca}
                options={evaluacionCardiaca}
                name="evaluacionCardiaca"
                placeholder="Selección Evaluación Cardíaca (T2, milisegundos)"
                label="Evaluación Cardíaca (T2, milisegundos)"
                className="col-span-1"
            />

            {/* Botón */}
            <div className="col-span-4 flex justify-end mt-6">
                <Button type="submit">Guardar</Button>
            </div>
        </form>
    )
}

export default FormTrasnfucionales
