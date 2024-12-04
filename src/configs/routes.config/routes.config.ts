import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/inicio',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'paciente',
        path: '/paciente',
        component: lazy(() => import('@/views/paciente/Paciente')),
        authority: [],
    },
    {
        key: 'paciente',
        path: '/paciente/add',
        component: lazy(() => import('@/views/paciente/add/AddPaciente')),
        authority: [],
    },
    // {
    //     key: 'historia',
    //     path: '/historia-clinica',
    //     component: lazy(() => import('@/views/historia/historia')),
    //     authority: [],
    // },
    // {
    //     key: 'laboratorio',
    //     path: 'laboratorio',
    //     component: lazy(() => import('@/views/laboratorio/laboratorio')),
    //     authority: [],
    // },
    // {
    //     key: 'citas',
    //     path: 'citas',
    //     component: lazy(() => import('@/views/citas/citas')),
    //     authority: [],
    // },
    // {
    //     key: 'medicamentos',
    //     path: 'medicamentos',
    //     component: lazy(() => import('@/views/medicamentos/medicamentos')),
    //     authority: [],
    // },
    // {
    //     key: 'sintomas-crisis',
    //     path: 'sintomas-crisis',
    //     component: lazy(() => import('@/views/sintomas-crisis/sintomas-crisis')),
    //     authority: [],
    // },
    // {
    //     key: 'educate',
    //     path: 'educate',
    //     component: lazy(() => import('@/views/educate/educate')),
    //     authority: [],
    // },
    // {
    //     key: 'informes',
    //     path: 'informes',
    //     component: lazy(() => import('@/views/informes/informes')),
    //     authority: [],
    // },
    // {
    //     key: 'costos',
    //     path: 'costos',
    //     component: lazy(() => import('@/views/costos/costos')),
    //     authority: [],
    // },
    {
        key: 'usuario',
        path: 'usuario',
        component: lazy(() => import('@/views/seguridad/seguridad')),
        authority: [],
    },
    // {
    //     key: 'integracion',
    //     path: 'integracion',
    //     component: lazy(() => import('@/views/integracion/integracion')),
    //     authority: [],
    // },
    /*
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() =>
            import('@/views/demo/GroupSingleMenuItemView')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView1')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView2')
        ),
        authority: [],
    },*/
    ...othersRoute,
 ]
