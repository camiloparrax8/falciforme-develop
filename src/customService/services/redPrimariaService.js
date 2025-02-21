import axiosInstance from '../adapters/axiosInstance'

export const buscarHospital = async (token, hospital) => {
    try {
        const result = await axiosInstance.get(`/redPrimaria/${hospital}`, {
            headers: { Authorization: token },
        })
        return result.data
    } catch (error) {
        console.error(
            'Error al buscar la red primaria:',
            error.response?.data || error.message,
        )
        throw error // Lanza el error para manejarlo desde el componente que consume este servicio
    }
}

export const crearRedPrimaria = async (token, idUsuario, formData) => {
    try {
        const data = {
            fecha: formData.fecha,
            hospital: formData.hospital,
            correo: formData.correo,
            telefono: formData.telefono,
            telefono_urgencias: formData.telefono_urgencias,
            municipio: formData.municipio,
            departamento: formData.departamento,
            id_user_create: idUsuario
        };

        const result = await axiosInstance.post(`/redPrimaria`, data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear la Red Primaria:", error.response?.data || error.message);
        throw error;
    }
}

export const actualizarRedPrimaraPaciente = async (token, formData) => {
  
    
    try {
        const data = {
            idPaciente: formData.idPaciente,
            idRedPrimaria: formData.idRedPrimaria,
        }
        
       

        const result = await axiosInstance.put(`/paciente/redPrimaria`, data, {
            headers: { Authorization: token },
        })

        return result.data
    } catch (error) {
        console.error(
            'Error al actualizar la red primaria:',
            error.response?.data || error.message,
        )
        throw error
    }
}
