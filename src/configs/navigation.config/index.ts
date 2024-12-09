import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    // NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'

import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: 'home-tittle',
        path: '',
        title: 'Menu',
        translateKey: '',
        icon: 'home',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [],
        subMenu: [],
    },
    {
        key: 'home',
        path: '/inicio',
        title: 'Inicio',
        translateKey: '',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'paciente',
        path: '/paciente',
        title: 'Paciente',
        translateKey: '',
        icon: 'paciente',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    
    {
        key: 'usuario',
        path: 'usuario',
        title: 'Usuarios',
        translateKey: '',
        icon: 'seguridad',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    
   
]

export default navigationConfig
