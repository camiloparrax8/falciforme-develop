import { useState, lazy, Suspense } from 'react';
import {
    TbFileInfo,
    TbChecklist,
   
} from 'react-icons/tb';
import Spinner from '@/components/ui/Spinner';
import classNames from '@/utils/classNames';

const navigation = [
    { label: 'Estado HBS', value: 'estadoHBS', icon: <TbFileInfo /> },
    { label: 'E. Cronicas', value: 'e_cronicas', icon: <TbChecklist /> },
    
];
const defatultNavValue = 'estadoHBS';
const EstadoHBS = lazy(() => import('@/views/paciente/add/AntencedentesFamiliares/EstadoHBS'));
const EnfermedadesCronicas = lazy(() => import('@/views/paciente/add/AntencedentesFamiliares/EnfermedadesCronicas'));

const FormAntFamiliares = () => {
    const [selectedNav, setSelectedNav] = useState(defatultNavValue);

    const handleClick = (value) => {
        setSelectedNav(value);
    };

    return (
        <div className="flex">
            <div className="w-[250px]">
                <div className="flex flex-col gap-2">
                    {navigation.map((nav) => (
                        <button
                            key={nav.value}
                            className={classNames(
                                'flex items-center gap-2 w-full px-3.5 py-2.5 rounded-full border-2 border-transparent font-semibold transition-colors dark:hover:text-gray-100 text-gray-900 dark:text-white',
                                selectedNav === nav.value
                                    ? 'border-primary'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            )}
                            onClick={() => handleClick(nav.value)}
                        >
                            <span className="text-xl">{nav.icon}</span>
                            <span>{nav.label}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-full">
                <Suspense
                    fallback={
                        <div className="my-4 mx-auto text-center flex justify-center">
                            <Spinner size={40} />
                        </div>
                    }
                >
                    {selectedNav === 'estadoHBS' && <EstadoHBS/>}
                    {selectedNav === 'e_cronicas' && <EnfermedadesCronicas />}
                  
                </Suspense>
            </div>
        </div>
    );
};

export default FormAntFamiliares;