import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import validationVacunas from '../../../validation/validationVacunas';
import SectionTitle from '@/views/common/form/SectionTitle';
import SelectMultiple from '@/views/common/form/SelectMultiple';
import InputDatePickerForm from '@/views/common/form/InputDate';
import InputForm from '@/views/common/form/InputForm';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function FormVacunas() {
    const [vacunas, setVacunas] = useState([]);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset, // Reset para limpiar el formulario después de envío
    } = useForm({
        defaultValues: {
            tipo_vacuna: [],
            dosis: '',
            fecha: '',
        },
    });

    const onSubmit = (data) => {
        console.log('Datos enviados:', data);
        setVacunas([
            ...vacunas,
            {
                tipo_vacuna: data.tipo_vacuna,
                dosis: data.dosis,
                fecha: data.fecha,
            },
        ]);
        reset(); // Limpiar el formulario después de enviar
    };

    const handleDelete = (index) => {
        const updatedVacunas = vacunas.filter((_, i) => i !== index);
        setVacunas(updatedVacunas);
    };

    const handleEdit = (index) => {
        const vacunaToEdit = vacunas[index];
        reset({
            tipo_vacuna: vacunaToEdit.tipo_vacuna,
            dosis: vacunaToEdit.dosis,
            fecha: vacunaToEdit.fecha,
        });
        handleDelete(index); // Eliminar para luego agregarlo como editado
    };

    const vacunasOptions = [
        { value: 'covid_19', label: 'COVID-19' },
        { value: 'influenza', label: 'Influenza' },
        { value: 'varicela', label: 'Varicela' },
        { value: 'rotavirus', label: 'Rotavirus' },
        { value: 'difteria', label: 'Difteria' },
        { value: 'tosferina', label: 'Tosferina' },
        { value: 'neumococo', label: 'Neumococo' },
        { value: 'meningococo', label: 'Meningococo' },
        { value: 'hepatitis_a', label: 'Hepatitis A' },
        { value: 'vih', label: 'VIH' },
        { value: 'hpv', label: 'HPV (Virus del Papiloma Humano)' },
        { value: 'antirrabica', label: 'Antirrábica' },
        { value: 'triple_viral', label: 'Triple Viral (SRP)' },
        { value: 'pentavalente', label: 'Pentavalente' },
        { value: 'tifoidea', label: 'Fiebre Tifoidea' },
    ];

    return (
        <div className="w-full">
            <form
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Sección Información Básica */}
                <SectionTitle text="Datos de ingreso" className="col-span-3 mb-4" />

                {/* Tipo de Vacuna */}
                <SelectMultiple
                    control={control}
                    name="tipo_vacuna"
                    options={vacunasOptions}
                    placeholder="Seleccione el tipo de vacuna"
                    defaultValue={[]}
                    errors={errors}
                    validation={{
                        required: validationVacunas.tipoVacuna.required,
                        validate: validationVacunas.tipoVacuna.validate,
                    }}
                    label="Tipo de Vacuna"
                    className="col-span-2"
                />

                {/* Dosis */}
                <InputForm
                    control={control}
                    name="dosis"
                    rules={validationVacunas.dosis}
                    errors={errors}
                    label="Dosis"
                    inputPlaceholder="Número de dosis"
                    className="col-span-1"
                    value=""
                />

                {/* Fecha */}
                <InputDatePickerForm
                    control={control}
                    name="fecha"
                    rules={validationVacunas.fechaVacuna}
                    errors={errors}
                    label="Fecha"
                    placeholder="Fecha de la vacuna"
                    className="col-span-1"
                />

                {/* Botón de Envío */}
                <div className="col-span-3 flex justify-end mt-6">
                    <Button type="submit">Guardar</Button>
                </div>
            </form>

            {/* Tabla de Vacunas Agregadas */}
            <div className="mt-6">
                <SectionTitle text="Vacunas Agregadas" className="col-span-3 mb-4" />
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 px-4 text-left">Vacuna</th>
                            <th className="py-2 px-4 text-left">Dosis</th>
                            <th className="py-2 px-4 text-left">Fecha</th>
                            <th className="py-2 px-4 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacunas.map((vacuna, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4">{vacuna.tipo_vacuna}</td>
                                <td className="py-2 px-4">{vacuna.dosis}</td>
                                <td className="py-2 px-4">
                                    {new Date(vacuna.fecha).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 flex space-x-2">
                                    {/* Botón de editar con icono */}
                                    <Button onClick={() => handleEdit(index)} className="text-blue-500 flex items-center space-x-1">
                                        <FaEdit /> <span></span>
                                    </Button>

                                    {/* Botón de eliminar con icono */}
                                    <Button onClick={() => handleDelete(index)} className="text-red-500 flex items-center space-x-1">
                                        <FaTrash /> <span></span>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FormVacunas;
