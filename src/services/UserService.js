import axios from "axios";
import constants from "../constants";

const API = axios.create({
  baseURL: `/api/users`,
});

export const fetchUsers = (user) => API.get("/", user);

export const createUser = (user) => API.post("/", user);

export const updateUser = (id, user) => API.put(`/${id}`, user);

export const deleteUser = (id) => API.delete(`/${id}`);

export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/login", credentials);
    console.log('Server login response:', response.data); // Debug log
    return response;
  } catch (error) {
    console.error('Server login error:', error.response?.data); // Debug log
    throw error;
  }
};
