import API from "./client";

export const rateRecipe = (recipeId, value) =>
  API.post(`/ratings/recipe/${recipeId}`, { value });
