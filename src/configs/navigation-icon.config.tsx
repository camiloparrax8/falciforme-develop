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
    PiArrowsLeftRightFill,
    PiFolderUserBold
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
    seguridad: <PiFolderUserBold />,
    integracion: <PiArrowsLeftRightFill />,
}

export default navigationIcon
