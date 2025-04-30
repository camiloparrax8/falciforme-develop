import FormComplicacionesAgudas from './FormComplicacionesAgudas'
import { BackButton } from '@/components/shared'
import { Card } from '@/components/ui'

function ComplicacionesAgudas() {
    return (
        <Card>
            <BackButton variant="default" />
            <FormComplicacionesAgudas />
        </Card>
    )
}

export default ComplicacionesAgudas
