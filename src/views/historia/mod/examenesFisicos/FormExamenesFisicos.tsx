
import { Button } from '@/components/ui';
import InputForm from '@/views/common/form/InputForm';
import InputSelect from '@/views/common/form/InputSelect';
import SectionTitle from '@/views/common/form/SectionTitle';
import { useForm } from 'react-hook-form';
import validationExamenes from '../../.././../validation/validationExamenesFisicos';
import defaultValues from './defaultValues';

function FormExamenesFisicos() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: defaultValues,
    });

    const onSubmit = (data) => {
        console.log('Datos enviados:', data);
    };

    const options = [
      { value: 'si', label: 'Sí' },
      { value: 'no', label: 'No' },
     
  ]
  return (
   
    <form
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
    >
        {/* Sección Signos Vitales */}
        <SectionTitle
            text="Signos Vitales"
            className="col-span-1 md:col-span-2 lg:col-span-4"
        />
        <InputForm
            control={control}
            name="frecuenciaCardiaca"
            rules={validationExamenes.frecuenciaCardiaca }
            errors={errors}
            label="Frecuencia Cardiaca (lpm)"
            inputPlaceholder="Ingrese la frecuencia cardiaca"
            className="col-span-1"
            value=""
        />
        <InputForm
            control={control}
            name="frecuenciaRespiratoria"
            rules={validationExamenes.frecuenciaRespiratoria}
            errors={errors}
            label="Frecuencia Respiratoria (rpm)"
            inputPlaceholder="Ingrese la frecuencia respiratoria"
            className="col-span-1"
            value = ""
        />
        <InputForm
            control={control}
            name="saturacionOxigeno"
            rules={validationExamenes.saturacionOxigeno}
            errors={errors}
            label="Saturación de Oxígeno (%)"
            inputPlaceholder="Ingrese la saturación de oxígeno"
            className="col-span-1"
            value=""
        />
        <InputForm
            control={control}
            name="tensionArterial"
            rules={validationExamenes.tensionArterial}
            errors={errors}
            label="Tensión Arterial (mmHg)"
            inputPlaceholder="Ingrese la tensión arterial"
            className="col-span-1"
            value=""
        />

        {/* Sección Peso y Talla */}
        <SectionTitle
            text="Peso y Talla"
            className="col-span-1 md:col-span-2 lg:col-span-4"
        />
        <InputForm
            control={control}
            name="peso"
            rules={validationExamenes.peso}
            errors={errors}
            label="Peso (kg)"
            inputPlaceholder="Ingrese el peso"
            className="col-span-1"
            value=""
        />
        <InputForm
            control={control}
            name="talla"
            rules={validationExamenes.talla}
            errors={errors}
            label="Talla (cm)"
            inputPlaceholder="Ingrese la talla"
            className="col-span-1"
            value=""
        />
        <InputForm
            control={control}
            name="percentil"
            rules={validationExamenes.percentil}
            errors={errors}
            label="Percentil"
            inputPlaceholder="Ingrese el percentil"
            className="col-span-1"
            value=""
        />
        <InputForm
            control={control}
            name="imc"
            rules={validationExamenes.imc}
            errors={errors}
            label="Índice de Masa Corporal (IMC)"
            inputPlaceholder="Ingrese el IMC"
            className="col-span-1"
            value = ""
        />

        {/* Sección Estado Nutricional */}
        <SectionTitle
            text="Estado Nutricional"
            className="col-span-1 md:col-span-2 lg:col-span-4"
        />
       <InputSelect
            control={control}
            name="deficitZinc"
            validation={validationExamenes.deficitZinc}
            errors={errors}
            label="Déficit de Zinc"
            options={options}
            className="col-span-1"
            
          />
       <InputSelect
            control={control}
            name="deficitAcidoFolico"
            validation={validationExamenes.deficitAcidoFolico}
            errors={errors}
            label="Déficit de Ácido Fólico"
            options={options}
            className="col-span-1"
          />
       <InputSelect
            control={control}
            name="deficitVitaminaD"
            validation={validationExamenes.deficitVitaminaD}
            errors={errors}
            label="Déficit de Vitamina D"
            options={options}
            className="col-span-1"
            
          />
        <InputSelect
            control={control}
            name="desnutricion"
            validation={validationExamenes.desnutricion}
            errors={errors}
            label="Desnutrición"
            options={options}
            className="col-span-1"
          />
        <InputSelect
            control={control}
            name="obesidad"
            validation={validationExamenes.obesidad}
            errors={errors}
            label="Obesidad"
            options={options}
            className="col-span-1"
      />
        {/* Botón */}
        <div className="col-span-4 flex justify-end mt-6">
            <Button type="submit">Guardar</Button>
        </div>
    </form>

  )
}

export default FormExamenesFisicos