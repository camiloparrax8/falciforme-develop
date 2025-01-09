import { Table } from '@/components/ui'
import TableCustom from '@/views/common/TableCustom'
import classNames from 'classnames'
import { compact } from 'lodash'

const { Tr, Th, Td, THead, TBody } = Table

function TableMD () {
    const data = [
        {
            medicamento: 'Opioides',
            dias: 31,
            dosis: 3
        },
        {
            medicamento: 'Acetaminofén',
            dias: 15,
            dosis: 15
        },
    ]

    const header = ['medicamento', 'dias', 'dosis']

    return(
        <TableCustom data={data} header={header} className={compact} />
    )
}

export default TableMD