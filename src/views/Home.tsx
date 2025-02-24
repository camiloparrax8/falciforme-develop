import { useSessionUser } from '@/store/authStore'
import { useState } from 'react'
import FormAcompañante from './paciente/add/Acompañante/FormAcompañante'

const Home = () => {
    const { user,  token, expiresIn } = useSessionUser()
    const [isOpen, setIsOpen] = useState(false)
    const openDialog = () => setIsOpen(true)
    const closeDialog = () => setIsOpen(false)
    return (
        <div>
            <h1>
                Hola, {user.nombres} {user.apellidos}
            </h1>
            <p>Correo: {user.correo}</p>
            <p>expiresIn: {expiresIn }</p>
            <p>token: {token}</p>
            <p>ID: {user.id}</p>
            <button onClick={openDialog}>Agregar Acompañante</button>
            <FormAcompañante
                isOpen={isOpen}
                onClose={closeDialog}
                onRequestClose={closeDialog}
            />
        </div>

                    

    )
}

export default Home
