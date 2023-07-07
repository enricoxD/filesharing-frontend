import axios from "axios";

export const BASE_URL = process.env.API_BASE_URL;
export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {'Content-Type': 'application/json'}
});

export const apiFormData = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {'Content-Type': 'multipart/form-data'}
});