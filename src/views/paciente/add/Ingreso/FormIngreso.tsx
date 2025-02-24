import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import validationIngreso from "../../../../validation/validationIngreso";
import SectionTitle from "@/views/common/form/SectionTitle";
import InputForm from "@/views/common/form/InputForm";
import SelectMultiple from "@/views/common/form/SelectMultiple";
import InputDatePickerForm from "@/views/common/form/InputDate";
import { crearPrimeraConsulta } from "@/customService/services/ingresoService";
import { useToken } from "@/store/authStore";
import { usePatient } from "@/context/PatientContext";
import { useSessionUser } from "@/store/authStore";
import { useState } from "react";
import TablaIngreso from './TablaIngreso'
import Alert from '@/components/ui/Alert'; 




function FormIngreso() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            fecha_hematologica: "",
            edad_consulta: "",
            fecha_inicio_sintoma: "",
            parentescos_multiples: [],
        },
    });
    const [refresh, setRefresh] = useState(false)
    const { paciente } = usePatient();
    const { token } = useToken();
    const { user } = useSessionUser();
    const [loading, setLoading] = useState(false);
    const [mensajes, setMensajes] = useState([]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setMensajes([]);

            if (!paciente.id) {
                setMensajes([{ status: "error", message: "Seleccione un paciente" }]);
                setLoading(false);
                return;
            }

            const response = await crearPrimeraConsulta(token, user.id, paciente.id, data);

            if (response) {
                setMensajes([{ status: "success", message: "Ingreso creado con éxito" }]);
                reset({
                    fecha_hematologica: null,
                    edad_consulta: "",
                    fecha_inicio_sintoma: null,
                    parentescos_multiples: [],
                });

                setRefresh((prev) => !prev)
            } else {
                setMensajes([{ status: "error", message: "Error al crear ingreso" }]);
            }
        } catch (error) {
            console.error("Error al crear la consulta:", error);
            setMensajes([{ status: "error", message: "Error al crear la consulta" }]);
        } finally {
            setLoading(false);
        }
    };

    const sintomasOptions = [
        { value: "anemia", label: "Anemia" },
        { value: "palidez", label: "Palidez" },
        { value: "ictericia", label: "Ictericia" },
        { value: "dolor_oseo", label: "Dolor Óseo" },
        { value: "dactilitis", label: "Dactilitis" },
        { value: "infecciones", label: "Infecciones" },
    ];

    return (
        <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
           
            {/* Sección Información Básica */}
            <SectionTitle text="Datos de ingreso" className="col-span-4" />
                {/* Alertas */}
                {mensajes.length > 0 && (
                <div className="col-span-4 mb-4">
                    {mensajes.map((msg, index) => (
                        <Alert
                            key={index}
                            title={msg.status === 'error' ? 'Atención' : 'Correcto'}
                            showIcon
                            type={msg.status === 'error' ? 'danger' : 'success'}
                            closable
                            duration={60000}
                        >
                            {msg.message}
                        </Alert>
                    ))}
                </div>
            )}

            <InputDatePickerForm
                control={control}
                name="fecha_hematologica"
                rules={validationIngreso.fechaPrimeraConsulta}
                errors={errors}
                label="Fecha 1ra consulta hematología"
                placeholder="Fecha"
                className="col-span-1"
            />

            <InputForm
                control={control}
                name="edad_consulta"
                rules={validationIngreso.edadConsulta}
                errors={errors}
                label="Edad de esa consulta"
                inputPlaceholder="Edad"
                className="col-span-1"
                value=""
            />

            <InputDatePickerForm
                control={control}
                name="fecha_inicio_sintoma"
                rules={validationIngreso.fechaInicioSintomas}
                errors={errors}
                label="Fecha inicio síntomas"
                placeholder="Fecha"
                className="col-span-1"
                
            />

            <SelectMultiple
                control={control}
                className="col-span-3"
                name="parentescos_multiples"
                options={sintomasOptions}
                placeholder="Seleccione los síntomas"
                defaultValue={[]}
                errors={errors}
                validation={{
                    required: validationIngreso.parentescos_multiples.required,
                    validate: validationIngreso.parentescos_multiples.validate,
                }}
                label="Síntomas"
            />

            {/* Botón */}
            <div className="col-span-4 flex justify-end mt-6">
                <Button type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar"}
                </Button>
            </div>
            <div className="col-span-4 w-full overflow-x-auto">
               <TablaIngreso refresh={refresh} />
            </div>
        </form>
    );
}

export default FormIngreso;
