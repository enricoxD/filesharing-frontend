import axios from "axios";

export const API_BASE_URL = process.env.API_BASE_URL;
export const BASE_URL = process.env.BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'}
});

export const formDataApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {'Content-Type': 'multipart/form-data'}
});