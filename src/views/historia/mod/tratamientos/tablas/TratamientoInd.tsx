import TableCustom from '@/views/common/TableCustom'


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
        <TableCustom data={data} header={header} className={'compact'}/>
    )
}

export default TableTi;

