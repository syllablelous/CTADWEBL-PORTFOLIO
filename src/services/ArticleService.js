import API from './api';
import constants from "../constants";

export const fetchArticles = () => API.get("/articles");
export const fetchArticle = (name) => API.get(`/articles/name/${name}`);
export const createArticle = (article) => API.post("/articles", article);
export const updateArticle = (id, article) => API.put(`/articles/${id}`, article);
export const deleteArticle = (id) => API.delete(`/articles/${id}`);
