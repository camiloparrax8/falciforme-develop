import { Button } from '@/components/ui'
import { useState, useEffect } from 'react'
import { FaUpload, FaEye } from 'react-icons/fa'
import ModalPerimetroCefalico from './modals/ModalPerimetroCefalico'
import ModalAgudezaVisual from './modals/ModalAgudezaVisual'
import ModalExamenORL from './modals/ModalExamenORL'
import ModalCaries from './modals/ModalCaries'
import ModalCuello from './modals/ModalCuello'
import SectionTitle from '@/views/common/form/SectionTitle'
import { useExamenFisico } from '@/hooks/useExamenFisico'
import { useParams } from 'react-router-dom'

function SeccionOne() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { idExamenFisico, examenData } = useExamenFisico()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id_paciente } = useParams()

    const icon = <FaUpload />
    const iconEye = <FaEye />

    // Estados para cada modal
    const [dialogIsOpenPerimetroCefalico, setDialogIsOpenPerimetroCefalico] =
        useState(false)
    const [dialogIsOpenAgudezaVisual, setDialogIsOpenAgudezaVisual] =
        useState(false)
    const [dialogIsOpenExamenORL, setDialogIsOpenExamenORL] = useState(false)
    const [dialogIsOpenCaries, setDialogIsOpenCaries] = useState(false)
    const [dialogIsOpenCuello, setDialogIsOpenCuello] = useState(false)

    // Métodos para abrir y cerrar modales
    const openDialog = (setDialog) => setDialog(true)
    const closeDialog = (setDialog) => {
        setDialog(false)
    }

    // Función específica para cerrar el modal al insertar un registro
    const closeModal = () => {
        setDialogIsOpenAgudezaVisual(false)
        setDialogIsOpenPerimetroCefalico(false)
        setDialogIsOpenExamenORL(false)
        setDialogIsOpenCaries(false)
        setDialogIsOpenCuello(false)
    }

    // Efecto para cerrar modal con ESC
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                // Cerrar todos los modales abiertos
                setDialogIsOpenPerimetroCefalico(false)
                setDialogIsOpenAgudezaVisual(false)
                setDialogIsOpenExamenORL(false)
                setDialogIsOpenCaries(false)
                setDialogIsOpenCuello(false)
            }
        }
        window.addEventListener('keydown', handleEscapeKey)
        return () => window.removeEventListener('keydown', handleEscapeKey)
    }, [])

    // Función para verificar existencia de cada tipo de dato
    const tienePerimetroCefalico = () => {
        return (
            examenData?.perimetro_cefalico !== undefined &&
            examenData?.perimetro_cefalico !== null
        )
    }

    const tieneAgudezaVisual = () => {
        return (
            examenData?.vision !== undefined &&
            examenData?.vision !== null &&
            examenData?.vision !== ''
        )
    }

    const tieneExamenORL = () => {
        return (
            (examenData?.examen_boca !== undefined &&
                examenData?.examen_boca !== null &&
                examenData?.examen_boca !== '') ||
            (examenData?.examen_nariz !== undefined &&
                examenData?.examen_nariz !== null &&
                examenData?.examen_nariz !== '') ||
            (examenData?.examen_oidos !== undefined &&
                examenData?.examen_oidos !== null &&
                examenData?.examen_oidos !== '')
        )
    }

    const tieneCaries = () => {
        // Ahora simplemente verificamos si el valor no es null ni undefined
        return examenData?.caries !== null && examenData?.caries !== undefined
    }

    const tieneCuello = () => {
        return (
            examenData?.cuello !== undefined &&
            examenData?.cuello !== null &&
            examenData?.cuello !== ''
        )
    }

    return (
        <>
            <SectionTitle
                text={'Región Cefálica o Superior (Cabeza y Cuello)'}
                className={'mt-3'}
            />

            <div className="flex flex-wrap gap-3 mb-6">
                <Button
                    variant="solid"
                    icon={tienePerimetroCefalico() ? iconEye : icon}
                    className={`px-4 py-2 ${
                        tienePerimetroCefalico()
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    onClick={() => openDialog(setDialogIsOpenPerimetroCefalico)}
                >
                    <span className="whitespace-nowrap">
                        {tienePerimetroCefalico()
                            ? 'Ver Perímetro'
                            : 'Perímetro Cefálico'}
                    </span>
                </Button>

                <Button
                    variant="solid"
                    icon={tieneAgudezaVisual() ? iconEye : icon}
                    className={`px-4 py-2 ${
                        tieneAgudezaVisual()
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    onClick={() => openDialog(setDialogIsOpenAgudezaVisual)}
                >
                    <span className="whitespace-nowrap">
                        {tieneAgudezaVisual()
                            ? 'Ver Agudeza Visual'
                            : 'Agudeza Visual'}
                    </span>
                </Button>

                <Button
                    variant="solid"
                    icon={tieneExamenORL() ? iconEye : icon}
                    className={`px-4 py-2 ${
                        tieneExamenORL()
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    onClick={() => openDialog(setDialogIsOpenExamenORL)}
                >
                    <span className="whitespace-nowrap">
                        {tieneExamenORL() ? 'Ver Examen ORL' : 'Examen ORL'}
                    </span>
                </Button>

                <div className="w-full"></div>

                <Button
                    variant="solid"
                    icon={tieneCaries() ? iconEye : icon}
                    className={`px-4 py-2 ${
                        tieneCaries()
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    onClick={() => openDialog(setDialogIsOpenCaries)}
                >
                    <span className="whitespace-nowrap">
                        {tieneCaries() ? 'Ver Caries' : 'Caries'}
                    </span>
                </Button>

                <Button
                    variant="solid"
                    icon={tieneCuello() ? iconEye : icon}
                    className={`px-4 py-2 ${
                        tieneCuello()
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    onClick={() => openDialog(setDialogIsOpenCuello)}
                >
                    <span className="whitespace-nowrap">
                        {tieneCuello() ? 'Ver Cuello' : 'Cuello'}
                    </span>
                </Button>
            </div>

            {/* Modales */}
            <ModalPerimetroCefalico
                isOpen={dialogIsOpenPerimetroCefalico}
                onClose={closeModal}
                onRequestClose={() =>
                    closeDialog(setDialogIsOpenPerimetroCefalico)
                }
            />

            <ModalAgudezaVisual
                isOpen={dialogIsOpenAgudezaVisual}
                onClose={closeModal}
                onRequestClose={() => closeDialog(setDialogIsOpenAgudezaVisual)}
            />

            <ModalExamenORL
                isOpen={dialogIsOpenExamenORL}
                onClose={closeModal}
                onRequestClose={() => closeDialog(setDialogIsOpenExamenORL)}
            />

            <ModalCaries
                isOpen={dialogIsOpenCaries}
                onClose={closeModal}
                onRequestClose={() => closeDialog(setDialogIsOpenCaries)}
            />

            <ModalCuello
                isOpen={dialogIsOpenCuello}
                onClose={closeModal}
                onRequestClose={() => closeDialog(setDialogIsOpenCuello)}
            />
        </>
    )
}

export default SeccionOne
