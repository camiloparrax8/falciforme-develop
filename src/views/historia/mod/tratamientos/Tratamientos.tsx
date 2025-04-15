import { Card } from '@/components/ui'
import { BackButton } from '@/components/shared'
import FormTratamientos from '@/views/historia/mod/tratamientos/FormTratamientos'

export default function Tratamientos() {
    return (
        <Card>
            <div className="mb-4">
                <BackButton variant="default" />
            </div>
            <FormTratamientos></FormTratamientos>
        </Card>
    )
}
