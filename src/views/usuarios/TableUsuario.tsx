import { useState } from 'react'
import Table from '@/components/ui/Table'
import Button from '@/components/ui/Button'
import { Dropdown } from '@/components/ui/Dropdown'
import { FiSettings, FiEdit, FiTrash2, FiShieldOff, FiShield } from 'react-icons/fi'
import DialogDelete from './DialogDelete'
import DialogDesactivar from './DialogDesactivar'
import DialogEdit from './DialogEdit'
const { Tr, Th, Td, THead, TBody } = Table

const TableUsuario = ({ data, header, className, actualizarUsuarios, setMensaje}) => {
    const [dialogIsOpenDelete, setIsOpenDelete] = useState(false)
    const [dialogIsOpenDesactivar, setIsOpenDesactivar] = useState(false)
    const [dialogIsOpenEdit, setIsOpenEdit] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)


    const openDialogDelete = (row) => {
        setSelectedRow(row)
        setIsOpenDelete(true)
    }

    const onDialogCloseDelete = () => {
        setIsOpenDelete(false)
    }

    const onDialogOkDelete = async (row) => {
        console.log(row);
        await actualizarUsuarios();
        setIsOpenDelete(false)
    }

    const openDialogDesactivar = (row) => {
        setSelectedRow(row)
        setIsOpenDesactivar(true)
    }

    const onDialogCloseDesactivar = () => {
        setIsOpenDesactivar(false)
    }
    
    const onDialogOkDesactivar = async (row) => {
        console.log(row);
        setIsOpenDesactivar(false)
    }

    const openDialogEdit = (row) => {
        setSelectedRow(row)
        setIsOpenEdit(true)
    }

    const onDialogCloseEdit = () => {
        setIsOpenEdit(false)
    }

    const onDialogOkEdit = async (row) => {
        console.log(row);
        await actualizarUsuarios();
        setIsOpenEdit(false)
    }

    return (
        <div className={className}>
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
                                <Dropdown 
                                    renderTitle={<Button 
                                        variant="solid" 
                                        icon={<FiSettings className="text-lg" />}
                                    />} 
                                    placement="bottom-end"
                                >
                                    <Dropdown.Item onClick={() => openDialogEdit(row)}>
                                        <span className="flex items-center gap-2">
                                            <FiEdit className="text-lg" />
                                            Editar
                                        </span>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => openDialogDelete(row)}>
                                        <span className="flex items-center gap-2">
                                            <FiTrash2 className="text-lg" />
                                            Eliminar
                                        </span>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => openDialogDesactivar(row)}>
                                        <span className="flex items-center gap-2">
                                            {row.Estado === "Activo" ? <FiShieldOff className="text-lg" /> : <FiShield className="text-lg" />}
                                            {row.Estado === "Activo" ? 'Desactivar' : 'Activar'}
                                        </span>
                                    </Dropdown.Item>
                                </Dropdown>
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
            <DialogDelete
                isOpen={dialogIsOpenDelete}
                onClose={onDialogCloseDelete}
                onRequestClose={onDialogCloseDelete}
                selectedRow={selectedRow}
                onDialogCloseDelete={onDialogCloseDelete}
                onDialogOkDelete={onDialogOkDelete}
                setMensaje={setMensaje}
            />
            <DialogDesactivar
                isOpen={dialogIsOpenDesactivar}
                onClose={onDialogCloseDesactivar}
                onRequestClose={onDialogCloseDesactivar}
                selectedRow={selectedRow}
                onDialogCloseDelete={onDialogCloseDesactivar}
                onDialogOkDelete={onDialogOkDesactivar}
                actualizarUsuarios={actualizarUsuarios}
                setMensaje={setMensaje}
            />
            <DialogEdit
                isOpen={dialogIsOpenEdit}
                onClose={onDialogCloseEdit}
                onRequestClose={onDialogCloseEdit}
                selectedRow={selectedRow}
                onDialogOkEdit={onDialogOkEdit}
                setMensaje={setMensaje}
            />
        </div>
    )
}

export default TableUsuario