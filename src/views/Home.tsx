import { useSessionUser } from '@/store/authStore'

const Home = () => {
    const { user } = useSessionUser()

    return (
        <div>
            <h1>
                Hola, {user.nombres} {user.apellidos}
            </h1>
            <p>Correo: {user.correo}</p>
            <p>ID: {user.id}</p>
        </div>
    )
}

export default Home
