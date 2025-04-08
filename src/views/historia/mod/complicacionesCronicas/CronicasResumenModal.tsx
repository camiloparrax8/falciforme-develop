import { useState, useEffect, useCallback } from 'react'
import { Button, Dialog } from '@/components/ui'
import { FaEye } from 'react-icons/fa'
import { useComplicacionesCronicas } from '@/context/ComplicacionesCronicasContext'
import { useParams } from 'react-router-dom'
import { useToken } from '@/store/authStore'
import { buscarComplicacionesCronicasPorIdPaciente } from '@/customService/services/complicacionesCronicasService'

// Mapeo personalizado de claves
const nombresCampos: Record<string, string> = {
    // Región Cefálica
    vasculopatia_cerebral: 'Vasculopatía cerebral',
    infartos_cerebrales_silentes: 'Infartos cerebrales silentes',
    epilepsia_convulsiones: 'Epilepsia y convulsiones',
    cefaleas_recurrentes: 'Cefaleas recurrentes',
    deficit_cognitivo: 'Déficit cognitivo',
    retinopatia_drepanocitica: 'Retinopatía drepanocítica',
    hemorragias_vitreas: 'Hemorragias vítreas',
    neovascularizacion_retiniana: 'Neovascularización retiniana',
    iritis_uveitis: 'Iritis o uveítis',
    oclusion_vasos_retinianos: 'Oclusión de vasos retinianos',

    // Región Toracoabdominal
    disfuncion_diastolica_vii: 'Disfunción Diastólica del VI',
    sobrecarga_ferrica: 'Abdominal',
    trombosis: 'Trombosis',
    hipertension_pulmonar: 'Hipertensión Pulmonar',
    vrt: 'VRT',
    hepatitis_viral_cronica: 'Hepatitis Viral Crónica',
    esplenomegalia: 'Esplenomegalia',
    hiperesplenismo: 'Hiperesplenismo',
    // Asma y Sibilancias
    asma_numero_crisis: 'Número de crisis / año',
    asma_tratamientos: 'Tratamientos',
    // Seccion EPFC
    epfc_hipomexia: 'Hipomexia',
    epfc_saos: 'SAOS',
    epfc_tratamiento: 'Tratamiento',

    // Región Pélvica
    nefropatia: 'Nefropatía',
    hipotensia: 'Hipostenia',
    acidosis_tubular: 'Acidosis Tubular',
    hematuria_necrosis_papilar: 'Hematuria y Necrosis Papilar Renal',
    priapismo_recurrente: 'Priapismo Recurrente',
    enfermedad_renal_cronica: 'Enfermedad Renal Crónica',
    proteinuria: 'Proteinuria',
    huesos_comprometidos: 'Hueso Comprometido',
    grado_discapacidad: 'Grado de Discapacidad',
    osteonecrosis: 'Osteonecrosis',
    deformidades_osea: 'Deformidades Óseas',
    osteopenia: 'Osteopenia',
}

