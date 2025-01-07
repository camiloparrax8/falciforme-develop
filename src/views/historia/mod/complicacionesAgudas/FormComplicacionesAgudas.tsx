import { useForm } from 'react-hook-form'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputForm from '@/views/common/form/InputForm'
import Button from '@/components/ui/Button'
import InputDatePickerForm from '@/views/common/form/InputDate'
import SelectMultiple from '@/views/common/form/SelectMultiple'
import TableCustom from '@/views/common/TableCustom'
import { useState } from 'react'
import { BiAddToQueue } from "react-icons/bi";
import Dialog from '@/components/ui/Dialog'
import FormModalIngresos from './FormModalIngresos'
import {defaultValues} from './defaultValues'
import validationComplicacionesAgudas from '../../.././../validation/validationComplicacionesAgudas';
import {
    
    manejoOptions,  
    aplasticaOptions, 
    tratamientoOptions, 
    huesoafectadosOptions, 
    tratamienoInfeccionOptions,
} from './dataSelect';

function FormComplicacionesAgudas() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: defaultValues
    })

    const [dialogIsOpenHC, setIsOpenAgudas] = useState(false)



    const header = ['Nombre', 'Tipo', 'Rol', 'Estado']
    const data = [
        {
            id: 1,
            Nombre: 'Alfreds Futterkiste',
            Tipo: 'UCI',
            Rol: 'Maria Anders',
            Estado: 'Germany',
        },
        {
            id: 2,
            Nombre: 'Centro comercial Moctezuma',
            Tipo: 'Hospitalizado',
            Rol: 'Francisco Chang',
            Estado: 'Mexico',
        },
        {
            id: 3,
            Nombre: 'Ernst Handel',
            Tipo: 'Hospitalizado',
            Rol: 'Roland Mendel',
            Estado: 'Austria',
        },
        {
            id: 1,
            Nombre: 'Alfreds Futterkiste',
            Tipo: 'UCI',
            Rol: 'Maria Anders',
            Estado: 'Germany',
        },
        {
            id: 2,
            Nombre: 'Centro comercial Moctezuma',
            Tipo: 'UCI',
            Rol: 'Francisco Chang',
            Estado: 'Mexico',
        },
        {
            id: 3,
            Nombre: 'Ernst Handel',
            Tipo: 'Hospitalizado',
            Rol: 'Roland Mendel',
            Estado: 'Austria',
        },
    ]
    const onSubmit = (data) => {
        console.log('Datos enviados:', data)
    }

    const openDialogIngresos = () => {
        setIsOpenAgudas(true)
    }

    const onDialogCloseIngresos = () => {
        setIsOpenAgudas(false)
    }


    const onSubmitModal = (dataModal) => {
        console.log('Datos enviados:', dataModal)
        setIsOpenAgudas(false)
    }
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {/* Crisis de Dolor */}
                <SectionTitle
                    text="Crisis de Dolor"
                    className="col-span-1 md:col-span-6"
                />
                <InputDatePickerForm
                    control={control}
                    name="crisisDolorFecha"
                    label="Fecha"
                    rules={validationComplicacionesAgudas.crisisDolorFecha}
                    placeholder="Ingrese la fecha"
                    errors={errors}
                    className="col-span-1"
                />
                <InputForm
                    control={control}
                    name="crisisDolorDias"
                    label="Días"
                    rules={validationComplicacionesAgudas.crisisDolorDias}
                    inputPlaceholder="Ingrese los días"
                    errors={errors}
                    className="col-span-1"
                    value=""
                />
                <InputForm
                    control={control}
                    name="crisisDolorIntensidad"
                    label="Intensidad (1-10)"
                    rules={validationComplicacionesAgudas.crisisDolorIntensidad}
                    inputPlaceholder="Ingrese la intensidad"
                    className="col-span-4"
                    errors={errors}
                    value=""
                />
                <SelectMultiple
                    control={control}
                    name="crisisDolorManejo"
                    validation={validationComplicacionesAgudas.crisisDolorManejo}
                    label="Manejo"
                    options={manejoOptions}
                    defaultValue={[]}
                    errors={errors}
                    placeholder="Manejo"
                    className="col-span-1"
                />
                <SelectMultiple
                    control={control}
                    name="crisisDolorTratamiento"
                    label="Tratamiento"
                    options = {tratamientoOptions}
                    validation={validationComplicacionesAgudas.crisisDolorTratamiento}
                    placeholder="Ingrese el tratamiento"
                    errors={errors}
                    className="col-span-1"
                    defaultValue={[]}
                />
                <SelectMultiple
                    control={control}
                    name="crisisDolorHuesos"
                    label="Huesos Afectados"
                    options={huesoafectadosOptions}
                    validation={validationComplicacionesAgudas.crisisDolorHuesos}
                    placeholder="Ingrese los huesos afectados"
                    errors={errors}
                    className="col-span-4"
                    defaultValue={[]}
                />

                {/* Infecciones */}
                <SectionTitle
                    text="Infecciones"
                    className="col-span-1 md:col-span-6"
                />
                <InputForm
                    control={control}
                    name="infeccionesGermen"
                    label="Germen"
                    rules={validationComplicacionesAgudas.infeccionesGermen}
                    inputPlaceholder="Ingrese el germen"
                    errors={errors}
                    className="col-span-1"
                    value=""
                />
                <SelectMultiple
                    control={control}
                    name="infeccionesTratamiento"
                    label="Tratamiento"
                    options={tratamienoInfeccionOptions}
                    validation={validationComplicacionesAgudas.infeccionesTratamiento}
                    placeholder="Ingrese el tratamiento"
                    errors={errors}
                    className="col-span-1"
                    defaultValue={[]}
                />
                <InputForm
                    control={control}
                    name="infeccionesDias"
                    label="Días"
                    rules={validationComplicacionesAgudas.infeccionesDias}
                    inputPlaceholder="Ingrese los días"
                    errors={errors}
                    className="col-span-4"
                    value=""
                />

                {/* Anemia Aguda */}
                <SectionTitle
                    text="Anemia Aguda"
                    className="col-span-1 md:col-span-6"
                />
                <SelectMultiple
                    control={control}
                    name="anemiaCrisisAplastica"
                    label="Crisis Aplástica Infecciosa"
                    options={aplasticaOptions}
                    validation={validationComplicacionesAgudas.anemiaCrisisAplastica}
                    errors={errors}
                    defaultValue={[]}
                    placeholder="Manejo"
                    className="col-span-1"
                />

                {/* Botón de Guardar */}
                <div className="col-span-1 md:col-span-6 flex justify-end">
                    <Button type="submit">Guardar</Button>
                </div>
            </form>
            <SectionTitle
                    text="Ingresos del paciente"
                    className="col-span-1 md:col-span-6"
                />
            <Button
                className="mt-4 mb-4"
                icon={<BiAddToQueue />}
                variant="solid"
                title="Añadir ingresos medicos"
                onClick={() => openDialogIngresos()}
            >
                Añadir ingresos
            </Button>

            <TableCustom className={'mt-4'} data={data} header={header} />

            <Dialog
                isOpen={dialogIsOpenHC}
                onClose={onDialogCloseIngresos}
                onRequestClose={onDialogCloseIngresos}
            >
                <div className="flex flex-col h-full space-y-4">
                    <FormModalIngresos eventoForm = {onSubmitModal}></FormModalIngresos>
                </div>
            </Dialog>
        </>
    )
}

export default FormComplicacionesAgudas
