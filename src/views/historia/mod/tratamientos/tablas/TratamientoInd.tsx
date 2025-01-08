import { Table } from '@/components/ui'
import classNames from 'classnames'

const { Tr, Th, Td, THead, TBody } = Table

function TableTi() {
    const data = [
        {
            tipo: 'Profilaxis antibiótica con penicilina',
            dias: 31,
            dosis: 3
        },
        {
            tipo: 'Manejo del dolor',
            dias: 15,
            dosis: 15
        },
    ]

    return(
        <Table compact>
            <THead>
                <Tr>
                    <Th>Tipo de tratamiento</Th>
                    <Th>Días</Th>
                    <Th>Dosis</Th>
                </Tr>
            </THead>
            <TBody>
                {data.map((item, index) => (
                    <Tr key={index}>
                        <Td>{item.tipo}</Td>
                        <Td>{item.dias}</Td>
                        <Td>{item.dosis}</Td>
                    </Tr>
                ))}
            </TBody>
        </Table>
    )
}

export default TableTi;

