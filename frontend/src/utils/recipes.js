export function getAvatarLabel(username = "") {
  return username.trim().slice(0, 2).toUpperCase() || "CC";
}

export function normaliseRecipe(recipe) {
  return {
    ...recipe,
    average_rating: Number(recipe.average_rating ?? 0),
    ratings_count: Number(recipe.ratings_count ?? 0),
    is_favorite: Boolean(recipe.is_favorite),
    user_rating: recipe.user_rating ?? null,
  };
}
