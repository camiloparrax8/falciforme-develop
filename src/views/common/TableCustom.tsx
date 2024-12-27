import { useState } from 'react'
import Table from '@/components/ui/Table'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'


const { Tr, Th, Td, THead, TBody } = Table

const TableCustom = ({ data, header }) => {
    const [dialogIsOpenDelete, setIsOpenDelete] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)

    const openDialogDelete = (row) => {
        setSelectedRow(row)
        setIsOpenDelete(true)
    }

    const onDialogCloseDelete = () => {
        setIsOpenDelete(false)
    }

    const onDialogOkDelete = (id) => {
        alert(id)
        setIsOpenDelete(false)
    }

    return (
        <div>
            <Table compact>
                <THead>
                    <Tr>
                        {header.map((col, index) => (
                            <Th key={index}>{col}</Th>
                        ))}
                        <Th>Opciones</Th>
                    </Tr>
                </THead>
                <TBody>
                    {data.map((row) => (
                        <Tr key={row.id}>
                            {header.map((col, colIndex) => (
                                <Td key={colIndex}>{row[col]}</Td>
                            ))}
                            <Td>
                                <Button
                                    variant="solid"
                                    onClick={() => openDialogDelete(row)}
                                >
                                    Eliminar
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>

            <Dialog
                isOpen={dialogIsOpenDelete}
                onClose={onDialogCloseDelete}
                onRequestClose={onDialogCloseDelete}
            >
                <h5 className="mb-4">Confirmar Eliminación</h5>
                {selectedRow && (
                    <p>
                        ¿Estás seguro de que deseas eliminar el registro con la
                        siguiente información?
                        <br />
                        <strong>ID:</strong> {selectedRow.id}
                        <br />
                        <strong>Nombre:</strong> {selectedRow.Nombre}
                    </p>
                )}
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onDialogCloseDelete}
                    >
                        Cancelar
                    </Button>
                    <Button variant="solid" onClick={() => onDialogOkDelete(selectedRow.id)}>
                        Eliminar
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default TableCustom