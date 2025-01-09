import { Card } from '@/components/ui'
import FormVacunas from './FormVacunas'
import TableCustom from '@/views/common/TableCustom'

function Vacunas() {
    const header = ['tipo', 'fecha']

    const data = [
        {
            id: 1,
            tipo: 'Profilaxis antibiótica con penicilina',
            fecha: 3,
        },
        {
            id: 2,
            tipo: 'Manejo del dolor',
            fecha: 15,
        },
    ]
    return (
        <Card>
            <FormVacunas></FormVacunas>
            <div className="mt-4">
                <TableCustom
                    data={data}
                    header={header}
                    className={'compact'}
                />
            </div>
        </Card>
    )
}

export default Vacunas
