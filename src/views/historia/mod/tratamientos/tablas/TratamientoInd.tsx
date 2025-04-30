import TableCustom from '@/views/common/TableCustom'

interface Tratamiento {
    id: number
    Registro?: number
    titulo: string
    n_dias: number
    dosis: string
    tipo: string
}

interface TableTiProps {
    tratamientos: Tratamiento[]
    onDelete?: (tratamiento: Tratamiento) => void
}

function TableTi({ tratamientos = [], onDelete }: TableTiProps) {
    const header = ['Registro', 'tipo', 'n_dias', 'dosis']

    // Generamos los datos con Registro calculado de forma independiente
    const dataWithIndex = tratamientos.map((tratamiento, index) => ({
        ...tratamiento,
        Registro: tratamientos.length - index,
    }))

    return (
        <TableCustom
            data={dataWithIndex}
            header={header}
            className={'compact'}
            showDeleteOption={!!onDelete}
            onDelete={onDelete}
        />
    )
}

export default TableTi
