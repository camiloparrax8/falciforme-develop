import axiosInstance from "../adapters/axiosInstance";


export const getUsuarios = async (token) => {
    const result = await axiosInstance.get('/usuario', {
        headers: { Authorization: token }
    });
    return result.data;
}