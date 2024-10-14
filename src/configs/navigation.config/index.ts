import {
    // NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    // NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'

import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
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
        key: 'historia',
        path: '/historia-clinica',
        title: 'Historia clinica',
        translateKey: '',
        icon: 'historiaClinica',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'laboratorio',
        path: 'laboratorio',
        title: 'Laboratorio',
        translateKey: '',
        icon: 'laboratorio',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'citas',
        path: 'citas',
        title: 'Citas',
        translateKey: '',
        icon: 'cita',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'medicamentos',
        path: 'medicamentos',
        title: 'Medicamentos',
        translateKey: '',
        icon: 'medicamento',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'sintomas-crisis',
        path: 'sintomas-crisis',
        title: 'Sintomas y Crisis',
        translateKey: '',
        icon: 'sintomasCrisis',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'educate',
        path: 'educate',
        title: 'Educate',
        translateKey: '',
        icon: 'educate',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'informes',
        path: 'informes',
        title: 'Informes',
        translateKey: '',
        icon: 'informe',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'costos',
        path: 'costos',
        title: 'Costos',
        translateKey: '',
        icon: 'costo',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'seguridad',
        path: 'seguridad',
        title: 'Seguridad',
        translateKey: '',
        icon: 'seguridad',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'integracion',
        path: 'integracion',
        title: 'Integracion',
        translateKey: '',
        icon: 'integracion',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    /*
    {
        key: 'collapseMenu',
        path: '',
        title: 'Collapse Menu',
        translateKey: 'nav.collapseMenu.collapseMenu',
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'collapseMenu.item1',
                path: '/collapse-menu-item-view-1',
                title: 'Collapse menu item 1',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'collapseMenu.item2',
                path: '/collapse-menu-item-view-2',
                title: 'Collapse menu item 2',
                translateKey: 'nav.collapseMenu.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
    {
        key: 'groupMenu',
        path: '',
        title: 'Group Menu',
        translateKey: 'nav.groupMenu.groupMenu',
        icon: 'groupMenu',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [],
        subMenu: [
            {
                key: 'groupMenu.single',
                path: '/group-single-menu-item-view',
                title: 'Group single menu item',
                translateKey: 'nav.groupMenu.single',
                icon: 'groupSingleMenu',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'groupMenu.collapse',
                path: '',
                title: 'Group collapse menu',
                translateKey: 'nav.groupMenu.collapse.collapse',
                icon: 'groupCollapseMenu',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'groupMenu.collapse.item1',
                        path: '/group-collapse-menu-item-view-1',
                        title: 'Menu item 1',
                        translateKey: 'nav.groupMenu.collapse.item1',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'groupMenu.collapse.item2',
                        path: '/group-collapse-menu-item-view-2',
                        title: 'Menu item 2',
                        translateKey: 'nav.groupMenu.collapse.item2',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                ],
            },
        ],
    }, */
]

export default navigationConfig
