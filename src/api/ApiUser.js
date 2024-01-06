import axios from 'axios';
import { API_URL } from '@env';
const BASE_URL = `${API_URL}/api`
const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export const changePassword = async ({ data, token }) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/user/changePassword`,
            JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error('Đã xảy ra lỗi:', error.response ? error.response.data : error.message);
        throw error;
    }
}



export const getHistoryById = async (token) => {
    const response = await axios.get(
        `${BASE_URL}/reservation/history`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return { Data: response?.data };
}


