import Button from '@/components/ui/Button';
import { TbEdit, TbReportMedical, TbUserPlus } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const navigationIcons = {
    add: <TbUserPlus />,
    edit: <TbEdit />,
    hc : <TbReportMedical />,
};

const ButtonNavigation = ({ title, uri, iconName }) => {
    const navigate = useNavigate();

    return (
       
            <Button
                variant="solid"
                icon={navigationIcons[iconName]}
                onClick={() => navigate(uri)} 
            >
                {title}
            </Button>
    
    );
};

export default ButtonNavigation;
