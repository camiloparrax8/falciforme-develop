import Tabs from '@/components/ui/Tabs'
import FormPaciente from './FormPaciente'
import FormRedPrimaria from './FormRedPrimaria'
import FormAcompañante from './FormAcompañante'
import FormAntFamiliares from './FormAntFamiliares'
import FormAntPerinatologicos from './FormAntPerinatologicos'
import FormVacunas from './FormVacunas'
import FormIngreso from './FormIngreso'

const { TabNav, TabList, TabContent } = Tabs

const MenuAddPaciente = () => {
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
                        <FormRedPrimaria></FormRedPrimaria>
                    </TabContent>
                    <TabContent value="acompañante">
                        <FormAcompañante></FormAcompañante>
                    </TabContent>
                    <TabContent value="familiar">
                        <FormAntFamiliares></FormAntFamiliares>
                    </TabContent>
                    <TabContent value="perinatologicos">
                        <FormAntPerinatologicos></FormAntPerinatologicos>
                    </TabContent>
                    <TabContent value="vacunas">
                        <FormVacunas></FormVacunas>
                    </TabContent>
                    <TabContent value="ingreso">
                        <FormIngreso></FormIngreso>
                    </TabContent>
                </div>
            </Tabs>
        </div>
    )
}

export default MenuAddPaciente
