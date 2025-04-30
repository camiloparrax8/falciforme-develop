import { Card } from "@/components/ui"
import FormLaboratorios from "../laboratorios/FormLaboratorios"
import { BackButton } from '@/components/shared'

function Laboratorios() {
  return (
    <div>
          <Card>
            <BackButton variant="default" />
          <FormLaboratorios></FormLaboratorios>
          </Card>
    </div>
  )
}

export default Laboratorios