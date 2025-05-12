import axios from "axios";

const API = axios.create({ baseURL: "http://192.168.2.250:3001/api" });

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);