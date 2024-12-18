import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },

    {
        key: 'Paciente',
        path: '/paciente',
        component: lazy(() => import('@/views/paciente/Paciente')),
        authority: [],
    },
    {
        key: 'usuario',
        path: 'usuario',
        component: lazy(() => import('@/views/seguridad/seguridad')),
        authority: [],
    },
    {
        key: 'paciente-add',
        path: '/paciente/add',
        component: lazy(() => import('@/views/paciente/add/AddPaciente')),
        authority: [],
    },
    {
        key: 'historia-clinica',
        path: '/historia-clinica/:id',
        component: lazy(() => import('@/views/historia/HistoriaClinica')),
        authority: [],
    },

    ...othersRoute,
]
