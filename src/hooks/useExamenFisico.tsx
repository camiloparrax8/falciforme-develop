import { useContext } from 'react'
import {
    ExamenFisicoContext,
    ExamenFisicoContextType,
} from '@/context/ExamenFisicoContext'

// Hook personalizado para usar el contexto
export const useExamenFisico = (): ExamenFisicoContextType => {
    const context = useContext(ExamenFisicoContext)
    if (context === undefined) {
        throw new Error(
            'useExamenFisico debe usarse dentro de un ExamenFisicoProvider',
        )
    }
    return context
}
