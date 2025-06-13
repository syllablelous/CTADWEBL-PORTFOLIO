import axios from "axios";
import constants from "../constants";

const API = axios.create({
  baseURL: `/api/articles`,
});

export const fetchArticles = () => API.get("/");
export const fetchArticle = (name) => API.get(`/name/${name}`);
export const createArticle = (article) => API.post("/", article);
export const updateArticle = (id, article) => API.put(`/${id}`, article);
export const deleteArticle = (id) => API.delete(`/${id}`);
