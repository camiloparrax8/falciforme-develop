import { useContext } from 'react';
import {
    ComplicacionesCronicasContext,
    ComplicacionesCronicasContextType,
} from '@/context/ComplicacionesCronicasContext';

// Hook personalizado para usar el contexto
export const useComplicacionesCronicas = (): ComplicacionesCronicasContextType => {
    const context = useContext(ComplicacionesCronicasContext);
    if (!context) {
        throw new Error(
            'useComplicacionesCronicas debe usarse dentro de un ComplicacionesCronicasProvider'
        );
    }
    return context;
};
