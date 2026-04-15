import API from "./client";

export const getRecipes = ({ query = "", category = "" } = {}) =>
  API.get("/recipes/", { params: { query, category } });

export const createRecipe = (data) => API.post("/recipes/", data);
export const updateRecipe = (id, data) => API.put(`/recipes/${id}`, data);
export const deleteRecipe = (id) => API.delete(`/recipes/${id}`);
