import { Button } from '@/components/ui'
import { FaUpload } from 'react-icons/fa'
import SectionTitle from '@/views/common/form/SectionTitle'

function SeccionThree() {
    const icon = <FaUpload />

    return (
        <>
            <SectionTitle
                text={
                    'Región Pélvica o Inferior (Pelvis y Extremidades Inferiores)'
                }
                className={'mt-3'}
            ></SectionTitle>
            <Button
                variant="solid"
                icon={icon}
                className="m-2"
                onClick={() => openDialogPerimetoCefalico()}
            >
                Tanner (Desarrollo)
            </Button>
            <Button
                variant="solid"
                icon={icon}
                className="m-2"
                onClick={() => openDialogPerimetoCefalico()}
            >
                Extremidades
            </Button>
        </>
    )
}

export default SeccionThree
