import React, { createContext, useState, ReactNode, useEffect } from 'react'

// Interfaz para los datos del examen
export interface ExamenFisicoData {
    id: number
    id_paciente: number
    frecuencia_cardiaca?: number
    frecuencia_respiratoria?: number
    saturacion_oxigeno?: number
    tension_arterial?: string
    peso?: number
    talla?: number
    imc?: number
    perimetro_cefalico?: number
    vision?: string
    [key: string]: number | string | boolean | undefined | null
}

// Define la interfaz para los datos del contexto
export interface ExamenFisicoContextType {
    idExamenFisico: number | null
    setIdExamenFisico: (id: number | null) => void
    examenData: ExamenFisicoData | null
    setExamenData: (data: ExamenFisicoData | null) => void
}

// Crea el contexto
export const ExamenFisicoContext = createContext<
    ExamenFisicoContextType | undefined
>(undefined)

// Proveedor del contexto
export const ExamenFisicoProvider: React.FC<{
    children: ReactNode
    initialExamen?: ExamenFisicoData | null
}> = ({ children, initialExamen = null }) => {
    const [idExamenFisico, setIdExamenFisico] = useState<number | null>(
        initialExamen?.id || null,
    )
    const [examenData, setExamenData] = useState<ExamenFisicoData | null>(
        initialExamen,
    )

    // Actualizar el ID y los datos cuando cambie initialExamen
    useEffect(() => {
        if (initialExamen) {
            setIdExamenFisico(initialExamen.id)
            setExamenData(initialExamen)
        }
    }, [initialExamen])

    const value = {
        idExamenFisico,
        setIdExamenFisico,
        examenData,
        setExamenData,
    }

    return (
        <ExamenFisicoContext.Provider value={value}>
            {children}
        </ExamenFisicoContext.Provider>
    )
}
