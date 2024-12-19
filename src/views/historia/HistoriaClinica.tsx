import { useParams, useLocation } from 'react-router-dom'

import Tabs from '@/components/ui/Tabs'
import { AdaptiveCard, Container } from '@/components/shared'
import ButtonNavigation from '../common/ButtonNavigation'

const { TabNav, TabList, TabContent } = Tabs

const HistoriaClinica = () => {
    const { id } = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const tipo = queryParams.get('tipo')
    console.log('tipo de HC=', tipo, ' / el id es =', id)

    return (
        <Container>
            <AdaptiveCard className="mt-4">
                <Tabs defaultValue="tab1">
                    <TabList>
                        <TabNav value="sugeridas">Sugeridas</TabNav>
                        <TabNav value="todas">Todas</TabNav>
                    </TabList>
                    <div className="p-4">
                        <TabContent value="todas">
                            <ButtonNavigation
                                title="Imágenes Diagnósticas"
                                uri="/historia-clinica/img-diagnosticas"
                                iconName="diagnostics"
                            />

                            <ButtonNavigation
                                title="Complicaciones Agudas"
                                uri="/historia-clinica/complicaciones-agudas"
                                iconName="acuteComplications"
                            />

                            <ButtonNavigation
                                title="Complicaciones Crónicas"
                                uri="/historia-clinica/complicaciones-cronicas"
                                iconName="chronicComplications"
                            />

                            <ButtonNavigation
                                title="Exámenes Físicos"
                                uri="/historia-clinica/examenes-fisicos"
                                iconName="physicalExams"
                            />

                            <ButtonNavigation
                                title="Laboratorios"
                                uri="/historia-clinica/laboratorios"
                                iconName="labs"
                            />

                            <ButtonNavigation
                                title="Soportes Transfusionales"
                                uri="/historia-clinica/soportes-transfucionales"
                                iconName="transfusionSupport"
                            />

                            <ButtonNavigation
                                title="Trasplantes de Progenitores"
                                uri="/historia-clinica/transplantes-progenitores"
                                iconName="progenitorTransplants"
                            />

                            <ButtonNavigation
                                title="Tratamientos"
                                uri="/historia-clinica/tratamientos"
                                iconName="treatments"
                            />

                            <ButtonNavigation
                                title="Vacunas"
                                uri="/historia-clinica/Vacunas"
                                iconName="vaccines"
                            />
                        </TabContent>
                        <TabContent value="sugeridas">
                            <p>
                                A computer lets you make more mistakes faster
                                than any invention in human history with the
                                possible exceptions of handguns and tequila.
                                (Mitch Radcliffe).
                            </p>
                        </TabContent>
                    </div>
                </Tabs>
            </AdaptiveCard>
        </Container>
    )
}

export default HistoriaClinica
