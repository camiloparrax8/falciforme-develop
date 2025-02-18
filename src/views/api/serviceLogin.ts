import ApiService from "@/services/ApiService";

type LoginApiResponse = {
    data: {
        id: number;
        nombres: string;
        apellidos: string;
        cedula: string;
        correo: string;
        celular: string;
        user: string;
        password: string;
        id_rol: number;
        estado: boolean;
        is_deleted: boolean;
        deleted_at: string | null;
        deleted_by: string | null;
        createdAt: string; // Fecha en formato ISO
        updatedAt: string; // Fecha en formato ISO
    }
    token: string;
    expiresIn: number;
};

type LoginApiRequest = {
    email: string; // Cambiado a 'user' según los parámetros de la API
    password: string;
};

export async function serviceLogin(data: LoginApiRequest) {
    try {
        const response = await ApiService.fetchDataWithAxios<LoginApiResponse, LoginApiRequest>({
            url: 'login', // Ruta de la API
            method: 'post',
            data, // Cuerpo de la solicitud
        });

        return {
            id: response.data.id, // Obtiene el id
            nombres: response.data.nombres, // Obtiene solo los nombres
            apellidos: response.data.apellidos, // Obtiene solo los apellidos
            cedula: response.data.cedula, // Obtiene solo la cédula
            correo: response.data.correo, // Obtiene solo el correo
            celular: response.data.celular, // Obtiene solo el celular
            user: response.data.user, // Obtiene solo el usuario
            password: response.data.password, // Obtiene solo la contraseña
            id_rol: response.data.id_rol, // Obtiene solo el id del rol
            estado: response.data.estado, // Obtiene solo el estado
            is_deleted: response.data.is_deleted, // Obtiene solo el estado de eliminación
            deleted_at: response.data.deleted_at, // Obtiene solo la fecha de eliminación
            deleted_by: response.data.deleted_by, // Obtiene solo el usuario que eliminó
            createdAt: response.data.createdAt, // Convierte la fecha en formato ISO a Date
            updatedAt: response.data.updatedAt, // Convierte la fecha en formato ISO a Date
            token: response.token, // Obtiene solo el token
            expiresIn: response.expiresIn, // tiempo de expiracion token
        };
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error during login');
    }
}

