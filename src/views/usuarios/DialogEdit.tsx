import Dialog from "@/components/ui/Dialog";
import { useToken } from "@/store/authStore";
import { useSessionUser } from "@/store/authStore";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { Form, FormItem } from "@/components/ui/Form";
import InputForm from "../common/form/InputForm";
import SelectRoles from "../common/form/SelectRoles";
import SectionTitle from "../common/form/SectionTitle";
import validationUsuario from "@/validation/validationUsuario";
import { useForm } from "react-hook-form"

function DialogEdit({ isOpen, onClose, onRequestClose, selectedRow, onDialogCloseEdit, onDialogOkEdit}) {
    const { token } = useToken();
    const { user } = useSessionUser();
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit: onSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            nombre: selectedRow?.Nombre || "",
            cedula: selectedRow?.Cedula || "",
            correo: selectedRow?.Correo || "",
            celular: selectedRow?.Celular || "",
            rol: selectedRow?.Rol || "",
        }
    });

    const handleFormSubmit = async (data) => {
        await onDialogOkEdit(data);
    }

    return (
        <Dialog
            width={1800}
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <h5 className="mb-4">Editar Usuario</h5>
            <form
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
           onSubmit={onSubmit(handleFormSubmit)}>
                <SectionTitle text="Información Básica del Usuario" className="col-span-1 md:col-span-2 lg:col-span-4" />
                <InputForm
                    control={control}
                    name="nombre"
                    rules={validationUsuario.nombre}
                    errors={errors}
                    label="Nombre"
                    inputPlaceholder="Nombre del acompañante"
                    className="col-span-2"
                    value={selectedRow?.Nombre || ""}
                />
                <InputForm
                    control={control}
                    name="cedula"
                    rules={validationUsuario.cedula}
                    errors={errors}
                    label="Cedula"
                    inputPlaceholder="Cedula del usuario"
                    className="col-span-2"
                    value={selectedRow?.Cedula || ""}
                    disabled={true}
                />
                <InputForm
                    control={control}
                    name="correo"
                    rules={validationUsuario.correo}
                    errors={errors}
                    label="Correo"
                    inputPlaceholder="Correo del usuario"
                    className="col-span-2"
                    value={selectedRow?.Correo || ""}
                />
                <InputForm
                    control={control}
                    name="celular"
                    rules={validationUsuario.celular}
                    errors={errors}
                    label="Celular"
                    inputPlaceholder="Celular del usuario"
                    className="col-span-2"
                    value={selectedRow?.Celular || ""}
                />
                <SelectRoles
                    control={control}
                    name="rol"
                    rules={validationUsuario.rol}
                    errors={errors}
                    className="col-span-2"
                    value={selectedRow?.Rol || ""}
                />
                {/* Botón */}
                <div className="col-span-4 flex justify-start mt-2">
                    <Button type="submit">Guardar</Button>
                </div>            
           </form>
        </Dialog>
    )
}

export default DialogEdit;