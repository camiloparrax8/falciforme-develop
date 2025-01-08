import { useForm } from 'react-hook-form';
import SectionTitle from '@/views/common/form/SectionTitle';
import InputForm from '@/views/common/form/InputForm';
import InputSelect from '@/views/common/form/InputSelect';
import Button from '@/components/ui/Button';
import validationTratamientos from '../../../../validation/validationTratamientos'
import TableMD from './tablas/ManejoDolor';

export default function ManejoDolor() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            medicamentos: '',
            diasMed: '',
            dosisMed: '',
        },
    });

    const onSubmitMed = (data) => {
        console.log('Datos de manejo de dolor:', data);
    };

    const medicamentos = [
        { value: 'antiinflamatorios no esteroideos', label: 'Antiinflamatorios no esteroideos' },
        { value: 'opioides', label: 'Opioides' },
        { value: 'acetaminofen', label: 'Acetaminofén' },
        { value: 'dipirona', label: 'Dipirona' },
    ]

    return (
        <>
                <div className="bg-white p-6 rounded-lg">
          {/* Formulario de Manejo de dolor */}
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full" onSubmit={handleSubmit(onSubmitMed)}>
              {/* Sección de Manejo de dolor */}
              <SectionTitle 
                  text="Manejo de dolor" 
                  className="col-span-1 md:col-span-2 lg:col-span-4"
              />
              <InputSelect
                  control={control}
                  name="medicamentos"
                  label="Medicamento"
                  validation={validationTratamientos.medicamento}
                  errors={errors}
                  options={medicamentos}
                  className="col-span-1"
                  placeholder='Seleccione el medicamento'
              />
              <InputForm
                  control={control}
                  name="diasMed"
                  rules={validationTratamientos.diasMed}
                  errors={errors}
                  label="Numero de dias"
                  inputPlaceholder="dias"
                  className="col-span-1"
                  value=""
              />
              <InputForm
                  control={control}
                  name="dosisMed"
                  rules={validationTratamientos.dosisMed}
                  errors={errors}
                  label="Dosis"
                  inputPlaceholder="Dosis"
                  className="col-span-1"
                  value=""
              />
              <div className="flex items-center justify-end col-span-4 md:col-span-1 pt-7">
              <Button type="submit" className="w-full md:w-auto">Guardar</Button>
              </div>
          </form>
        </div>
        <TableMD></TableMD>
        </>
      )

}