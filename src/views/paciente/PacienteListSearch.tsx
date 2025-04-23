import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import DebouceInput from '@/components/shared/DebouceInput'

type PacienteListSearchProps = {
    onInputChange: (value: string) => void
    onEnter?: (value: string) => void
    initialValue?: string
}

// Tipo personalizado que extiende HTMLInputElement con nuestros métodos adicionales
interface CustomInputElement extends HTMLInputElement {
    clear: () => void
}

const PacienteListSearch = forwardRef<
    CustomInputElement,
    PacienteListSearchProps
>((props, ref) => {
    const { onInputChange, onEnter, initialValue } = props
    const inputRef = useRef<HTMLInputElement | null>(null)

    // Exponer métodos y propiedades del input al componente padre
    useImperativeHandle(ref, () => {
        // Crear un objeto que actúa como proxy para el input
        const inputElement = inputRef.current as unknown as CustomInputElement

        // Añadir el método clear
        if (inputElement) {
            inputElement.clear = () => {
                if (inputRef.current) {
                    inputRef.current.value = ''
                    // Disparar evento de cambio manualmente para sincronizar el estado
                    const event = new Event('input', { bubbles: true })
                    inputRef.current.dispatchEvent(event)
                }
            }
        }

        return inputElement
    })

    // Actualizar el valor del input cuando cambia initialValue
    useEffect(() => {
        if (inputRef.current && initialValue !== undefined) {
            inputRef.current.value = initialValue || ''
        }
    }, [initialValue])

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onEnter) {
            onEnter(e.currentTarget.value)
        }
    }

    return (
        <DebouceInput
            ref={inputRef}
            placeholder="Buscar paciente..."
            defaultValue={initialValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
        />
    )
})

PacienteListSearch.displayName = 'PacienteListSearch'

export default PacienteListSearch
