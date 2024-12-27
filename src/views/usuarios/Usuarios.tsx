import { Card } from '@/components/ui'
import TableCustom from '../common/TableCustom'

function Usuarios() {
    const header = ['Nombre', 'Rol', 'Estado']
    const data = [
        {
            id: 1,
            Nombre: 'Alfreds Futterkiste',
            Rol: 'Maria Anders',
            Estado: 'Germany',
        },
        {
            id: 2,
            Nombre: 'Centro comercial Moctezuma',
            Rol: 'Francisco Chang',
            Estado: 'Mexico',
        },
        {
            id: 3,
            Nombre: 'Ernst Handel',
            Rol: 'Roland Mendel',
            Estado: 'Austria',
        },
        {
            id: 1,
            Nombre: 'Alfreds Futterkiste',
            Rol: 'Maria Anders',
            Estado: 'Germany',
        },
        {
            id: 2,
            Nombre: 'Centro comercial Moctezuma',
            Rol: 'Francisco Chang',
            Estado: 'Mexico',
        },
        {
            id: 3,
            Nombre: 'Ernst Handel',
            Rol: 'Roland Mendel',
            Estado: 'Austria',
        },
    ]

    return (
        <div>
            <Card>
                <TableCustom data={data} header={header}></TableCustom>
            </Card>
        </div>
    )
}

export default Usuarios
