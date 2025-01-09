import { Table } from '@/components/ui'
import TableCustom from '@/views/common/TableCustom'
import classNames from 'classnames'
import { compact } from 'lodash'

const { Tr, Th, Td, THead, TBody } = Table

function TableTi() {

    const header = ['tipo', 'dias', 'dosis']

    const data = [
        {
            id: 1,
            tipo: 'Profilaxis antibiótica con penicilina',
            dias: 31,
            dosis: 3
        },
        {
            id: 2,
            tipo: 'Manejo del dolor',
            dias: 15,
            dosis: 15
        },
    ]

    return(
        <TableCustom data={data} header={header} className={compact}/>
    )
}

export default TableTi;

