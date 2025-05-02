import Dialog from "@/components/ui/Dialog";
import { useToken, useSessionUser } from "@/store/authStore";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import SectionTitle from "../common/form/SectionTitle";
import InputForm from "../common/form/InputForm";
import validationUsuario from "@/validation/validationUsuario";
import {crearUsuario} from '@/customService/services/usuariosService'
import SelectRoles from "../common/form/SelectRoles";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

function FormUsuarios({ isOpen, onClose, onRequestClose, setMensaje, actualizarUsuarios }) {
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
    const [mensaje, setMensajeLocal] = useState(null);
    const [estado, setEstado] = useState(true);

    // Función para manejar el mensaje local y propagarlo al componente padre
    const handleSetMensaje = (msg) => {
        setMensajeLocal(msg);
        setMensaje(msg);
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            handleSetMensaje(null);
            const response = await crearUsuario(token, data);
            await actualizarUsuarios(); // <--- actualizar la tabla
            // Pasamos el mensaje de éxito al componente padre antes de cerrar
            setMensaje({ status: 'success', message: response.message || 'Usuario creado con éxito.' });
            onClose();
        } catch (error) {
            // Manejo detallado de errores de la API
            if (error.response?.data?.errors) {
                // Si hay errores de validación múltiples
                const errores = error.response.data.errors.map(err => ({
                    status: 'error',
                    message: `${err.msg}${err.path ? ` (Campo: ${err.path})` : ''}`
                }));
                handleSetMensaje(errores[0]); // Mostramos el primer error
            } else {
                // Si es un error general
                handleSetMensaje({
                    status: 'error',
                    message: error.response?.data?.message || 'Error al crear el usuario.',
                });
            }
        } finally {
            setLoading(false);
        }
    };    

    const handleCambiarEstado = async () => {
        try {
            setLoading(true);
            handleSetMensaje(null);
            const response = await crearUsuario(token, { estado: !estado });
            await actualizarUsuarios(); // <--- actualizar la tabla
            setEstado(!estado);
            handleSetMensaje({ status: 'success', message: response.message || 'Estado del usuario actualizado con éxito.' });
        } catch (error) {
            // Manejo detallado de errores de la API
            if (error.response?.data?.errors) {
                // Si hay errores de validación múltiples
                const errores = error.response.data.errors.map(err => ({
                    status: 'error',
                    message: `${err.msg}${err.path ? ` (Campo: ${err.path})` : ''}`
                }));
                handleSetMensaje(errores[0]); // Mostramos el primer error
            } else {
                // Si es un error general
                handleSetMensaje({
                    status: 'error',
                    message: error.response?.data?.message || 'Error al actualizar el estado del usuario.',
                });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isOpen) {
          reset(); // limpia todos los campos cuando el modal se cierra
        }
      }, [isOpen, reset]);



    return (
        <Dialog
            width={1800}
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
           <form
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-h-[600px] overflow-y-auto pr-2"
           onSubmit={handleSubmit(onSubmit)}>
                <SectionTitle text="Información Básica del Usuario" className="col-span-1 md:col-span-2 lg:col-span-4" />
                
                {/* Mostrar mensaje de error/éxito */}
                {mensaje && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-4 mb-4">
                        <Alert
                            title={mensaje.status === 'error' ? 'Atención' : 'Correcto'}
                            showIcon
                            type={mensaje.status === 'error' ? 'danger' : 'success'}
                            closable
                            duration={5000}
                            onClose={() => handleSetMensaje(null)}
                        >
                            {mensaje.message}
                        </Alert>
                    </div>
                )}
                
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
                <div className="col-span-4 flex justify-between mt-2">
                    <Button type="submit" disabled={loading}>Guardar</Button>
                </div>            
           </form>
        </Dialog>
    )
}

export default FormUsuarios;
