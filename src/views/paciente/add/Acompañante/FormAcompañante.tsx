import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import validationAcompañante from '../../../../validation/validationAcompañante';
import SelectDocumentType from '@/views/common/form/SelectDocumentType';
import SectionTitle from '@/views/common/form/SectionTitle';
import InputForm from '@/views/common/form/InputForm';
import { Dialog } from '@/components/ui'
function FormAcompañante({ isOpen, onClose, onRequestClose }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: '',
            documentType: '',
            identification: '',
            relationship: '',
            phone: '',
            email: '',
        },
    });
    
    const onSubmit = (data) => {
        console.log('Datos enviados:', data);
    };

    return (
        <Dialog
        width={1200}
        height={510}
        isOpen={isOpen}
        onClose={onClose}
        onRequestClose={onRequestClose}
        >
        <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Sección Información Básica */}
            <SectionTitle text="Información Básica del Acompañante" className="col-span-1 md:col-span-2 lg:col-span-4" />
            <InputForm
                control={control}
                name="fullName"
                rules={validationAcompañante.fullName}
                errors={errors}
                label="Nombre completo"
                inputPlaceholder="Nombre del acompañante"
                className="col-span-1"
                value=""
            />
            <SelectDocumentType
                control={control}
                name="documentType"
                rules={validationAcompañante.documentType}
                errors={errors}
                className="col-span-1"
            />
            <InputForm
                control={control}
                name="identification"
                rules={validationAcompañante.identification}
                errors={errors}
                label="Identificación"
                inputPlaceholder="Número de identificación"
                className="col-span-1"
                value=""
            />
            <InputForm
                control={control}
                name="relationship"
                rules={validationAcompañante.relationship}
                errors={errors}
                label="Relación con el paciente"
                inputPlaceholder="Ejemplo: Hermano"
                className="col-span-1"
                value=""
            />

            {/* Sección Contacto */}
            <SectionTitle text="Contacto del Acompañante" className="col-span-1 md:col-span-2 lg:col-span-4" />
            <InputForm
                control={control}
                name="phone"
                rules={validationAcompañante.phone}
                errors={errors}
                label="Celular"
                inputPlaceholder="Número de celular"
                className="col-span-1"
                value=""
            />
            <InputForm
                control={control}
                name="email"
                rules={validationAcompañante.email}
                errors={errors}
                label="Correo Electrónico"
                inputPlaceholder="Ingrese su correo electrónico"
                className="col-span-1"
                value=""
            />

            {/* Botón */}
            <div className="col-span-4 flex justify-end mt-6">
                <Button type="submit">Guardar</Button>
            </div>
        </form>
        </Dialog>
    );
}

export default FormAcompañante;
