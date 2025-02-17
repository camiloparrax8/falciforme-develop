import Tabs from '@/components/ui/Tabs'
import FormPaciente from './FormPaciente'
import Acompañante from './Acompañante/Acompañante'
import FormAntFamiliares from './AntencedentesFamiliares/FormAntFamiliares'
import FormAntPerinatologicos from './AntecedentesPerinatologicos/FormAntPerinatologicos'
import FormVacunas from './Vacunas/FormVacunas'
import FormIngreso from './Ingreso/FormIngreso'
import RedPrimaria from './RedPrimaria/RedPrimaria'
import { usePatient } from '@/context/PatientContext'

const MenuAddPaciente = () => {
    const { idPaciente } = usePatient()
    const { TabNav, TabList, TabContent } = Tabs

    return (
        <div className="w-full">
            <Tabs defaultValue="paciente">
                {/* Lista de pestañas */}
                <TabList className="flex space-x-4 border-b pb-2">
                    <TabNav value="paciente">Paciente</TabNav>
                    <TabNav value="redPrimaria">Red Primaria</TabNav>
                    <TabNav value="acompañante">Acompañante</TabNav>
                    <TabNav value="familiar">Ant. Familiares</TabNav>
                    <TabNav value="perinatologicos">
                        Ant. Perinatológicos
                    </TabNav>
                    <TabNav value="vacunas">Vacunas</TabNav>
                    <TabNav value="ingreso">Ingreso</TabNav>
                </TabList>

                {/* Contenido de las pestañas */}
                <div className="p-4">
                    <TabContent value="paciente">
                        <FormPaciente></FormPaciente>
                    </TabContent>
                    <TabContent value="redPrimaria">
                        {idPaciente === 0 ? (
                            <p className="text-red-500 font-semibold">
                                No se puede ingresar una red primaria sin un
                                paciente registrado.
                            </p>
                        ) : (
                            <RedPrimaria />
                        )}
                    </TabContent>
                    <TabContent value="acompañante">
                        {idPaciente === 0 ? (
                            <p className="text-red-500 font-semibold">
                                No se puede ingresar Acompañante sin un paciente
                                registrado.
                            </p>
                        ) : (
                            <Acompañante />
                        )}
                    </TabContent>
                    <TabContent value="familiar">
                        {idPaciente === 0 ? (
                            <p className="text-red-500 font-semibold">
                                No se puede ingresar Antecedentes Familiares sin
                                un paciente registrado.
                            </p>
                        ) : (
                            <FormAntFamiliares />
                        )}
                    </TabContent>
                    <TabContent value="perinatologicos">
                        {idPaciente === 0 ? (
                            <p className="text-red-500 font-semibold">
                                No se puede ingresar Antecedentes
                                Perinatologicos sin un paciente registrado.
                            </p>
                        ) : (
                            <FormAntPerinatologicos />
                        )}
                    </TabContent>
                    <TabContent value="vacunas">
                        {idPaciente === 0 ? (
                            <p className="text-red-500 font-semibold">
                                No se puede ingresar Vacunaas sin un paciente
                                registrado.
                            </p>
                        ) : (
                            <FormVacunas />
                        )}
                    </TabContent>
                    <TabContent value="ingreso">
                        {idPaciente === 0 ? (
                            <p className="text-red-500 font-semibold">
                                No se puede ingresar Red primaria sin un
                                paciente registrado.
                            </p>
                        ) : (
                            <FormIngreso />
                        )}
                    </TabContent>
                </div>
            </Tabs>
        </div>
    )
}

export default MenuAddPaciente
