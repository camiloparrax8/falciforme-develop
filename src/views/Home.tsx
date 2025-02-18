import { useSessionUser } from '@/store/authStore'

const Home = () => {
    const { user,  token, expiresIn } = useSessionUser()
    return (
        <div>
            <h1>
                Hola, {user.nombres} {user.apellidos}
            </h1>
            <p>Correo: {user.correo}</p>
            <p>expiresIn: {expiresIn }</p>
            <p>token: {token}</p>
            <p>ID: {user.id}</p>
        </div>
    )
}

export default Home
