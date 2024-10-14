import {
    PiHouseLineDuotone,
    PiFolderPlusFill,
    PiUserDuotone,
    PiDnaDuotone,
    PiCalendarDotsDuotone,
    PiPillDuotone,
    PiBookOpenTextDuotone,
    PiHeartbeatDuotone,
    PiBrowsersDuotone,
    PiMoneyDuotone,
    PiShieldCheckeredDuotone,
    PiArrowsLeftRightFill
} from 'react-icons/pi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <PiHouseLineDuotone />,
    paciente: <PiUserDuotone />,
    historiaClinica: <PiFolderPlusFill />,
    laboratorio: <PiDnaDuotone />,
    cita: <PiCalendarDotsDuotone />,
    medicamento: <PiPillDuotone />,
    sintomasCrisis: <PiHeartbeatDuotone />,
    educate: <PiBookOpenTextDuotone />,
    informe: <PiBrowsersDuotone />,
    costo: <PiMoneyDuotone />,
    seguridad: <PiShieldCheckeredDuotone />,
    integracion: <PiArrowsLeftRightFill />,
}

export default navigationIcon
