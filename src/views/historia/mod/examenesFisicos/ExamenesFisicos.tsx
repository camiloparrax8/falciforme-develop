import { Card, Button } from '@/components/ui'
import FormExamenesFisicos from './FormExamenesFisicos'
import ImgNino from './body/ImgNino'
import SeccionOne from './body/one/SeccionOne'
import SeccionTwo from './body/two/SeccionTwo'
import SeccionThree from './body/three/SeccionThree'
import { useForm } from 'react-hook-form'
import defaultValues from './defaultValues'
import { crearExamenFisico } from '@/customService/services/ExamenesFisicos'

function ExamenesFisicos() {
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: defaultValues,
        mode: "onBlur", 
    });

    const onSubmit = (data: any) => {
        console.log('Datos enviados:', data);
    };

    return (
        <Card>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Formulario de Exámenes Físicos */}
                <FormExamenesFisicos control={control} errors={errors} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* Columna izquierda */}
                    <ImgNino />

                    {/* Columna derecha dividida en 3 secciones */}
                    <div className="grid grid-rows-3 gap-4">
                        <div className="p-4 text-white">
                            <SeccionOne />
                        </div>
                        <div className="p-4 text-white">
                            <SeccionTwo />
                        </div>
                        <div className="p-4 text-white">
                            <SeccionThree />
                        </div>
                    </div>
                </div>

                {/* Botón de guardar al final */}
                <div className="flex justify-end mt-6">
                    <Button type="submit">Guardar</Button>
                </div>
            </form>
        </Card>
    )
}

export default ExamenesFisicos;
