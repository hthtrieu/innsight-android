import axios from "axios";
import { API_URL } from '@env';
const BASE_URL = `${API_URL}/api/v1/auth`
console.log(BASE_URL)
const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};
export const SignIn = async (data) => {
    console.log(data)
    const response = await axios.post(`${BASE_URL}/authenticate`, JSON.stringify(data), config);
    if (response.status === 200) {
        return {
            Data: response?.data
        }
    }
    else {
        return {
            Message: "Error"
        }
    }
}
export const SignUp = async (data) => {
    const response = await axios.post(`${BASE_URL}/register`, JSON.stringify(data), config);
    if (response.status === 200) {
        return { Data: true }
    }
    else {
        return {
            Data: false
        }
    }
}
export const LogOut = async (token) => {
    const response = await axios.post(
        `${BASE_URL}/logout`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (response.status === 200) {
        return {
            Data: response?.data
        }
    }
    else {
        return {
            Message: "Error"
        }
    }
}