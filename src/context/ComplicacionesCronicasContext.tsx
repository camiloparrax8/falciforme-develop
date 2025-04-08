import React, { createContext, useState, ReactNode } from 'react'

// Interfaz para los datos de las complicaciones crónicas
export interface ComplicacionesCronicasData {
    id?: number
    id_paciente?: number
    fecha_diagnostico?: string
    estado?: string
    id_user_create?: number
    vasculopatia_cerebral?: boolean | null
    infartos_cerebrales_silentes?: boolean | null
    epilepsia_convulsiones?: boolean | null
    cefaleas_recurrentes?: boolean | null
    deficit_cognitivo?: boolean | null
    retinopatia_drepanocitica?: boolean | null
    hemorragias_vitreas?: boolean | null
    neovascularizacion_retiniana?: boolean | null
    iritis_uveitis?: boolean | null
    oclusion_vasos_retinianos?: boolean | null
    disfuncion_diastolica_vii?: boolean
    sobrecarga_ferrica?: boolean
    trombosis?: boolean
    hipertension_pulmonar?: boolean
    vrt?: string
    numero_crisis?: number
    tratamientos?: string
    hipomexia?: boolean
    saos?: boolean
    edpfc_tratamiento?: string
    hepatitis_viral_cronica?: boolean
    esplenomegalia?: boolean
    hiperesplenismo?: boolean
    nefropatia?: boolean
    acidosis_tubular?: boolean
    priapismo_recurrente?: boolean
    proteinuria?: boolean
    hipotensia?: boolean
    hematuria_necrosis_papilar?: boolean
    enfermedad_renal_cronica?: boolean
    huesos_comprometidos?: string
    osteonecrosis?: boolean
    osteopenia?: boolean
    grado_discapacidad?: string
    deformidades_osea?: boolean
    [key: string]: number | string | boolean | undefined | null
}

// Define la interfaz para los datos del contexto
export interface ComplicacionesCronicasContextType {
    complicacionData: ComplicacionesCronicasData | null
    setComplicacionData: (data: ComplicacionesCronicasData | null) => void
    actualizarComplicacion: () => Promise<void>
}

// Crea el contexto
export const ComplicacionesCronicasContext =
    createContext<ComplicacionesCronicasContextType>({
        complicacionData: null,
        setComplicacionData: () => {},
        actualizarComplicacion: async () => {},
    })

// Proveedor del contexto
export function ComplicacionesCronicasProvider({
    children,
    initialComplicacion,
    actualizarComplicacion,
}: {
    children: ReactNode
    initialComplicacion?: ComplicacionesCronicasData
    actualizarComplicacion: () => Promise<void>
}) {
    const [complicacionData, setComplicacionData] =
        useState<ComplicacionesCronicasData | null>(initialComplicacion || null)

    return (
        <ComplicacionesCronicasContext.Provider
            value={{
                complicacionData,
                setComplicacionData,
                actualizarComplicacion,
            }}
        >
            {children}
        </ComplicacionesCronicasContext.Provider>
    )
}

// Hook personalizado para usar el contexto
export function useComplicacionesCronicas() {
    const context = React.useContext(ComplicacionesCronicasContext)
    if (!context) {
        throw new Error(
            'useComplicacionesCronicas debe ser usado dentro de un ComplicacionesCronicasProvider',
        )
    }
    return context
}
