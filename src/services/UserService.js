import API from './api';
import constants from "../constants";

export const fetchUsers = (user) => API.get("/users", user);

export const createUser = (user) => API.post("/users", user);

export const updateUser = (id, user) => API.put(`/users/${id}`, user);

export const deleteUser = (id) => API.delete(`/users/${id}`);

export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/users/login", credentials);
    console.log('Server login response:', response.data); // Debug log
    return response;
  } catch (error) {
    console.error('Server login error:', error.response?.data); // Debug log
    throw error;
  }
};
