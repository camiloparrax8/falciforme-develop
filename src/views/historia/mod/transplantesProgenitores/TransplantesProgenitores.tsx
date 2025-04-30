import { Card } from "@/components/ui"
import FormTransplanteProg from "./FormTransplanteProg"
import { BackButton } from '@/components/shared'

function TransplantesProgenitores() {
  return (
    <Card>
      <BackButton variant="default" />
      <FormTransplanteProg></FormTransplanteProg>
    </Card>
  )
}

export default TransplantesProgenitores