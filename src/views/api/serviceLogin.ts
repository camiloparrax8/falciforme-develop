import ApiService from "@/services/ApiService";

type LoginApiResponse = {
    data: {
        nombres: string;
        id: number;
    };
    token: string;
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
            token: response.token, // Obtiene solo el token
        };
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error during login');
    }
}

