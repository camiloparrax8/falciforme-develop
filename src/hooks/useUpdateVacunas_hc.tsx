import { useState } from 'react';
import { useToken, useSessionUser } from '@/store/authStore';
import { useParams } from 'react-router-dom';
import { crearVacuna, actualizarVacuna, eliminarLogicamenteVacuna } from '@/customService/services/vacunas_hcService';

interface UpdateResult {
    success: boolean;
    message: string;
    data?: Record<string, unknown>;
}

interface DatosVacuna {
    nombre_vacuna: string;
    fecha: string;
}

export const useUpdateVacunas_hc = () => {
    const { token } = useToken();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<UpdateResult | null>(null);
    const { user } = useSessionUser();
    const { id_paciente } = useParams();

    const crearNuevaVacuna = async (data: DatosVacuna) => {
        setIsLoading(true);
        setResult(null);

        try {
            console.log('=== INICIO CREACIÓN VACUNA ===');
            console.log('Datos recibidos del formulario:', data);
            console.log('Tipo de datos recibidos:');
            console.log('- nombre_vacuna:', data.nombre_vacuna, typeof data.nombre_vacuna);
            console.log('- fecha:', data.fecha, typeof data.fecha);
            console.log('ID del paciente:', id_paciente);

            if (!id_paciente) {
                throw new Error('ID del paciente no proporcionado');
            }

            console.log('=== CREANDO NUEVA VACUNA ===');
            const nuevaVacuna = {
                id_paciente: id_paciente,
                nombre_vacuna: data.nombre_vacuna,
                fecha: data.fecha,
                id_user_create: user.id,
            };

            console.log('=== DATOS ENVIADOS AL BACKEND (CREACIÓN) ===');
            console.log('Datos formateados:', nuevaVacuna);
            console.log('==========================================');

            const result = await crearVacuna(token, nuevaVacuna);
            console.log('Respuesta de creación:', result);
            
            if (result.status === 'success') {
                setResult({
                    success: true,
                    message: 'Vacuna creada correctamente',
                    data: result.data,
                });
            } else {
                throw new Error(result.message || 'Error al crear la vacuna');
            }
            console.log('=== FIN CREACIÓN VACUNA ===');
        } catch (error) {
            console.error('Error al crear vacuna:', error);
            setResult({
                success: false,
                message: error.message || 'Error al crear la vacuna',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const actualizarVacunaExistente = async (idVacuna: number, data: DatosVacuna) => {
        setIsLoading(true);
        setResult(null);

        try {
            if (!idVacuna) {
                throw new Error('ID de la vacuna no proporcionado');
            }

            console.log('=== INICIO ACTUALIZACIÓN VACUNA ===');
            console.log('Datos recibidos del formulario:', data);
            console.log('ID de la vacuna:', idVacuna);

            const datosActualizados = {
                nombre_vacuna: data.nombre_vacuna,
                fecha: data.fecha,
            };

            console.log('=== DATOS ENVIADOS AL BACKEND (ACTUALIZACIÓN) ===');
            console.log('Datos formateados:', datosActualizados);
            console.log('==========================================');

            const response = await actualizarVacuna(
                token,
                idVacuna,
                datosActualizados
            );

            setResult({
                success: true,
                message: 'Vacuna actualizada correctamente',
                data: response,
            });

            return response;
        } catch (error) {
            const errorMessage = error.message || 'Error al actualizar la vacuna';
            setResult({
                success: false,
                message: errorMessage,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const eliminarVacuna = async (idVacuna: number) => {
        setIsLoading(true);
        setResult(null);

        try {
            if (!idVacuna) {
                throw new Error('ID de la vacuna no proporcionado');
            }

            console.log('=== INICIO ELIMINACIÓN VACUNA ===');
            console.log('ID de la vacuna:', idVacuna);

            const response = await eliminarLogicamenteVacuna(
                token,
                idVacuna
            );

            setResult({
                success: true,
                message: 'Vacuna eliminada correctamente',
                data: response,
            });

            return response;
        } catch (error) {
            const errorMessage = error.message || 'Error al eliminar la vacuna';
            setResult({
                success: false,
                message: errorMessage,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        result,
        crearNuevaVacuna,
        actualizarVacunaExistente,
        eliminarVacuna
    };
}; 