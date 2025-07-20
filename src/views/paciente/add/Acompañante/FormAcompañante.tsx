/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import validationAcompañante from '../../../../validation/validationAcompañante';
import SelectDocumentType from '@/views/common/form/SelectDocumentType';
import SectionTitle from '@/views/common/form/SectionTitle';
import InputForm from '@/views/common/form/InputForm';
import InputSelect from '@/views/common/form/InputSelect';
import {Dialog } from '@/components/ui'
import {crearAcompanante} from '@/customService/services/acompañanteService'
import { useToken, useSessionUser } from '@/store/authStore'
import { useState } from 'react'
import SelectDepartment from '@/views/common/form/SelectDepartment'
import type { MouseEvent } from 'react'
import SelectCity from '@/views/common/form/SelectCity'
import {
    optionsOcupacion,
    optionsTipoVivienda,
    optionsNivelIngreso,
    optionsNivelAcademico,
    optionsTipoVehiculo,
} from './dataSelectAcompañante'

function FormAcompañante({ isOpen, onClose, onRequestClose, setMensaje }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            nombre: "",
            apellido: "",
            tipo_identificacion: "",
            identificacion: "",
            celular: "",
            correo: "",
            ocupacion: "",
            municipio: "",
            departamento: "",
            direccion: "",
            tipo_vivienda: "",
            nivel_ingreso: "",
            nivel_academico: "",
            tipo_vehiculo: "",
        },
    });

    const { token } = useToken();
    const { user } = useSessionUser();
    const [loading, setLoading] = useState(false);
   
    const [selectedDepartment, setSelectedDepartment] = useState(null)

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setMensaje([]);

            const response = await crearAcompanante(token, user.id, data);

            setMensaje({ status: 'success', message: response.message || 'Acompañante creado con éxito.' })
            onClose() 
        } catch (error) {
            setMensaje({
                status: 'error',
                message: error.response?.data?.message || 'Error al asignar el acompañante.',
            })
        } finally {
            setLoading(false)
        }
    };


    return (
        <Dialog
        width={1800}
        isOpen={isOpen}
        onClose={onClose}
        onRequestClose={onRequestClose}
        >
            <div  className="max-h-[80vh] overflow-y-auto p-4">
                <form
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Sección Información Básica */}
                    <SectionTitle text="Información Básica del Acompañante" className="col-span-1 md:col-span-2 lg:col-span-4" />
                    <InputForm
                        control={control}
                        name="nombre"
                        rules={validationAcompañante.nombre}
                        errors={errors}
                        label="Nombre"
                        inputPlaceholder="Nombre del acompañante"
                        className="col-span-1"
                        value=""
                    />

                    <InputForm
                        control={control}
                        name="apellido"
                        rules={validationAcompañante.apellido}
                        errors={errors}
                        label="Apellido"
                        inputPlaceholder="Nombre del acompañante"
                        className="col-span-1"
                        value=""
                    />
                    <SelectDocumentType
                        control={control}
                        name="tipo_identificacion"
                        rules={validationAcompañante.tipo_identificacion}
                        errors={errors}
                        className="col-span-1"
                        disabled={false}
                    />
                    <InputForm
                        control={control}
                        name="identificacion"
                        rules={validationAcompañante.identificacion}
                        errors={errors}
                        label="Identificación"
                        inputPlaceholder="Número de identificación"
                        className="col-span-1"
                        value=""
                    />
                    

                    {/* Sección Contacto */}
                    <SectionTitle text="Contacto del Acompañante" className="col-span-1 md:col-span-2 lg:col-span-4" />
                    <InputForm
                        control={control}
                        name="celular"
                        rules={validationAcompañante.celular}
                        errors={errors}
                        label="Celular"
                        inputPlaceholder="Número de celular"
                        className="col-span-1"
                        value=""
                    />

                    <InputForm
                        control={control}
                        name="correo"
                        rules={validationAcompañante.correo}
                        errors={errors}
                        label="Correo Electrónico"
                        inputPlaceholder="Ingrese su correo electrónico"
                        className="col-span-1"
                        value=""
                    />

                    <SelectDepartment
                        control={control}
                        errors={errors}
                        validation={validationAcompañante.departamento}
                        onDepartmentChange={setSelectedDepartment}
                        className="col-span-1"
                        disabled={false}
                        />
                    <SelectCity
                        control={control}
                        selectedDepartment={selectedDepartment}
                        errors={errors}
                        validation={validationAcompañante.municipio}
                        className="col-span-1"
                        disabled={false}
                        />
                    <InputForm
                            control={control}
                            name="direccion"
                            rules={validationAcompañante.direccion}
                            errors={errors}
                            label="Dirección"
                            inputPlaceholder="Dirección completa"
                            className="col-span-2"
                            value=""
                        />
                    <InputSelect
                            control={control}
                            name="ocupacion"
                            validation={validationAcompañante.ocupacion}
                            errors={errors}
                            label="Ocupación"
                            placeholder="Ejemplo: Estudiante"
                            className="col-span-1"
                            options={optionsOcupacion}
                        />
                    
                    <InputSelect
                            control={control}
                            name="tipo_vivienda"
                            validation={validationAcompañante.tipo_vivienda}
                            errors={errors}
                            label="Tipo de vivienda"
                            placeholder="Ejemplo: Apartamento"
                            className="col-span-1"
                            options={optionsTipoVivienda}
                        />
                    <InputSelect
                            control={control}
                            name="nivel_ingreso"
                            validation={validationAcompañante.nivel_ingreso}
                            errors={errors}
                            label="Nivel de ingreso"
                            placeholder="Nivel de ingreso"
                            className="col-span-1"
                            options={optionsNivelIngreso}
                        />
                    <InputSelect
                            control={control}
                            name="nivel_academico"
                            validation={validationAcompañante.nivel_academico}
                            errors={errors}
                            label="Nivel Academico"
                            placeholder="Nivel academico"
                            className="col-span-1"
                            options={optionsNivelAcademico}
                        />
                    <InputSelect
                            control={control}
                            name="tipo_vehiculo"
                            validation={validationAcompañante.tipo_vehiculo}
                            errors={errors}
                            label="Tipo de vehiculo"
                            placeholder="Tipo de vehiculo"
                            className="col-span-1"
                            options={optionsTipoVehiculo}
                        />

                    {/* Botón */}
                    <div className="col-span-4 flex justify-start mt-2">
                        <Button type="submit">Guardar</Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}

export default FormAcompañante;
