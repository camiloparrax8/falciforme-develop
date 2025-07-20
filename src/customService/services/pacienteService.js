import axiosInstance from "../adapters/axiosInstance";




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
export const buscarPacienteById = async (token, id) => {
    try {
        const result = await axiosInstance.get(`/paciente/buscar/${id}`, {
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
            nombre: formData.nombre,
            apellido: formData.apellido,
            tipo_identificacion: formData.tipo_identificacion,
            identificacion: formData.identificacion,
            fecha_nacimiento: formData.fecha_nacimiento,
            sexo: formData.sexo,
            identidad_genero: formData.identidad_genero,
            identidad_sexual: formData.identidad_sexual,
            estrato: formData.estrato,
            ocupacion: formData.ocupacion,
            residente: formData.residente,
            direccion: formData.direccion,
            procedente: formData.procedente,
            regimen: formData.regimen,
            celular: formData.celular,
            correo: formData.correo,
            municipio: formData.municipio,
            departamento: formData.departamento,
            id_user_create: idUsuario
        };

        const result = await axiosInstance.post(`/paciente`, data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear paciente:", error.response?.data || error.message);
        throw error;
    }
};

export const actualizarPaciente = async (token, idUsuario, idPaciente, formData) => {
    try {
        const data = {
            id: idPaciente,
            nombre: formData.nombre,
            apellido: formData.apellido,
            tipo_identificacion: formData.tipo_identificacion,
            identificacion: formData.identificacion,
            fecha_nacimiento: formData.fecha_nacimiento,
            sexo: formData.sexo,
            identidad_genero: formData.identidad_genero,
            identidad_sexual: formData.identidad_sexual,
            estrato: formData.estrato,
            ocupacion: formData.ocupacion,
            residente: formData.residente,
            direccion: formData.direccion,
            procedente: formData.procedente,
            regimen: formData.regimen,
            celular: formData.celular,
            correo: formData.correo,
            municipio: formData.municipio,
            departamento: formData.departamento,
            id_user_update: idUsuario
        };

        const result = await axiosInstance.put(`/paciente/actualizar`, data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        console.error("Error al actualizar paciente:", error.response?.data || error.message);
        throw error;
    }
};
