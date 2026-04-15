import API from "./client";

export const getFavorites = () => API.get("/favorites/");
export const addFavorite = (recipeId) => API.post(`/favorites/recipe/${recipeId}`);
export const removeFavorite = (recipeId) => API.delete(`/favorites/recipe/${recipeId}`);
