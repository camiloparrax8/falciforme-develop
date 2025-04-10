/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import Table from '@/components/ui/Table'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'

const { Tr, Th, Td, THead, TBody } = Table

const TableCustom = ({
    data,
    header,
    className,
    showDeleteOption = true,
    onDelete = null,
}) => {
    const [dialogIsOpenDelete, setIsOpenDelete] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)

    const openDialogDelete = (row) => {
        setSelectedRow(row)
        setIsOpenDelete(true)
    }

    const onDialogCloseDelete = () => {
        setIsOpenDelete(false)
    }

    const onDialogOkDelete = async (id) => {
        if (onDelete && typeof onDelete === 'function') {
            await onDelete(selectedRow)
        }
        setIsOpenDelete(false)
    }

    // Función para formatear los headers: reemplaza _ por espacios y capitaliza
    const formatHeader = (header) => {
        const withSpaces = header.replace(/_/g, ' ')
        return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
    }

    return (
        <div className={className}>
            <Table compact>
                <THead>
                    <Tr>
                        {header.map((col, index) => (
                            <Th key={index}>{formatHeader(col)}</Th>
                        ))}
                        {showDeleteOption && <Th>Opciones</Th>}
                    </Tr>
                </THead>
                <TBody>
                    {data.map((row) => (
                        <Tr key={row.id}>
                            {header.map((col, colIndex) => (
                                <Td key={colIndex}>{row[col]}</Td>
                            ))}
                            {showDeleteOption && (
                                <Td>
                                    <Button
                                        variant="solid"
                                        onClick={() => openDialogDelete(row)}
                                    >
                                        Eliminar
                                    </Button>
                                </Td>
                            )}
                        </Tr>
                    ))}
                </TBody>
            </Table>

            {showDeleteOption && (
                <Dialog
                    isOpen={dialogIsOpenDelete}
                    onClose={onDialogCloseDelete}
                    onRequestClose={onDialogCloseDelete}
                >
                    <h5 className="mb-4">Confirmar Eliminación</h5>
                    {selectedRow && (
                        <p>
                            ¿Estás seguro de que deseas eliminar el registro con
                            la siguiente información?
                            <br />
                            <strong>Registro:</strong> {selectedRow.Registro}
                            <br />
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
                        <Button
                            variant="solid"
                            onClick={() => onDialogOkDelete(selectedRow.id)}
                        >
                            Eliminar
                        </Button>
                    </div>
                </Dialog>
            )}
        </div>
    )
}

export default TableCustom
