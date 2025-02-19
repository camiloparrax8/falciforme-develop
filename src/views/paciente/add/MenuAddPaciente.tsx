import Tabs from '@/components/ui/Tabs'
import FormPaciente from './FormPaciente'
import Acompañante from './Acompañante/Acompañante'
import FormAntFamiliares from './AntencedentesFamiliares/FormAntFamiliares'
import FormAntPerinatologicos from './AntecedentesPerinatologicos/FormAntPerinatologicos'
import FormVacunas from './Vacunas/FormVacunas'
import FormIngreso from './Ingreso/FormIngreso'
import RedPrimaria from './RedPrimaria/RedPrimaria'
import { usePatient } from '@/context/PatientContext'
import { useTabsFlow } from '@/hooks/useTabsFlow'

const MenuAddPaciente = () => {
    const { paciente } = usePatient()
    const { TabNav, TabList, TabContent } = Tabs
    const tabs = [
        'paciente',
        'redPrimaria',
        'acompañante',
        'familiar',
        'perinatologicos',
        'vacunas',
        'ingreso',
    ]
    const { currentTab, nextTab, goToTab } = useTabsFlow(tabs)

    console.log(paciente)

    return (

            <div className="w-full">
                <Tabs
                    value={currentTab}
                    onChange={(newValue) => goToTab(tabs.indexOf(newValue))}
                >
                    {/* Lista de pestañas */}
                    <TabList className="flex space-x-4 border-b pb-2">
                        {tabs.map((tab, index) => (
                            <TabNav key={index} value={tab}>
                                {tab}
                            </TabNav>
                        ))}
                    </TabList>

                    {/* Contenido de las pestañas */}
                    <div className="p-4">
                        <TabContent value="paciente">
                            <FormPaciente nextTab={nextTab}></FormPaciente>
                        </TabContent>
                        <TabContent value="redPrimaria">
                            {paciente === null ? (
                                <p className="text-red-500 font-semibold">
                                    No se puede ingresar una red primaria sin un
                                    paciente registrado.
                                </p>
                            ) : (
                                <RedPrimaria />
                            )}
                        </TabContent>
                        <TabContent value="acompañante">
                            {paciente === null ? (
                                <p className="text-red-500 font-semibold">
                                    No se puede ingresar Acompañante sin un
                                    paciente registrado.
                                </p>
                            ) : (
                                <Acompañante />
                            )}
                        </TabContent>
                        <TabContent value="familiar">
                            {paciente === null ? (
                                <p className="text-red-500 font-semibold">
                                    No se puede ingresar Antecedentes Familiares
                                    sin un paciente registrado.
                                </p>
                            ) : (
                                <FormAntFamiliares nextTab={nextTab} />
                            )}
                        </TabContent>
                        <TabContent value="perinatologicos">
                            {paciente === null ? (
                                <p className="text-red-500 font-semibold">
                                    No se puede ingresar Antecedentes
                                    Perinatologicos sin un paciente registrado.
                                </p>
                            ) : (
                                <FormAntPerinatologicos nextTab={nextTab} />
                            )}
                        </TabContent>
                        <TabContent value="vacunas">
                            {paciente === null ? (
                                <p className="text-red-500 font-semibold">
                                    No se puede ingresar Vacunaas sin un
                                    paciente registrado.
                                </p>
                            ) : (
                                <FormVacunas nextTab={nextTab} />
                            )}
                        </TabContent>
                        <TabContent value="ingreso">
                            {paciente === null ? (
                                <p className="text-red-500 font-semibold">
                                    No se puede ingresar Red primaria sin un
                                    paciente registrado.
                                </p>
                            ) : (
                                <FormIngreso nextTab={nextTab} />
                            )}
                        </TabContent>
                    </div>
                </Tabs>
            </div>
     
    )
}

export default MenuAddPaciente
