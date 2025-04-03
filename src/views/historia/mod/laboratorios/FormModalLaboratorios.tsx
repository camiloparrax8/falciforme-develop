import { useForm } from 'react-hook-form'
import InputForm from '@/views/common/form/InputForm'
import Button from '@/components/ui/Button'
import { crearLaboratorio } from '@/customService/services/laboratorioService'
import { useToken } from '@/store/authStore'
import { useState } from 'react'
import validationLaboratorios from '@/validation/validationLaboratorios'

interface LaboratorioFormData {
    hemoglobina: string
    hematies: string
    hematocritos: string
    mcv: string
    mch: string
    mchc: string
    rdw: string
}

interface FormModalLaboratoriosProps {
    eventoForm: (success?: boolean) => void
    idPaciente: string
    idUser: string
}

function FormModalLaboratorios({
    eventoForm,
    idPaciente,
    idUser,
}: FormModalLaboratoriosProps) {
    const { token } = useToken()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LaboratorioFormData>({
        defaultValues: {
            hemoglobina: '',
            hematies: '',
            hematocritos: '',
            mcv: '',
            mch: '',
            mchc: '',
            rdw: '',
        },
    })

    const onSubmit = async (data: LaboratorioFormData) => {
        try {
            setIsLoading(true)
            setError(null)
            const resultado = await crearLaboratorio(token, {
                ...data,
                id_paciente: idPaciente,
                id_user: idUser,
            })

            if (resultado.status === 'success') {
                eventoForm(true)
            } else {
                setError(resultado.message || 'Error al guardar el laboratorio')
            }
        } catch (err) {
            setError('Error al guardar el laboratorio')
            console.error('Error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-6">Nuevo Laboratorio</h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1">
                        <InputForm
                            control={control}
                            name="hemoglobina"
                            label="Hemoglobina (g/dL)"
                            inputPlaceholder="Ingrese la hemoglobina"
                            rules={validationLaboratorios.hemoglobina}
                            errors={errors}
                            value=""
                            className="w-full"
                        />
                    </div>

                    <div className="col-span-1">
                        <InputForm
                            control={control}
                            name="hematies"
                            label="Hematíes (millones/μL)"
                            inputPlaceholder="Ingrese los hematíes"
                            rules={validationLaboratorios.hematies}
                            errors={errors}
                            value=""
                            className="w-full"
                        />
                    </div>

                    <div className="col-span-1">
                        <InputForm
                            control={control}
                            name="hematocritos"
                            label="Hematocritos (%)"
                            inputPlaceholder="Ingrese los hematocritos"
                            rules={validationLaboratorios.hematocritos}
                            errors={errors}
                            value=""
                            className="w-full"
                        />
                    </div>

                    <div className="col-span-1">
                        <InputForm
                            control={control}
                            name="mcv"
                            label="MCV (fL)"
                            inputPlaceholder="Ingrese el MCV"
                            rules={validationLaboratorios.mcv}
                            errors={errors}
                            value=""
                            className="w-full"
                        />
                    </div>

                    <div className="col-span-1">
                        <InputForm
                            control={control}
                            name="mch"
                            label="MCH (pg)"
                            inputPlaceholder="Ingrese el MCH"
                            rules={validationLaboratorios.mch}
                            errors={errors}
                            value=""
                            className="w-full"
                        />
                    </div>

                    <div className="col-span-1">
                        <InputForm
                            control={control}
                            name="mchc"
                            label="MCHC (g/dL)"
                            inputPlaceholder="Ingrese el MCHC"
                            rules={validationLaboratorios.mchc}
                            errors={errors}
                            value=""
                            className="w-full"
                        />
                    </div>

                    <div className="col-span-1">
                        <InputForm
                            control={control}
                            name="rdw"
                            label="RDW (%)"
                            inputPlaceholder="Ingrese el RDW"
                            rules={validationLaboratorios.rdw}
                            errors={errors}
                            value=""
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-8">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => eventoForm(false)}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="solid" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default FormModalLaboratorios
