import { Table } from '@/components/ui'
import classNames from 'classnames'

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

    return(
        <Table className="w-full">
            <THead>
                <tr>
                    <Th>Medicamento</Th>
                    <Th>Número de días</Th>
                    <Th>Número de dosis</Th>
                </tr>
            </THead>
            <TBody>
                {data.map((item, index) => (
                    <Tr key={index}>
                        <Td>{item.medicamento}</Td>
                        <Td>{item.dias}</Td>
                        <Td>{item.dosis}</Td>
                    </Tr>
                ))}
            </TBody>
        </Table>  // TableMD ends here
    )
}

export default TableMD