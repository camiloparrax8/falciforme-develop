
import { Button } from '@/components/ui';
import InputForm from '@/views/common/form/InputForm';
import InputSelect from '@/views/common/form/InputSelect';
import SectionTitle from '@/views/common/form/SectionTitle';
import { useForm } from 'react-hook-form';
import validationExamenesFisicos from '../../.././../validation/validationExamenesFisicos';
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
            rules={validationExamenesFisicos.frecuenciaCardiaca }
            errors={errors}
            label="Frecuencia Cardiaca (lpm)"
            inputPlaceholder="Ingrese la frecuencia cardiaca"
            className="col-span-1"
            value=""
        />
        <InputForm
            control={control}
            name="frecuenciaRespiratoria"
            rules={validationExamenesFisicos.frecuenciaRespiratoria}
            errors={errors}
            label="Frecuencia Respiratoria (rpm)"
            inputPlaceholder="Ingrese la frecuencia respiratoria"
            className="col-span-1"
            value = ""
        />
        <InputForm
            control={control}
            name="saturacionOxigeno"
            rules={validationExamenesFisicos.saturacionOxigeno}
            errors={errors}
            label="Saturación de Oxígeno (%)"
            inputPlaceholder="Ingrese la saturación de oxígeno"
            className="col-span-1"
            value=""
        />
        <InputForm
            control={control}
            name="tensionArterial"
            rules={validationExamenesFisicos.tensionArterial}
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
            rules={validationExamenesFisicos.peso}
            errors={errors}
            label="Peso (kg)"
            inputPlaceholder="Ingrese el peso"
            className="col-span-1"
            value=""
        />
        <InputForm
            control={control}
            name="talla"
            rules={validationExamenesFisicos.talla}
            errors={errors}
            label="Talla (cm)"
            inputPlaceholder="Ingrese la talla"
            className="col-span-1"
            value=""
        />
        <InputForm
            control={control}
            name="percentil"
            rules={validationExamenesFisicos.percentil}
            errors={errors}
            label="Percentil"
            inputPlaceholder="Ingrese el percentil"
            className="col-span-1"
            value=""
        />
        <InputForm
            control={control}
            name="imc"
            rules={validationExamenesFisicos.imc}
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
            validation={validationExamenesFisicos.deficitZinc}
            errors={errors}
            label="Déficit de Zinc"
            options={options}
            className="col-span-1"
            
          />
       <InputSelect
            control={control}
            name="deficitAcidoFolico"
            validation={validationExamenesFisicos.deficitAcidoFolico}
            errors={errors}
            label="Déficit de Ácido Fólico"
            options={options}
            className="col-span-1"
          />
       <InputSelect
            control={control}
            name="deficitVitaminaD"
            validation={validationExamenesFisicos.deficitVitaminaD}
            errors={errors}
            label="Déficit de Vitamina D"
            options={options}
            className="col-span-1"
            
          />
        <InputSelect
            control={control}
            name="desnutricion"
            validation={validationExamenesFisicos.desnutricion}
            errors={errors}
            label="Desnutrición"
            options={options}
            className="col-span-1"
          />
        <InputSelect
            control={control}
            name="obesidad"
            validation={validationExamenesFisicos.obesidad}
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