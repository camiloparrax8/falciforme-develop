import Button from '@/components/ui/Button'
import { TbArrowLeft } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

interface BackButtonProps {
    className?: string
    to?: string
    variant?: 'solid' | 'plain' | 'default' | 'outline'
    title?: string
}

const BackButton = ({
    className = '',
    to,
    variant = 'default',
    title = 'Volver',
}: BackButtonProps) => {
    const navigate = useNavigate()

    const handleClick = () => {
        if (to) {
            navigate(to)
        } else {
            navigate(-1)
        }
    }

    return (
        <Button
            variant={variant}
            icon={<TbArrowLeft />}
            className={className}
            onClick={handleClick}
        >
            {title}
        </Button>
    )
}

export default BackButton
