import React from 'react'
import Table from '../../components/ui/Table'
import dataPaciente from './data-paciente.json'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FaSearch } from 'react-icons/fa'

const Paciente = () => {
    const { columns, data } = dataPaciente

    const modifiedColumns = columns.map((column) => {
        if (column === 'id' || column === 'paciente') {
            return 'id - paciente'
        }
        return column
    })

    const renderview = data.map((dato, index) => {
        return (
            <Table.Tr key={index}>
                {modifiedColumns.map((column, columnIndex) => {
                    if (column === 'id - paciente') {
                        return (
                            <Table.Td key={columnIndex}>
                                #{dato.id}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                {dato.paciente}
                            </Table.Td>
                        )
                    } else {
                        return (
                            <Table.Td key={columnIndex}>
                                {dato[column as keyof typeof dato]}
                            </Table.Td>
                        )
                    }
                })}
            </Table.Tr>
        )
    })
    return (
        <div className="grid grid-flow-col auto-cols-max gap-4">
            <Card>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <h6 className="flex-grow">Gestión de pacientes</h6>
                    <div className="flex items-center">
                    <span className="input-wrapper">
                        <Input
                            className="input input-md h-12 w-48  focus:ring-primary focus-within:ring-primary focus-within:border-primary focus:border-primary"
                            type="text"
                            placeholder="Buscar paciente"
                        />
                        <div className="input-suffix-end">
                        <FaSearch />
                        </div>
                    </span>
                        </div>
                    <button className="button bg-primary hover:bg-primary-mild text-neutral h-12 rounded-xl px-5 py-2 button-press-feedback">
                        <span className="flex gap-1 items-center justify-center">
                            <span className="text-lg">
                                <svg
                                    stroke="currentColor"
                                    fill="none"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-xl"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 5l0 14"></path>
                                    <path d="M5 12l14 0"></path>
                                </svg>
                            </span>
                            <span>Nuevo paciente</span>
                        </span>
                    </button>
                </div>
                <Table>
                    <Table.THead>
                        <Table.Tr>
                            {columns.map((column, index) => (
                                <Table.Th key={index}>{column}</Table.Th>
                            ))}
                        </Table.Tr>
                    </Table.THead>
                    <Table.TBody>{renderview}</Table.TBody>
                </Table>
            </Card>
        </div>
    )
}
export default Paciente
