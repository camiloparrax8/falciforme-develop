/* eslint-disable react/jsx-sort-props */
import { lazy, Suspense, useState } from 'react'
import Spinner from '@/components/ui/Spinner'
import { Alert } from '@/components/ui'
import Button from '@/components/ui/Button'
import classNames from '@/utils/classNames'

// Importaciones lazy de los componentes
const EditEstadoHBS = lazy(() => import('./EditEstadoHBS'))
const EditEnfermedadesCronicas = lazy(
    () => import('./EditEnfermedadesCronicas'),
)

interface EditFormAntFamiliaresProps {
    idPaciente: number
    onClose?: () => void
}

const EditFormAntFamiliares = ({
    idPaciente,
    onClose,
}: EditFormAntFamiliaresProps) => {
    const [activeForm, setActiveForm] = useState<'hbs' | 'cronicas'>('hbs')
    const [mensaje, setMensaje] = useState<{
        status: string
        message: string
    } | null>(null)

    const handleSuccess = (message: string) => {
        setMensaje({
            status: 'success',
            message,
        })
        if (onClose) setTimeout(onClose, 1500)
    }

    return (
        <div className="flex flex-col w-full">
            {/* Mostrar mensaje de alerta */}
            {mensaje && (
                <div className="mb-4">
                    <Alert
                        title={
                            mensaje?.status === 'error'
                                ? 'Atención'
                                : 'Correcto'
                        }
                        type={
                            mensaje?.status === 'error' ? 'danger' : 'success'
                        }
                        duration={5000}
                        onClose={() => setMensaje(null)}
                        closable
                        showIcon
                    >
                        {mensaje?.message}
                    </Alert>
                </div>
            )}

            {/* Botones de navegación */}
            <div className="flex gap-4 mb-6">
                <Button
                    variant={activeForm === 'hbs' ? 'solid' : 'default'}
                    onClick={() => setActiveForm('hbs')}
                    className={classNames(
                        'flex-1',
                        activeForm === 'hbs' ? 'bg-primary text-white' : '',
                    )}
                >
                    Estado HBS
                </Button>
                <Button
                    variant={activeForm === 'cronicas' ? 'solid' : 'default'}
                    onClick={() => setActiveForm('cronicas')}
                    className={classNames(
                        'flex-1',
                        activeForm === 'cronicas'
                            ? 'bg-primary text-white'
                            : '',
                    )}
                >
                    E. Crónicas
                </Button>
            </div>

            {/* Contenido condicional */}
            <div className="w-full">
                <Suspense
                    fallback={
                        <div className="my-4 mx-auto text-center flex justify-center">
                            <Spinner size={40} />
                        </div>
                    }
                >
                    {activeForm === 'hbs' ? (
                        <EditEstadoHBS
                            idPaciente={idPaciente}
                            onClose={() =>
                                handleSuccess(
                                    'Estado HBS actualizado correctamente',
                                )
                            }
                        />
                    ) : (
                        <EditEnfermedadesCronicas
                            idPaciente={idPaciente}
                            onClose={() =>
                                handleSuccess(
                                    'Enfermedades crónicas actualizadas correctamente',
                                )
                            }
                        />
                    )}
                </Suspense>
            </div>
        </div>
    )
}

export default EditFormAntFamiliares
