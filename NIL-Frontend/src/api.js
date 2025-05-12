import axios from "axios";

const API = axios.create({ baseURL: `${process.env.EXPO_PUBLIC_FRONTEND_URL}:3001/api` });

export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);