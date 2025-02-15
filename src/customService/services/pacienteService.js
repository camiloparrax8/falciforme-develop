import axiosInstance from "../adapters/axiosInstance";


export const postPaciente = async (token, data) => {
    try {
    const result = await axiosInstance.post('/paciente', data, {
        headers: { Authorization: token }
    });
    return result.data;
} catch (error) {
    console.error("Error al crear el paciente:", error.response?.data || error.message);
    throw error; // Lanza el error para manejarlo desde el componente que consume este servicio
}
}

export const buscarPaciente = async (token, identificacion) => {
    try {
        const result = await axiosInstance.get(`/paciente/${identificacion}`, {
            headers: { Authorization: token }
        });
        return result.data;
    } catch (error) {
        console.error("Error al buscar el paciente:", error.response?.data || error.message);
        throw error; // Lanza el error para manejarlo desde el componente que consume este servicio
    }
};


export const crearPaciente = async (token, idUsuario, formData) => {
    try {
        const data = {
            nombre: formData.nombre,                  // Igual al formData
            apellido: formData.apellido,
            tipo_identificacion: formData.tipo_identificacion,
            identificacion: formData.identificacion,
            celular: formData.celular,
            correo: formData.correo,
            municipio: formData.municipio,
            departamento: formData.departamento,
            direccion: formData.direccion,
            ocupacion: formData.ocupacion,
            tipo_vivienda: formData.tipo_vivienda,
            nivel_ingreso: formData.nivel_ingreso,
            nivel_academico: formData.nivel_academico,
            tipo_vehiculo: formData.tipo_vehiculo,
            id_user_create: idUsuario                // Parámetro recibido
        };

        const result = await axiosInstance.post(`/pacientes`, data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear paciente:", error.response?.data || error.message);
        throw error;
    }
};

