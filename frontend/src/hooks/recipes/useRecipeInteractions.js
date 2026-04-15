import { addFavorite, deleteRecipe, rateRecipe, removeFavorite } from "../../api";

function useRecipeInteractions({ setRecipes, updateRecipeInState, setError, setMessage }) {
  const handleRecipeDelete = async (recipeId) => {
    try {
      await deleteRecipe(recipeId);
      setRecipes((current) => current.filter((recipe) => recipe.id !== recipeId));
      setMessage("Recipe deleted.");
    } catch {
      setError("Unable to delete this recipe right now.");
    }
  };

  const handleFavoriteToggle = async (recipe) => {
    try {
      if (recipe.is_favorite) {
        await removeFavorite(recipe.id);
      } else {
        await addFavorite(recipe.id);
      }

      setRecipes((current) =>
        current.map((item) =>
          item.id === recipe.id ? { ...item, is_favorite: !item.is_favorite } : item
        )
      );
    } catch {
      setError("Unable to update saved recipes right now.");
    }
  };

  const handleRateRecipe = async (recipeId, value) => {
    try {
      const response = await rateRecipe(recipeId, value);
      updateRecipeInState({ ...response.data, id: recipeId });
    } catch {
      setError("Unable to rate this recipe right now.");
    }
  };

  return {
    handleRecipeDelete,
    handleFavoriteToggle,
    handleRateRecipe,
  };
}

export default useRecipeInteractions;
