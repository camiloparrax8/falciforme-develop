import {
    PiHouseLineDuotone,
    PiUserDuotone,
    PiFolderUserBold,
} from 'react-icons/pi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <PiHouseLineDuotone />,
    paciente: <PiUserDuotone />,
    seguridad: <PiFolderUserBold />,
}

export default navigationIcon
