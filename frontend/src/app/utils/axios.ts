import { AxiosInstance, CreateAxiosDefaults, default as _axios } from 'axios';

const config: CreateAxiosDefaults = {
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
};
const axios: AxiosInstance = _axios.create(config);

export default axios;
