import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import validationVacunas from '../../../../validation/validationVacunas';
import SectionTitle from '@/views/common/form/SectionTitle';
import SelectMultiple from '@/views/common/form/SelectMultiple';
import InputDatePickerForm from '@/views/common/form/InputDate';
import InputForm from '@/views/common/form/InputForm';

function FormVacunas({ nextTab }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            tipo_vacuna: [],
            dosis: '',
            fecha: '',
        },
    });

    // Datos de vacunas quemados directamente en el componente
    const [vacunas, setVacunas] = useState([
        {
            id: 1,
            tipo_vacuna: 'COVID-19',
            dosis: '2',
            fecha: '2023-05-10',
        },
        {
            id: 2,
            tipo_vacuna: 'Influenza',
            dosis: '1',
            fecha: '2023-10-01',
        },
        {
            id: 3,
            tipo_vacuna: 'Hepatitis A',
            dosis: '1',
            fecha: '2023-07-15',
        },
        {
            id: 4,
            tipo_vacuna: 'Tosferina',
            dosis: '3',
            fecha: '2023-03-20',
        },
        {
            id: 5,
            tipo_vacuna: 'Triple Viral (SRP)',
            dosis: '2',
            fecha: '2023-01-25',
        },
    ]);

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

    const onSubmit = (data) => {
        console.log('Datos enviados:', data);
    };

    return (
        <div className="w-full">
            <form
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <SectionTitle text="Datos de ingreso" className="col-span-3 mb-4" />

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

                <InputForm
                    control={control}
                    value=''
                    name="dosis"
                    rules={validationVacunas.dosis}
                    errors={errors}
                    label="Dosis"
                    inputPlaceholder="Número de dosis"
                    className="col-span-1"
                />

                <InputDatePickerForm
                    control={control}
                    name="fecha"
                    rules={validationVacunas.fechaVacuna}
                    errors={errors}
                    label="Fecha"
                    placeholder="Fecha de la vacuna"
                    className="col-span-1"
                />

                <div className="col-span-3 flex justify-end mt-6">
                    <Button type="submit">Guardar</Button>
                </div>
            </form>

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
                        {vacunas.map((vacuna) => (
                            <tr key={vacuna.id} className="border-b">
                                <td className="py-2 px-4">{vacuna.tipo_vacuna}</td>
                                <td className="py-2 px-4">{vacuna.dosis}</td>
                                <td className="py-2 px-4">
                                    {new Date(vacuna.fecha).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 flex space-x-2">
                                    <Button variant="solid" className="text-white flex items-center space-x-1">
                                        <FaEdit />
                                    </Button>
                                    <Button variant="solid" className="text-white flex items-center space-x-1">
                                        <FaTrash />
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
