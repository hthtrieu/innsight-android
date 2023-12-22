import axios from "axios";
import { API_URL } from '@env';
const BASE_URL = `${API_URL}/api/hotel`
const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};
export const getHotelById = async (data) => {
    const response = await axios.post(`${BASE_URL}/rooms`, JSON.stringify(data), config);
    return { Data: response?.data };
}
export const searchHotels = async (filter) => {
    try {
        const response = await axios.post(`${BASE_URL}/filter/search`, JSON.stringify(filter), config);
        return { Data: response?.data };
    } catch (error) {
        return { Error: error };
    }
};