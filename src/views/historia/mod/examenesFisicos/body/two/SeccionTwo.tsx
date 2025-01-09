import { Button } from '@/components/ui'
import SectionTitle from '@/views/common/form/SectionTitle'
import { FaUpload } from 'react-icons/fa'

export default function SeccionTwo() {
    const icon = <FaUpload />

    return (
        <>
            <SectionTitle
                text={'Región Toracoabdominal o Media (Tórax y Abdomen)'}
                className={''}
            ></SectionTitle>
            <Button
                variant="solid"
                icon={icon}
                className="m-2"
                onClick={() => openDialogPerimetoCefalico()}
            >
                Cardio Pulmunar
            </Button>
            <Button
                variant="solid"
                icon={icon}
                className="m-2"
                onClick={() => openDialogPerimetoCefalico()}
            >
                Abdominal
            </Button>
        </>
    )
}
