import Button from '@/components/ui/Button'
import { 
    TbEdit, 
    TbReportMedical, 
    TbUserPlus, 
    TbStethoscope, 
    TbHeartbeat, 
    TbFlask, 
    TbVaccine, 
    TbBone, 
    TbPills 
} from 'react-icons/tb';
import { useNavigate } from 'react-router-dom'

const navigationIcons = {
    add: <TbUserPlus />,
    edit: <TbEdit />,
    hc: <TbReportMedical />,    
    diagnostics: <TbReportMedical />, 
    acuteComplications: <TbHeartbeat />, 
    chronicComplications: <TbStethoscope />, 
    physicalExams: <TbEdit />, 
    labs: <TbFlask />, 
    transfusionSupport: <TbUserPlus />, 
    progenitorTransplants: <TbBone />, 
    treatments: <TbPills />,
    vaccines: <TbVaccine />
};
const ButtonNavigation = ({ title, uri, iconName, variant }) => {
    const navigate = useNavigate()

    return (
            
        <Button
            variant={variant}
            icon={navigationIcons[iconName]}
            onClick={() => navigate(uri, { state: { background: location.pathname } })}

        >
            {title}
        </Button>
    )
}

export default ButtonNavigation
