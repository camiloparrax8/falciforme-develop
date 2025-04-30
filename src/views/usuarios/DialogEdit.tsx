import Dialog from '@/components/ui/Dialog'
import { useToken } from '@/store/authStore'
import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import InputForm from '../common/form/InputForm'
import SelectRoles from '../common/form/SelectRoles'
import SectionTitle from '../common/form/SectionTitle'
import validationUsuario from '@/validation/validationUsuario'
import { useForm } from 'react-hook-form'
import { editarUsuario } from '@/customService/services/usuariosService'

function DialogEdit({
    isOpen,
    onClose,
    onRequestClose,
    selectedRow,
    onDialogOkEdit,
    setMensaje,
}) {
    const { token } = useToken()
    const [loading, setLoading] = useState(false)

    // Configuración del formulario con react-hook-form
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    // Cargar los datos en el formulario cuando `selectedRow` cambia
    useEffect(() => {
        if (selectedRow) {
            reset({
                nombre: selectedRow.Nombres || '',
                apellidos: selectedRow.Apellidos || '',
                cedula: selectedRow.Cedula || '',
                correo: selectedRow.Correo || '',
                user: selectedRow.User || '',
                celular: selectedRow.Celular || '',
                rol: selectedRow.Rol || '',
            })
        }
    }, [selectedRow, reset])

    // Manejo del envío del formulario
    const handleFormSubmit = async (data) => {
        setLoading(true)
        try {
            const usuarioActualizado = {
                nombres: data.nombre,
                apellidos: data.apellidos,
                cedula: data.cedula,
                correo: data.correo,
                user: data.user,
                celular: data.celular,
                id_rol: data.rol,
            }
            await editarUsuario(token, selectedRow?.id, usuarioActualizado)
            // Llamar la función de callback para actualizar la UI
            onDialogOkEdit(usuarioActualizado)
            onClose()
            setMensaje({
                status: 'success',
                message: 'Usuario actualizado con éxito.',
            })
        } catch (error) {
            console.error('Error al actualizar usuario:', error)
            alert('Error al actualizar usuario. Inténtalo nuevamente.')
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
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <SectionTitle
                    text="Editar información del Usuario"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />

                <InputForm
                    control={control}
                    name="nombre"
                    rules={validationUsuario.nombres}
                    errors={errors}
                    label="Nombre"
                    inputPlaceholder="Nombre del usuario"
                    className="col-span-2"
                />
                <InputForm
                    control={control}
                    name="apellidos"
                    rules={validationUsuario.apellidos}
                    errors={errors}
                    label="Apellidos"
                    inputPlaceholder="Apellidos del usuario"
                    className="col-span-2"
                />
                <InputForm
                    disabled // Bloquear edición de cédula
                    control={control}
                    name="cedula"
                    rules={validationUsuario.cedula}
                    errors={errors}
                    label="Cédula"
                    inputPlaceholder="Cédula del usuario"
                    className="col-span-2"
                />
                <InputForm
                    control={control}
                    name="correo"
                    rules={validationUsuario.correo}
                    errors={errors}
                    label="Correo"
                    inputPlaceholder="Correo del usuario"
                    className="col-span-2"
                />
                <InputForm
                    control={control}
                    name="user"
                    rules={validationUsuario.user}
                    errors={errors}
                    label="Nick de usuario"
                    inputPlaceholder="Nick de usuario"
                    className="col-span-2"
                />
                <InputForm
                    control={control}
                    name="celular"
                    rules={validationUsuario.celular}
                    errors={errors}
                    label="Celular"
                    inputPlaceholder="Celular del usuario"
                    className="col-span-2"
                />
                <SelectRoles
                    control={control}
                    name="rol"
                    rules={validationUsuario.rol}
                    errors={errors}
                    className="col-span-2"
                />

                {/* Botón */}
                <div className="col-span-4 flex justify-start mt-2">
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Guardando...' : 'Guardar'}
                    </Button>
                </div>
            </form>
        </Dialog>
    )
}

export default DialogEdit