// Componente principal
function CronicasResumenModal() {
    const [isOpen, setIsOpen] = useState(false)
    const { complicacionData, setComplicacionData } = useComplicacionesCronicas()
    const { id_paciente } = useParams()
    const { token } = useToken()
    const [regionCefalica, setRegionCefalica] = useState<Record<string, unknown>>({})
    const [regionToracoabdominal, setRegionToracoabdominal] = useState<Record<string, unknown>>({})
    const [regionPelvica, setRegionPelvica] = useState<Record<string, unknown>>({})

    // Función para cargar los datos más recientes
    const cargarDatosActualizados = useCallback(async () => {
        if (!id_paciente || !token) return

        try {
            const resultado = await buscarComplicacionesCronicasPorIdPaciente(
                token,
                id_paciente
            )

            const complicacionActualizada = resultado?.data || resultado

            if (complicacionActualizada && complicacionActualizada.id) {
                setComplicacionData(complicacionActualizada)
            }
        } catch (error) {
            console.error('Error al actualizar datos de complicaciones:', error)
        }
    }, [id_paciente, token, setComplicacionData])

    const handleOpenModal = async () => {
        await cargarDatosActualizados()
        setIsOpen(true)
    }

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    // Organizar datos por regiones
    useEffect(() => {
        if (!complicacionData) {
            setRegionCefalica({})
            setRegionToracoabdominal({})
            setRegionPelvica({})
            return
        }

        // Datos de región cefálica
        setRegionCefalica({
            vasculopatia_cerebral: complicacionData.vasculopatia_cerebral === null ? 'No registrado' : complicacionData.vasculopatia_cerebral ? 'Si' : 'No',
            infartos_cerebrales_silentes: complicacionData.infartos_cerebrales_silentes === null ? 'No registrado' : complicacionData.infartos_cerebrales_silentes ? 'Si' : 'No',
            epilepsia_convulsiones: complicacionData.epilepsia_convulsiones === null ? 'No registrado' : complicacionData.epilepsia_convulsiones ? 'Si' : 'No',
            cefaleas_recurrentes: complicacionData.cefaleas_recurrentes === null ? 'No registrado' : complicacionData.cefaleas_recurrentes ? 'Si' : 'No',
            deficit_cognitivo: complicacionData.deficit_cognitivo === null ? 'No registrado' : complicacionData.deficit_cognitivo ? 'Si' : 'No',
            retinopatia_drepanocitica: complicacionData.retinopatia_drepanocitica === null ? 'No registrado' : complicacionData.retinopatia_drepanocitica ? 'Si' : 'No',
            hemorragias_vitreas: complicacionData.hemorragias_vitreas === null ? 'No registrado' : complicacionData.hemorragias_vitreas ? 'Si' : 'No',
            neovascularizacion_retiniana: complicacionData.neovascularizacion_retiniana === null ? 'No registrado' : complicacionData.neovascularizacion_retiniana ? 'Si' : 'No',
            iritis_uveitis: complicacionData.iritis_uveitis === null ? 'No registrado' : complicacionData.iritis_uveitis ? 'Si' : 'No',
            oclusion_vasos_retinianos: complicacionData.oclusion_vasos_retinianos === null ? 'No registrado' : complicacionData.oclusion_vasos_retinianos ? 'Si' : 'No'
        })

        // Datos de región toracoabdominal
        setRegionToracoabdominal({
            disfuncion_diastolica_vii: complicacionData.disfuncion_diastolica_vii === null ? 'No registrado' : complicacionData.disfuncion_diastolica_vii ? 'Si' : 'No',
            sobrecarga_ferrica: complicacionData.sobrecarga_ferrica === null ? 'No registrado' : complicacionData.sobrecarga_ferrica ? 'Si' : 'No',
            trombosis: complicacionData.trombosis === null ? 'No registrado' : complicacionData.trombosis ? 'Si' : 'No',
            hipertension_pulmonar: complicacionData.hipertension_pulmonar === null ? 'No registrado' : complicacionData.hipertension_pulmonar ? 'Si' : 'No',
            vrt: complicacionData.vrt || 'No registrado',
            asma_numero_crisis: complicacionData.numero_crisis || 'No registrado',
            asma_tratamientos: complicacionData.tratamientos || 'No registrado',
            epfc_hipomexia: complicacionData.hipomexia === null ? 'No registrado' : complicacionData.hipomexia ? 'Si' : 'No',
            epfc_saos: complicacionData.saos === null ? 'No registrado' : complicacionData.saos ? 'Si' : 'No',
            epfc_tratamiento: complicacionData.edpfc_tratamiento || 'No registrado',
            hepatitis_viral_cronica: complicacionData.hepatitis_viral_cronica === null ? 'No registrado' : complicacionData.hepatitis_viral_cronica ? 'Si' : 'No',
            esplenomegalia: complicacionData.esplenomegalia === null ? 'No registrado' : complicacionData.esplenomegalia ? 'Si' : 'No',
            hiperesplenismo: complicacionData.hiperesplenismo === null ? 'No registrado' : complicacionData.hiperesplenismo ? 'Si' : 'No',
        })

        // Datos de región pélvica
        setRegionPelvica({
            nefropatia: complicacionData.nefropatia === null ? 'No registrado' : complicacionData.nefropatia ? 'Si' : 'No',
            hipotensia: complicacionData.hipotensia === null ? 'No registrado' : complicacionData.hipotensia ? 'Si' : 'No',
            acidosis_tubular: complicacionData.acidosis_tubular === null ? 'No registrado' : complicacionData.acidosis_tubular ? 'Si' : 'No',
            hematuria_necrosis_papilar: complicacionData.hematuria_necrosis_papilar === null ? 'No registrado' : complicacionData.hematuria_necrosis_papilar ? 'Si' : 'No',
            priapismo_recurrente: complicacionData.priapismo_recurrente === null ? 'No registrado' : complicacionData.priapismo_recurrente ? 'Si' : 'No',
            enfermedad_renal_cronica: complicacionData.enfermedad_renal_cronica === null ? 'No registrado' : complicacionData.enfermedad_renal_cronica ? 'Si' : 'No',
            proteinuria: complicacionData.proteinuria === null ? 'No registrado' : complicacionData.proteinuria ? 'Si' : 'No',
            huesos_comprometidos: complicacionData.huesos_comprometidos || 'No registrado',
            grado_discapacidad: complicacionData.grado_discapacidad || 'No registrado',
            osteonecrosis: complicacionData.osteonecrosis === null ? 'No registrado' : complicacionData.osteonecrosis ? 'Si' : 'No',
            deformidades_osea: complicacionData.deformidades_osea === null ? 'No registrado' : complicacionData.deformidades_osea ? 'Si' : 'No',
            osteopenia: complicacionData.osteopenia === null ? 'No registrado' : complicacionData.osteopenia ? 'Si' : 'No',
        })
    }, [complicacionData])

    // Renderizar datos de una región
    const renderDatosRegion = (datos: Record<string, unknown>) => {
        if (!datos || Object.keys(datos).length === 0) {
            return (
                <p className="text-gray-500 italic">
                    No hay datos disponibles para esta región.
                </p>
            )
        }

        return (
            <div className="space-y-6">
                {/* Renderizar campos principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {Object.entries(datos).map(([clave, valor]) => {
                        if (clave.startsWith('asma_') || clave.startsWith('epfc_')) return null; // Skip campos de asma aquí
                        return (
                            <div
                                key={clave}
                                className="border p-3 rounded-md bg-gray-50 min-h-[80px] flex flex-col"
                            >
                                <div className="font-bold text-base text-slate-950 mb-1 border-b pb-1">
                                    {nombresCampos[clave] || clave}
                                </div>
                                <div className="text-gray-800 text-base overflow-auto max-h-[150px] whitespace-normal break-words">
                                    {valor !== undefined && valor !== null ? String(valor) : 'No registrado'}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Renderizar subsección Asma y Sibilancias */}
                {Object.entries(datos).some(([clave]) => clave.startsWith('asma_')) && (
                    <div className="mt-4">
                        <h6 className="font-medium mb-3 text-blue-500 text-lg border-b pb-2">
                            Asma y Sibilancias
                        </h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                            {Object.entries(datos)
                                .filter(([clave]) => clave.startsWith('asma_'))
                                .map(([clave, valor]) => (
                                    <div
                                        key={clave}
                                        className="border p-3 rounded-md bg-gray-50 min-h-[80px] flex flex-col"
                                    >
                                        <div className="font-bold text-base text-slate-950 mb-1 border-b pb-1">
                                            {nombresCampos[clave]}
                                        </div>
                                        <div className="text-gray-800 text-base overflow-auto max-h-[150px] whitespace-normal break-words">
                                            {valor !== undefined && valor !== null ? String(valor) : 'No registrado'}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
                {/* Renderizar subsección Seccion EPFC */}
                {Object.entries(datos).some(([clave]) => clave.startsWith('epfc_')) && (
                    <div className="mt-4">
                        <h6 className="font-medium mb-3 text-blue-500 text-lg border-b pb-2">
                            Seccion EPFC
                        </h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                            {Object.entries(datos)
                                .filter(([clave]) => clave.startsWith('epfc_'))
                                .map(([clave, valor]) => (
                                    <div
                                        key={clave}
                                        className="border p-3 rounded-md bg-gray-50 min-h-[80px] flex flex-col"
                                    >
                                        <div className="font-bold text-base text-slate-950 mb-1 border-b pb-1">
                                            {nombresCampos[clave]}
                                        </div>
                                        <div className="text-gray-800 text-base overflow-auto max-h-[150px] whitespace-normal break-words">
                                            {valor !== undefined && valor !== null ? String(valor) : 'No registrado'}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <>
            <div className="inline-flex">
                <Button
                    variant="solid"
                    icon={<FaEye />}
                    onClick={handleOpenModal}
                >
                    Ver Regiones
                </Button>
            </div>

            <Dialog
                isOpen={isOpen}
                width={3000}
                onClose={handleCloseModal}
                onRequestClose={handleCloseModal}
            >
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold">
                        Complicaciones Cronicas por Regiones
                    </h4>
                </div>

                {!complicacionData ? (
                    <div className="p-4 text-red-500">
                        <p>No hay un examen físico registrado.</p>
                    </div>
                ) : (
                    <div className="p-4 overflow-auto max-h-[65vh]">
                        <div className="mb-8">
                            <h5 className="font-medium mb-3 text-blue-600 text-xl border-b pb-2">
                                Región Cefálica o Superior (Cabeza y Cuello)
                            </h5>
                            {renderDatosRegion(regionCefalica)}
                        </div>

                        <div className="mb-8">
                            <h5 className="font-medium mb-3 text-blue-600 text-xl border-b pb-2">
                                Región Toracoabdominal o Media (Tórax y Abdomen)
                            </h5>
                            {renderDatosRegion(regionToracoabdominal)}
                        </div>

                        <div className="mb-8">
                            <h5 className="font-medium mb-3 text-blue-600 text-xl border-b pb-2">
                                Región Pélvica o Inferior (Pelvis y Extremidades Inferiores)
                            </h5>
                            {renderDatosRegion(regionPelvica)}
                        </div>
                    </div>
                )}

                <div className="flex justify-end mt-4">
                    <Button onClick={handleCloseModal}>Cerrar</Button>
                </div>
            </Dialog>
        </>
    )
}

export default CronicasResumenModal
