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
        component: lazy(() => import('@/views/usuarios/Usuarios')),
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
    {
        key: 'historia-clinica',
        path: '/historia-clinica/img-diagnosticas/:id_paciente',
        component: lazy(() => import('@/views/historia/mod/imgDiagnosticos/ImgDiagnosticos')),
        authority: [],
    },
    {
        key: 'historia-clinica',
        path: '/historia-clinica/complicaciones-agudas/:id_paciente',
        component: lazy(() => import('@/views/historia/mod/complicacionesAgudas/ComplicacionesAgudas')),
        authority: [],
    },
    {
        key: 'historia-clinica',
        path: '/historia-clinica/complicaciones-cronicas/:id_paciente',
        component: lazy(() => import('@/views/historia/mod/complicacionesCronicas/ComplicacionesCronicas')),
        authority: [],
    },
    {
        key: 'historia-clinica',
        path: '/historia-clinica/examenes-fisicos/:id_paciente',
        component: lazy(() => import('@/views/historia/mod/examenesFisicos/ExamenesFisicos')),
        authority: [],
    },
    {
        key: 'historia-clinica',
        path: '/historia-clinica/laboratorios/:id_paciente',
        component: lazy(() => import('@/views/historia/mod/laboratorios/Laboratorios')),
        authority: [],
    },
    {
        key: 'historia-clinica',
        path: '/historia-clinica/soportes-transfucionales/:id_paciente',
        component: lazy(() => import('@/views/historia/mod/soportesTransfucionales/SoportesTransfucionales')),
        authority: [],
    },
    {
        key: 'historia-clinica',
        path: '/historia-clinica/transplantes-progenitores/:id_paciente',
        component: lazy(() => import('@/views/historia/mod/transplantesProgenitores/TransplantesProgenitores')),
        authority: [],
    },
    {
        key: 'historia-clinica',
        path: '/historia-clinica/tratamientos/:id_paciente',
        component: lazy(() => import('@/views/historia/mod/tratamientos/Tratamientos')),
        authority: [],
    },
    {
        key: 'historia-clinica',
        path: '/historia-clinica/Vacunas/:id_paciente',
        component: lazy(() => import('@/views/historia/mod/vacunas/Vacunas')),
        authority: [],
    },

    ...othersRoute,
]
