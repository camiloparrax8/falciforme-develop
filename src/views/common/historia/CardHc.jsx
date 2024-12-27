import Card from '@/components/ui/Card'
    import { HiBadgeCheck, HiInformationCircle } from 'react-icons/hi'

import ButtonNavigation from '../../common/ButtonNavigation'

const CardHc = ({ title, uri, iconName, estado, recomendacion, className }) => {
    const headerExtraContent = (
        <span className="flex items-center space-x-1">
            {estado === 1 ? (
                <span className="flex items-center text-emerald-500 text-sm">
                    <HiBadgeCheck className="mr-1" />
                    Terminado
                </span>
            ) : (
                <span className="flex items-center text-red-500 text-sm">
                    <HiInformationCircle className="mr-1" />
                    Pendiente
                </span>
            )}
        </span>
    )

    const cardFooter = (
        <div className="flex justify-end">
            <ButtonNavigation
                variant={estado === 1 ? 'solid' : ''}
                title={estado === 1 ? 'Editar' : 'Cargar'}
                uri={uri}
                iconName={estado === 1 ? 'edit' : iconName}
            />
        </div>
    )

    return (
        <div className={`p-4  rounded-md bg-white ${className}`}>
            <Card
                header={{
                    content: title,
                    extra: headerExtraContent,
                }}
                footer={{
                    content: cardFooter,
                }}
                className="col-span-3"
            >
                <p>{recomendacion}</p>
            </Card>
        </div>
    )
}

export default CardHc
