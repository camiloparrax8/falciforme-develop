import React, { createContext, useState, ReactNode } from 'react'

// Define la interfaz para los datos del contexto
export interface ExamenFisicoContextType {
    idExamenFisico: number | null
    setIdExamenFisico: (id: number | null) => void
}

// Crea el contexto
export const ExamenFisicoContext = createContext<
    ExamenFisicoContextType | undefined
>(undefined)

// Proveedor del contexto
export const ExamenFisicoProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [idExamenFisico, setIdExamenFisico] = useState<number | null>(null)

    const value = {
        idExamenFisico,
        setIdExamenFisico,
    }

    return (
        <ExamenFisicoContext.Provider value={value}>
            {children}
        </ExamenFisicoContext.Provider>
    )
}
