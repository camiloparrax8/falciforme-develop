import React from 'react'
import Alert from './Alert'
import type { CommonProps } from './@types/common'
import type { ReactNode, MouseEvent } from 'react'

export interface AlertCustomProps extends CommonProps {
    type: 'success' | 'error'
    message: ReactNode | string
    onClose?: (e?: MouseEvent<HTMLDivElement>) => void
    closable?: boolean
    duration?: number
    showIcon?: boolean
}

const AlertCustom: React.FC<AlertCustomProps> = ({
    type,
    message,
    onClose,
    closable = true,
    duration = 3000,
    showIcon = true,
    ...rest
}) => {
    // Mapear 'error' a 'danger' para compatibilidad con el componente Alert
    const mappedType = type === 'error' ? 'danger' : 'success'

    return (
        <Alert
            type={mappedType}
            title={message}
            closable={closable}
            duration={duration}
            showIcon={showIcon}
            onClose={onClose}
            {...rest}
        />
    )
}

export default AlertCustom
