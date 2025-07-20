/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import validationAntecedentesPerinatologicos from '../../../../validation/validationAntecedentesPerinatologicos'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputForm from '@/views/common/form/InputForm'
import InputSelect from '@/views/common/form/InputSelect'
import {
    CrearPerinatologico,
    BuscarPerinatologicos,
} from '@/customService/services/perinatologicasService'
import { useToken, useSessionUser } from '@/store/authStore'
import { usePatient } from '@/context/PatientContext'
import { useEffect, useState } from 'react'
import Alert from '@/components/ui/Alert'

function FormAntPerinatologicos({}) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            peso_al_nacer: '',
            talla_al_nacer: '',
            nota: '',
            condicion: '',
            cuidado: '',
            ictericia: '',
        },
    })

    const { paciente } = usePatient()
    const { token } = useToken()
    const { user } = useSessionUser()
    const [actualizar, setActualizar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [mensajes, setMensajes] = useState([])
    const [dialogIsOpen, setIsOpen] = useState(false)

    const VerificarPerinatologico = async (idPaciente) => {
        try {
            const response = await BuscarPerinatologicos(token, idPaciente)
            return response && response.data ? true : false
        } catch (error) {
            console.error('Error verificando antecedente:', error)
            return false
        }
    }

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            setMensajes([])

            if (!paciente.id) {
                setMensajes([
                    { status: 'error', message: 'Seleccione un paciente' },
                ])
                setLoading(false)
                return
            }

            // Verificar si ya existe un antecedente para el paciente
            const existeAntecedente = await VerificarPerinatologico(paciente.id)
            if (existeAntecedente) {
                setMensajes([
                    {
                        status: 'error',
                        message:
                            'Ya existe un antecedente perinatológico para este paciente',
                    },
                ])
                setLoading(false)
                return
            }

            const datos = {
                peso_al_nacer: data.peso_al_nacer?.trim() || '',
                talla_al_nacer: data.talla_al_nacer?.trim() || '',
                nota: data.nota?.trim() || '',
                condicion_al_nacer: data.condicion_al_nacer?.trim() || '',
                cuidado_neonatal: data.cuidado_neonatal?.trim() || '',
                etirico_neonatal: data.etirico_neonatal?.trim() || '',
                id_paciente: paciente.id,
                id_user_create: user.id,
            }

            const response = await CrearPerinatologico(
                token,
                user.id,
                paciente.id,
                datos,
            )

            if (response.status === 'success') {
                setMensajes([
                    {
                        status: 'success',
                        message:
                            'Antecedente perinatológico agregado con éxito',
                    },
                ])
                setActualizar((prev) => !prev)
                setTimeout(() => setIsOpen(false), 500)
            } else {
                setMensajes([{ status: 'error', message: response.message }])
            }
        } catch (error) {
            setMensajes([
                {
                    status: 'error',
                    message: 'Error al guardar el antecedente perinatológico',
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    const optionsCondicionAlNacer = [
        { value: 'Saludable', label: 'Saludable' },
        { value: 'Sin complicaciones', label: 'Sin complicaciones' },
        { value: 'Nacido a término', label: 'Nacido a término' },
        { value: 'Prematuro', label: 'Prematuro' },
        { value: 'Postérmino', label: 'Postérmino' },
    ]

    const optionsCuidadoNeoNatal = [
        { value: 'No requerido', label: 'No requerido' },
        {
            value: 'Observación en incubadora',
            label: 'Observación en incubadora',
        },
        {
            value: 'Fototerapia por ictericia',
            label: 'Fototerapia por ictericia',
        },
        {
            value: 'Monitoreo de signos vitales',
            label: 'Monitoreo de signos vitales',
        },
        { value: 'Observación estándar', label: 'Observación estándar' },
    ]

    const optionEtiricoNeonatal = [
        { value: 'Sí', label: 'Sí' },
        { value: 'No', label: 'No' },
    ]

    return (
        <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Sección Información Básica */}
            <SectionTitle
                text="Antecedentes Perinatologicos"
                className="col-span-1 md:col-span-2 lg:col-span-4"
            />

            {/* Alertas */}
            {mensajes.length > 0 && (
                <div className="col-span-4 mb-4">
                    {mensajes.map((msg, index) => (
                        <Alert
                            key={index}
                            showIcon
                            closable
                            title={
                                msg.status === 'error' ? 'Atención' : 'Correcto'
                            }
                            type={msg.status === 'error' ? 'danger' : 'success'}
                            duration={60000}
                        >
                            {msg.message}
                        </Alert>
                    ))}
                </div>
            )}

            <InputForm
                control={control}
                name="peso_al_nacer"
                rules={validationAntecedentesPerinatologicos.pesoAlNacer}
                errors={errors}
                label="Peso al nacer (kg)"
                inputPlaceholder="Peso"
                className="col-span-1"
                value=""
            />

            <InputForm
                control={control}
                name="talla_al_nacer"
                rules={validationAntecedentesPerinatologicos.tallaAlNacer}
                errors={errors}
                label="Talla al nacer (cm)"
                inputPlaceholder="Talla CM"
                className="col-span-1"
                value=""
            />

            <InputForm
                control={control}
                name="nota"
                rules={validationAntecedentesPerinatologicos.nota}
                errors={errors}
                label="Nota"
                inputPlaceholder="Nota"
                className="col-span-1"
                value=""
            />

            <InputSelect
                control={control}
                name="condicion_al_nacer"
                validation={
                    validationAntecedentesPerinatologicos.condicionAlNacer
                }
                errors={errors}
                label="Condición del nacimiento"
                placeholder="Condición al nacer"
                className="col-span-1"
                options={optionsCondicionAlNacer}
            />

            <InputSelect
                control={control}
                name="cuidado_neonatal"
                validation={
                    validationAntecedentesPerinatologicos.cuidadoNeonatal
                }
                errors={errors}
                label="Cuidado neonatal"
                placeholder="Cuidado neonatal"
                className="col-span-1"
                options={optionsCuidadoNeoNatal}
            />

            <InputSelect
                control={control}
                name="etirico_neonatal"
                validation={
                    validationAntecedentesPerinatologicos.etiricoNeonatal
                }
                errors={errors}
                label="Etirico neonatal"
                placeholder="Etirico neonatal"
                className="col-span-1"
                options={optionEtiricoNeonatal}
            />

            {/* Botón */}
            <div className="col-span-4 flex justify-end mt-6">
                <Button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>
        </form>
    )
}

export default FormAntPerinatologicos
