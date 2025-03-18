import Dialog from "@/components/ui/Dialog";
import { useToken } from "@/store/authStore";
import { useSessionUser } from "@/store/authStore";
import { useState } from "react";
import { useForm } from "react-hook-form"
import SectionTitle from "../common/form/SectionTitle";
import InputForm from "../common/form/InputForm";
import validationUsuario from "@/validation/validationUsuario";
import {crearUsuario} from '@/customService/services/UsuariosService'
import SelectRoles from "../common/form/SelectRoles";
import Button from "@/components/ui/Button";
function FormUsuarios({ isOpen, onClose, onRequestClose, setMensaje }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            nombres: "",
            apellidos: "",
            cedula: "",
            correo: "",
            user: "",
            celular: "",
            id_rol: null,
            estado: true,
        }
    })

    const { token } = useToken();
    const { user } = useSessionUser();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        console.log(data);
        try {
            setLoading(true);
            setMensaje([]);
            const response = await crearUsuario(token, data);
            setMensaje({ status: 'success', message: response.message || 'Usuario creado con éxito.' })
            onClose() 
        } catch (error) {
            setMensaje({
                status: 'error',
                message: error.response?.data?.message || 'Error al crear el usuario.',
            })
            console.log(data)
        } finally {
            setLoading(false)
        }
    }



    return (
        <Dialog
            width={1800}
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
           <form
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
           onSubmit={handleSubmit(onSubmit)}>
                <SectionTitle text="Información Básica del Usuario" className="col-span-1 md:col-span-2 lg:col-span-4" />
                <InputForm
                    control={control}
                    name="nombres"
                    rules={validationUsuario.nombres}
                    errors={errors}
                    label="Nombre"
                    inputPlaceholder="Nombre del usuario"
                    className="col-span-2"
                    value=""
                />
                <InputForm
                    control={control}
                    name="apellidos"
                    rules={validationUsuario.apellidos}
                    errors={errors}
                    label="Apellidos"
                    inputPlaceholder="Apellidos del usuario"
                    className="col-span-2"
                    value=""
                />
                <InputForm
                    control={control}
                    name="cedula"
                    rules={validationUsuario.cedula}
                    errors={errors}
                    label="Cedula"
                    inputPlaceholder="Cedula del usuario"
                    className="col-span-2"
                    value=""
                />
                <InputForm
                    control={control}
                    name="correo"
                    rules={validationUsuario.correo}
                    errors={errors}
                    label="Correo"
                    inputPlaceholder="Correo del usuario"
                    className="col-span-2"
                    value=""
                />
                <InputForm
                    control={control}
                    name="user"
                    rules={validationUsuario.user}
                    errors={errors}
                    label="Nick de usuario"
                    inputPlaceholder="Nick de usuario"
                    className="col-span-2"
                    value=""
                />
                <InputForm
                    control={control}
                    name="celular"
                    rules={validationUsuario.celular}
                    errors={errors}
                    label="Celular"
                    inputPlaceholder="Celular del usuario"
                    className="col-span-2"
                    value=""
                />
                <SelectRoles
                    control={control}
                    name="id_rol"
                    rules={validationUsuario.rol}
                    errors={errors}
                    className="col-span-2"
                />
                {/* Botón */}
                <div className="col-span-4 flex justify-start mt-2">
                    <Button type="submit">Guardar</Button>
                </div>            
           </form>
        </Dialog>
    )
}

export default FormUsuarios;
