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

            if (!id_paciente) {
                throw new Error('ID del paciente no proporcionado');
            }

            const nuevaVacuna = {
                id_paciente: id_paciente,
                nombre_vacuna: data.nombre_vacuna,
                fecha: data.fecha,
                id_user_create: user.id,
            };


            const result = await crearVacuna(token, nuevaVacuna);
            
            if (result.status === 'success') {
                setResult({
                    success: true,
                    message: 'Vacuna creada correctamente',
                    data: result.data,
                });
            } else {
                throw new Error(result.message || 'Error al crear la vacuna');
            }
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

            const datosActualizados = {
                nombre_vacuna: data.nombre_vacuna,
                fecha: data.fecha,
            };


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