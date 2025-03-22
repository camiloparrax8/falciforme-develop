import {
    PiHouseLineDuotone,
    PiUserDuotone,
    PiFolderUserBold,
} from 'react-icons/pi'
import { GiArtificialIntelligence } from "react-icons/gi";

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <PiHouseLineDuotone />,
    paciente: <PiUserDuotone />,
    seguridad: <PiFolderUserBold />,
    gadget: <GiArtificialIntelligence />,
}

export default navigationIcon
