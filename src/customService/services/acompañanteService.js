import axiosInstance from "../adapters/axiosInstance";

export const BuscarAcompañante = async (token, identificacion) => {
    try {
        const result = await axiosInstance.get(`/acompanante/${identificacion}`, {
            headers: { Authorization: token }
        });
        return result.data;
    } catch (error) {
        console.error("Error al buscar acompañante:", error.response?.data || error.message);
        throw error;
    }
};

export const actualizarAcompañante = async (token, formData) => {

    try {
        // Si solo tiene idPaciente e idAcompanante, es una asignación
        if (formData.idPaciente && formData.idAcompanante && Object.keys(formData).length === 2) {
            const data = {
                idPaciente: formData.idPaciente,
                idAcompanante: formData.idAcompanante,
            }


            const result = await axiosInstance.put(`/paciente/acompanante`, data, {
                headers: { Authorization: token },
            })

            return result.data
        } else {
            // Si tiene más datos, es una actualización de datos del acompañante
            const data = {
                idPaciente: formData.idPaciente,
                idAcompanante: formData.idAcompanante,
                nombre: formData.nombre,
                apellido: formData.apellido,
                celular: formData.celular,
                correo: formData.correo,
                ocupacion: formData.ocupacion,
                municipio: formData.municipio,
                departamento: formData.departamento,
                direccion: formData.direccion,
                tipo_identificacion: formData.tipo_identificacion,
                identificacion: formData.identificacion,
                tipo_vivienda: formData.tipo_vivienda,
                nivel_ingreso: formData.nivel_ingreso,
                nivel_academico: formData.nivel_academico,
                tipo_vehiculo: formData.tipo_vehiculo,
                id_user_update: formData.id_user_update
            }


            const result = await axiosInstance.put(`/paciente/acompanante`, data, {
                headers: { Authorization: token },
            })

            return result.data
        }
    } catch (error) {
        console.error(
            'Error al actualizar acompanante:',
            error.response?.data || error.message,
        )
        throw error
    }
}

export const crearAcompanante = async (token, idUsuario, formData) => {
    try {
        const data = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            celular: formData.celular,
            correo: formData.correo,
            ocupacion: formData.ocupacion,
            municipio: formData.municipio,
            departamento: formData.departamento,
            direccion: formData.direccion,
            tipo_identificacion: formData.tipo_identificacion,
            identificacion: formData.identificacion,
            tipo_vivienda: formData.tipo_vivienda,
            nivel_ingreso: formData.nivel_ingreso,
            nivel_academico: formData.nivel_academico,
            tipo_vehiculo: formData.tipo_vehiculo,
            id_user_create: idUsuario
        };

        const result = await axiosInstance.post(`/acompanante`, data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear acompañante:", error.response?.data || error.message);
        throw error;
    }
};



